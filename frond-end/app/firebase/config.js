
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyDlbPaxkE79_QNQ8_sAO3izNvfYddLBa8Y",
  authDomain: "gamershubtn-d9e43.firebaseapp.com",
  projectId: "gamershubtn-d9e43",
  storageBucket: "gamershubtn-d9e43.appspot.com",
  messagingSenderId: "1076671216519",
  appId: "1:1076671216519:web:3804e80c420d536814f122"
}




const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default { app, analytics };