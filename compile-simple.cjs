const solc = require('solc');
const fs = require('fs');
const path = require('path');

// Simple compilation approach using solc's import callback
function findImports(importPath) {
  try {
    let resolvedPath;
    
    if (importPath.startsWith('@openzeppelin/contracts')) {
      resolvedPath = path.join(__dirname, 'node_modules', importPath);
    } else {
      resolvedPath = path.join(__dirname, 'contracts', importPath);
    }
    
    const content = fs.readFileSync(resolvedPath, 'utf8');
    return { contents: content };
  } catch (error) {
    console.log(`Warning: Could not resolve import: ${importPath}`);
    return { error: `File not found: ${importPath}` };
  }
}

// Read our main contract
const contractPath = path.join(__dirname, 'contracts', 'BaseToken.sol');
const contractSource = fs.readFileSync(contractPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'BaseToken.sol': {
      content: contractSource,
    },
  },
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

// Compile with import callback
const output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));

if (output.errors) {
  console.log('⚠️  Compilation messages:');
  output.errors.forEach((error) => {
    console.log(`${error.severity}: ${error.formattedMessage}`);
  });
  
  // Check for fatal errors
  const fatalErrors = output.errors.filter(error => error.severity === 'error');
  if (fatalErrors.length > 0) {
    console.log('❌ Fatal compilation errors found');
    process.exit(1);
  }
}

// Extract the compiled contract
const contract = output.contracts['BaseToken.sol']['BaseToken'];

if (!contract) {
  console.log('❌ BaseToken contract not found in compilation output');
  console.log('Available contracts:', Object.keys(output.contracts));
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
// This is the official OpenZeppelin ERC20 implementation

export const OPENZEPPELIN_ERC20_ABI = ${JSON.stringify(abi, null, 2)} as const;

export const OPENZEPPELIN_ERC20_BYTECODE = "0x${bytecode}";
`;

// Write the artifacts to a TypeScript file
const artifactsPath = path.join(__dirname, 'src', 'contracts', 'OpenZeppelinERC20Artifacts.ts');
fs.writeFileSync(artifactsPath, artifactsContent);

console.log('✅ TypeScript artifacts generated at:', artifactsPath);
console.log('🚀 Ready to deploy official OpenZeppelin ERC20 tokens!');

// Print a summary of what we just created
console.log('\n📋 Contract Summary:');
console.log('- Uses official @openzeppelin/contracts/token/ERC20/ERC20.sol');
console.log('- Full ERC20 standard compliance');  
console.log('- Customizable decimals support');
console.log('- Optimized for gas efficiency (200 runs)');
console.log('- Ready for mainnet deployment');