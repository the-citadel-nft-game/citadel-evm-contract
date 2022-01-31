import { expect } from "chai";
import { ethers, waffle } from "hardhat";
import { Contract, Wallet } from "ethers";
import {citiesIdAndCoordinates} from '../util/citiesIdAndCoordinates';
import {buildTree, getProof} from '../util/citiesMerkleTree';

const deploy = async () => {
  const Citadel = await ethers.getContractFactory("Citadel");
  const citadel = await Citadel.deploy(buildTree());
  await citadel.deployed();
  return citadel;
}

describe("Smart contract deployment and pre-siege activated", () => {
  it("Should deploy the contract and change status (allow inhabitation)", async () => {
    const citadel = await deploy();
    console.log("Citadel deployed to:", citadel.address);

    await citadel.startPreApocalypse();
    const startTime = await citadel.startTime();
    console.log("Pre-Siege started: ", startTime);
  })
})

describe("Citadel minting", () => {

  it("Should inhabit the citadel", async function () {
    const citadel = await deploy();
    await citadel.startPreApocalypse();

    const i = Math.round(Math.random()*citiesIdAndCoordinates.length);

    console.log("Inhabiting City: ", citiesIdAndCoordinates[i].toString());
    console.log("Proof: :", getProof(i).toString());
    const cost  = ethers.utils.parseEther("0.04");

    const inhabit = await citadel.inhabit(
        citiesIdAndCoordinates[i][0],
        [citiesIdAndCoordinates[i][1], citiesIdAndCoordinates[i][2]],
        getProof(i),
        {value: cost });

    console.log(inhabit.toString());


    // expect(await greeter.greet()).to.equal("Hello, world!");

    // const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    // await setGreetingTx.wait();

    // expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
