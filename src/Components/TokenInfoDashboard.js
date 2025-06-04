import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useParams } from 'react-router-dom';
import ResponsiveAppBar from './ResponsiveAppBar';

const TokenInfoDashboard = () => {

  const {token_address}=useParams()
  // BSC Testnet addresses
  const PANCAKE_ROUTER_ADDRESS = '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3';
  const WBNB_ADDRESS = '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd';
  
  // Hardcoded BNB price for demo purposes (would normally fetch from API)
  const BNB_PRICE_USD = 300;
  
  // State variables
  const [tokenAddress, setTokenAddress] = useState(token_address);
  const [tokenData, setTokenData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Contract ABIs
  const routerABI = [
    "function factory() external view returns (address)"
  ];

  const tokenABI = [
    "function decimals() external view returns (uint8)",
    "function symbol() external view returns (string)",
    "function name() external view returns (string)",
    "function totalSupply() external view returns (uint256)"
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

  const fetchTokenData = async () => {

    
    
    if (!tokenAddress || !ethers.utils.isAddress(tokenAddress)) {
      setError('Please enter a valid token address');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setTokenData(null);

      // Fetch token metadata
      const tokenContract = new ethers.Contract(tokenAddress, tokenABI, provider);
      const [symbol, name, decimals, totalSupply] = await Promise.all([
        tokenContract.symbol(),
        tokenContract.name(),
        tokenContract.decimals(),
        tokenContract.totalSupply()
      ]);

      // Fetch liquidity pool data
      const router = new ethers.Contract(PANCAKE_ROUTER_ADDRESS, routerABI, provider);
      const factoryAddress = await router.factory();
      const factory = new ethers.Contract(factoryAddress, factoryABI, provider);
      const pairAddress = await factory.getPair(tokenAddress, WBNB_ADDRESS);

      if (pairAddress === ethers.constants.AddressZero) {
        setTokenData({
          symbol,
          name,
          decimals,
          totalSupply,
          priceUSD: 0,
          marketCapUSD: 0,
          tvlUSD: 0,
          pairExists: false
        });
        return;
      }

      // Fetch pair reserves
      const pair = new ethers.Contract(pairAddress, pairABI, provider);
      const [reserves, token0Address] = await Promise.all([
        pair.getReserves(),
        pair.token0()
      ]);

      // Determine reserve order
      const isToken0 = tokenAddress.toLowerCase() === token0Address.toLowerCase();
      const tokenReserve = isToken0 ? reserves.reserve0 : reserves.reserve1;
      const wbnbReserve = isToken0 ? reserves.reserve1 : reserves.reserve0;

      // Calculate token price in BNB and USD
      const tokenPriceInBNB = Number(
        ethers.utils.formatUnits(
          wbnbReserve.mul(ethers.BigNumber.from(10).pow(decimals)).div(tokenReserve),
          18
        )
      );
      
      
      const tokenPriceUSD = tokenPriceInBNB * BNB_PRICE_USD;

      // Calculate market cap
      const totalSupplyFormatted = Number(ethers.utils.formatUnits(totalSupply, decimals));
      const marketCapUSD = totalSupplyFormatted * tokenPriceUSD;

      // Calculate TVL
      const tokenValueUSD = Number(ethers.utils.formatUnits(tokenReserve, decimals)) * tokenPriceUSD;
      const wbnbValueUSD = Number(ethers.utils.formatUnits(wbnbReserve, 18)) * BNB_PRICE_USD;
      const tvlUSD = tokenValueUSD + wbnbValueUSD;

      setTokenData({
        symbol,
        name,
        decimals,
        totalSupply: totalSupplyFormatted,
        priceUSD: tokenPriceUSD,
        marketCapUSD,
        tvlUSD,
        pairExists: true
      });

    } catch (err) {
      console.error('Error fetching token data:', err);
      setError('Failed to fetch token data. Please check the address and try again.');
    } finally {
      setLoading(false);
    }
  };


  useEffect(()=>{
    fetchTokenData()
  },[])

  // Styles
  const containerStyle = {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '30px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#1a1f2d',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
    color: '#e0e7ff'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#ffffff'
  };

  const titleStyle = {
    fontSize: '2.2rem',
    fontWeight: '700',
    marginBottom: '10px',
    background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  const subtitleStyle = {
    fontSize: '1rem',
    color: '#9fa8da',
    fontWeight: '500'
  };

  const inputContainerStyle = {
    marginBottom: '25px',
    position: 'relative'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '10px',
    fontWeight: '600',
    color: '#a3b1e0'
  };

  const inputStyle = {
    width: '70%',
    padding: '14px 20px',
    fontSize: '1rem',
    borderRadius: '12px',
    border: '1px solid #2d3753',
    backgroundColor: '#131826',
    color: '#ffffff',
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s'
  };

  const inputFocusStyle = {
    borderColor: '#4a6cf7',
    boxShadow: '0 0 0 3px rgba(74, 108, 247, 0.2)'
  };

  const buttonStyle = {
    width: '100%',
    padding: '14px',
    fontSize: '1.1rem',
    fontWeight: '600',
    backgroundColor: '#4a6cf7',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
    marginBottom: '25px'
  };

  const buttonHoverStyle = {
    backgroundColor: '#3a5af5',
    transform: 'translateY(-2px)'
  };

  const cardGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '20px'
  };

  const cardStyle = {
    backgroundColor: '#21273a',
    borderRadius: '14px',
    padding: '20px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s, box-shadow 0.3s'
  };

  const cardHoverStyle = {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)'
  };

  const cardTitleStyle = {
    fontSize: '1rem',
    color: '#9fa8da',
    marginBottom: '10px',
    fontWeight: '500'
  };

  const cardValueStyle = {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '5px'
  };

  const errorStyle = {
    color: '#ff6b6b',
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    padding: '15px',
    borderRadius: '10px',
    marginTop: '20px',
    fontWeight: '500',
    textAlign: 'center'
  };

  const loadingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '150px',
    flexDirection: 'column'
  };

  const spinnerStyle = {
    border: '4px solid rgba(74, 108, 247, 0.3)',
    borderTop: '4px solid #4a6cf7',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
    marginBottom: '15px'
  };

  return (
   < div>

<br></br>
        <ResponsiveAppBar homeButtonStyle="outlined" earnButtonStyle="contained" createButtonStyle="outlined" chatButtonStyle="contained" dashboardButtonStyle="outlined"/>
        <hr></hr>
        <br></br><br></br>
    <div style={containerStyle}>

        
      <div style={headerStyle}>
        <h1 style={titleStyle}>Token Analytics Dashboard</h1>
        <p style={subtitleStyle}>Get real-time market data for any token on BSC Testnet</p>
      </div>

      <div style={inputContainerStyle}>
        <label htmlFor="tokenAddress" style={labelStyle}>Address:</label>
        <input
          id="tokenAddress"
          type="text"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
          placeholder="0x..."
          style={inputStyle}
          onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
          onBlur={(e) => {
            e.target.style.borderColor = '#2d3753';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>

     

      {error && <div style={errorStyle}>{error}</div>}

      {loading && (
        <div style={loadingStyle}>
          <div style={spinnerStyle}></div>
          <p>Fetching token data from blockchain...</p>
        </div>
      )}

      {tokenData && (
        <div style={cardGridStyle}>
          <div style={cardStyle}>
            <div style={cardTitleStyle}>Price</div>
            <div style={cardValueStyle}>
              ${tokenData.priceUSD > 0.01 ? tokenData.priceUSD.toFixed(4) : tokenData.priceUSD.toFixed(8)}
            </div>
            <div>
              {tokenData.pairExists ? (
                <span style={{ color: '#4ade80' }}>Active Trading</span>
              ) : (
                <span style={{ color: '#ff6b6b' }}>No Liquidity Pool</span>
              )}
            </div>
          </div>

          <div style={cardStyle}>
            <div style={cardTitleStyle}>Market Cap</div>
            <div style={cardValueStyle}>
              ${tokenData.marketCapUSD > 1000 
                ? `${(tokenData.marketCapUSD / 1000).toFixed(2)}K` 
                : `${tokenData.marketCapUSD.toFixed(2)}`}
            </div>
            <div>
              <span style={{ color: '#9fa8da' }}>
                Supply: {tokenData.totalSupply > 1000000 
                  ? `${(tokenData.totalSupply / 1000000).toFixed(2)}M` 
                  : `${tokenData.totalSupply.toFixed(0)}`}
              </span>
            </div>
          </div>

          <div style={cardStyle}>
            <div style={cardTitleStyle}>Total Value Locked</div>
            <div style={cardValueStyle}>
              ${tokenData.tvlUSD > 1000 
                ? `${(tokenData.tvlUSD / 1000).toFixed(2)}K` 
                : `${tokenData.tvlUSD.toFixed(2)}`}
            </div>
            <div>
              <span style={{ color: '#9fa8da' }}>Token: {tokenData.symbol}</span>
            </div>
          </div>

          <div style={{ ...cardStyle, gridColumn: '1 / -1' }}>
            <div style={cardTitleStyle}>Token Information</div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ color: '#9fa8da', marginBottom: '5px' }}>Symbol</div>
                <div style={{ fontSize: '1.2rem', fontWeight: '600' }}>{tokenData.symbol}</div>
              </div>
              <div>
                <div style={{ color: '#9fa8da', marginBottom: '5px' }}>Name</div>
                <div style={{ fontSize: '1.2rem', fontWeight: '600' }}>{tokenData.name}</div>
              </div>
              <div>
                <div style={{ color: '#9fa8da', marginBottom: '5px' }}>Decimals</div>
                <div style={{ fontSize: '1.2rem', fontWeight: '600' }}>{tokenData.decimals}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
    </div>
  );
};

export default TokenInfoDashboard;