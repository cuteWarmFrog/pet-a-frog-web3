import React, { useState, useEffect } from "react";
import { ethers } from 'ethers';
import { Container } from '@mui/material';

import { Header } from "./Header";

import abi from './unils/WavePortal.json';
import { BackgroundStars } from "./BackgroundStars/BackgroundStars";
import { Gentlemen } from "./Gentlemen";
import { LeaderBord } from "./LeaderBoard";

export const App = () => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [totalPets, setTotalPets] = useState(0);
    const [petting, setPetting] = useState(false);
    const [pets, setPets] = useState([]);

    const contractAddress = "0xA27758f624969A082C849016AD8EA1646d66CD92";
    const contractABI = abi.abi;

    const checkIfWalletIsConnected = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                console.log("Make sure you have metamask!");
                return;
            } else {
                console.log("We have the ethereum object", ethereum);
            }

            const accounts = await ethereum.request({ method: 'eth_accounts' });

            if (accounts.length !== 0) {
                const account = accounts[0];
                console.log("Found an authorized account:", account);
                setCurrentAccount(account);
            } else {
                console.log("No authorized account found")
            }
        } catch (error) {
            console.log(error);
        }
    }

    const connectWallet = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                alert("Get MetaMask!");
                return;
            }

            const accounts = await ethereum.request({ method: "eth_requestAccounts" });

            console.log("Connected", accounts[0]);
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error)
        }
    }

    const getTotalPets = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

                let count = await wavePortalContract.getTotalPets();
                count = parseInt(count._hex, 16);
                setTotalPets(count)
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error)
        }
    }

    const petAFrog = async (message) => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

                let count = await wavePortalContract.getTotalPets();
                console.log("Retrieved total wave count...", count.toNumber());


                const waveTxn = await wavePortalContract.petAFrog(message);
                setPetting(true);
                console.log("Mining...", waveTxn.hash);

                await waveTxn.wait();
                console.log("Mined -- ", waveTxn.hash);
                setPetting(false);

                count = await wavePortalContract.getTotalPets();
                console.log("Retrieved total wave count...", count.toNumber());
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getPets = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

                let blockchainPets = await wavePortalContract.getAllPets();
                // console.log(blockchainPets);
                let finePets = blockchainPets.map(el => {
                    return {
                        address: el.petter,
                        message: el.message,
                        time: new Date(el.timestamp._hex * 1000).toString().split(' ').slice(0, 5).join(' '),
                    }
                })
                setPets(finePets);

            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTotalPets()
        checkIfWalletIsConnected();
        getPets();

        setInterval(() => {
            getTotalPets();
            getPets();
        }, 3000);
    }, [])

    return (
        <Container style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '100vw'
        }}>
            <BackgroundStars />
            <Container style={{
                maxWidth: '100vw',
                width: '100vw',
                height: '100vh',
                boxSizing: 'border-box',
                display: 'flex',
                justifyContent: 'center',
                padding: '30px',
            }}>
                {currentAccount && (
                    <LeaderBord list={pets} />
                )}
                <Header
                    currentAccount={currentAccount}
                    petAFrog={petAFrog}
                    connectWallet={connectWallet}
                    totalPets={totalPets}
                    petting={petting}
                />
                {currentAccount && (
                    <Gentlemen list={pets} />
                )}

            </Container>
        </Container>
    )
}
