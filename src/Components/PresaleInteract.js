import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import styled from 'styled-components';
import tokenABI from '../Contracts/CONABI.json'

// Reuse the styled components from the previous component (or import them)
const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  background: #1e1e2d;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border: 1px solid #4b2d99;
`;

const Title = styled.h2`
  margin-top: 0;
  color: #9a6aff;
  font-size: 1.5rem;
  position: relative;
  padding-bottom: 0.5rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(to right, #6e3ffd, #00ffaa);
    border-radius: 3px;
  }
`;

const InputGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  border: 1px solid #2a2a3d;
  background: #12121a;
  color: #e0e0ff;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #6e3ffd;
    box-shadow: 0 0 0 2px rgba(110, 63, 253, 0.3);
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #6e3ffd 0%, #9a6aff 100%);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    background: #2a2a3d;
    color: #b8b8d6;
    cursor: not-allowed;
  }
`;

const InfoCard = styled.div`
  background: #2a2a3d;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #4b2d99;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const InfoItem = styled.div`
  background: rgba(110, 63, 253, 0.1);
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid rgba(110, 63, 253, 0.3);
`;

const InfoLabel = styled.div`
  font-size: 0.8rem;
  color: #b8b8d6;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const InfoValue = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #e0e0ff;
  word-break: break-all;
