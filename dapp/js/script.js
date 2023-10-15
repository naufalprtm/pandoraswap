async function updateAccountInfo() {
    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const userAddress = accounts[0];
        const userBalance = await ethereum.request({ method: 'eth_getBalance', params: [userAddress, 'latest'] });

        document.getElementById('user-address').innerText = userAddress;
        document.getElementById('user-balance').innerText = parseFloat(ethereum.utils.fromWei(userBalance, 'ether')).toFixed(2);

        // Show account info
        document.getElementById('account-info').style.display = 'block';
    } catch (error) {
        console.error('Error updating account info:', error);
    }
}

async function connectMetamask() {
    try {
        // Request account access
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

        const userAddress = accounts[0];
        const userBalance = await ethereum.request({ method: 'eth_getBalance', params: [userAddress, 'latest'] });

        // Update user address
        const userAddressElement = document.getElementById('user-address');
        if (userAddressElement) {
            userAddressElement.innerText = userAddress;
        }

        // Update user balance
        const userBalanceElement = document.getElementById('user-balance');
        if (userBalanceElement) {
            userBalanceElement.innerText = parseFloat(ethereum.utils.fromWei(userBalance, 'ether')).toFixed(2);
        }
        
        // Update UI to show connected wallet
        const walletConnectedMessage = document.getElementById('wallet-connected-message');
        walletConnectedMessage.innerText = `Wallet connected: ${userAddress}`;
        walletConnectedMessage.style.display = 'block';

        // Show account info
        const accountInfoElement = document.getElementById('account-info');
        if (accountInfoElement) {
            accountInfoElement.style.display = 'block';
        }
    } catch (error) {
        console.error('Error connecting to Metamask:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Check if MetaMask is installed
    if (typeof ethereum !== 'undefined') {
        // MetaMask is installed
        const connectButton = document.getElementById('toggle-button');
        connectButton.addEventListener('click', connectMetamask);
    } else {
        // MetaMask is not installed
        console.error('MetaMask is not installed.');
    }
});
