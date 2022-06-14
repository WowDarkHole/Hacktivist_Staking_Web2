import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Typewriter from 'typewriter-effect';
import { Modal } from "react-responsive-modal";
import TextTruncate from 'react-text-truncate';
import { checkHolder } from './checkTokenHolder';
import { deposit, reverse, getDataAmount, check24hrs } from './wallet';

//Styles
import styles from '../styles/Home.module.css';
import "react-responsive-modal/styles.css";

//Resources
import Logo from '../src/image/logo.png';
import Robot_BG from '../src/image/robot.svg';
import BG from '../src/image/bg.png'
import { Alert } from 'react-bootstrap';

export default function Home() {

  const [toggle, setToggle] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [holdStatus, setHoldStatus] = useState(false);
  const [holdNftAmount, setHoldNftAmount] = useState(0);

  //Wallet Address
  const [address, setAddress] = useState('Connect Wallet');

  const changeToggle = () => {
    setToggle(!toggle);
  }
  const setModal = () => {
    setModalState(true);
  }
  const closeModal = () => {
    setModalState(false);
  }

  const startStaking = () => {

  }

  const stopStaking = () => {

  }

  const onConnectWallet = () => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(res => {
          // Return the address of the wallet
          setAddress(res[0]);
          if (checkHolder(res[0])) { // returns hold nft amount
            setHoldStatus(true);
            setHoldNftAmount(checkHolder(res[0]));
          }
          console.log(res[0])
        })
    } else {
      alert("install metamask extension!!")
    }
  }

  const depositToWallet = () => {
    check24hrs();
    // getDataAmount(address);
    // if (holdStatus) {
    //   deposit(10, address);
    // }
    // else {
    //   alert("You are not a token Holder!")
    // }
  }

  return (
    <div className="mx-auto relative">
      <Head>
        <title>METASCALE</title>
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet" /> */}
      </Head>
      <nav className="border-gray-200 rounded dark:bg-gray-800 bg-transparent sticky z-20" role="navigation">
        {/* <div className="bg-[#003949] h-16"></div> */}
        <div className="flex flex-wrap justify-between lg:justify-around items-center mx-auto bg-[#151515]">
          <a href="#" className="flex">
            <div className="text-5xl font-bold text-[#003949]">
              <Image src={Logo} className="w-auto" width={50} height={50} />
              {/* <span>METASCALE</span> */}
            </div>
          </a>
          <div>
            <span className="text-white text-4xl font-black">HACKTIVIST</span>
          </div>
          <div className={`${toggle ? '' : 'hidden'} justify-between items-center w-full md:flex md:w-auto md:order-1`} id="mobile-menu-4">
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 sm:text-xl md:text-xl lg:text-2xl items-center">
              {/* <li>
                <a href="#" className="block py-2 text-white bg-[#2aad92] rounded md:bg-transparent  hover:text-[#2aad92] active:text-[#2aad92] focus:text-[#2aad92] md:p-0 dark:text-white pixel-font" aria-current="page">HOME</a>
              </li>
              <li>
                <a href="#" className="block py-2 text-white bg-[#2aad92] rounded md:bg-transparent hover:text-[#2aad92] active:text-[#2aad92] focus:text-[#2aad92] md:p-0 dark:text-white pixel-font" aria-current="page">ROADMAP</a>
              </li>
              <li>
                <a href="#" className="block py-2 text-white bg-[#2aad92] rounded md:bg-transparent hover:text-[#2aad92] active:text-[#2aad92] focus:text-[#2aad92] md:p-0 dark:text-white pixel-font" aria-current="page">TEAM</a>
              </li> */}
              {/* <li>
                <button className="bg-[#003949] hover:bg-blue-700 text-white py-1 px-2 rounded-full text-base" onClick={() => { }}> Staking </button>
              </li> */}
              <li>
                <button className="bg-[#003949] hover:bg-blue-700 text-white py-1 px-2 rounded-full text-base" onClick={() => depositToWallet()}> Get $Data </button>
              </li>
              <div className="z-50">
                <button className="bg-[#003949] hover:bg-blue-700 text-white py-1 px-2 rounded-full text-base" onClick={() => onConnectWallet()}>
                  <TextTruncate line={1} element="span" truncateText="..." text={address} />
                </button>
                <button data-collapse-toggle="mobile-menu-4" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-4" aria-expanded="false" onClick={() => changeToggle()}>
                  <span className="sr-only pixel-font">Open main menu</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                  <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
              </div>
            </ul>
          </div>
        </div>
      </nav >
      <div className="bg-black relative" >
        <Image src={BG}></Image>
      </div>
      {/* <div className="absolute bg-white top-1/3 left-1/3" >
        <div className="relative">
          <div>
            <span>Stake NFT Amount: </span>
            <select>
              {

              }
            </select>
          </div>
          <div>
            <span>Staked Properties: </span>
            <span> 2 NFTs from 01/05/2022 (40 days)</span>
          </div>
          <div>
            <button>Start Staking</button>
            <button>Stop Staking</button>
          </div>
        </div>
      </div> */}
    </div >
  )
}
