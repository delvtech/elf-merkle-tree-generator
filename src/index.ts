import { ethers } from "hardhat";
import * as readline from "readline-sync";
import { getMerkleTree, MerkleData, MerkleLeaf, hashMerkleLeaf } from "../helpers/merkle";
import { parseFile, updateS3Bucket } from "../helpers/writing";


async function main() {

  const fileName = (readline.question("Input filepath: ")).toLowerCase();

  // parse data from input file
  const parsedData = parseFile(fileName);

  // create array with leaf data
  const leaves: MerkleLeaf[] = [];
  for (var key in parsedData) {
    leaves.push({
      address: key,
      tokenId: ethers.BigNumber.from(parsedData[key][0]),
      hash: parsedData[key][1]
    });
  }

  // create Merkle tree
  const tree = await getMerkleTree(leaves);
  // console.log(tree.getHexRoot())

  // iterate through leaves to create separate files
  for (var i in leaves) {
    var _leaf: MerkleLeaf = leaves[i];
    
    // construct proof for the leaf
    const _proof = tree.getHexProof(await hashMerkleLeaf({
      address: _leaf.address,
      tokenId: _leaf.tokenId,
      hash: _leaf.hash
    }));

    // create writeable object
    var data: MerkleData[] = [];
    data.push({
      leaf: _leaf,
      proof: _proof
    })

    var jsonString = JSON.stringify(data);
    var address = _leaf.address;

    // upload object to s3
    // await updateS3Bucket(address, jsonString);
    console.log(jsonString);
  }
}

main();