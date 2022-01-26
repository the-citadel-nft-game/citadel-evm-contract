// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Citadel = await ethers.getContractFactory("Citadel");

  //1 arg is a cityroot, e.g. 0x430a7680ca49d499ba2515b1658b7f69e3717b89f68a5f738c35cb01132f961a was used for 0xd6e382aa7A09fc4A09C2fb99Cfce6A429985E65d
  //2 arg is a NFT contract one holds for early mint: (e.g. 0x9Abb7BdDc43FA67c76a62d8C016513827f59bE1b) can be zero
  const citadel = await Citadel.deploy('0x430a7680ca49d499ba2515b1658b7f69e3717b89f68a5f738c35cb01132f961a','0');

  await citadel.deployed();

  console.log("Citadel deployed to:", citadel.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
