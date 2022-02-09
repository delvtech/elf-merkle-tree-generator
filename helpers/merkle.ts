import { MerkleTree } from "merkletreejs";
import { BigNumberish } from "@ethersproject/bignumber";
import { ethers } from "ethers";

export interface MerkleData {
  leaf: MerkleLeaf,
  proof: string[]
}

export interface MerkleLeaf {
  address: string;
  value: BigNumberish;
}

export async function getMerkleTree(accounts: MerkleLeaf[]) {
  const leaves = await Promise.all(
    accounts.map((account) => hashMerkleLeaf(account))
  );
  return new MerkleTree(leaves, keccak256Custom, {
    hashLeaves: false,
    sortPairs: true,
  });
}

export async function hashMerkleLeaf(leaf: MerkleLeaf) {
  return ethers.utils.solidityKeccak256(
    ["address", "uint256"],
    [leaf.address, leaf.value]
  );
}

// aligned with our hashing from elf-deploy-tests
function keccak256Custom(bytes: Buffer) {
  const buffHash = ethers.utils.solidityKeccak256(
    ["bytes"],
    ["0x" + bytes.toString("hex")]
  );
  return Buffer.from(buffHash.slice(2), "hex");
}
