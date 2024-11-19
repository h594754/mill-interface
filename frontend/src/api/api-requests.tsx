export async function getStatusRequest(ipAddress: string) {
    try {
        const response = await fetch(`http://localhost:5000/status?ip=${ipAddress}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch status. HTTP status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Mill Oven Status:', data); 
        return data; 
    } catch (error) {
        console.error('Error fetching status:', error);
        throw error; 
    }
}

export async function getCurrentInformation(ipAddress: string) {
    try {
        const response = await fetch(`http://localhost:5000/control-status?ip=${ipAddress}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch current settings. HTTP status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Current data', data); 
        return data; 
    } catch (error) {
        console.error('Error fetching current settings:', error);
        throw error; 
    }
}

export async function changeSetTemperature(ipAddress: string, newTemperature: number) {
    const payload = {ip: ipAddress, newTemperature: newTemperature};
    
    try {
        await fetch("http://localhost:5000/set-temperature", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }).then(response => response.json())
        .then(data => console.log("Response from Flask:", data))
        .catch(err => console.error("Error: ", err));
        
    } catch (error) {
        console.error('Error setting temperature:', error);
        throw error; 
    }
}




