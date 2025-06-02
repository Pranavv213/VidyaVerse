import React, { useState } from 'react';
import { ethers } from 'ethers';

const AddLiquidity = () => {
  // BSC Testnet addresses
  const PANCAKE_ROUTER_ADDRESS = '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3';
  const WBNB_ADDRESS = '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd';

  // State variables
  const [tokenAddress, setTokenAddress] = useState('');
  const [amountToken, setAmountToken] = useState('100');
  const [amountBNB, setAmountBNB] = useState('0.1');
  const [pairAddress, setPairAddress] = useState('');
  const [liquidity, setLiquidity] = useState({ token: 0, wbnb: 0 });
  const [loading, setLoading] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [txHash, setTxHash] = useState('');
  const [isApproved, setIsApproved] = useState(false);

  // Contract ABIs
  const routerABI = [
    "function addLiquidityETH(address token, uint amountTokenDesired, uint amountTokenMin, uint amountETHMin, address to, uint deadline) external payable returns (uint amountToken, uint amountETH, uint liquidity)",
    "function factory() external view returns (address)"
  ];

  const tokenABI = [
    "function approve(address spender, uint amount) external returns (bool)",
    "function allowance(address owner, address spender) external view returns (uint)"
  ];

  const factoryABI = [
    "function getPair(address tokenA, address tokenB) external view returns (address pair)"
  ];

  const pairABI = [
    "function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)",
    "function token0() external view returns (address)",
    "function token1() external view returns (address)"
  ];

  // Connect to BSC Testnet
  const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545/');

  const checkApproval = async () => {
    if (!tokenAddress || !window.ethereum) return;

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
      const userAddress = await signer.getAddress();
      
      const tokenContract = new ethers.Contract(tokenAddress, tokenABI, provider);
      const allowance = await tokenContract.allowance(userAddress, PANCAKE_ROUTER_ADDRESS);
      const amountTokenWei = ethers.utils.parseUnits(amountToken, 18);
      
      setIsApproved(allowance.gte(amountTokenWei));
    } catch (err) {
      console.error('Error checking approval:', err);
    }
  };

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
      const amountTokenWei = ethers.utils.parseUnits(amountToken, 18);

      const tx = await tokenContract.approve(PANCAKE_ROUTER_ADDRESS, amountTokenWei);
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

  const addLiquidity = async () => {
    if (!tokenAddress || !amountToken || !amountBNB) {
      setError('Please fill all fields');
      return;
    }

    if (!isApproved) {
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

      const amountTokenWei = ethers.utils.parseUnits(amountToken, 18);
      const amountTokenMin = amountTokenWei.mul(90).div(100);
      const amountBNBMin = ethers.utils.parseEther(amountBNB).mul(90).div(100);
      const deadline = Math.floor(Date.now() / 1000) + 1200;

      const tx = await router.addLiquidityETH(
        tokenAddress,
        amountTokenWei,
        amountTokenMin,
        amountBNBMin,
        await signer.getAddress(),
        deadline,
        { value: ethers.utils.parseEther(amountBNB) }
      );

      setTxHash(tx.hash);
      setSuccess('Liquidity addition transaction sent. Waiting for confirmation...');

      const receipt = await tx.wait();
      setSuccess('Liquidity successfully added!');

      const factoryAddress = await router.factory();
      const factory = new ethers.Contract(factoryAddress, factoryABI, provider);
      const pairAddr = await factory.getPair(tokenAddress, WBNB_ADDRESS);
      setPairAddress(pairAddr);

      await checkReserves(pairAddr);

    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Failed to add liquidity');
    } finally {
      setLoading(false);
    }
  };

  const checkReserves = async (pairAddr) => {
    try {
      const pairContract = new ethers.Contract(pairAddr, pairABI, provider);
      const [reserves, token0Address] = await Promise.all([
        pairContract.getReserves(),
        pairContract.token0()
      ]);

      const isToken0WBNB = token0Address.toLowerCase() === WBNB_ADDRESS.toLowerCase();
      
      setLiquidity({
        token: ethers.utils.formatUnits(isToken0WBNB ? reserves.reserve1 : reserves.reserve0, 18),
        wbnb: ethers.utils.formatUnits(isToken0WBNB ? reserves.reserve0 : reserves.reserve1, 18)
      });

    } catch (err) {
      console.error('Error checking reserves:', err);
    }
  };

  // Check approval when token address or amount changes
  React.useEffect(() => {
    checkApproval();
  }, [tokenAddress, amountToken]);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Add Liquidity to BEP20-WBNB Pair</h1>
      <p>BNB Smart Chain Testnet</p>
      
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="tokenAddress" style={{ display: 'block', marginBottom: '5px' }}>BEP20 Token Address:</label>
        <input
          id="tokenAddress"
          type="text"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
          placeholder="0x..."
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="amountToken" style={{ display: 'block', marginBottom: '5px' }}>Amount of Token to Add:</label>
        <input
          id="amountToken"
          type="text"
          value={amountToken}
          onChange={(e) => setAmountToken(e.target.value)}
          placeholder="100"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="amountBNB" style={{ display: 'block', marginBottom: '5px' }}>Amount of BNB to Add:</label>
        <input
          id="amountBNB"
          type="text"
          value={amountBNB}
          onChange={(e) => setAmountBNB(e.target.value)}
          placeholder="0.1"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      
      {!isApproved ? (
        <button 
          onClick={approveToken} 
          disabled={approveLoading}
          style={{
            padding: '10px 15px',
            backgroundColor: '#f0b90b',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          {approveLoading ? 'Approving...' : 'Approve Token'}
        </button>
      ) : (
        <button 
          onClick={addLiquidity} 
          disabled={loading}
          style={{
            padding: '10px 15px',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          {loading ? 'Adding Liquidity...' : 'Add Liquidity'}
        </button>
      )}
      
      {error && (
        <div style={{ color: 'red', marginBottom: '20px' }}>
          {error}
        </div>
      )}
      
      {success && (
        <div style={{ color: 'green', marginBottom: '20px' }}>
          {success}
          {txHash && (
            <div>
              <a 
                href={`https://testnet.bscscan.com/tx/${txHash}`} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: 'green' }}
              >
                View on BscScan
              </a>
            </div>
          )}
        </div>
      )}
      
      {pairAddress && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          <h3>Liquidity Pair Information</h3>
          <p><strong>Pair Address:</strong> {pairAddress}</p>
          <p><strong>Token Reserve:</strong> {liquidity.token}</p>
          <p><strong>WBNB Reserve:</strong> {liquidity.wbnb}</p>
        </div>
      )}

      <div style={{ marginTop: '20px', fontSize: '0.9em', color: '#666' }}>
        <p><strong>Note:</strong> </p>
        <ul>
          <li>You need MetaMask connected to BSC Testnet (chainId 97)</li>
          <li>You must have the BEP20 token and BNB in your wallet</li>
          <li>First approve the token, then add liquidity</li>
          <li>Default amounts are set for demonstration</li>
        </ul>
      </div>
    </div>
  );
};

export default AddLiquidity;