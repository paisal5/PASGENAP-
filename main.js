  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwZk_BSxdm6_VJsVPI2Ne8S3RO5pi0-lg",
  authDomain: "paisal-abret.firebaseapp.com",
  projectId: "paisal-abret",
  storageBucket: "paisal-abret.appspot.com",
  messagingSenderId: "368318578592",
  appId: "1:368318578592:web:491e88e8b6eee503d72ec5",
  measurementId: "G-7Q534CCZNV"
};
// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarPembeli() {
  const refDokumen = collection(db, "pembeli");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
     nama: dok.data().nama,
      alamat: dok.data().alamat,
      noTlpn: dok.data().noTlpn,
    });
  });
  
  return hasil;
}

export function formatAngka(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function  tambahPembeli(nama, alamat, noTlpn) {
  try {
    const dokRef = await addDoc(collection(db, 'pembeli'),{
      nama: nama,
      alamat: alamat,
      noTlpn: noTlpn
    });
    console.log('Berhasil menambah pembeli' + dokRef.id);
  } catch (e) {
    Console.log('Gagal menambah pembeli' + e);
  }

}
export async function hapusPembeli(docId) {
  await deleteDoc(doc(db, "pembeli", docId));
} 

export async function ubahPembeli(docId, nama, alamat, noTlpn) {
  await updateDoc(doc(db, "pembeli", docId), {
    nama: nama,
    alamat: alamat,
    noTlpn: noTlpn
  });
}
export async function ambilPembeli(docId) {
  const docRef = await doc(db, "pembeli", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}