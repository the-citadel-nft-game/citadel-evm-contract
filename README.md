# The Citadel NFT Game
Doomsday-inspired NFT game for Binance Smart Chain.

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
The approach is described in the article on Ethereum.org [MERKLE PROOFS FOR OFFLINE DATA INTEGRITY](https://ethereum.org/en/developers/tutorials/merkle-proofs-for-offline-data-integrity/).

## Map
City coordinates' database is downloaded from https://simplemaps.com/data/world-cities
Equidistant Cylindrical Projection type map.
City x,y coordinates is converted from latitude and longitude in the following way:
_x = (total width of image in px) * (180 + longitude) / 360
y = (total height of image in px) * (90 - latitude) / 180_
![](https://desktop.arcgis.com/en/arcmap/latest/map/projections/GUID-5EE3649E-A5E7-4BD3-9E61-D9C06DBAD860-web.png)


## Contract Interface
```json
{
"095ea7b3": "approve(address,uint256)",
"70a08231": "balanceOf(address)",
"d1bec3ad": "cityToToken(uint16)",
"e43333e2": "confirmHit(uint256)",
"743f71fe": "currentImpact()",
"c42b42a0": "currentPrize()",
"359cbbc9": "destroyed()",
"589fb100": "evacuate(uint256)",
"758c9115": "evacuatedFunds()",
"081812fc": "getApproved(uint256)",
"58b3753f": "getEvacuationRebate(uint256)",
"77e54008": "getFallen(uint256)",
"80b5462d": "getStructuralData(uint256)",
"fe618ffc": "inhabit(uint16,int16[2],bytes32[])",
"e985e9c5": "isApprovedForAll(address,address)",
"277a8e25": "isUninhabited(uint16)",
"7a11359a": "isVulnerable(uint256)",
"06fdde03": "name()",
"8da5cb5b": "owner()",
"6352211e": "ownerOf(uint256)",
"4311de8f": "ownerWithdraw()",
"4c536106": "reinforce(uint256)",
"91f66ce8": "reinforcements()",
"42842e0e": "safeTransferFrom(address,address,uint256)",
"b88d4fde": "safeTransferFrom(address,address,uint256,bytes)",
"a22cb465": "setApprovalForAll(address,bool)",
"13af4035": "setOwner(address)",
"c60a71bf": "setUriComponents(string,string)",
"c040e6b8": "stage()",
"8a5da71c": "startPreSiege()",
"78e97925": "startTime()",
"01ffc9a7": "supportsInterface(bytes4)",
"95d89b41": "symbol()",
"766e54ac": "tokenToCity(uint256)",
"c87b56dd": "tokenURI(uint256)",
"18160ddd": "totalSupply()",
"23b872dd": "transferFrom(address,address,uint256)",
"9c756c07": "winnerPrize(uint256)",
"b1bbd453": "winnerWithdraw(uint256)"
}
```

## Contract Lifecycle
1. Preparation of the immutable city database and generation Merkle Tree from it.  
2. Contract deployment by admin with Merkle Tree root.
3. Allowing mint by admin with `startPreSiege()` to make minting with `inhabit()` possible.
4. Mint contract with the coordinates `inhabit(uint16 _cityId, int16[2] calldata _coordinates, bytes32[] memory proof)`, by a user of [the Citadel fronend](https://github.com/the-citadel-nft-game/citadel-frontend).
5. Game cycle:
   1. Every `IMPACT_BLOCK_INTERVAL` blocks (600, so every 30 min on BSC) a new attack happens somewhere on the map.
   2. The attack coordinates and radius can be checked with  `currentImpact()` function.
   3. The attach on a given city is conirmed with `confirmHit()`. 
6. Citadel is reinforced with `reinforce(uint _tokenId)`

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

## Scripts
```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
```

##License
- The Cidatel is published under MIT License.
- Basic World Cities Database: The Provider offers a Basic World Cities Database free of charge. This database is licensed under the Creative Commons Attribution 4.0 license as described at: https://creativecommons.org/licenses/by/4.0/.
- Urmayev II Cylindrical Map Projection Image by Tobias Jung is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License.
https://map-projections.net/license/urmayev-cylindrical-2:mapimg-ssw
