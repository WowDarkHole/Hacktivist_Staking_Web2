import { app, database } from './firebaseConfig';
import { doc, collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';

const dbInstance = collection(database, 'transactions');

const alreadyAdded = async (address) => {
  let added = false;
  await getDocs(dbInstance)
    .then((data) => {
      data.docs.map((item) => {
        if (item.data().address == address) {
          added = true;
        }
      })
    });
  return added;
}

// check once reward per day
export const check24hrs = async (address) => {
  const current = new Date();
  let flg = false;
  await getDocs(dbInstance)
    .then((data) => {
      data.docs.map((item) => {
        if (item.data().address == address) {
          if (item.data().lastDate == current.getDate()) {
            flg = true;
          }
        }
      })
    });

  return flg;
}

// get firebase DocId from address
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

// get firebase native token amount from address
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

// add daily amount to address
export const deposit = async (amount, address) => {
  if (await alreadyAdded(address)) {
    const docId = await addressToDocId(address);
    const preAmount = await getDataAmount(address);
    updateDataAmount(docId, preAmount + amount, address);
  }
  else {
    addDoc(dbInstance, {
      data: amount,
      address: address,
      lastDate: current.getDate()
    })
  }
  console.log("You get $Data to your wallet!")
}

// update firebase data amount
export const updateDataAmount = (docId, amount, address) => {
  const collectionById = doc(database, 'transactions', docId);
  const current = new Date();

  updateDoc(collectionById, {
    data: amount,
    address: address,
    lastDate: current.getDate()
  })
}