`;

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ErrorMessage = styled.div`
  color: #ff4d4d;
  background: rgba(255, 77, 77, 0.1);
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  border: 1px solid rgba(255, 77, 77, 0.3);
`;

// Presale ABI (simplified example - replace with your actual ABI)
const PRESALE_ABI = [
	{
		"inputs": [],
		"name": "buyTokens",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "depositTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_rate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_durationInDays",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_hardCap",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "ETHWithdrawn",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_status",
				"type": "bool"
			}
		],
		"name": "pausePresale",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bool",
				"name": "status",
				"type": "bool"
			}
		],
		"name": "PresalePaused",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newRate",
				"type": "uint256"
			}
		],
		"name": "RateChanged",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newRate",
				"type": "uint256"
			}
		],
		"name": "setRate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "TokensDeposited",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "ethAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenAmount",
				"type": "uint256"
			}
		],
		"name": "TokensPurchased",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [],
		"name": "withdrawETH",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawUnsoldTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [],
		"name": "endTime",
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
		"name": "getOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "ethAmount",
				"type": "uint256"
			}
		],
		"name": "getTokenAmount",
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
		"name": "hardCap",
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
		"name": "isPaused",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "isPresaleActive",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "rate",
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
		"name": "startTime",
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
		"name": "token",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalETHRaised",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]



const PresaleInteraction = () => {
  const [contractAddress, setContractAddress] = useState('');
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [presaleInfo, setPresaleInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [ethAmount, setEthAmount] = useState('');
  const [tokenAmount,setTokenAmount]=useState('')


  useEffect(()=>{

    connectWallet()

  },[])

  // Connect to wallet
  const connectWallet = async () => {
    if (!window.ethereum) {
      setError('Please install MetaMask!');
      return;
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = ethersProvider.getSigner();
      const address = await signer.getAddress();

      setProvider(ethersProvider);
      setSigner(signer);
      setAccount(address);
      setError('');
    } catch (err) {
      setError('Failed to connect wallet: ' + err.message);
    }
  };

  // Load contract
  const loadContract = async () => {
    if (!ethers.utils.isAddress(contractAddress)) {
      setError('Invalid contract address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (!provider) {
        await connectWallet();
      }

      const presaleContract = new ethers.Contract(
        contractAddress,
        PRESALE_ABI,
        signer || provider
      );

      // Fetch presale details
      const [
        tokenAddress,
        tokenRate,
        
        hardCap,
        owner,
       
        endTime
      ] = await Promise.all([
        presaleContract.token(),
        presaleContract.rate(),
        presaleContract.hardCap(),
        
        presaleContract.getOwner(),
       
       
        presaleContract.endTime()
      ]);

      console.log("owner",owner)

      setPresaleInfo({
        tokenAddress,
        tokenRate: ethers.utils.formatEther(tokenRate),
       
        hardCap: ethers.utils.formatEther(hardCap),
        
        
        endTime: new Date(endTime * 1000).toLocaleString(),
        isEnded: Date.now() > endTime * 1000,
        owner
      });

      setContract(presaleContract);
    } catch (err) {
      setError('Failed to load contract: ' + err.message);
      setPresaleInfo(null);
    } finally {
      setLoading(false);
    }
  };
  function formatForEthers(amount) {
    // 1. Convert to string if it isn't
    let amountStr = amount.toString();
    
    // 2. Remove all commas and whitespace
    amountStr = amountStr.replace(/,|\s/g, '');
    
    // 3. Handle scientific notation (e.g., 1e18)
    if (/e/i.test(amountStr)) {
      amountStr = Number(amountStr).toFixed(18).replace(/\.?0+$/, '');
    }
    
    // 4. Ensure proper decimal format
    if (amountStr === '.') amountStr = '0';
    if (amountStr.startsWith('.')) amountStr = `0${amountStr}`;
    if (amountStr.endsWith('.')) amountStr = amountStr.slice(0, -1);
    
    // 5. Final validation
    if (!/^\d+\.?\d*$/.test(amountStr)) {
      throw new Error(`Invalid number format: ${amountStr}`);
    }
    
    return amountStr;
  }
  // Buy tokens
  async function handleBuyTokens() {

    const amountInEth=ethAmount
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }
  
    try {
      // Connect provider and signer
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []); // Prompt wallet connection
     
  
     
      
  
      // Send transaction with ETH
      const tx = await contract.buyTokens({
        value: ethers.utils.parseEther(amountInEth.toString())
      });
  
      console.log(`Transaction sent: ${tx.hash}`);
  
      const receipt = await tx.wait();
      console.log("Transaction confirmed:", receipt.transactionHash);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  }
  // Deposit Tokens
  async function handleDepositTokens() {
    try {

        const amountStr=tokenAmount
      if (!window.ethereum) throw new Error("MetaMask not detected");
  
      // Connect wallet
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
  
      // Convert amount to smallest unit
      const amount = ethers.utils.parseUnits(amountStr, 18); // Adjust decimals if not 18
  
      // Contract instances
     
      const token = new ethers.Contract(presaleInfo.tokenAddress, tokenABI, signer);
      const userAddress = await signer.getAddress();
  
      // Check current allowance
      const allowance = await token.allowance(userAddress, contractAddress);
  
      // If not approved, approve first
      if (allowance.lt(amount)) {
        console.log("Approving token...");
        const approveTx = await token.approve(contractAddress, amount);
        await approveTx.wait();
        console.log("Token approved");
      } else {
        console.log("Sufficient allowance already granted");
      }
  
      // Call depositTokens
      console.log("Calling depositTokens...");
      const tx = await contract.depositTokens(amount);
      await tx.wait();
      console.log("Deposit successful!");
    } catch (err) {
      console.error("Error during deposit:", err);
    }
  }
 
  // Claim tokens
  const handleClaimTokens = async () => {
    if (!contract) return;

    setLoading(true);
    setError('');

    try {
      const tx = await contract.claimTokens();
      await tx.wait();
    } catch (err) {
      setError('Failed to claim tokens: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Get refund
  const handleGetRefund = async () => {
    if (!contract) return;

    setLoading(true);
    setError('');

    try {
      const tx = await contract.getRefund();
      await tx.wait();
    } catch (err) {
      setError('Failed to get refund: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Presale Contract Interaction</Title>
      
      {!account ? (
        <Button onClick={connectWallet}>Connect Wallet</Button>
      ) : (
        <div style={{ marginBottom: '1rem', color: '#00ffaa' }}>
          Connected: {`${account.substring(0, 6)}...${account.substring(38)}`}
        </div>
      )}

      <InputGroup>
        <Input
          type="text"
          placeholder="Enter Presale Contract Address"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
        />
        <Button 
          onClick={loadContract}
          disabled={!contractAddress || loading}
        >
          {loading ? 'Loading...' : 'Load Contract'}
        </Button>
      </InputGroup>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {presaleInfo && (
        <>
          <InfoCard>
            <h3>Presale Details</h3>
            <InfoGrid>
              <InfoItem>
                <InfoLabel>Token Address</InfoLabel>
                <InfoValue>{presaleInfo.tokenAddress}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Token Rate</InfoLabel>
                <InfoValue>{presaleInfo.tokenRate} tokens/ETH</InfoValue>
              </InfoItem>
             
              
              
              <InfoItem>
                <InfoLabel>End Time</InfoLabel>
                <InfoValue>{presaleInfo.endTime}</InfoValue>
              </InfoItem>
            </InfoGrid>
          </InfoCard>

          <InfoCard>
            <h3>Participate in Presale</h3>
            {account==presaleInfo.owner && 
            <InputGroup>
            <Input
              type="number"
              placeholder="Token amount"
              value={tokenAmount}
              onChange={(e) => setTokenAmount(e.target.value)}
             
            />
            <Button
              onClick={handleDepositTokens}
              disabled={!tokenAmount || loading}
            >
              Deposit Tokens
            </Button>
          </InputGroup>}
            
            <InputGroup>
              <Input
                type="number"
                placeholder="ETH amount"
                value={ethAmount}
                onChange={(e) => setEthAmount(e.target.value)}
                min={presaleInfo.minDeposit}
                max={presaleInfo.maxDeposit}
              />
              <Button
                onClick={handleBuyTokens}
                disabled={!ethAmount || loading}
              >
                Buy Tokens
              </Button>
            </InputGroup>
            
          </InfoCard>

          <ActionGrid>
            <Button
              onClick={handleClaimTokens}
              disabled={loading || !presaleInfo.isEnded}
            >
              Claim Tokens
            </Button>
            <Button
              onClick={handleGetRefund}
              disabled={loading || !presaleInfo.isEnded}
            >
              Get Refund
            </Button>
          </ActionGrid>
        </>
      )}
    </Container>
  );
};

export default PresaleInteraction;