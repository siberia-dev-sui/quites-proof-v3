/**
 * Quintes Protocol - iExec Web3 Mail Integration
 * Version: 2.1.0 - Enhanced UI with Modal & Loading States
 * 
 * Flow: Connect Wallet → Email Modal → Protect Data → Grant Access → Send Email
 */

import { IExecDataProtector } from '@iexec/dataprotector';
import { IExecWeb3mail } from '@iexec/web3mail';

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  NETWORK_ID: 421614,
  NETWORK_NAME: 'Arbitrum Sepolia',
  NETWORK_HEX: '0x66eee',
  RPC_URL: 'https://sepolia-rollup.arbitrum.io/rpc',
  BLOCK_EXPLORER: 'https://sepolia.arbiscan.io/',
};

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

let userAddress = null;
let protectedDataAddress = null;
let dataProtector = null;
let web3mail = null;

// UI Elements
let emailModal, emailInput, emailError, emailSubmit, loadingOverlay, loadingText, loadingSubtext;

// ============================================================================
// INITIALIZATION
// ============================================================================

console.log('🚀 Quintes Protocol - iExec Web3 Mail Integration v2.1');
console.log('📋 Enhanced UI with Modal & Loading States');

document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ DOM loaded, initializing...');
  
  // Get UI elements
  emailModal = document.getElementById('emailModal');
  emailInput = document.getElementById('emailInput');
  emailError = document.getElementById('emailError');
  emailSubmit = document.getElementById('emailSubmit');
  loadingOverlay = document.getElementById('loadingOverlay');
  loadingText = document.getElementById('loadingText');
  loadingSubtext = document.getElementById('loadingSubtext');
  
  // Get buttons
  const navbarButton = document.getElementById('joinWhitelistBtn');
  const heroButton = document.getElementById('joinWhitelistBtnHero');
  const closeModal = document.getElementById('closeModal');
  
  if (navbarButton) {
    navbarButton.addEventListener('click', handleJoinWhitelist);
    console.log('✅ Navbar button connected');
  }
  
  if (heroButton) {
    heroButton.addEventListener('click', handleJoinWhitelist);
    console.log('✅ Hero button connected');
  }
  
  // Modal controls
  if (closeModal) {
    closeModal.addEventListener('click', closeEmailModal);
  }
  
  if (emailModal) {
    emailModal.addEventListener('click', (e) => {
      if (e.target === emailModal) closeEmailModal();
    });
  }
  
  if (emailSubmit) {
    emailSubmit.addEventListener('click', handleEmailSubmit);
  }
  
  if (emailInput) {
    emailInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleEmailSubmit();
    });
    emailInput.addEventListener('input', () => {
      emailError.classList.remove('active');
    });
  }
  
  console.log('✨ Application ready!');
});

// ============================================================================
// UI HELPER FUNCTIONS
// ============================================================================

function showEmailModal() {
  emailModal.classList.add('active');
  emailInput.value = '';
  emailError.classList.remove('active');
  emailInput.focus();
}

function closeEmailModal() {
  emailModal.classList.remove('active');
}

function showLoading(text, subtext) {
  loadingText.textContent = text;
  loadingSubtext.textContent = subtext;
  loadingOverlay.classList.add('active');
}

function hideLoading() {
  loadingOverlay.classList.remove('active');
}

function showSuccess(message) {
  alert(`✅ ${message}`);
}

function showError(message) {
  alert(`❌ ${message}`);
}

// ============================================================================
// MAIN HANDLER
// ============================================================================

async function handleJoinWhitelist(event) {
  event.preventDefault();
  console.log('🎯 Join Whitelist clicked');
  
  // Check MetaMask
  if (!window.ethereum) {
    showError('MetaMask is not installed.\n\nPlease install MetaMask to continue.');
    window.open('https://metamask.io/download/', '_blank');
    return;
  }
  
  try {
    // STEP 1: Connect Wallet
    console.log('📍 Step 1: Connecting wallet...');
    showLoading('Connecting Wallet', 'Please approve in MetaMask...');
    
    await connectWallet();
    hideLoading();
    
    showSuccess(`Wallet Connected!\n\nAddress: ${userAddress.substring(0, 6)}...${userAddress.substring(38)}`);
    console.log('✅ Step 1 complete');
    
    // STEP 2: Show email modal
    console.log('📍 Step 2: Requesting email...');
    showEmailModal();
    
  } catch (error) {
    hideLoading();
    console.error('❌ Error:', error);
    
    if (error.code === 4001) {
      showError('Transaction Rejected\n\nYou rejected the connection in MetaMask.');
    } else if (error.message && error.message.includes('network')) {
      showError('Network Error\n\nPlease check your connection and try again.');
    } else {
      showError(`Error: ${error.message}\n\nPlease try again.`);
    }
  }
}

