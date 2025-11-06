/**
 * iExec Web3 Mail Integration Logic
 * Version: 1.0.0
 * Purpose: Handles wallet connection and Web3 Mail workflow for Quintes Protocol whitelist
 * 
 * Flow: Connect Wallet → Init iExec → Protect Email → Grant Access → Send Confirmation
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  // TODO: Replace with actual app address from iExec dashboard
  // Get this from: https://protocol.iex.ec/
  APP_ADDRESS: '0xYourAppAddressFromIExecDashboard',
  
  // Polygon Mumbai Testnet configuration
  NETWORK_ID: 80001,
  NETWORK_NAME: 'Polygon Mumbai',
  NETWORK_HEX: '0x13881',
  RPC_URL: 'https://rpc-mumbai.maticvigil.com/',
  BLOCK_EXPLORER: 'https://mumbai.polygonscan.com/',
  
  // Email content for whitelist confirmation
  EMAIL_SUBJECT: 'Welcome to Quintes Protocol Whitelist',
  EMAIL_CONTENT: `
    <html>
      <body style="font-family: Arial, sans-serif; background: #000; color: #fff; padding: 40px;">
        <div style="max-width: 600px; margin: 0 auto;">
          <h1 style="color: #CDFA50; font-size: 32px; margin-bottom: 20px;">
            🎉 Welcome to Quintes Protocol!
          </h1>
          <p style="font-size: 18px; line-height: 1.6; margin-bottom: 20px;">
            Congratulations! Your spot on the Quintes Protocol whitelist is secured.
          </p>
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            You're now among the first to experience the next generation of Web3 communication 
            powered by iExec's decentralized email technology.
          </p>
          <div style="background: #1a1a1a; padding: 20px; border-radius: 8px; margin: 30px 0; border: 2px solid #CDFA50;">
            <p style="margin: 0; font-size: 14px; color: #CDFA50;">
              <strong>What's Next?</strong>
            </p>
            <p style="margin: 10px 0 0 0; font-size: 14px;">
              We'll keep you updated on our launch. Stay tuned for exciting announcements!
            </p>
          </div>
          <p style="font-size: 14px; color: #888; margin-top: 40px;">
            This email was sent via Web3 Mail - decentralized, encrypted, and secure.
          </p>
        </div>
      </body>
    </html>
  `
};

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

let provider = null;
let signer = null;
let userAddress = null;
let web3mail = null;

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize the application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Quintes Protocol - iExec Web3 Mail Integration');
  console.log('📋 Initializing...');
  
  // Get both buttons (navbar and hero)
  const navbarButton = document.getElementById('joinWhitelistBtn');
  const heroButton = document.getElementById('joinWhitelistBtnHero');
  
  if (navbarButton) {
    navbarButton.addEventListener('click', handleJoinWhitelist);
    console.log('✅ Navbar button connected');
  } else {
    console.warn('⚠️ Navbar button not found');
  }
  
  if (heroButton) {
    heroButton.addEventListener('click', handleJoinWhitelist);
    console.log('✅ Hero button connected');
  } else {
    console.warn('⚠️ Hero button not found');
  }
  
  console.log('✅ iExec integration initialized successfully');
});

// ============================================================================
// MAIN HANDLER
// ============================================================================

/**
 * Main handler for the Join Whitelist button
 * Orchestrates the complete Web3 Mail flow
 */
