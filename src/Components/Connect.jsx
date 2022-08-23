import React, { useState } from "react"; 

import * as ROSLIB from "roslib"

function Connect({setConnection, ros}){

    const [url, setUrl] = useState("ws://localhost:9090");
    const onUrlChange = (e) => setUrl(e.value) 
    const onConnectClick=()=>{
         
        ros.connect(url);
        setConnection("wait");
        setTimeout(()=>
        { 
            if (ros.isConnected){ 
                alert("Connection succeeded")
                setConnection("connected");
            }else{

                alert("Connection failed");
                setConnection("none")
            }

        },1000)
    }

    return <div className="connect-con">
            <h1>Please Connect to ROS First</h1>
            <div className="connect-line">
                URL: {" "}
                <input value={url} onChange={onUrlChange} /> 
                <button className="connect-btn" onClick={onConnectClick}> Connect!</button>
            </div> 

        </div>

} 

export default Connect;