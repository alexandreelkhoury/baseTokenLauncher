// OpenZeppelin ERC20 Contract Artifacts
// Generated from: BaseToken.sol using @openzeppelin/contracts@5.4.0
// This is the official OpenZeppelin ERC20 implementation

export const OPENZEPPELIN_ERC20_ABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "symbol",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "totalSupply",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "decimalsValue",
        "type": "uint8"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "allowance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "needed",
        "type": "uint256"
      }
    ],
    "name": "ERC20InsufficientAllowance",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "needed",
        "type": "uint256"
      }
    ],
    "name": "ERC20InsufficientBalance",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "approver",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidApprover",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidReceiver",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidSender",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidSpender",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

export const OPENZEPPELIN_ERC20_BYTECODE = "0x608060405234801561000f575f5ffd5b50604051610c74380380610c7483398101604081905261002e91610282565b8383600361003c838261038b565b506004610049828261038b565b50506005805460ff191660ff8416179055506100793361006a83600a61053e565b6100749085610553565b610082565b5050505061057d565b6001600160a01b0382166100b05760405163ec442f0560e01b81525f60048201526024015b60405180910390fd5b6100bb5f83836100bf565b5050565b6001600160a01b0383166100e9578060025f8282546100de919061056a565b909155506101599050565b6001600160a01b0383165f908152602081905260409020548181101561013b5760405163391434e360e21b81526001600160a01b038516600482015260248101829052604481018390526064016100a7565b6001600160a01b0384165f9081526020819052604090209082900390555b6001600160a01b03821661017557600280548290039055610193565b6001600160a01b0382165f9081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516101d891815260200190565b60405180910390a3505050565b634e487b7160e01b5f52604160045260245ffd5b5f82601f830112610208575f5ffd5b81516001600160401b03811115610221576102216101e5565b604051601f8201601f19908116603f011681016001600160401b038111828210171561024f5761024f6101e5565b604052818152838201602001851015610266575f5ffd5b8160208501602083015e5f918101602001919091529392505050565b5f5f5f5f60808587031215610295575f5ffd5b84516001600160401b038111156102aa575f5ffd5b6102b6878288016101f9565b602087015190955090506001600160401b038111156102d3575f5ffd5b6102df878288016101f9565b93505060408501519150606085015160ff811681146102fc575f5ffd5b939692955090935050565b600181811c9082168061031b57607f821691505b60208210810361033957634e487b7160e01b5f52602260045260245ffd5b50919050565b601f82111561038657805f5260205f20601f840160051c810160208510156103645750805b601f840160051c820191505b81811015610383575f8155600101610370565b50505b505050565b81516001600160401b038111156103a4576103a46101e5565b6103b8816103b28454610307565b8461033f565b6020601f8211600181146103ea575f83156103d35750848201515b5f19600385901b1c1916600184901b178455610383565b5f84815260208120601f198516915b8281101561041957878501518255602094850194600190920191016103f9565b508482101561043657868401515f19600387901b60f8161c191681555b50505050600190811b01905550565b634e487b7160e01b5f52601160045260245ffd5b6001815b60018411156104945780850481111561047857610478610445565b600184161561048657908102905b60019390931c92800261045d565b935093915050565b5f826104aa57506001610538565b816104b657505f610538565b81600181146104cc57600281146104d6576104f2565b6001915050610538565b60ff8411156104e7576104e7610445565b50506001821b610538565b5060208310610133831016604e8410600b8410161715610515575081810a610538565b6105215f198484610459565b805f190482111561053457610534610445565b0290505b92915050565b5f61054c60ff84168361049c565b9392505050565b808202811582820484141761053857610538610445565b8082018082111561053857610538610445565b6106ea8061058a5f395ff3fe608060405234801561000f575f5ffd5b5060043610610090575f3560e01c8063313ce56711610063578063313ce567146100fa57806370a082311461010f57806395d89b4114610137578063a9059cbb1461013f578063dd62ed3e14610152575f5ffd5b806306fdde0314610094578063095ea7b3146100b257806318160ddd146100d557806323b872dd146100e7575b5f5ffd5b61009c61018a565b6040516100a9919061055a565b60405180910390f35b6100c56100c03660046105aa565b61021a565b60405190151581526020016100a9565b6002545b6040519081526020016100a9565b6100c56100f53660046105d2565b610233565b60055460405160ff90911681526020016100a9565b6100d961011d36600461060c565b6001600160a01b03165f9081526020819052604090205490565b61009c610256565b6100c561014d3660046105aa565b610265565b6100d961016036600461062c565b6001600160a01b039182165f90815260016020908152604080832093909416825291909152205490565b6060600380546101999061065d565b80601f01602080910402602001604051908101604052809291908181526020018280546101c59061065d565b80156102105780601f106101e757610100808354040283529160200191610210565b820191905f5260205f20905b8154815290600101906020018083116101f357829003601f168201915b5050505050905090565b5f33610227818585610272565b60019150505b92915050565b5f33610240858285610284565b61024b858585610305565b506001949350505050565b6060600480546101999061065d565b5f33610227818585610305565b61027f8383836001610362565b505050565b6001600160a01b038381165f908152600160209081526040808320938616835292905220545f198110156102ff57818110156102f157604051637dc7a0d960e11b81526001600160a01b038416600482015260248101829052604481018390526064015b60405180910390fd5b6102ff84848484035f610362565b50505050565b6001600160a01b03831661032e57604051634b637e8f60e11b81525f60048201526024016102e8565b6001600160a01b0382166103575760405163ec442f0560e01b81525f60048201526024016102e8565b61027f838383610434565b6001600160a01b03841661038b5760405163e602df0560e01b81525f60048201526024016102e8565b6001600160a01b0383166103b457604051634a1406b160e11b81525f60048201526024016102e8565b6001600160a01b038085165f90815260016020908152604080832093871683529290522082905580156102ff57826001600160a01b0316846001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258460405161042691815260200190565b60405180910390a350505050565b6001600160a01b03831661045e578060025f8282546104539190610695565b909155506104ce9050565b6001600160a01b0383165f90815260208190526040902054818110156104b05760405163391434e360e21b81526001600160a01b038516600482015260248101829052604481018390526064016102e8565b6001600160a01b0384165f9081526020819052604090209082900390555b6001600160a01b0382166104ea57600280548290039055610508565b6001600160a01b0382165f9081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161054d91815260200190565b60405180910390a3505050565b602081525f82518060208401528060208501604085015e5f604082850101526040601f19601f83011684010191505092915050565b80356001600160a01b03811681146105a5575f5ffd5b919050565b5f5f604083850312156105bb575f5ffd5b6105c48361058f565b946020939093013593505050565b5f5f5f606084860312156105e4575f5ffd5b6105ed8461058f565b92506105fb6020850161058f565b929592945050506040919091013590565b5f6020828403121561061c575f5ffd5b6106258261058f565b9392505050565b5f5f6040838503121561063d575f5ffd5b6106468361058f565b91506106546020840161058f565b90509250929050565b600181811c9082168061067157607f821691505b60208210810361068f57634e487b7160e01b5f52602260045260245ffd5b50919050565b8082018082111561022d57634e487b7160e01b5f52601160045260245ffdfea264697066735822122038387446f7d95cb63199f20b38a7085ea583b1328193c3f6f998e5bfbcb29c8d64736f6c634300081e0033";
