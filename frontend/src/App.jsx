import React, { useState, useEffect } from "react";
import { ethers } from 'ethers';
import { Container } from '@mui/material';

import { Header } from "./Header";

import abi from './unils/WavePortal.json';
import { BackgroundStars } from "./BackgroundStars/BackgroundStars";
import { Gentlemen } from "./Gentlemen";

export const App = () => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [totalPets, setTotalPets] = useState(0);
    const [petting, setPetting] = useState(false);
    const [gentlemen, setGentlemen] = useState([]);

    const contractAddress = "0x6ebbA0D4600Df68e5C4C99f289e291cf5de96A48";
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

    const petAFrog = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

                let count = await wavePortalContract.getTotalPets();
                console.log("Retrieved total wave count...", count.toNumber());


                const waveTxn = await wavePortalContract.petAFrog();
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

    const getGentleman = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

                let blockChainGentlemen = await wavePortalContract.getGentelmen();
                // console.log("Retrieved gentlemen...", gentelman);
                setGentlemen(blockChainGentlemen)

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
        getGentleman();

        setInterval(() => {
            getTotalPets();
            getGentleman();
        }, 5000);
    }, [])

    return (
        <Container style={{
            width: "100vw",
            height: "100vh",
            boxSizing: "border-box",
            display: "flex",
            justifyContent: 'center',
            padding: '30px',
        }}>
            <BackgroundStars />
            <Container>
                <Header
                    currentAccount={currentAccount}
                    petAFrog={petAFrog}
                    connectWallet={connectWallet}
                    totalPets={totalPets}
                    petting={petting}
                />
                <Gentlemen
                    list={gentlemen} 
                />
            </Container>

        </Container>
    )
}
