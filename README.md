## Hardhat-OTB

### Hardhat plugin for translate opcodes to bytecode

### Installation
**Step 1:** Install the package

`npm i @sovaslava/hardhat-otb`

**Step 2:**  Add to your hardhat.config.ts file

`import "hardhat-otb";`

### Usage

Prepare text file with opcdes, each opcode with args in separated line. Let it be opcodes.txt. You can choose any other name.
`hh otb --file opcodex.txt`

In console you can see bytecode: 

`60806080`