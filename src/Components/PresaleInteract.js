import React, { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import styled, { keyframes } from 'styled-components';
import tokenABI from '../Contracts/CONABI.json';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import ResponsiveAppBar from './ResponsiveAppBar';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulseAnimation = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(138, 43, 226, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(138, 43, 226, 0); }
  100% { box-shadow: 0 0 0 0 rgba(138, 43, 226, 0); }
`;

// Styled components with Web3 aesthetic
const Container = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  background: rgba(30, 30, 45, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(154, 106, 255, 0.2);
  position: relative;
  overflow: hidden;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(154, 106, 255, 0.1) 0%, rgba(154, 106, 255, 0) 70%);
    z-index: -1;
  }
`;

const Title = styled.h2`
  margin-top: 0;
  color: #fff;
  font-size: 2rem;
  font-weight: 700;
  position: relative;
  padding-bottom: 1rem;
  text-shadow: 0 0 10px rgba(154, 106, 255, 0.5);
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100px;
    height: 4px;
    background: linear-gradient(to right, #9a6aff, #00ffaa);
    border-radius: 3px;
  }
`;

const InputGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(154, 106, 255, 0.3);
  background: rgba(18, 18, 26, 0.7);
  color: #e0e0ff;
  font-size: 1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);

  &:focus {
    outline: none;
    border-color: #9a6aff;
    box-shadow: 0 0 0 2px rgba(154, 106, 255, 0.3);
    background: rgba(18, 18, 26, 0.9);
  }

  &::placeholder {
    color: rgba(224, 224, 255, 0.5);
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #6e3ffd 0%, #9a6aff 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(154, 106, 255, 0.4);
  }

  &:disabled {
    background: rgba(42, 42, 61, 0.7);
    color: rgba(184, 184, 214, 0.5);
    cursor: not-allowed;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #9a6aff 0%, #00ffaa 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const InfoCard = styled.div`
  background: rgba(42, 42, 61, 0.5);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(154, 106, 255, 0.2);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    border-color: rgba(154, 106, 255, 0.4);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }

  h3 {
    margin-top: 0;
    color: #9a6aff;
    font-size: 1.3rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    
    &::before {
      content: '';
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #9a6aff;
      margin-right: 0.8rem;
      box-shadow: 0 0 10px #9a6aff;
    }
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const InfoItem = styled.div`
  background: rgba(110, 63, 253, 0.15);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(154, 106, 255, 0.2);
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(154, 106, 255, 0.4);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const InfoLabel = styled.div`
  font-size: 0.8rem;
  color: #b8b8d6;
  margin-bottom: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
`;

const InfoValue = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
  word-break: break-all;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.1);
`;

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const ErrorMessage = styled.div`
  color: #ff4d4d;
  background: rgba(255, 77, 77, 0.15);
  padding: 1.2rem;
  border-radius: 12px;
  margin: 1.5rem 0;
  border: 1px solid rgba(255, 77, 77, 0.3);
  backdrop-filter: blur(5px);
  animation: ${pulseAnimation} 2s infinite;
`;

const WalletAddress = styled.div`
  background: rgba(154, 106, 255, 0.1);
  padding: 0.8rem 1.2rem;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(154, 106, 255, 0.2);
  font-family: monospace;
  font-size: 0.9rem;
  color: #9a6aff;

  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #00ffaa;
    margin-right: 0.8rem;
    box-shadow: 0 0 8px #00ffaa;
  }
`;

const LoadingIndicator = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(154, 106, 255, 0.3);
  border-radius: 50%;
  border-top-color: #9a6aff;
  animation: spin 1s ease-in-out infinite;
  margin-left: 10px;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
// Presale ABI (same as before)
const PRESALE_ABI  = [
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
  const { contract_address } = useParams();
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [presaleInfo, setPresaleInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [ethAmount, setEthAmount] = useState('');
  const [tokenAmount, setTokenAmount] = useState('');
  const [isProcessing,setIsProcessing]=useState('Deposit IP Tokens')
  const [isProcessing1,setIsProcessing1]=useState('Buy IP Tokens')

  useEffect(() => {
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

    connectWallet();
  }, []);

  // Load contract after signer is set
  useEffect(() => {
    const loadContract = async () => {
      if (!signer || !ethers.utils.isAddress(contract_address)) return;

      setLoading(true);
      try {
        const presaleContract = new ethers.Contract(contract_address, PRESALE_ABI, signer);

        // Fetch contract details
        const [tokenAddress, owner, endTime, hardCap, tokenRate] = await Promise.all([
          presaleContract.token(),
          presaleContract.getOwner(),
          presaleContract.endTime(),
          presaleContract.hardCap(),
          presaleContract.rate()
        ]);
        
        // Set contract for future usage
        setContract(presaleContract);
       
        
        // Format and store the results
        const details = {
          tokenAddress,
          owner,
          endTime:  dayjs.unix(endTime.toString()).format('DD/MM/YYYY HH:mm:ss'), // Convert BigNumber to Date
          hardCap: hardCap.toString(),
          tokenRate: tokenRate.toString()
        };
        
        console.log(details);
        
      

        setPresaleInfo(details);
        setError('');
      } catch (err) {
        setError('Failed to load contract: ' + err.message);
      } 
    };

    loadContract();
  }, [signer, contract_address]);

  const handleBuyTokens = async () => {
    if (!contract || !ethAmount) return;
    try {
      const tx = await contract.buyTokens({
        value: ethers.utils.parseEther(ethAmount.toString())
      });

      setIsProcessing1('Buying IP Tokens.....');
      await tx.wait();
      setIsProcessing1('Buy Successful!');
    } catch (err) {
      setError('Failed to buy tokens: ' + err.message);
    }
  };

  const handleDepositTokens = async () => {
    if (!signer || !presaleInfo?.tokenAddress || !tokenAmount) return;

    try {
      const token = new ethers.Contract(presaleInfo.tokenAddress, tokenABI, signer);
      const userAddress = await signer.getAddress();
      const amount = ethers.utils.parseUnits(tokenAmount, 18);

      const allowance = await token.allowance(userAddress, contract_address);

      if (allowance.lt(amount)) {
        setIsProcessing('Approving IP Token.....');
        const approveTx = await token.approve(contract_address, amount);
        await approveTx.wait();
      }

      setIsProcessing('Depositing IP Tokens.....');
      const tx = await contract.depositTokens(amount);
      await tx.wait();
      setIsProcessing('Deposit Successful!');
    } catch (err) {
      setError('Failed to deposit tokens: ' + err.message);
    }
  };

  return (
    <div>
         <ResponsiveAppBar homeButtonStyle="outlined" earnButtonStyle="outlined" createButtonStyle="outlined" chatButtonStyle="contained" dashboardButtonStyle="outlined" tokenButtonStyle="outlined"/>
                          <hr></hr>
                          <br></br><br></br><br></br><br></br>
                  
                         <br></br>
    {contract_address && <Container>
      <Title>PRESALE DASHBOARD</Title>
      
      {account &&
        <WalletAddress>
          {`${account.substring(0, 6)}...${account.substring(38)}`}
        </WalletAddress>
      }

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {presaleInfo && (
        <>
       
          <InfoCard>
            <h3>PRESALE DETAILS</h3>
            <InfoGrid>
              <InfoItem>
                <InfoLabel>Token Address</InfoLabel>
                <InfoValue>{presaleInfo.tokenAddress.substring(0, 6)}...{presaleInfo.tokenAddress.substring(presaleInfo.tokenAddress.length - 4)}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Token Rate</InfoLabel>
                <InfoValue>{presaleInfo.tokenRate} tokens/ETH</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Hard Cap</InfoLabel>
                <InfoValue>{presaleInfo.hardCap} ETH</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>End Time</InfoLabel>
                <InfoValue>{presaleInfo.endTime}</InfoValue>
              </InfoItem>
            </InfoGrid>
          </InfoCard>

          <InfoCard>
            <h3>PARTICIPATE</h3>
            {account === presaleInfo.owner && 
              <InputGroup>
                <Input
                  type="number"
                  placeholder="Token amount to deposit"
                  value={tokenAmount}
                  onChange={(e) => setTokenAmount(e.target.value)}
                />
                <Button
                  onClick={handleDepositTokens}
                  
                >
                  {isProcessing}
                </Button>
              </InputGroup>
            }
            
            <InputGroup>
              <Input
                type="number"
                placeholder="ETH amount to invest"
                value={ethAmount}
                onChange={(e) => setEthAmount(e.target.value)}
              />
              <Button
                onClick={handleBuyTokens}
               
              >
                {isProcessing1}
              </Button>
            </InputGroup>
          </InfoCard>

        
        </>
      )}
    </Container>
    }
    </div>
  );
};

export default PresaleInteraction;



