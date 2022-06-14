import { app, database } from './firebaseConfig';
import { doc, collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';

const dbInstance = collection(database, 'transactions');

// const [notesArray, setNotesArray] = useState([]);

const alreadyAdded = async (address) => {
  console.log("yeap:", address);
  let added = false;
  await getDocs(dbInstance)
    .then((data) => {
      data.docs.map((item) => {
        if (item.data().address == address) {
          console.log("already exist()")
          added = true;
        }
      })
    });
  return added;
}

export const check24hrs = async (address) => {
  const current = new Date();
  await getDocs(dbInstance)
    .then((data) => {
      data.docs.map((item) => {
        if (item.data().address == address) {
          if (address.lastDate == current.getDate()) {

          }
        }
      })
    });
  console.log(current.getDate());
}

const addressToDocId = async (address) => {
  let docId = "";
  await getDocs(dbInstance)
    .then((data) => {
      data.docs.map((item) => {
        if (item.data().address == address) {
          docId = item.id;
        }
      })
    });
  return docId;
}

export const getDataAmount = async (address) => {
  let addressToAmount = 0;
  await getDocs(dbInstance)
    .then((data) => {
      console.log(data.docs.map((item) => {
        if (item.data().address == address) {
          addressToAmount = item.data().data;
        }
      }));
    })
  return addressToAmount;
}

export const deposit = async (amount, address) => {
  // let val = getDataAmount(address) + amount;

  if (await alreadyAdded(address)) {
    const docId = await addressToDocId(address);
    const preAmount = await getDataAmount(address);
    console.log("Docid: ", docId);
    console.log("preAmount: ", preAmount);
    updateDataAmount(docId, preAmount + amount, address);
  }
  else {
    addDoc(dbInstance, {
      data: amount,
      address: address
    })
  }
  console.log("You get 10 $Data to your wallet!")
}

export const updateDataAmount = (docId, amount, address) => {
  const collectionById = doc(database, 'transactions', docId)

  updateDoc(collectionById, {
    data: amount,
    address: address
  })
}