async function handleJoinWhitelist(event) {
  event.preventDefault();
  console.log('🎯 Join Whitelist clicked');
  
  // Check MetaMask availability first
  if (!window.ethereum) {
    alert('MetaMask is not installed.\n\nPlease install MetaMask to continue.\n\nYou will be redirected to the download page.');
    window.open('https://metamask.io/download/', '_blank');
    return;
  }
  
  try {
    // STEP 1: Connect Wallet
    console.log('📍 Step 1: Connecting wallet...');
    alert('Step 1: Connecting to MetaMask...\n\nPlease approve the connection in your wallet.');
    await connectWallet();
    alert(`✅ Connected successfully!\n\nYour address: ${userAddress.substring(0, 6)}...${userAddress.substring(38)}`);
    console.log('✅ Step 1 complete: Wallet connected');
    
    // STEP 2: Initialize iExec
    console.log('📍 Step 2: Initializing iExec SDK...');
    alert('Step 2: Initializing iExec Web3 Mail...\n\nPlease wait a moment.');
    await initializeIExec();
    alert('✅ iExec initialized successfully!');
    console.log('✅ Step 2 complete: iExec initialized');
    
    // STEP 3: Get user email
    console.log('📍 Step 3: Requesting email...');
    const userEmail = prompt('Please enter your email address to join the whitelist:');
    
    if (!userEmail) {
      alert('Email is required to join the whitelist.\n\nPlease try again.');
      console.log('❌ User cancelled: No email provided');
      return;
    }
    
    if (!isValidEmail(userEmail)) {
      alert('Invalid email format.\n\nPlease enter a valid email address like:\nexample@domain.com');
      console.log('❌ Invalid email format:', userEmail);
      return;
    }
    
    console.log('📧 Email provided:', userEmail);
    
    // STEP 4: Protect email data
    console.log('📍 Step 4: Protecting email data...');
    alert('Step 3: Encrypting your email...\n\nThis will create a blockchain transaction.\nPlease approve in MetaMask.');
    const protectedData = await protectUserEmail(userEmail);
    alert('✅ Email encrypted and secured on blockchain!');
    console.log('✅ Step 4 complete: Data protected');
    console.log('🔒 Protected data address:', protectedData.address);
    
    // STEP 5: Grant access to app
    console.log('📍 Step 5: Granting access...');
    alert('Step 4: Granting access to Quintes Protocol...\n\nThis allows the app to send you emails.\nPlease approve in MetaMask.');
    await grantAppAccess(protectedData);
    alert('✅ Access granted successfully!');
    console.log('✅ Step 5 complete: Access granted');
    
    // STEP 6: Send confirmation email
    console.log('📍 Step 6: Sending confirmation email...');
    alert('Step 5: Sending your whitelist confirmation email...\n\nThis may take a moment.\nPlease approve in MetaMask.');
    await sendConfirmationEmail(protectedData);
    alert('🎉 SUCCESS!\n\nYou\'ve been added to the Quintes Protocol whitelist!\n\nCheck your email inbox for confirmation.\n(It may take 1-2 minutes to arrive)');
    console.log('✅ Step 6 complete: Email sent');
    console.log('🎉 COMPLETE: User successfully added to whitelist');
    
  } catch (error) {
    console.error('❌ Error in whitelist process:', error);
    
    // Specific error handling
    if (error.code === 4001) {
      alert('❌ Transaction rejected\n\nYou rejected the transaction in MetaMask.\n\nPlease try again if you want to join the whitelist.');
    } else if (error.message && error.message.includes('network')) {
      alert('❌ Network Error\n\nPlease check your internet connection and try again.');
    } else if (error.message && error.message.includes('insufficient')) {
      alert('❌ Insufficient Balance\n\nYou need some MATIC tokens on Polygon Mumbai testnet to complete this transaction.\n\nGet free test MATIC from: https://faucet.polygon.technology/');
    } else {
      alert(`❌ An error occurred:\n\n${error.message}\n\nPlease try again or contact support if the problem persists.`);
    }
  }
}

// ============================================================================
// WALLET CONNECTION
// ============================================================================

/**
 * Connects to MetaMask wallet and initializes provider
 * @returns {Promise<string>} User's wallet address
 */
async function connectWallet() {
  try {
    console.log('🔌 Requesting wallet connection...');
    
    // Request account access
    const accounts = await window.ethereum.request({ 
      method: 'eth_requestAccounts' 
    });
    
    if (!accounts || accounts.length === 0) {
      throw new Error('No accounts found. Please unlock MetaMask.');
    }
    
    // Initialize ethers provider
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    userAddress = accounts[0];
    
    console.log('✅ Provider initialized');
    console.log('👤 User address:', userAddress);
    
    // Check network
    const network = await provider.getNetwork();
    console.log('🌐 Current network:', network.chainId, network.name);
    
    if (network.chainId !== CONFIG.NETWORK_ID) {
      console.log('⚠️ Wrong network detected, prompting switch...');
      const switchNetwork = confirm(
        `You're connected to the wrong network.\n\nPlease switch to ${CONFIG.NETWORK_NAME} to continue.\n\nClick OK to switch networks.`
      );
      
      if (switchNetwork) {
        await switchToMumbai();
      } else {
        throw new Error(`Please switch to ${CONFIG.NETWORK_NAME} to continue.`);
      }
    }
    
    return userAddress;
    
  } catch (error) {
    console.error('❌ Wallet connection failed:', error);
    if (error.code === 4001) {
      throw new Error('User rejected connection request');
    }
    throw error;
  }
}

/**
 * Switches to Polygon Mumbai testnet
 */
async function switchToMumbai() {
  try {
    console.log('🔄 Switching to Mumbai...');
    
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: CONFIG.NETWORK_HEX }],
    });
    
    console.log('✅ Switched to Mumbai');
    
  } catch (error) {
    // Network not added, try to add it
    if (error.code === 4902) {
      console.log('📝 Network not found, adding Mumbai...');
      
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: CONFIG.NETWORK_HEX,
          chainName: CONFIG.NETWORK_NAME,
          nativeCurrency: {
            name: 'MATIC',
            symbol: 'MATIC',
            decimals: 18
          },
          rpcUrls: [CONFIG.RPC_URL],
          blockExplorerUrls: [CONFIG.BLOCK_EXPLORER]
        }]
      });
      
      console.log('✅ Mumbai network added');
    } else {
      throw error;
    }
  }
}

