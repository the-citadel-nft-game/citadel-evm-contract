import {ethers} from 'hardhat';
import {citiesIdAndCoordinates} from './citiesIdAndCoordinates';
import {MerkleTree} from 'merkletreejs';
import keccak256 from 'keccak256';

type City = [number, number, number];
type MerkleTreeLeaf = string;
type MerkleTreeLevel = MerkleTreeLeaf[];

let encodedCitiesIdAndCoordinates: string[];
let merkleBottomLevel: MerkleTreeLevel;
let tree: MerkleTreeLevel[];


let merkleTree: MerkleTree;

const pairHash = (a: MerkleTreeLeaf, b: MerkleTreeLeaf) =>
    ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(['string', 'string'], [a, b]));

const oneLevelUp = (inputArray: MerkleTreeLevel) => {
    const result = [];
    const inp = [...inputArray];
    if (inp.length % 2 === 1)
        inp.push('');
    for (let i = 0; i < inp.length; i += 2)
        result.push(pairHash(inp[i], inp[i + 1]));
    return result;
}

const getMerkleRoot = (inputArray: MerkleTreeLevel) => {
    let result;
    result = [...inputArray];
    while (result.length > 1)
        result = oneLevelUp(result);
    return result[0]
}

const getMerkleProof = (inputArray: MerkleTreeLevel, n: number) => {
    let result = [], currentLayer = [...inputArray], currentN = n;

    // Until we reach the top
    while (currentLayer.length > 1) {
        // No odd length layers
        if (currentLayer.length % 2)
            currentLayer.push('');

        result.push(currentN % 2
            // If currentN is odd, add the value before it
            ? currentLayer[currentN - 1]
            // If it is even, add the value after it
            : currentLayer[currentN + 1]);

        // Move to the next layer up
        currentN = Math.floor(currentN / 2);
        currentLayer = oneLevelUp(currentLayer)
    }   // while currentLayer.length > 1

    return result;
}   // getMerkleProof

export function buildTree() {
    console.log('initial cities data: ', citiesIdAndCoordinates.toString());
    encodedCitiesIdAndCoordinates = citiesIdAndCoordinates.map(i =>
        ethers.utils.defaultAbiCoder.encode(['uint64', 'uint64', 'uint64 '], i).replace(/(0){60}/g, ''));
    // console.log('abi encoded: ', encodedCitiesIdAndCoordinates.toString());
    // console.log('hashed data: ', merkleBottomLevel.toString());
    merkleTree = new MerkleTree(encodedCitiesIdAndCoordinates, keccak256, { hashLeaves: true, sortPairs: true });

    return merkleTree.getHexRoot();
}

export function getLeaf(index: number) {
    return merkleBottomLevel[index];
}

export function getProof(index: number) {
    const leaf = keccak256(encodedCitiesIdAndCoordinates[index]);
    return merkleTree.getHexProof(leaf);
}
