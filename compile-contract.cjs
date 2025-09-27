const solc = require('solc');
const fs = require('fs');
const path = require('path');

// Function to recursively read all OpenZeppelin contract files
function readContractFiles(basePath, relativePath = '') {
  const sources = {};
  const fullPath = path.join(basePath, relativePath);
  
  if (fs.statSync(fullPath).isDirectory()) {
    const files = fs.readdirSync(fullPath);
    files.forEach(file => {
      const filePath = path.join(relativePath, file);
      Object.assign(sources, readContractFiles(basePath, filePath));
    });
  } else if (fullPath.endsWith('.sol')) {
    const content = fs.readFileSync(fullPath, 'utf8');
    const importPath = relativePath.startsWith('@openzeppelin') ? relativePath : `@openzeppelin/contracts/${relativePath}`;
    sources[importPath] = { content };
  }
  
  return sources;
}

// Read our contract
const contractPath = path.join(__dirname, 'contracts', 'BaseToken.sol');
const contractSource = fs.readFileSync(contractPath, 'utf8');

// Read all OpenZeppelin contracts
const ozPath = path.join(__dirname, 'node_modules', '@openzeppelin', 'contracts');
const ozSources = readContractFiles(ozPath);

// Combine all sources
const allSources = {
  'BaseToken.sol': { content: contractSource },
  ...ozSources
};

// Prepare the input for the compiler
const input = {
  language: 'Solidity',
  sources: allSources,
  settings: {
    outputSelection: {
      '*': {
        '*': ['abi', 'evm.bytecode'],
      },
    },
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
};

console.log('🔄 Compiling OpenZeppelin ERC20 contract...');

// Compile the contract
const output = JSON.parse(solc.compile(JSON.stringify(input)));

if (output.errors) {
  console.log('❌ Compilation errors:');
  output.errors.forEach((error) => {
    console.log(error.formattedMessage);
  });
  
  // Check if there are any actual errors (not just warnings)
  const hasErrors = output.errors.some(error => error.severity === 'error');
  if (hasErrors) {
    process.exit(1);
  }
}

// Extract the compiled contract
const contract = output.contracts['BaseToken.sol']['BaseToken'];

if (!contract) {
  console.log('❌ Contract not found in compilation output');
  process.exit(1);
}

const abi = contract.abi;
const bytecode = contract.evm.bytecode.object;

console.log('✅ Contract compiled successfully!');
console.log('📊 Contract stats:');
console.log(`- Bytecode length: ${bytecode.length / 2} bytes`);
console.log(`- ABI functions: ${abi.filter(item => item.type === 'function').length}`);

// Generate the TypeScript artifacts file
const artifactsContent = `// OpenZeppelin ERC20 Contract Artifacts
// Generated from: BaseToken.sol using @openzeppelin/contracts@5.4.0

export const OPENZEPPELIN_ERC20_ABI = ${JSON.stringify(abi, null, 2)} as const;

export const OPENZEPPELIN_ERC20_BYTECODE = "0x${bytecode}";
`;

// Write the artifacts to a TypeScript file
const artifactsPath = path.join(__dirname, 'src', 'contracts', 'OpenZeppelinERC20Artifacts.ts');
fs.writeFileSync(artifactsPath, artifactsContent);

console.log('✅ TypeScript artifacts generated at:', artifactsPath);
console.log('🚀 Ready to deploy official OpenZeppelin ERC20 tokens!');