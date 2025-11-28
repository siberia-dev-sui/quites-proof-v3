/**
 * iExec Web3 Mail API Service
 * Handles all communication with the backend proxy
 */

// API Base URL - Configure based on environment
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Check backend health status
 * @returns {Promise<Object>} Health status
 */
export const checkHealth = async () => {
  try {
    const response = await fetch(`${API_URL}/health`);
    if (!response.ok) throw new Error('Backend not responding');
    return await response.json();
  } catch (error) {
    console.error('Health check failed:', error);
    throw new Error('Cannot connect to backend service. Please ensure the backend is running.');
  }
};

/**
 * Protect user email using iExec encryption
 * @param {string} email - User's email address
 * @returns {Promise<Object>} Protected data response
 */
export const protectEmail = async (email) => {
  try {
    console.log('🔒 Protecting email via backend API...');
    
    const response = await fetch(`${API_URL}/api/protect-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to protect email');
    }

    const data = await response.json();

    if (!data.success || !data.protectedDataAddress) {
      throw new Error('Invalid response from backend');
    }

    console.log('✅ Email protected:', data.protectedDataAddress);
    return data;

  } catch (error) {
    console.error('❌ Protect email error:', error);
    if (error.message === 'Failed to fetch') {
      throw new Error('Cannot connect to backend service. Please ensure the backend is running.');
    }
    throw error;
  }
};

/**
 * Grant app access to protected data
 * @param {string} protectedDataAddress - Address from protectEmail
 * @param {string} userAddress - User's wallet address
 * @returns {Promise<Object>} Grant access response
 */
export const grantAccess = async (protectedDataAddress, userAddress) => {
  try {
    console.log('🔑 Granting access via backend API...');
    
    const response = await fetch(`${API_URL}/api/grant-access`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        protectedDataAddress,
        userAddress
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to grant access');
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error('Invalid response from backend');
    }

    console.log('✅ Access granted');
    return data;

  } catch (error) {
    console.error('❌ Grant access error:', error);
    if (error.message === 'Failed to fetch') {
      throw new Error('Cannot connect to backend service. Please ensure the backend is running.');
    }
    throw error;
  }
};

/**
 * Send confirmation email via Web3 Mail
 * @param {string} protectedDataAddress - Address from protectEmail
 * @returns {Promise<Object>} Send email response
 */
export const sendConfirmationEmail = async (protectedDataAddress) => {
  try {
    console.log('📨 Sending email via backend API...');
    
    const response = await fetch(`${API_URL}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ protectedDataAddress })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send email');
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error('Invalid response from backend');
    }

    console.log('✅ Email sent successfully');
    if (data.taskId) {
      console.log('📋 Task ID:', data.taskId);
    }

    return data;

  } catch (error) {
    console.error('❌ Send email error:', error);
    if (error.message === 'Failed to fetch') {
      throw new Error('Cannot connect to backend service. Please ensure the backend is running.');
    }
    throw error;
  }
};

/**
 * Complete Web3 Mail whitelist flow
 * @param {string} email - User's email
 * @param {string} userAddress - User's wallet address
 * @param {Function} onProgress - Progress callback (step, message)
 * @returns {Promise<Object>} Complete flow result
 */
export const completeWhitelistFlow = async (email, userAddress, onProgress = () => {}) => {
  try {
    // Step 1: Check backend health
    onProgress(1, 'Checking backend connection...');
    await checkHealth();

    // Step 2: Protect email
    onProgress(2, 'Encrypting your email with iExec...');
    const protectResult = await protectEmail(email);
    const protectedDataAddress = protectResult.protectedDataAddress;

    // Step 3: Grant access
    onProgress(3, 'Granting secure access...');
    await grantAccess(protectedDataAddress, userAddress);

    // Step 4: Send confirmation email
    onProgress(4, 'Sending confirmation via Web3 Mail...');
    const emailResult = await sendConfirmationEmail(protectedDataAddress);

    // Success!
    onProgress(5, 'Success! Check your email.');

    return {
      success: true,
      protectedDataAddress,
      taskId: emailResult.taskId
    };

  } catch (error) {
    console.error('❌ Whitelist flow error:', error);
    throw error;
  }
};

// Export all functions
export default {
  checkHealth,
  protectEmail,
  grantAccess,
  sendConfirmationEmail,
  completeWhitelistFlow
};

