import { useState } from "react";
import { getStatusRequest, getCurrentInformation, changeSetTemperature } from "../api/api-requests"


export default function UserInterface() {
    const [inputIp, setInputIp] = useState<string>("");
    const [response, setResponse] = useState<any>("");
    const [currentData, setCurrentData] = useState<any>("");
    const [currentSetTemperature, setCurrentSetTemperature] = useState<string>("");
    const [newCurrentSetTemperature, setNewCurrentSetTemperature] = useState<string>("");
    

    const getStatus = async (ipAddress: string) => {
        if(ipAddress == "") {
            console.log("ip empty");
            return;
        }
        
        try {
            const responseStatus = await getStatusRequest(ipAddress);
            const currentStatus = await getCurrentInformation(ipAddress);
            setResponse(responseStatus);
            setCurrentData(currentStatus);
            setCurrentSetTemperature(currentStatus.set_temperature);
        } catch(error) {
            console.error("Error getting the status", error);
        }
    }

    

    const updateSetTemperature = async (ipAddress: string, newTemperature: string) => {
        const parsedCurrentTemperature: number = +currentSetTemperature;
        const parsedNewTemperature: number = +newTemperature;
        
        if(parsedCurrentTemperature === parsedNewTemperature) {
            console.log("Temp is the same");
            return;
        }
        
        
        console.log("parsed temperature ", parsedNewTemperature); 
        
        try {
            const response = await changeSetTemperature(ipAddress, parsedNewTemperature);
            console.log("response set temp  ", response);
        } catch(err) {
            console.error("Error setting the new temperature ", err);
        }

        reloadPage(ipAddress);
            
    }

    const reloadPage = (ipAddress: any) => {
        getStatus(ipAddress);
        getCurrentInformation(ipAddress);
    }


    

    return (
        <div>
            { response == "" &&
                <div>
                    <input type="text" placeholder="Enter the ip of the mill oven" onChange={(e) => setInputIp(e.target.value)}></input>
                    <div>
                        <button onClick={() => getStatus(inputIp)}>Connect to oven</button>
                    </div>
                </div>
            }
            {(response.status === "ok") ? 
            <p style={{color: "green"}}>200 ok</p>
            :
            <p> Not connected to the oven, please provide your ovens ip</p>
            }

            {response &&
                <div>
                    <div>
                        <p>Current information from your oven</p>
                        <p>Room temperature {currentData.ambient_temperature}</p>
                        <p>Set temperature {currentData.set_temperature}</p>
                        <p>Wattage used right now {currentData.current_power} watts</p>
                    </div>

                <div>
                    <p style={{fontWeight: "bold"}}>Device information</p>
                    <p>Device name: {response.name}</p>
                    <p>Mac address: {response.mac_address}</p>
                    <img style={{width: "200px", height: "auto"}} src={`/public/${response.name}.jpg`} alt="Nope"/>
                </div>
                <div>
                    <label>Set new temperature</label>
                    <div>
                        <input type="text" placeholder={`Current temp set: ${currentSetTemperature}`} onChange={(e) => setNewCurrentSetTemperature(e.target.value)}/>
                    </div>
                    <div>
                        <button onClick={() => {updateSetTemperature(inputIp, newCurrentSetTemperature)}}>Set new temperature</button>
                    </div>
                </div>

                <div>
                    <button onClick={() => reloadPage(inputIp)}>Reload information</button>
                </div>
            
            </div>

            

            }
            
        </div>
    )
}