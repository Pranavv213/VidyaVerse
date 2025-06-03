import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import styled from 'styled-components';

const SwapContainer = styled.div`
  max-width: 450px;
  margin: 40px auto;
  padding: 30px;
  background: linear-gradient(145deg, #1e2a4a, #0d1429);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #e0e0ff;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid #2d3a6a;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  background: linear-gradient(90deg, #9b7fff, #5bd8ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SwapForm = styled.div`
  background: rgba(25, 33, 64, 0.7);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 25px;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #8a9bba;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px 14px;
  background: rgba(15, 22, 46, 0.7);
  border: 1px solid #3a4a7a;
  border-radius: 12px;
  color: #e0e0ff;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;
  
  &:focus {
    border-color: #5bd8ff;
    box-shadow: 0 0 0 2px rgba(91, 216, 255, 0.2);
  }
`;

const DirectionSelector = styled.div`
  display: flex;
  margin: 20px 0;
  background: rgba(15, 22, 46, 0.7);
  border-radius: 12px;
  overflow: hidden;
`;

const DirectionButton = styled.button`
  flex: 1;
  padding: 12px;
  background: ${props => props.active ? 'rgba(91, 216, 255, 0.2)' : 'transparent'};
  border: none;
  color: ${props => props.active ? '#5bd8ff' : '#8a9bba'};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background: rgba(91, 216, 255, 0.1);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 16px;
  background: ${props => props.disabled ? '#3a4a7a' : 'linear-gradient(90deg, #9b7fff, #5bd8ff)'};
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: ${props => props.disabled ? 'none' : 'translateY(-2px)'};
    box-shadow: ${props => props.disabled ? 'none' : '0 5px 15px rgba(155, 127, 255, 0.4)'};
  }
  
  &:after {
    content: '';
    position: absolute;
    top: -50%;
    left: -60%;
    width: 20px;
    height: 200%;
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(25deg);
    transition: all 0.5s;
  }
  
  &:hover:after {
    left: 120%;
  }
`;

const StatusMessage = styled.div`
  padding: 15px;
  border-radius: 12px;
  margin-top: 20px;
  text-align: center;
  background: rgba(15, 22, 46, 0.7);
  border: 1px solid ${props => props.error ? '#ff5b8e' : props.success ? '#5bd8ff' : '#3a4a7a'};
  color: ${props => props.error ? '#ff5b8e' : props.success ? '#5bd8ff' : '#8a9bba'};
`;

const InfoBox = styled.div`
  background: rgba(15, 22, 46, 0.7);
  border-radius: 12px;
  padding: 15px;
  margin-top: 20px;
  font-size: 14px;
  border-left: 3px solid #9b7fff;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.span`
  color: #8a9bba;
`;

const InfoValue = styled.span`
  color: #e0e0ff;
  font-weight: 500;
