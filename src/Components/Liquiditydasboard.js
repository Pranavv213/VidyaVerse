import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const LiquidityDashboard = () => {
  // BSC Testnet addresses
  const PANCAKE_ROUTER_ADDRESS = '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3';
  const WBNB_ADDRESS = '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd';

  // State variables
  const [tokenAddress, setTokenAddress] = useState('');
  const [amountToken, setAmountToken] = useState('100');
  const [amountBNB, setAmountBNB] = useState('0.1');
  const [swapAmount, setSwapAmount] = useState('10');
  const [pairAddress, setPairAddress] = useState('');
  const [liquidity, setLiquidity] = useState({ token: 0, bnb: 0 });
  const [loading, setLoading] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [txHash, setTxHash] = useState('');
  const [isApproved, setIsApproved] = useState(false);
  const [activeTab, setActiveTab] = useState('liquidity');
  const [tokenInfo, setTokenInfo] = useState({ name: '', symbol: '', decimals: 18 });
  const [estimatedSwap, setEstimatedSwap] = useState('');

  // Contract ABIs
  const routerABI = [
    "function addLiquidityETH(address token, uint amountTokenDesired, uint amountTokenMin, uint amountETHMin, address to, uint deadline) external payable returns (uint amountToken, uint amountETH, uint liquidity)",
    "function factory() external view returns (address)",
    "function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
    "function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)",
    "function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)"
  ];

  const tokenABI = [
    "function approve(address spender, uint amount) external returns (bool)",
    "function allowance(address owner, address spender) external view returns (uint)",
    "function name() external view returns (string)",
    "function symbol() external view returns (string)",
    "function decimals() external view returns (uint8)"
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

  // Fetch token info
  const fetchTokenInfo = async () => {
    if (!ethers.utils.isAddress(tokenAddress)) {
      setTokenInfo({ name: '', symbol: '', decimals: 18 });
      return;
    }
    
    try {
      const tokenContract = new ethers.Contract(tokenAddress, tokenABI, provider);
      const [name, symbol, decimals] = await Promise.all([
        tokenContract.name(),
        tokenContract.symbol(),
        tokenContract.decimals()
      ]);
      
      setTokenInfo({ name, symbol, decimals });
    } catch (err) {
      console.error('Error fetching token info:', err);
      setTokenInfo({ name: 'Unknown', symbol: 'UNK', decimals: 18 });
    }
  };

  // Check token approval
  const checkApproval = async () => {
    if (!tokenAddress || !window.ethereum || !ethers.utils.isAddress(tokenAddress)) return;

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
      const userAddress = await signer.getAddress();
      
      const tokenContract = new ethers.Contract(tokenAddress, tokenABI, provider);
      const allowance = await tokenContract.allowance(userAddress, PANCAKE_ROUTER_ADDRESS);
      // Use the max between amountToken and swapAmount for approval check
      const maxAmount = Math.max(Number(amountToken), Number(swapAmount));
      const amountTokenWei = ethers.utils.parseUnits(maxAmount.toString(), tokenInfo.decimals);
      
      setIsApproved(allowance.gte(amountTokenWei));
    } catch (err) {
      console.error('Error checking approval:', err);
    }
  };

  // Approve token
  const approveToken = async () => {
    if (!tokenAddress || !ethers.utils.isAddress(tokenAddress)) {
      setError('Please enter a valid token address');
      return;
    }

    try {
      setApproveLoading(true);
      setError('');
      setSuccess('');

      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();

      const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);
      // Approve max of amountToken and swapAmount so approval covers both addLiquidity and swap
      const maxAmount = Math.max(Number(amountToken), Number(swapAmount));
      const amountTokenWei = ethers.utils.parseUnits(maxAmount.toString(), tokenInfo.decimals);

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

  // Add liquidity
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
      setTxHash('');

      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();

      const router = new ethers.Contract(PANCAKE_ROUTER_ADDRESS, routerABI, signer);

      const amountTokenWei = ethers.utils.parseUnits(amountToken, tokenInfo.decimals);
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

      await tx.wait();
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

  // Check reserves
  const checkReserves = async (pairAddr) => {
    if (!pairAddr || pairAddr === ethers.constants.AddressZero) {
      setLiquidity({ token: 0, bnb: 0 });
      return;
    }

    try {
      const pairContract = new ethers.Contract(pairAddr, pairABI, provider);
      const [reserves, token0Address] = await Promise.all([
        pairContract.getReserves(),
        pairContract.token0()
      ]);
      // Reserves are returned as BigNumber in order: reserve0, reserve1
      let reserveToken, reserveBNB;

      if (token0Address.toLowerCase() === tokenAddress.toLowerCase()) {
        reserveToken = reserves.reserve0;
        reserveBNB = reserves.reserve1;
      } else {
        reserveToken = reserves.reserve1;
        reserveBNB = reserves.reserve0;
      }

      setLiquidity({
        token: parseFloat(ethers.utils.formatUnits(reserveToken, tokenInfo.decimals)),
        bnb: parseFloat(ethers.utils.formatEther(reserveBNB))
      });
    } catch (err) {
      console.error('Error fetching reserves:', err);
      setLiquidity({ token: 0, bnb: 0 });
    }
  };

  // Estimate swap output (swap token for BNB)
  const estimateSwap = async () => {
    if (!tokenAddress || !swapAmount || !ethers.utils.isAddress(tokenAddress)) {
      setEstimatedSwap('');
      return;
    }

    try {
      const router = new ethers.Contract(PANCAKE_ROUTER_ADDRESS, routerABI, provider);
      const amountInWei = ethers.utils.parseUnits(swapAmount, tokenInfo.decimals);
      const amountsOut = await router.getAmountsOut(amountInWei, [tokenAddress, WBNB_ADDRESS]);
      const amountOutEth = ethers.utils.formatEther(amountsOut[1]);
      setEstimatedSwap(amountOutEth);
    } catch (err) {
      console.error('Error estimating swap:', err);
      setEstimatedSwap('');
    }
  };

  // Execute token swap (token to BNB)
  const executeSwap = async () => {
    if (!tokenAddress || !swapAmount) {
      setError('Please fill all swap fields');
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
      setTxHash('');

      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
      const router = new ethers.Contract(PANCAKE_ROUTER_ADDRESS, routerABI, signer);

      const amountInWei = ethers.utils.parseUnits(swapAmount, tokenInfo.decimals);
      const amountsOut = await router.getAmountsOut(amountInWei, [tokenAddress, WBNB_ADDRESS]);
      const amountOutMin = amountsOut[1].mul(90).div(100); // slippage 10%
      const deadline = Math.floor(Date.now() / 1000) + 1200;

      const tx = await router.swapExactTokensForETH(
        amountInWei,
        amountOutMin,
        [tokenAddress, WBNB_ADDRESS],
        await signer.getAddress(),
        deadline
      );

      setTxHash(tx.hash);
      setSuccess('Swap transaction sent. Waiting for confirmation...');

      await tx.wait();
      setSuccess('Swap successful!');
    } catch (err) {
      console.error('Swap error:', err);
      setError(err.message || 'Failed to execute swap');
    } finally {
      setLoading(false);
    }
  };

  // Effects
  useEffect(() => {
    fetchTokenInfo();
  }, [tokenAddress]);

  useEffect(() => {
    checkApproval();
  }, [tokenAddress, amountToken, swapAmount, tokenInfo.decimals]);

  useEffect(() => {
    if (activeTab === 'swap') {
      estimateSwap();
    } else {
      setEstimatedSwap('');
    }
  }, [swapAmount, tokenAddress, activeTab]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Liquidity Dashboard (BSC Testnet)</h2>

      <div style={{ marginBottom: 20 }}>
        <button
          onClick={() => setActiveTab('liquidity')}
          style={{ marginRight: 10, backgroundColor: activeTab === 'liquidity' ? '#4caf50' : '#ddd', color: activeTab === 'liquidity' ? '#fff' : '#000', padding: '10px 20px', border: 'none', cursor: 'pointer' }}
        >
          Add Liquidity
        </button>
        <button
          onClick={() => setActiveTab('swap')}
          style={{ backgroundColor: activeTab === 'swap' ? '#4caf50' : '#ddd', color: activeTab === 'swap' ? '#fff' : '#000', padding: '10px 20px', border: 'none', cursor: 'pointer' }}
        >
          Swap Tokens
        </button>
      </div>

      <div style={{ marginBottom: 15 }}>
        <label>
          Token Address:{' '}
          <input
            type="text"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value.trim())}
            placeholder="0x..."
            style={{ width: '400px' }}
          />
        </label>
        {tokenInfo.name && (
          <div>
            Token: {tokenInfo.name} ({tokenInfo.symbol}), Decimals: {tokenInfo.decimals}
          </div>
        )}
      </div>

      {activeTab === 'liquidity' && (
        <>
          <div style={{ marginBottom: 10 }}>
            <label>
              Amount Token ({tokenInfo.symbol}):{' '}
              <input
                type="number"
                value={amountToken}
                onChange={(e) => setAmountToken(e.target.value)}
                min="0"
              />
            </label>
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>
              Amount BNB:{' '}
              <input
                type="number"
                value={amountBNB}
                onChange={(e) => setAmountBNB(e.target.value)}
                min="0"
                step="0.0001"
              />
            </label>
          </div>

          {!isApproved ? (
            <button
              onClick={approveToken}
              disabled={approveLoading}
              style={{ marginRight: 10, padding: '10px 20px', cursor: approveLoading ? 'not-allowed' : 'pointer' }}
            >
              {approveLoading ? 'Approving...' : 'Approve Token'}
            </button>
          ) : (
            <button
              onClick={addLiquidity}
              disabled={loading}
              style={{ padding: '10px 20px', cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Adding Liquidity...' : 'Add Liquidity'}
            </button>
          )}

          {pairAddress && pairAddress !== ethers.constants.AddressZero && (
            <div style={{ marginTop: 20 }}>
              <h4>Liquidity Pool Address:</h4>
              <p>{pairAddress}</p>
              <p>
                Reserves: {liquidity.token.toFixed(4)} {tokenInfo.symbol} / {liquidity.bnb.toFixed(4)} BNB
              </p>
            </div>
          )}
        </>
      )}

      {activeTab === 'swap' && (
        <>
          <div style={{ marginBottom: 10 }}>
            <label>
              Swap Amount ({tokenInfo.symbol}):{' '}
              <input
                type="number"
                value={swapAmount}
                onChange={(e) => setSwapAmount(e.target.value)}
                min="0"
              />
            </label>
          </div>

          <div>
            Estimated BNB Received: {estimatedSwap ? `${estimatedSwap} BNB` : 'N/A'}
          </div>

          {!isApproved ? (
            <button
              onClick={approveToken}
              disabled={approveLoading}
              style={{ marginRight: 10, padding: '10px 20px', cursor: approveLoading ? 'not-allowed' : 'pointer' }}
            >
              {approveLoading ? 'Approving...' : 'Approve Token'}
            </button>
          ) : (
            <button
              onClick={executeSwap}
              disabled={loading}
              style={{ padding: '10px 20px', cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Swapping...' : 'Swap Tokens'}
            </button>
          )}
        </>
      )}

      {error && <p style={{ color: 'red', marginTop: 15 }}>{error}</p>}
      {success && <p style={{ color: 'green', marginTop: 15 }}>{success}</p>}
      {txHash && (
        <p style={{ marginTop: 15 }}>
          Transaction Hash:{' '}
          <a
            href={`https://testnet.bscscan.com/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {txHash}
          </a>
        </p>
      )}
    </div>
  );
};

export default LiquidityDashboard;
