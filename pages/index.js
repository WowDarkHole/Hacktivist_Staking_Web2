import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Typewriter from 'typewriter-effect';
import { Modal } from "react-responsive-modal";
import TextTruncate from 'react-text-truncate';
import { deposit, reverse, getDataAmount, check24hrs } from './wallet';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getHolders } from './web3';

//Styles
import styles from '../styles/Home.module.css';
import "react-responsive-modal/styles.css";

//Resources
import Logo from '../src/img/logo.png';
import BG from '../src/img/bg.png'

export default function Home() {

  const [toggle, setToggle] = useState(false);
  const [metamask, setMetamask] = useState(false);
  const [dataAmount, setDataAmount] = useState(0);

  //Wallet Address
  const [address, setAddress] = useState('Connect Wallet');

  const notifyUnAvailable = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const changeToggle = () => {
    setToggle(!toggle);
  }

  const onConnectWallet = async () => {
    let addressBump = '';
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(res => {
          // Return the address of the wallet
          setMetamask(true);
          setAddress(res[0]);
          addressBump = res[0]
        })
    } else {
      notifyUnAvailable('Please install Metamask!')
    }

    const dataM = await getDataAmount('0x658137f5C91804D5C5F984cf8C4803a8b42caA18');
    setDataAmount(dataM);
  }

  const depositToWallet = async () => {
    if (metamask) {
      const id = toast.loading("Please wait...")
      const holdTokens = await getHolders(address);
      let tokenAmount = 0;
      tokenAmount = holdTokens.length;
      console.log("TokenAmount:", tokenAmount)
      if (tokenAmount) {

        const checkDaily = await check24hrs(address);
        if (!checkDaily) {
          setDataAmount(await deposit(10 * tokenAmount, address));
          toast.update(id, { render: "🦄 Wow! You get the daily reward!", type: "success", isLoading: false, closeOnClick: true, draggable: true, autoClose: 3000 });
        }
        else
          toast.update(id, { render: "🦄 Sorry! You already get the daily reward or You're not connected to network!", type: "error", isLoading: false, closeOnClick: true, draggable: true, autoClose: 3000 });
      }
      else {
        toast.update(id, { render: "🦄 Sorry! You are not a token Holder!", type: "error", isLoading: false, closeOnClick: true, draggable: true, autoClose: 3000 });
      }
    }
    else {
      notifyUnAvailable('Please connect your Metamask!')
    }

  }

  return (
    <div className="mx-auto relative bg-[url('/img/bg.png')] bg-auto bg-cover bg-black overflow-hidden" >
      <Head>
        <title>METASCALE</title>
      </Head>
      <nav className="border-gray-200 rounded dark:bg-gray-800 bg-transparent sticky z-20" role="navigation">
        <div className="flex flex-wrap justify-between lg:justify-around items-center mx-auto bg-[#151515]">
          <a href="#" className="flex">
            <div className="text-5xl font-bold text-[#003949] mx-32">
              <Image src={Logo} className="w-auto" width={50} height={50} />
            </div>
          </a>
          <div className="mx-3">
            <span className="text-white text-4xl font-black">HACKTIVIST</span>
          </div>
          <div className={`${toggle ? '' : 'hidden'} justify-between items-center w-full md:flex md:w-auto md:order-1 mx-9`} id="mobile-menu-4">
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 sm:text-xl md:text-xl lg:text-2xl items-center">

              <li>
                <button className="bg-[#003949] hover:bg-blue-700 text-white py-1 px-2 rounded-full text-base" onClick={() => depositToWallet()}> Staking </button>
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
              <li className="text-white text-sm">
                <span>{dataAmount} </span>
                <span>$Data</span>
              </li>
            </ul>
          </div>
        </div>
      </nav >
      {/* <div className="bg-fixed" >
        <Image src={BG}></Image>
      </div> */}
      <div className="h-screen w-screen">

      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
    </div >
  )
}
