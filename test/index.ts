import {expect} from 'chai';
import {ethers, waffle} from 'hardhat';
import {Contract, Wallet} from 'ethers';
import {citiesIdAndCoordinates} from '../util/citiesIdAndCoordinates';
import {buildTree, getProof} from '../util/citiesMerkleTree';

const deploy = async () => {
    const Citadel = await ethers.getContractFactory('Citadel');
    const citadel = await Citadel.deploy(buildTree());
    await citadel.deployed();
    return citadel;
}

const inhabit = async (citadel: Contract, i: number) => {

    console.log('Inhabiting City: ', citiesIdAndCoordinates[i].toString());
    // console.log("Proof: :", getProof(i).toString());
    const cost = ethers.utils.parseEther('0.04');

    const inhabit = await citadel.inhabit(
        citiesIdAndCoordinates[i][0],
        [citiesIdAndCoordinates[i][1], citiesIdAndCoordinates[i][2]],
        getProof(i),
        {value: cost});
    await inhabit.wait();
    return inhabit;
}

describe('Smart contract deployment and pre-siege activated', () => {
    it('Should deploy the contract and change status (allow inhabitation)', async () => {
        const citadel = await deploy();
        console.log('Citadel deployed to:', citadel.address);

        await (await citadel.startPreSiege()).wait();
        const startTime = await citadel.startTime();
        console.log('Pre-Siege started: ', new Date(startTime.toNumber() * 1000).toString());
    })
})

describe('Citadel minting', () => {
    it('Should inhabit the citadel', async function () {
        const citadel = await deploy();
        await citadel.startPreSiege();

        const i = Math.round(Math.random() * citiesIdAndCoordinates.length);
        const inhabitTx = await inhabit(citadel, i);
        // console.log(JSON.stringify(inhabitTx));

        for (let field of ['value', 'gasPrice']) {
            const value = ethers.utils.formatEther(inhabitTx[field]);
            console.log(field, value);
        }

        const isUninhabited = await citadel.isUninhabited(citiesIdAndCoordinates[i][0]);
        console.log('\ninhabited: ', !isUninhabited);
    });
});


describe('Citadel minting', () => {
    it('Should inhabit the citadel', async function () {
        const citadel = await deploy();
        await citadel.startPreSiege();

        const i = Math.round(Math.random() * citiesIdAndCoordinates.length);
        const inhabitTx = await inhabit(citadel, i);
        // console.log(JSON.stringify(inhabitTx));

        for (let field of ['value', 'gasPrice']) {
            const value = ethers.utils.formatEther(inhabitTx[field]);
            console.log(field, value);
        }
        const isUninhabited = await citadel.isUninhabited(citiesIdAndCoordinates[i][0]);
        console.log('\ninhabited: ', !isUninhabited);
    });
});


describe('Citadel minting', () => {
  it('Should inhabit the citadel', async function () {
    const citadel = await deploy();
    await citadel.startPreSiege();

    const i = Math.round(Math.random() * citiesIdAndCoordinates.length);
    const inhabitTx = await inhabit(citadel, i);
    // console.log(JSON.stringify(inhabitTx));

    for (let field of ['value', 'gasPrice']) {
      const value = ethers.utils.formatEther(inhabitTx[field]);
      console.log(field, value);
    }

    const isUninhabited = await citadel.isUninhabited(citiesIdAndCoordinates[i][0]);
    console.log('\ninhabited: ', !isUninhabited);
  });
});


describe('Game flow', () => {
    it('Impact with every block', async function () {
        const citadel = await deploy();
        await citadel.startPreSiege();

        const i = Math.round(Math.random() * citiesIdAndCoordinates.length);
        const inhabitTx = await inhabit(citadel, i);
        const isUninhabited = await citadel.isUninhabited(citiesIdAndCoordinates[i][0]);
        console.log('\ninhabited: ', !isUninhabited);

        for (let i=0; i<5; i++) {
            const blockNumber = ethers.provider.getBlockNumber();
            const block = await ethers.provider.getBlock(blockNumber);
            const currentTimestamp = Math.floor(new Date().getTime() / 1000);
            const secondsDiff = currentTimestamp - block.timestamp;
            await ethers.provider.send('evm_increaseTime', [secondsDiff]);
            await ethers.provider.send('evm_mine', []);
            let impact = citadel.currentImpact();
            console.log(i+' impact: ', JSON.stringify(impact));
        }
    });
});