async function handleEmailSubmit() {
  const email = emailInput.value.trim();
  
  // Validate email
  if (!email || !isValidEmail(email)) {
    emailError.classList.add('active');
    emailInput.focus();
    return;
  }
  
  console.log('📧 Email provided:', email);
  emailSubmit.classList.add('loading');
  
  try {
    // Close modal
    closeEmailModal();
    
    // STEP 3: Protect email data
    console.log('📍 Step 3: Protecting email data...');
    showLoading('Encrypting Your Email', 'This may take 30-60 seconds...');
    
    protectedDataAddress = await protectEmailData(email);
    
    showSuccess(`Email Encrypted!\n\nYour email is now protected with blockchain technology.`);
    console.log('✅ Step 3 complete');
    
    // STEP 4: Grant access
    console.log('📍 Step 4: Granting access...');
    showLoading('Granting Access', 'Authorizing email access...');
    
    await grantAccess();
    
    showSuccess('Access Granted!\n\nWeb3 Mail delivery is now enabled.');
    console.log('✅ Step 4 complete');
    
    // STEP 5: Send confirmation email
    console.log('📍 Step 5: Sending confirmation email...');
    showLoading('Sending Confirmation', 'Delivering via Web3 Mail...');
    
    await sendConfirmationEmail();
    hideLoading();
    
    showSuccess('🎉 SUCCESS!\n\nYou\'re on the whitelist!\n\n📧 Check your email in 1-2 minutes.\n\nWelcome to Quintes Protocol!');
    console.log('✅ Step 5 complete');
    console.log('🎉 COMPLETE: User successfully added to whitelist');
    
  } catch (error) {
    hideLoading();
    emailSubmit.classList.remove('loading');
    console.error('❌ Error:', error);
    
    if (error.code === 4001) {
      showError('Transaction Rejected\n\nYou rejected the transaction in MetaMask.');
    } else if (error.message && error.message.includes('network')) {
      showError('Network Error\n\nPlease check your connection and try again.');
    } else {
      showError(`Error: ${error.message}\n\nPlease try again or contact support.`);
    }
  } finally {
    emailSubmit.classList.remove('loading');
  }
}

// ============================================================================
// WALLET CONNECTION
// ============================================================================

async function connectWallet() {
  try {
    console.log('🔌 Requesting wallet connection...');
    
    const accounts = await window.ethereum.request({ 
      method: 'eth_requestAccounts' 
    });
    
    if (!accounts || accounts.length === 0) {
      throw new Error('No accounts found');
    }
    
    userAddress = accounts[0];
    console.log('✅ Wallet connected:', userAddress);
    
    // Check network
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    const currentChainId = parseInt(chainId, 16);
    
    if (currentChainId !== CONFIG.NETWORK_ID) {
      console.log('⚠️ Wrong network, switching...');
      await switchToArbitrumSepolia();
    }
    
    // Initialize iExec SDKs
    dataProtector = new IExecDataProtector(window.ethereum);
    web3mail = new IExecWeb3mail(window.ethereum);
    console.log('✅ iExec SDKs initialized');
    
    return userAddress;
    
  } catch (error) {
    console.error('❌ Wallet connection failed:', error);
    throw error;
  }
}

async function switchToArbitrumSepolia() {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: CONFIG.NETWORK_HEX }],
    });
    console.log('✅ Switched to Arbitrum Sepolia');
  } catch (error) {
    if (error.code === 4902) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: CONFIG.NETWORK_HEX,
          chainName: CONFIG.NETWORK_NAME,
          nativeCurrency: {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18
          },
          rpcUrls: [CONFIG.RPC_URL],
          blockExplorerUrls: [CONFIG.BLOCK_EXPLORER]
        }]
      });
      console.log('✅ Arbitrum Sepolia network added');
    } else {
      throw error;
    }
  }
}

// ============================================================================
// iExec DATA PROTECTOR METHODS
// ============================================================================

async function protectEmailData(email) {
  try {
    console.log('🔒 Protecting email with DataProtector...');
    
    const protectedData = await dataProtector.core.protectData({
      data: { email: email },
      name: `Quintes Whitelist - ${email}`
    });
    
    console.log('✅ Email protected:', protectedData.address);
    return protectedData.address;
    
  } catch (error) {
    console.error('❌ Protect email error:', error);
    throw new Error(`Failed to protect email: ${error.message}`);
  }
}

async function grantAccess() {
  try {
    console.log('🔑 Granting access to protected data...');
    
    await dataProtector.core.grantAccess({
      protectedData: protectedDataAddress,
      authorizedUser: userAddress,
      authorizedApp: userAddress,
    });
    
    console.log('✅ Access granted');
    
  } catch (error) {
    console.error('❌ Grant access error:', error);
    throw new Error(`Failed to grant access: ${error.message}`);
  }
}

// ============================================================================
// iExec WEB3 MAIL METHODS
// ============================================================================

async function sendConfirmationEmail() {
  try {
    console.log('📨 Sending email via Web3 Mail...');
    
    const emailContent = `
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
                We'll keep you updated on our launch. Stay tuned!
              </p>
            </div>
            <p style="font-size: 14px; color: #888; margin-top: 40px;">
              This email was sent via Web3 Mail - decentralized, encrypted, and secure.
            </p>
          </div>
        </body>
      </html>
    `;
    
    const result = await web3mail.sendEmail({
      protectedData: protectedDataAddress,
      emailSubject: 'Welcome to Quintes Protocol Whitelist',
      emailContent: emailContent
    });
    
    console.log('✅ Email sent successfully');
    if (result?.taskId) {
      console.log('📋 Task ID:', result.taskId);
    }
    
  } catch (error) {
    console.error('❌ Send email error:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ============================================================================
// EVENT LISTENERS
// ============================================================================

window.ethereum?.addEventListener('accountsChanged', (accounts) => {
  console.log('🔄 Account changed:', accounts[0]);
  userAddress = accounts[0];
  if (!accounts || accounts.length === 0) {
    userAddress = null;
    protectedDataAddress = null;
  }
});

window.ethereum?.addEventListener('chainChanged', () => {
  console.log('🔄 Network changed, reloading...');
  window.location.reload();
});

console.log('✨ Ready! Click "Join Whitelist" to start.');
