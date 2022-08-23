import React, { useEffect, useState } from "react";

import * as ROSLIB from "roslib"
import "../styles/CloiControl.css"

function CloiControl({ros, namespace}){

    const [topic, setTopic] = useState();
    const [imgsrc, setImgsrc] = useState("");
    const [twistMsg, setMsg]=useState({
        linear:{
            x:0.0, y:0.0, z:0.0
        },
        angular:{
            x:0.0, y:0.0, z:0.0
        }
    }) 
    useEffect(()=>{
        if(ros.isConnected){
            let top = new ROSLIB.Topic({
                ros:ros,
                name: `/${namespace}/cmd_vel`,
                messageType:'geometry_msgs/Twist'
            });
            setTopic(top)
            let listener = new ROSLIB.Topic({
                ros: ros,
                name: `/${namespace}/camera/color/image_raw/compressed`,
                messageType:'sensor_msgs/msg/CompressedImage'
            });
            console.log(top, listener)
            listener.subscribe((x)=>setImgsrc("data:image/jpg;base64,"+x.data)); 
        }
    },[]);


    function sendTwist(msg){
        console.log("send Twist msg:", msg);
        topic.publish(msg);
    }

    const onForwadClick=()=>{
        let msg = {...twistMsg};
        msg.linear.x=1;
        setMsg(msg);
        sendTwist(msg);
    }
    
    const onBackwardClick=()=>{
        let msg = {...twistMsg};
        msg.linear.x=-1;
        setMsg(msg);
        sendTwist(msg);
    }
    const onLeftlick=()=>{
        let msg = {...twistMsg};
        msg.angular.z=0.25;
        setMsg(msg);
        sendTwist(msg);
    }
    const onRightClick=()=>{
        let msg = {...twistMsg};
        msg.angular.z=-0.25;
        setMsg(msg);
        sendTwist(msg);
    }
    const onStopClick=()=>{
        let msg = {
            linear:{
            x:0.0,y:0.0, z:0.0
            },
            angular:{
                x:0.0, y:0.0, z:0.0
            }
        }
        setMsg(msg);
        sendTwist(msg);
    }

    return(
        <div className="control-con">
        <div className="cloi-con">

               {namespace} Robot Control
            <div className="cloi-btn-con">
                <button className="cloi-btn" onClick={onForwadClick}> go forward</button>
                <button className="cloi-btn" onClick={onBackwardClick}> go backward</button>
                <button className="cloi-btn" onClick={onLeftlick}> turnleft</button>
                <button className="cloi-btn" onClick={onRightClick}> turn right</button>
                <button className="cloi-btn" onClick={onStopClick}> stop</button>
            </div>
            <br/> 
            <div className="cloi-cam-con">
                <img src={imgsrc} alt="" />

            </div>
        </div>
 
    </div>
    )
}


export default CloiControl;