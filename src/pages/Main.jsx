
import React, { useEffect, useState } from "react";
import * as ROSLIB from "roslib"
import "../styles/Main.css"
import * as Comp from "../Components"
function Main(){
    const [connected, setConnection] = useState("none");
    const [ros]=useState(new ROSLIB.Ros());
    const [cloiList, setClois] = useState(["cloi1", "cloi2", "cloi3"]);
    useEffect(()=>{ 
        if(!ros){
            setConnection("none");
            return;
        }else if (!ros?.isConnected){

            setConnection("none");
            return;
        }
    },[ros])

    const onDisconnectClick=() =>{
        setConnection("none");
        ros?.close();
        alert("ros disconnected!")
    }
 
    if (connected==="wait"){
        return <h1>Please wait for connecting...</h1>
    }else if (connected==="connected"){
        return <div className="main-con">
            <button className="main-disconnect-btn" onClick={onDisconnectClick}>ROS Disconnect</button>
            {cloiList.map((namespace) =>
                <Comp.CloiControl key ={namespace} ros={ros} namespace={namespace}/>
            )}    
        </div>
    }
    else {
        return <Comp.Connect setConnection={setConnection} ros={ros}/>
    }
    

}

export default Main;