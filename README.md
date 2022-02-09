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
	"0x03A0baE872c0243E08f75426f5DCBc1CE4343C65": "10000000000000000000000",
	"0x40b439608Da5a2BFC471cF9865d3ec8170fc1e74": "10000000000000000000000",
	"0xc7b2FE8bd67DA98A08Cd5A6BCBaA60B4d18a25d0": "10000000000000000000000"
}
```

### Output
Output written to S3 is a JSON with the following format:
```
[{
	"leaf": {
		"address": "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
		"value": {
			"type": "BigNumber",
			"hex": "0x32"
		}
	},
	"proof": ["0x31e385490196f8bb912bf006da43d533cc56ce4aa7924bff04452974b4df0935"]
}]```
