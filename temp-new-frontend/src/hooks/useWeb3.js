/**
 * useWeb3 Hook - MetaMask Connection Manager
 * Handles wallet connection, network switching, and state management
 */

import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

// Network Configuration - Arbitrum Sepolia Testnet
const NETWORK_CONFIG = {
  chainId: 421614,
  chainIdHex: '0x66eee',
  chainName: 'Arbitrum Sepolia',
  rpcUrl: 'https://sepolia-rollup.arbitrum.io/rpc',
  blockExplorer: 'https://sepolia.arbiscan.io/',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18
  }
};

export const useWeb3 = () => {
  const [address, setAddress] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Check if MetaMask is installed
   */
  const isMetaMaskInstalled = useCallback(() => {
    return typeof window !== 'undefined' && Boolean(window.ethereum);
  }, []);

  /**
   * Check current network
   */
  const checkNetwork = useCallback(async () => {
    if (!window.ethereum) return false;
    
    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const currentChainId = parseInt(chainId, 16);
      const correct = currentChainId === NETWORK_CONFIG.chainId;
      setIsCorrectNetwork(correct);
      return correct;
    } catch (err) {
      console.error('Error checking network:', err);
      return false;
    }
  }, []);

  /**
   * Switch to Arbitrum Sepolia network
   */
  const switchNetwork = useCallback(async () => {
    if (!window.ethereum) return false;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: NETWORK_CONFIG.chainIdHex }],
      });
      setIsCorrectNetwork(true);
      return true;
    } catch (switchError) {
      // Network not added, try to add it
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: NETWORK_CONFIG.chainIdHex,
              chainName: NETWORK_CONFIG.chainName,
              nativeCurrency: NETWORK_CONFIG.nativeCurrency,
              rpcUrls: [NETWORK_CONFIG.rpcUrl],
              blockExplorerUrls: [NETWORK_CONFIG.blockExplorer]
            }]
          });
          setIsCorrectNetwork(true);
          return true;
        } catch (addError) {
          console.error('Error adding network:', addError);
          setError('Failed to add network');
          return false;
        }
      }
      console.error('Error switching network:', switchError);
      setError('Failed to switch network');
      return false;
    }
  }, []);

  /**
   * Connect to MetaMask wallet
   */
  const connect = useCallback(async () => {
    if (!isMetaMaskInstalled()) {
      setError('MetaMask is not installed');
      window.open('https://metamask.io/download/', '_blank');
      return null;
    }

    setIsConnecting(true);
    setError(null);

    try {
      // Request account access
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });

      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found');
      }

      const userAddress = accounts[0];
      setAddress(userAddress);

      // Check and switch network if needed
      const onCorrectNetwork = await checkNetwork();
      if (!onCorrectNetwork) {
        const switched = await switchNetwork();
        if (!switched) {
          setError('Please switch to Arbitrum Sepolia network');
        }
      }

      return userAddress;

    } catch (err) {
      console.error('Connection error:', err);
      if (err.code === 4001) {
        setError('Connection rejected by user');
      } else {
        setError(err.message || 'Failed to connect wallet');
      }
      return null;
    } finally {
      setIsConnecting(false);
    }
  }, [isMetaMaskInstalled, checkNetwork, switchNetwork]);

  /**
   * Disconnect wallet (clear local state)
   */
  const disconnect = useCallback(() => {
    setAddress(null);
    setIsCorrectNetwork(false);
    setError(null);
  }, []);

  /**
   * Get shortened address for display
   */
  const shortenedAddress = address 
    ? `${address.substring(0, 6)}...${address.substring(38)}`
    : null;

  // Listen for account changes
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        disconnect();
      } else {
        setAddress(accounts[0]);
      }
    };

    const handleChainChanged = () => {
      checkNetwork();
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    // Check if already connected
    window.ethereum.request({ method: 'eth_accounts' })
      .then(accounts => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          checkNetwork();
        }
      });

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, [checkNetwork, disconnect]);

  return {
    address,
    shortenedAddress,
    isConnecting,
    isConnected: Boolean(address),
    isCorrectNetwork,
    isMetaMaskInstalled: isMetaMaskInstalled(),
    error,
    connect,
    disconnect,
    switchNetwork,
    NETWORK_CONFIG
  };
};

export default useWeb3;

