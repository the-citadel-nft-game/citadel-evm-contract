// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

function generateCityTree() {
  // can't accept uint16 for some reason, takes 256 only.
  const abi = ethers.utils.defaultAbiCoder.encode([ "uint64", "uint64", "uint64"], [ 1, 888, 211]);
  // deleting 60 leading zeroes in every number to emulate 16-bit integer.
  const encoded = abi.replace(/(0){60}/g, '');
  console.log(encoded);
  const city1= ethers.utils.keccak256(encoded);

  const city2= ethers.utils.keccak256(
      ethers.utils.defaultAbiCoder.encode([ "uint64", "uint64", "uint64 "], [ 2, 797, 374])
          .replace(/(0){60}/g, ''));

  const cityroot= ethers.utils.keccak256(
      ethers.utils.defaultAbiCoder.encode([ "string", "string"], [ city1, city2]));
  // uint32
  // solidity gives for  keccak256(abi.encodePacked(1392685764,3836306,781101));
  //abi encoded (bytes):0x5302b2c4003a8992000beb2d
  // <for uint64 abi encoded is 0x000000005302b2c400000000003a899200000000000beb2d>
  // hash is
  // 0x2e3aa5c98b2ae7ee7ab20da40e376524358e8557cc9a8dcb1a1585acfd844492
  // ethers gives
  //
  // 0x2e3aa5c98b2ae7ee7ab20da40e376524358e8557cc9a8dcb1a1585acfd844492
  console.log(city1);
  return cityroot;

}

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Citadel = await ethers.getContractFactory("Citadel");
  // sample city tree
  // city 1 (100,100) =
  // leaf1:
  //1 arg is a cityroot, e.g. 0x430a7680ca49d499ba2515b1658b7f69e3717b89f68a5f738c35cb01132f961a was used for 0xd6e382aa7A09fc4A09C2fb99Cfce6A429985E65d
  //2 arg is a NFT contract one holds for early mint: (e.g. 0x9Abb7BdDc43FA67c76a62d8C016513827f59bE1b) can be zero
  const cityroot = generateCityTree();
  const citadel = await Citadel.deploy(cityroot);

  await citadel.deployed();

  console.log("Citadel deployed to:", citadel.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
