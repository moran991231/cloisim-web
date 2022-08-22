
import React, { useEffect, useState } from "react";
import * as ROSLIB from "roslib"
import "../styles/Main.css"
function Main(){
    const [topic, setTopic] = useState();
    const [twistMsg, setMsg]=useState({
        linear:{
            x:0.0, y:0.0, z:0.0
        },
        angular:{
            x:0.0, y:0.0, z:0.0
        }
    }) 
    const [imgsrc, setImgsrc] = useState("");
    useEffect(()=>{
        const ros = new ROSLIB.Ros();
        ros.connect("ws://localhost:9090")
        setTimeout(()=>
        {
            console.log("ros connect? ", ros.isConnected)  
            if (ros.isConnected){
                setTopic(new ROSLIB.Topic({
                    ros:ros,
                    name:'/cloi1/cmd_vel',
                    messageType:'geometry_msgs/Twist'
                }))
                let listener = new ROSLIB.Topic({
                    ros: ros,
                    name: '/cloi1/camera/color/image_raw/compressed',
                    messageType:'sensor_msgs/msg/CompressedImage'
                });
                listener.subscribe((x)=>setImgsrc("data:image/jpg;base64,"+x.data)); 
            }

        },1000)
    },[])



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
    if (!topic){
        return <h1> Please wait connection...</h1>
    }
    return <div className="main-con">
        <div className="cloi-con">

                Robot Control
            <div className="cloi-btn-con">
                <button className="cloi-btn" onClick={onForwadClick}> go forward</button>
                <button className="cloi-btn" onClick={onBackwardClick}> go backward</button>
                <button className="cloi-btn" onClick={onLeftlick}> turnleft</button>
                <button className="cloi-btn" onClick={onRightClick}> turn right</button>
                <button className="cloi-btn" onClick={onStopClick}> stop</button>
            </div>
            <br/>
            Robot Camera
            <div className="cloi-cam-con">
                <img src={imgsrc} alt="" />

            </div>
        </div>
 
    </div>

}

export default Main;