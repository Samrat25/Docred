// Connect to the blockchain using Web3.js
const web3 = new Web3(window.ethereum);
let contract;
let account;

const contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "certificateId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "degree",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			}
		],
		"name": "CertificateIssued",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_certificateId",
				"type": "uint256"
			}
		],
		"name": "invalidateCertificate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_degree",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_recipient",
				"type": "address"
			}
		],
		"name": "issueCertificate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "certificateCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "certificates",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "degree",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "dateIssued",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "isValid",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_certificateId",
				"type": "uint256"
			}
		],
		"name": "getCertificate",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_certificateId",
				"type": "uint256"
			}
		],
		"name": "verifyCertificate",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const contractAddress = "0xdE595E08B81b80d2BCd91c600a710478a7dAb306"; // Your contract address

// Initialize MetaMask and contract
async function init() {
    if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        account = await web3.eth.getAccounts();
        console.log("Connected Account:", account[0]);

        contract = new web3.eth.Contract(contractABI, contractAddress);
    } else {
        alert("Please install MetaMask!");
    }
}

window.addEventListener('load', init);

// Issue Certificate
document.getElementById("issueForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const degree = document.getElementById("degree").value;
    const address = document.getElementById("address").value;

    try {
        await contract.methods.issueCertificate(name, degree, address).send({ from: account[0] });
        alert("Certificate Issued Successfully!");
    } catch (error) {
        console.error("Error issuing certificate:", error);
        alert("Error issuing certificate.");
    }
});

// Verify Certificate
document.getElementById("verifyBtn").addEventListener("click", async () => {
    const certificateId = document.getElementById("certificateId").value;
    try {
        const isValid = await contract.methods.verifyCertificate(certificateId).call();
        const resultText = isValid ? "Certificate is valid!" : "Certificate is invalid!";
        document.getElementById("verificationResult").innerText = resultText;
    } catch (error) {
        console.error("Error verifying certificate:", error);
        document.getElementById("verificationResult").innerText = "Error verifying certificate.";
    }
});

// Get Certificate Details
document.getElementById("getCertificateBtn").addEventListener("click", async () => {
    const certificateId = document.getElementById("certificateId").value;
    try {
        const certificate = await contract.methods.getCertificate(certificateId).call();
        document.getElementById("certificateDetails").innerText = `
            Name: ${certificate[0]}
            Degree: ${certificate[1]}
            Date Issued: ${new Date(certificate[2] * 1000).toLocaleDateString()}
            Recipient: ${certificate[3]}
            Valid: ${certificate[4] ? "Yes" : "No"}
        `;
    } catch (error) {
        console.error("Error fetching certificate details:", error);
        document.getElementById("certificateDetails").innerText = "Error fetching certificate details.";
    }
});
