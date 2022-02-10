# elf-merkle-tree-generator

## Install
`git clone https://github.com/element-fi/elf-merkle-tree-generator.git`
`npm install`

## Configure
Obtain AWS credentials file and make sure it is stored in ~/.aws/credentials

Copy `elf.default.env and update with your private key and Alchemy API key
```bash
cp elf.default.env elf.env
```
```bash
export MAINNET_PROVIDER_URL=[MAINNET_PROVIDER_URL_HERE]
export GOERLI_PROVIDER_URL=[GOERLI_PROVIDER_URL_HERE]
export PRIVATE_KEY=[PRIVATE_KEY_HERE]
```
Source the env file
```bash
source elf.env
```
## Run
```bash
npm run build

```
### Input
Format for the input file of as a JSON. An example file is included using the format `{address:value}`
e.g.
```
exampleData.json
{
	"0x0Aa116737C1E0fBBA43f35eC6A0Bfdb203747607": ["17", "QmZDjXexTNVewvMSktpofUwGgyR5FrwWHRZc2eHEURgPHv"],
	"0xce7bBBfE0F71A5b6B9eA84146E52c94F83738bFB": ["18", "QmXKJxWzgwpa1Hh5xDqALSKYqiSDPyvqR53ytfQVjsTRfk"],
	"0x70EBB6d266F6AC194d50f75430D5314914fEe246": ["19", "QmTtNxDmHujc3rjN7h91NYnfgrgjvWNKK28BwHPNnRqxoR"]
}
```

When the script prompts, type the input file name:
```bash
$ Input filepath: exampleData.json
```

### Output
Output written to S3 is a JSON with the following format:
```
[{
	"leaf": {
		"address": "0x0Aa116737C1E0fBBA43f35eC6A0Bfdb203747607",
		"tokenId": {
			"type": "BigNumber",
			"hex": "0x11"
		},
		"hash": "QmZDjXexTNVewvMSktpofUwGgyR5FrwWHRZc2eHEURgPHv"
	},
	"proof": ["0xcbed6e13efddeb3b07f47ac234934516623f2744f8e5c611dd4b078d31c0e805", "0x4845c192945235ac29775586d637867f81186a0e058abb8a87230b3b33da22fb", "0x914fb6a60094c44e4b64f1c1c450339f39d78617e67650c7c0821304e18542a0"]
}]```
