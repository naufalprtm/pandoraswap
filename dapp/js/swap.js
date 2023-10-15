let web3; // Objek Web3
let contractAddress = "0xYourContractAddress"; // Gantilah dengan alamat kontrak cerdas yang benar
let contractABI = [
  {
    "constant": false,
    "inputs": [
      {"name": "fromToken", "type": "address"},
      {"name": "toToken", "type": "address"},
      {"name": "amount", "type": "uint256"}
    ],
    "name": "swapTokens",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
let contractInstance;

// Inisialisasi Web3 dan kontrak cerdas
async function initWeb3() {
  // Pastikan MetaMask terpasang dan terhubung ke BSC
  if (typeof window.ethereum !== 'undefined') {
    web3 = new Web3(window.ethereum);
    try {
      // Request akun pengguna
      await window.ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      // Inisialisasi instance kontrak cerdas
      contractInstance = new web3.eth.Contract(contractABI, contractAddress);
      return accounts[0]; // Kembalikan alamat pengguna
    } catch (error) {
      console.error("User denied account access or other error:", error);
      return null;
    }
  } else {
    console.error("MetaMask not found or not connected to BSC.");
    return null;
  }
}

// Fungsi untuk melakukan swap
async function swapTokens() {
  const fromToken = document.getElementById("from-token").value;
  const toToken = document.getElementById("to-token").value;
  const amount = parseFloat(document.getElementById("amount").value);

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  const userAddress = await initWeb3();
  if (!userAddress) return;

  try {
    // Panggil fungsi swap pada kontrak cerdas
    await contractInstance.methods.swapTokens(fromToken, toToken, web3.utils.toWei(amount.toString())).send({from: userAddress});
    alert(`Swapped ${amount} ${fromToken} to ${toToken}.`);
  } catch (error) {
    console.error('Error swapping tokens:', error);
    alert('An error occurred while swapping tokens.');
  }
}
