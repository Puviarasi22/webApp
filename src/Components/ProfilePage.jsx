import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../providers/UserProvider";
import { navigate } from "@reach/router";
import {auth} from "../firebase";
import firebase from "../firebase";

const ProfilePage = () => {
  const user = useContext(UserContext);
  const {photoURL, displayName, email} = user;
  console.log(user);
  
  const [Temperature, settemp] = useState(0);

  const [Humidity, sethum] = useState(0);
  const [bpm, setbpm] = useState(0);
  const [sp02, setsp02] = useState(0);

  useEffect(() => {
    const getValue1 = firebase.database().ref("data/Temperature");
    getValue1.on("value", snapshot => {
      let value1 = snapshot.val();
      settemp(value1.toFixed(2));
      console.log(value1);
    });
    const getValue2 = firebase.database().ref("data/Humidity");
    getValue2.on("value", snapshot => {
      let value2 = snapshot.val();
      sethum(value2.toFixed(2));
      console.log(value2);
    });
    const getValue3 = firebase.database().ref("data/BPM");
    getValue3.on("value", snapshot => {
      let value3 = snapshot.val();
      setbpm(value3.toFixed(2));
      console.log(value3);
    });
    const getValue4 = firebase.database().ref("data/SP02");
    getValue4.on("value", snapshot => {
      let value4 = snapshot.val();
      setsp02(value4.toFixed(2));
      console.log(value4);
    });
  });


  return (

    <div className = "mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">
      <div className="flex border flex-col items-center md:flex-row md:items-start border-blue-400 px-3 py-4">
        <div
          style={{
            background: `url(${photoURL || 'https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png'})  no-repeat center center`,
            backgroundSize: "cover",
            height: "200px",
            width: "200px"
          }}
          className="border border-blue-300"
        ></div>
        <div className = "md:pl-4">
        <h2 className = "text-2xl font-semibold">{displayName}</h2>
        
        <h3 className = "italic">{email}</h3>
        
        </div>
        
       
        
      </div>
      <h1 style={{color: "red", backgroundColor: "lightyellow", fontSize: 30, padding: "50px"}}>BPM: {bpm}</h1>
      <h1 style={{color: "red", backgroundColor: "lightyellow", fontSize: 30, padding: "50px"}}>SPO2: {sp02}</h1>
      <h1 style={{color: "red", backgroundColor: "lightyellow", fontSize: 30, padding: "50px"}}>Temperature: {Temperature}</h1>
      <h1 style={{color: "red", backgroundColor: "lightyellow", fontSize: 30, padding: "50px"}}>Humidity: {Humidity}</h1>
      <h1 style={{color: "red", backgroundColor: "lightyellow", fontSize: 30, padding: "50px"}}>EMP ID: 2342342 BPM: 60       SPO2: 98         Temperature: 32              Humidity: 67 {Humidity}</h1>
      <h1 style={{color: "red", backgroundColor: "lightyellow", fontSize: 30, padding: "50px"}}>EMP ID: 5674567 BPM: 70       SPO2: 99         Temperature: 32.5            Humidity: 70 {Humidity}</h1>
      <button className = "w-full py-3 bg-red-600 mt-4 text-white" onClick = {() => {auth.signOut()}}>Sign out</button>
    </div>
  ) 
};

export default ProfilePage;

