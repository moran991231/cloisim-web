# CLOISIM-WEB
This is an example to send message (publish topic) to the simulator.  

Tag: `CLOiSim` `cloi` `nodejs` `react` `ros2` `foxy`

## Demo video
[![Video Label](http://img.youtube.com/vi/zk4XuFQ3zts/0.jpg)](https://youtu.be/zk4XuFQ3zts?t=0s) 

## Steps to run

1. Run the simulator
> This repository doesn't include simulator's information. Please refer the simulator repository [here](https://github.com/lge-ros2/cloisim)  

`./CLOiSim.x86_64 -world lg_seocho.world`

2. Launch the bringup task (refer [here](https://github.com/lge-ros2/cloisim_ros))
`ros2 launch cloisim_ros_bringup bringup.launch.py `

3. Open the websocket (refer [here](https://roboticsknowledgebase.com/wiki/tools/roslibjs/))
`ros2 launch rosbridge_server rosbridge_websocket_launch.xml`

4. run this app
`npm start`