`;

const TokenSwap = () => {
  // BSC Testnet addresses
  const PANCAKE_ROUTER_ADDRESS = '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3';
  const WBNB_ADDRESS = '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd';
  
  // State variables
  const [tokenAddress, setTokenAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [swapDirection, setSwapDirection] = useState('tokenToWbnb');
  const [loading, setLoading] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [txHash, setTxHash] = useState('');
  const [isApproved, setIsApproved] = useState(false);
  const [estimatedAmount, setEstimatedAmount] = useState('');

  // Contract ABIs
  const routerABI = [
    "function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
    "function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)",
    "function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)"
  ];

  const tokenABI = [
    "function approve(address spender, uint amount) external returns (bool)",
    "function allowance(address owner, address spender) external view returns (uint)"
  ];

  // Connect to BSC Testnet
  const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545/');

  // Check token approval
  const checkApproval = async () => {
    if (!tokenAddress || !window.ethereum) return;

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
      const userAddress = await signer.getAddress();
      
      const tokenContract = new ethers.Contract(tokenAddress, tokenABI, provider);
      const allowance = await tokenContract.allowance(userAddress, PANCAKE_ROUTER_ADDRESS);
      const amountWei = ethers.utils.parseUnits(amount || '0', 18);
      
      setIsApproved(allowance.gte(amountWei));
    } catch (err) {
      console.error('Error checking approval:', err);
    }
  };

  // Estimate swap amount
  const estimateSwap = async () => {
    if (!tokenAddress || !amount) return;
    
    try {
      const router = new ethers.Contract(PANCAKE_ROUTER_ADDRESS, routerABI, provider);
      
      let path;
      let amountIn;
      
      if (swapDirection === 'tokenToWbnb') {
        path = [tokenAddress, WBNB_ADDRESS];
        amountIn = ethers.utils.parseUnits(amount, 18);
      } else {
        path = [WBNB_ADDRESS, tokenAddress];
        amountIn = ethers.utils.parseEther(amount);
      }
      
      const amounts = await router.getAmountsOut(amountIn, path);
      const amountOut = swapDirection === 'tokenToWbnb' 
        ? ethers.utils.formatEther(amounts[1]) 
        : ethers.utils.formatUnits(amounts[1], 18);
      
      setEstimatedAmount(amountOut);
    } catch (err) {
      console.error('Error estimating swap:', err);
      setEstimatedAmount('Error estimating');
    }
  };

  // Approve token spending
  const approveToken = async () => {
    if (!tokenAddress) {
      setError('Please enter a token address');
      return;
    }

    try {
      setApproveLoading(true);
      setError('');

      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();

      const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);
      const amountWei = ethers.utils.parseUnits(amount, 18);

      const tx = await tokenContract.approve(PANCAKE_ROUTER_ADDRESS, amountWei);
      setTxHash(tx.hash);
      setSuccess('Approval transaction sent. Waiting for confirmation...');

      await tx.wait();
      setSuccess('Token approval successful!');
      setIsApproved(true);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Failed to approve token');
    } finally {
      setApproveLoading(false);
    }
  };

  // Execute swap
  const executeSwap = async () => {
    if (!tokenAddress || !amount) {
      setError('Please fill all fields');
      return;
    }

    if (swapDirection === 'tokenToWbnb' && !isApproved) {
      setError('Please approve the token first');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
      const router = new ethers.Contract(PANCAKE_ROUTER_ADDRESS, routerABI, signer);
      
      const deadline = Math.floor(Date.now() / 1000) + 300; // 5 minutes from now
      const userAddress = await signer.getAddress();
      
      let tx;
      
      if (swapDirection === 'tokenToWbnb') {
        // Token to WBNB swap
        const amountIn = ethers.utils.parseUnits(amount, 18);
        const amountOutMin = ethers.utils.parseEther(estimatedAmount).mul(95).div(100); // 5% slippage
        
        const path = [tokenAddress, WBNB_ADDRESS];
        
        tx = await router.swapExactTokensForETH(
          amountIn,
          amountOutMin,
          path,
          userAddress,
          deadline
        );
      } else {
        // WBNB to Token swap
        const amountIn = ethers.utils.parseEther(amount);
        const amountOutMin = ethers.utils.parseUnits(estimatedAmount, 18).mul(95).div(100); // 5% slippage
        
        const path = [WBNB_ADDRESS, tokenAddress];
        
        tx = await router.swapExactETHForTokens(
          amountOutMin,
          path,
          userAddress,
          deadline,
          { value: amountIn }
        );
      }

      setTxHash(tx.hash);
      setSuccess('Swap transaction sent. Waiting for confirmation...');

      await tx.wait();
      setSuccess('Swap successful!');
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Failed to execute swap');
    } finally {
      setLoading(false);
    }
  };

  // Check approval when token address or amount changes
  useEffect(() => {
    checkApproval();
    if (tokenAddress && amount) {
      estimateSwap();
    }
  }, [tokenAddress, amount, swapDirection]);

  return (
    <SwapContainer>
        <center>
      <Header>
        <Title>Artist Token Swap</Title>
      </Header>
      </center>
      
      <SwapForm>
        <InputGroup>
          <Label>Token Address</Label>
          <Input
            type="text"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            placeholder="0x..."
          />
        </InputGroup>
        
        <InputGroup>
          <Label>
            {swapDirection === 'tokenToWbnb' 
              ? 'Amount of Token to Swap' 
              : 'Amount of WBNB to Swap'}
          </Label>
          <Input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={swapDirection === 'tokenToWbnb' ? "100" : "0.1"}
          />
        </InputGroup>
        
        <DirectionSelector>
          <DirectionButton 
            active={swapDirection === 'tokenToWbnb'}
            onClick={() => setSwapDirection('tokenToWbnb')}
          >
            Token → WBNB
          </DirectionButton>
          <DirectionButton 
            active={swapDirection === 'wbnbToToken'}
            onClick={() => setSwapDirection('wbnbToToken')}
          >
            WBNB → Token
          </DirectionButton>
        </DirectionSelector>
        
        {estimatedAmount && (
          <InfoBox>
            <InfoItem>
              <InfoLabel>Estimated Output:</InfoLabel>
              <InfoValue>
                {swapDirection === 'tokenToWbnb' 
                  ? `${estimatedAmount} WBNB` 
                  : `${estimatedAmount} Tokens`}
              </InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Slippage:</InfoLabel>
              <InfoValue>5%</InfoValue>
            </InfoItem>
          </InfoBox>
        )}
        
        {swapDirection === 'tokenToWbnb' && !isApproved ? (
          <Button 
            onClick={approveToken} 
            disabled={!tokenAddress || !amount || approveLoading}
          >
            {approveLoading ? 'Approving...' : 'Approve Token'}
          </Button>
        ) : (
          <Button 
            onClick={executeSwap} 
            disabled={!tokenAddress || !amount || loading || (swapDirection === 'tokenToWbnb' && !isApproved)}
          >
            {loading ? 'Swapping...' : 'Swap Tokens'}
          </Button>
        )}
      </SwapForm>
      
      {(error || success) && (
        <StatusMessage error={!!error} success={!!success}>
          {error || success}
          {txHash && (
            <div style={{ marginTop: '10px' }}>
              <a 
                href={`https://testnet.bscscan.com/tx/${txHash}`} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#5bd8ff', textDecoration: 'none' }}
              >
                View on BscScan
              </a>
            </div>
          )}
        </StatusMessage>
      )}
      
      <InfoBox>
        <div style={{ marginBottom: '10px', fontWeight: '500' }}>How to use:</div>
        <ul style={{ paddingLeft: '20px', margin: '0', fontSize: '14px' }}>
          <li>Connect to BSC Testnet in your wallet</li>
          <li>Enter the token address you want to swap</li>
          <li>Select swap direction (Token to WBNB or WBNB to Token)</li>
          <li>Approve token spending if needed</li>
          <li>Execute swap</li>
          <li>Make sure you have test BNB for gas fees</li>
        </ul>
      </InfoBox>
    </SwapContainer>
  );
};

export default TokenSwap;