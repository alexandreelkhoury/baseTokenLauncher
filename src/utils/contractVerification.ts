import { base, baseSepolia } from 'viem/chains'

// Basescan API endpoints for contract verification
const BASESCAN_API_URLS = {
  [base.id]: 'https://api.basescan.org/api',
  [baseSepolia.id]: 'https://api-sepolia.basescan.org/api'
}

// Get Basescan API key from environment variables
const BASESCAN_API_KEY = import.meta.env.VITE_BASESCAN_API_KEY

interface VerificationParams {
  contractAddress: string
  sourceCode: string
  contractName: string
  compilerVersion: string
  constructorArguments: string
  chainId: number
}

/**
 * Verifies a deployed contract on Basescan following the Base tutorial
 * https://docs.base.org/learn/foundry/verify-contract-with-basescan#verify-the-contract
 */
export async function verifyContract(params: VerificationParams): Promise<{
  success: boolean
  message: string
  guid?: string
}> {
  const {
    contractAddress,
    sourceCode,
    contractName,
    compilerVersion,
    constructorArguments,
    chainId
  } = params

  const apiUrl = BASESCAN_API_URLS[chainId as keyof typeof BASESCAN_API_URLS]
  
  if (!apiUrl) {
    return {
      success: false,
      message: 'Unsupported network for verification'
    }
  }

  if (!BASESCAN_API_KEY) {
    console.warn('⚠️ Basescan API key not found - skipping verification')
    return {
      success: false,
      message: 'Basescan API key not configured'
    }
  }

  try {
    console.log('🔍 Starting contract verification on Basescan...')
    console.log('Contract address:', contractAddress)
    console.log('Network:', chainId === base.id ? 'Base Mainnet' : 'Base Sepolia')

    const formData = new FormData()
    formData.append('module', 'contract')
    formData.append('action', 'verifysourcecode')
    formData.append('apikey', BASESCAN_API_KEY)
    formData.append('contractaddress', contractAddress)
    formData.append('sourceCode', sourceCode)
    formData.append('codeformat', 'solidity-single-file')
    formData.append('contractname', contractName)
    formData.append('compilerversion', compilerVersion)
    formData.append('optimizationUsed', '1')
    formData.append('runs', '200')
    formData.append('constructorArguements', constructorArguments)
    formData.append('evmversion', 'default')
    formData.append('licenseType', '3') // MIT License

    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData
    })

    const result = await response.json()

    if (result.status === '1') {
      console.log('✅ Verification submitted successfully!')
      console.log('GUID:', result.result)
      
      return {
        success: true,
        message: 'Contract verification submitted successfully',
        guid: result.result
      }
    } else {
      console.error('❌ Verification failed:', result.result)
      return {
        success: false,
        message: result.result || 'Verification failed'
      }
    }

  } catch (error) {
    console.error('❌ Error during verification:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown verification error'
    }
  }
}

/**
 * Checks the status of a contract verification
 */
export async function checkVerificationStatus(guid: string, chainId: number): Promise<{
  success: boolean
  message: string
  status: 'pending' | 'success' | 'failed'
}> {
  const apiUrl = BASESCAN_API_URLS[chainId as keyof typeof BASESCAN_API_URLS]
  
  if (!apiUrl || !BASESCAN_API_KEY) {
    return {
      success: false,
      message: 'API configuration missing',
      status: 'failed'
    }
  }

  try {
    const response = await fetch(
      `${apiUrl}?module=contract&action=checkverifystatus&guid=${guid}&apikey=${BASESCAN_API_KEY}`
    )

    const result = await response.json()

    if (result.status === '1') {
      return {
        success: true,
        message: 'Contract verified successfully!',
        status: 'success'
      }
    } else if (result.result === 'Pending in queue') {
      return {
        success: true,
        message: 'Verification pending...',
        status: 'pending'
      }
    } else {
      return {
        success: false,
        message: result.result || 'Verification failed',
        status: 'failed'
      }
    }

  } catch (error) {
    console.error('❌ Error checking verification status:', error)
    return {
      success: false,
      message: 'Failed to check verification status',
      status: 'failed'
    }
  }
}

/**
 * Generates constructor arguments in ABI-encoded format for verification
 */
export function encodeConstructorArguments(
  name: string,
  symbol: string,
  initialSupply: bigint,
  feeRecipient: string
): string {
  // For PaidERC20 constructor: (string name, string symbol, uint256 initialSupply, address feeRecipient)
  // This is a simplified encoding - in production you'd use proper ABI encoding
  try {
    // Convert arguments to hex without 0x prefix for Basescan
    const nameHex = Buffer.from(name, 'utf8').toString('hex').padEnd(64, '0')
    const symbolHex = Buffer.from(symbol, 'utf8').toString('hex').padEnd(64, '0')
    const supplyHex = initialSupply.toString(16).padStart(64, '0')
    const addressHex = feeRecipient.slice(2).padStart(64, '0')
    
    return nameHex + symbolHex + supplyHex + addressHex
  } catch (error) {
    console.error('Error encoding constructor arguments:', error)
    return ''
  }
}

/**
 * Gets the Solidity source code for PaidERC20 contract
 */
export function getPaidERC20SourceCode(): string {
  return `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PaidERC20 is ERC20 {
    uint256 public constant FEE = 0.02 ether;
    address payable public immutable feeRecipient;

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 initialSupply_,
        address payable _feeRecipient
    ) payable ERC20(name_, symbol_) {
        require(msg.value >= FEE, "Insufficient fee");
        feeRecipient = _feeRecipient;

        // Transfer fee to recipient
        (bool sent, ) = feeRecipient.call{value: FEE}("");
        require(sent, "Fee transfer failed");

        // Mint tokens to deployer (user EOA)
        _mint(msg.sender, initialSupply_ * (10 ** decimals()));

        // Refund excess ETH if user sent more than 0.02 ETH
        if (msg.value > FEE) {
            payable(msg.sender).transfer(msg.value - FEE);
        }
    }
}`
}