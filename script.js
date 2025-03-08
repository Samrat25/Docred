const Web3 = require('web3');
const web3 = new Web3(window.ethereum);
let contract;
let account;

const contractAddress = '0xa049603Cf9EDAFf4e5bFFA3c0c5701bf3050fE73';
const abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "student",
				"type": "address"
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
				"internalType": "string",
				"name": "institution",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "graduationYear",
				"type": "uint256"
			}
		],
		"name": "CredentialAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "student",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "verified",
				"type": "bool"
			}
		],
		"name": "CredentialVerified",
		"type": "event"
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
				"internalType": "string",
				"name": "_institution",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_graduationYear",
				"type": "uint256"
			}
		],
		"name": "addCredential",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "credentials",
		"outputs": [
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
				"internalType": "string",
				"name": "institution",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "graduationYear",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "verified",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_student",
				"type": "address"
			}
		],
		"name": "getCredential",
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
				"internalType": "address",
				"name": "_student",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "_verified",
				"type": "bool"
			}
		],
		"name": "verifyCredential",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

window.onload = async function () {
    if (window.ethereum) {
        await window.ethereum.enable();
        web3.eth.getAccounts().then(accounts => {
            account = accounts[0];
        });
        contract = new web3.eth.Contract(abi, contractAddress);
    } else {
        alert('Please install MetaMask!');
    }
};

document.getElementById('credentialForm').onsubmit = async function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const degree = document.getElementById('degree').value;
    const institution = document.getElementById('institution').value;
    const graduationYear = document.getElementById('graduationYear').value;

    await contract.methods.addCredential(name, degree, institution, graduationYear).send({ from: account });
};

document.getElementById('verifyButton').onclick = async function () {
    const studentAddress = document.getElementById('studentAddress').value;
    await contract.methods.verifyCredential(studentAddress, true).send({ from: account });
};

document.getElementById('checkButton').onclick = async function () {
    const studentAddress = document.getElementById('checkAddress').value;
    const credentials = await contract.methods.getCredential(studentAddress).call();
    document.getElementById('result').innerHTML = `
        Name: ${credentials[0]}<br>
        Degree: ${credentials[1]}<br>
        Institution: ${credentials[2]}<br>
        Graduation Year: ${credentials[3]}<br>
        Verified: ${credentials[4] ? 'Yes' : 'No'}
    `;
};