// ============================================================================
// iEXEC INTEGRATION
// ============================================================================

/**
 * Initializes the iExec Web3 Mail SDK
 * @returns {Promise<Object>} Initialized web3mail instance
 */
async function initializeIExec() {
  try {
    console.log('🔧 Initializing iExec SDK...');
    
    if (!provider) {
      throw new Error('Provider not initialized. Please connect wallet first.');
    }
    
    // Initialize Web3Mail with ethers provider
    web3mail = new IExecWeb3Mail(provider);
    
    console.log('✅ iExec SDK initialized');
    return web3mail;
    
  } catch (error) {
    console.error('❌ iExec initialization failed:', error);
    throw new Error(`Failed to initialize iExec: ${error.message}`);
  }
}

/**
 * Protects user email using iExec encryption
 * @param {string} email - User's email address
 * @returns {Promise<Object>} Protected data object with address property
 */
async function protectUserEmail(email) {
  try {
    console.log('🔒 Protecting email:', email);
    
    if (!web3mail) {
      throw new Error('iExec not initialized. Please initialize first.');
    }
    
    const protectedData = await web3mail.protectData({
      data: { email: email }
    });
    
    console.log('✅ Email protected');
    console.log('📦 Protected data:', protectedData);
    
    return protectedData;
    
  } catch (error) {
    console.error('❌ Email protection failed:', error);
    throw new Error(`Failed to protect email: ${error.message}`);
  }
}

/**
 * Grants application access to encrypted data
 * @param {Object} protectedData - Protected data object from protectUserEmail
 * @returns {Promise<void>}
 */
async function grantAppAccess(protectedData) {
  try {
    console.log('🔑 Granting access to app...');
    console.log('📍 Protected data address:', protectedData.address);
    console.log('📍 App address:', CONFIG.APP_ADDRESS);
    console.log('📍 User address:', userAddress);
    
    if (!web3mail) {
      throw new Error('iExec not initialized. Please initialize first.');
    }
    
    if (!protectedData || !protectedData.address) {
      throw new Error('Invalid protected data. Please protect data first.');
    }
    
    await web3mail.grantAccess({
      protectedData: protectedData.address,
      authorizedApp: CONFIG.APP_ADDRESS,
      authorizedUser: userAddress
    });
    
    console.log('✅ Access granted successfully');
    
  } catch (error) {
    console.error('❌ Grant access failed:', error);
    throw new Error(`Failed to grant access: ${error.message}`);
  }
}

/**
 * Sends confirmation email via Web3 Mail
 * @param {Object} protectedData - Protected data object
 * @returns {Promise<void>}
 */
async function sendConfirmationEmail(protectedData) {
  try {
    console.log('📨 Sending confirmation email...');
    console.log('📍 Protected data address:', protectedData.address);
    
    if (!web3mail) {
      throw new Error('iExec not initialized. Please initialize first.');
    }
    
    if (!protectedData || !protectedData.address) {
      throw new Error('Invalid protected data. Please protect data first.');
    }
    
    await web3mail.sendEmail({
      protectedData: protectedData.address,
      emailSubject: CONFIG.EMAIL_SUBJECT,
      emailContent: CONFIG.EMAIL_CONTENT
    });
    
    console.log('✅ Confirmation email sent successfully');
    
  } catch (error) {
    console.error('❌ Send email failed:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Validates email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if email is valid
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ============================================================================
// EVENT LISTENERS
// ============================================================================

/**
 * Listen for account changes
 */
window.ethereum?.on('accountsChanged', (accounts) => {
  console.log('🔄 Account changed:', accounts[0]);
  userAddress = accounts[0];
  
  if (!accounts || accounts.length === 0) {
    console.log('⚠️ No accounts found, please connect wallet');
    provider = null;
    signer = null;
    userAddress = null;
    web3mail = null;
  }
});

/**
 * Listen for network changes
 */
window.ethereum?.on('chainChanged', (chainId) => {
  console.log('🔄 Network changed to:', chainId);
  console.log('🔄 Reloading page...');
  window.location.reload();
});

// ============================================================================
// DEBUG INFO
// ============================================================================

console.log('📋 Configuration loaded:', {
  networkId: CONFIG.NETWORK_ID,
  networkName: CONFIG.NETWORK_NAME,
  appAddress: CONFIG.APP_ADDRESS
});

console.log('🎬 Ready to join whitelist!');

