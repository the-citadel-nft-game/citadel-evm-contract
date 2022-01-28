# The Citadel NFT Game
Doomsday-inspired NFT game for Binance Smart Chain and Avalanche.

## Plot
The middle-age citadels are located in the settlements around the world and being built to withstand the coming global siege.
Starting from the siege date towers are getting attacked.

## Initial parameters
Siege start: `DAY`
Tower: NFT with a given generative Name and Artwork.
Build citadel = mint NFT token.
Mint cost: 0.04 BNB
Reinforce

## Cities
Cities' coordinates are secured with a Merkle Tree.
A Tree is build so that `leafs` are encoded cities coordinates  `bytes32 leaf = keccak256(coordinates[0],coordinates[1]);`.
Hashes can be checked [here](https://emn178.github.io/online-tools/keccak_256.html). 
- At first, `cityRoot` is specified in the constructor.
- Then, with every mint (`inhabit`), a `leaf` is passed to `inhabit` mint function together with coordinates and any other leaf in a `proof` variable.

Database is downloaded from https://simplemaps.com/data/world-cities

## Map
Equidistant Cylindrical Projection type map.
City x,y coordinates is converted from latitude and longitude in the following way:
x = (total width of image in px) * (180 + longitude) / 360
y = (total height of image in px) * (90 - latitude) / 180

![](https://desktop.arcgis.com/en/arcmap/latest/map/projections/GUID-5EE3649E-A5E7-4BD3-9E61-D9C06DBAD860-web.png)


## Contract Data
`owner` - the NFT owner 
`cityToToken` - serial number of a city to tokenId

## Contract Lifecycle



## Test Scenario
1. Mint contract with the coordinates `inhabit()`.
2. set image for suffix setUriComponents(string calldata _newBase, string calldata _newSuffix)
3. Reinforce with `reinforce(uint _tokenId)`
4. `confirmHit`
5. `getEvacuationRebate`
6. Burn `evacuate`

7. _tokenId making NFT unique is a serial number of the citadel.
   setOwner
setUriComponents(string calldata _newBase, string calldata _newSuffix)

getStructuralData

## Roadmap
- [x] Smart Contract development.
- [x] Basic Web App.
- [x] Unit Test.
- [ ] Plot finalization.
- [ ] App update if needed.
- [ ] Merkle tree with cities coordinates generation.
- [ ] NFT generation program.
- [ ] Web App design.
- [ ] Web App development.
- [ ] Discord bot development to update game events and stats on hits, damages, and reinforcements.
- [ ] Discord channel setup for informing of the coming mint.
- [ ] Setting up start roadmap - giveaways, mint start date(s), periods, siege date.
- [ ] Launch.

##License
MIT,
Basic World Cities Database: The Provider offers a Basic World Cities Database free of charge. This database is licensed under the Creative Commons Attribution 4.0 license as described at: https://creativecommons.org/licenses/by/4.0/.
Urmayev II Cylindrical Map Projection Image by Tobias Jung is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License.
https://map-projections.net/license/urmayev-cylindrical-2:mapimg-ssw


# Advanced Sample Hardhat Project

This project demonstrates an advanced Hardhat use case, integrating other tools commonly used alongside Hardhat in the ecosystem.

The project comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts. It also comes with a variety of other tools, preconfigured to work with the project code.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.ts
TS_NODE_FILES=true npx ts-node scripts/deploy.ts
npx eslint '**/*.{js,ts}'
npx eslint '**/*.{js,ts}' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```

# Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```shell
hardhat run --network ropsten scripts/sample-script.ts
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```

# Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).
