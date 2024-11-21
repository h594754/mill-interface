## Purpose
I bought a WIFI oven from Mill. I didn't really like the mobile application that came with it, so I decided to make my own using their public API documentation here: https://github.com/Mill-International-AS/Generation_3_REST_API .   

## How does it work? 
The way it works is that you have to put in the local ip-address of the oven, once you have established a connection you can see the current wattage used, what temperature is set and set a new temperature you want. 
Backend in this project is written in Python using the Flask framework for establishing a connection with the oven. 
