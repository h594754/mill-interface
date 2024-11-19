from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route("/status", methods=['GET'])
def get_status(): 
    try: 

        ip_address = request.args.get('ip')

        if not ip_address:
            return jsonify({"error": "Missing the ip parameter"}), 400

        mill_oven_url = f"http://{ip_address}/status"

        response = requests.get(mill_oven_url)
        response.raise_for_status()
        return jsonify(response.json())
    
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/control-status", methods=['GET'])
def get_current():
    try:
        ip_address = request.args.get('ip')

        if not ip_address:
            return jsonify({"error": "Missing the ip parameter"}), 400
        
        mill_oven_url = f"http://{ip_address}/control-status"
        response = requests.get(mill_oven_url)
        response.raise_for_status()
        return jsonify(response.json())
    
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/set-temperature", methods=['POST'])
def set_temperature():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Missing data"}), 400

        
        ip = data.get('ip')
        new_temperature = data.get('newTemperature')

        oven_url = f"http://{ip}/set-temperature-in-independent-mode-now"

        if not ip or new_temperature is None:
            return jsonify({"error": "Missing 'ip' or 'newTemperature' in the request"}), 400
        
        payload = {
            "temperature": new_temperature
        }

        oven_response = requests.post(oven_url, json=payload)

        if oven_response.status_code == 200:
            return jsonify({
                "message": "Message sent to oven",
                "oven_response": oven_response.json()
            }), 200
        else:
            return jsonify({
                "error": f"Failed to send data to the oven. Status code: {oven_response.status_code}",
                "response": oven_response.text
            }), 400

    
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

    
if __name__ == '__main__':
    app.run(host='', port=5000)