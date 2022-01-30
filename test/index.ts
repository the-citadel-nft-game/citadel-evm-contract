import { expect } from "chai";
import { ethers } from "hardhat";
import {citiesIdAndCoordinates} from '../util/citiesIdAndCoordinates';
import {buildTree, getProof} from '../util/citiesMerkleTree';

describe("Citadel minting", function () {
  it("Should inhabit the citadel", async function () {
    const Citadel = await ethers.getContractFactory("Citadel");
    const citadel = await Citadel.deploy(buildTree());
    await citadel.deployed();
    console.log("Citadel deployed to:", citadel.address);
    console.log("latest block:", await ethers.provider.getBlock("latest"));

    const startTx = await citadel.startPreApocalypse();
    console.log("Pre-Siege started: ", startTx);
    // const i = Math.round(Math.random()*citiesIdAndCoordinates.length);
    const i = 1;
    console.log("Inhabiting City: ", citiesIdAndCoordinates[i].toString());
    console.log("Proof: :", getProof(i).toString());
    // console.log("Proof: :",ethers.utils.parseBytes32String(getProof(i)));
    const inhabitTx = await citadel.inhabit(
        citiesIdAndCoordinates[i][0],
        [citiesIdAndCoordinates[i][1], citiesIdAndCoordinates[i][2]],
        getProof(i));

    // expect(await greeter.greet()).to.equal("Hello, world!");

    // const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    // await setGreetingTx.wait();

    // expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
