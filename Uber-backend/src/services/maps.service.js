import axios from 'axios'
import captionModel from '../Model/caption.model.js';
import { v4 as uuidv4 } from 'uuid';

const getlnglatfromaddress = async (address) => {
    const xrequestid = uuidv4();
    const xCorrelationId = uuidv4();
    const url = 'https://api.olamaps.io/places/v1/geocode'
    const response = await axios.get(url,
        {
            params: {
                address: address,
                api_key: process.env.OLAMAPS_APIKEY,
                language: 'English'
            },
            headers: {
                'X-Request-Id': xrequestid,
                'X-Correlation-Id': xCorrelationId
            }
        }
    )
    return response.data.geocodingResults[0].geometry.location;
}
const getdisttimefromaddress = async (startaddress, endaddress) => {
    const xrequestid = uuidv4();
    const xCorrelationId = uuidv4();
    const url = 'https://api.olamaps.io/routing/v1/distanceMatrix'
    var { lng, lat } = await getlnglatfromaddress(startaddress)
    const orogin = `${lat},${lng}`
    var { lng, lat } = await getlnglatfromaddress(endaddress)
    const distnation = `${lat},${lng}`
    const response = await axios.get(url, {
        params: {
            origins: orogin,
            destinations: distnation,
            mode: 'driving',
            api_key: process.env.OLAMAPS_APIKEY,
            language: 'English'
        },
        headers: {
            'X-Request-Id': xrequestid,
            'X-Correlation-Id': xCorrelationId
        }
    })
    const durationdistance = response.data.rows[0].elements[0];

    const secondsInMinute = 60;
    const secondsInHour = 60 * secondsInMinute;
    const secondsInDay = 24 * secondsInHour;

    let remainingSeconds = durationdistance.duration;

    const days = Math.floor(remainingSeconds / secondsInDay);
    remainingSeconds %= secondsInDay;

    const hours = Math.floor(remainingSeconds / secondsInHour);
    remainingSeconds %= secondsInHour;

    const minutes = Math.floor(remainingSeconds / secondsInMinute);
    remainingSeconds %= secondsInMinute;

    const seconds = remainingSeconds;

    var timing = ""

    if (days > 0) {
        timing += `${days} day${days > 1 ? 's' : ''} `;
    }
    if (hours > 0) {
        timing += `${hours} hour${hours > 1 ? 's' : ''} `;
    }
    if (minutes > 0) {
        timing += `${minutes} minute${minutes > 1 ? 's' : ''} `
    }
    if (seconds > 0) {
        timing += `${seconds} second${seconds > 1 ? 's' : ''} `;
    }
    // console.log("the response final =", response.data.rows[0].elements[0].duration)
    return {
        "duration":{ 
                     timing:timing,
                     value:durationdistance.duration
                  },
        "distance": {
                    distance:`${durationdistance.distance / 1000} km`,
                    value:durationdistance.distance
                   }
           }

}
const getlocsuggestions = async (req) => {
    const { searchstring } = req.query;
    const xrequestid = uuidv4()
    const xCorrelationId = uuidv4()
    const url = 'https://api.olamaps.io/places/v1/autocomplete'
    var lat = 20.5937;
    var lng = 78.9629;
    
    // const taddress= navigator.geolocation.getCurrentPosition()
    //     console.log("my addresss",taddress)
    try {
        
        const userIp = req.ip;
        // console.log("my ip address ",userIp);
        if (userIp && userIp !== '::1' && userIp !== '127.0.0.1') {
            const ipGeoResponse = await axios.get(`http://ip-api.com/json/${userIp}`);
            if (ipGeoResponse.data && ipGeoResponse.data.status === 'success') {
                lat = ipGeoResponse.data.lat;
                lng = ipGeoResponse.data.lon; 
                console.log(`Location Fallback: Using IP geolocation: ${ipGeoResponse.data.city}, ${ipGeoResponse.data.country}`);
            } else {
                console.warn("Location Fallback: IP geolocation service did not return success:", ipGeoResponse.data);
            }
        } else {
            console.warn("Location Fallback: Could not determine valid IP address for geolocation.");
        }


    } catch (error) {
        console.log("IP address not found ")
    }
    const response = await axios.get(url, {
        params: {
            input: searchstring,
            location: `${lat},${lng}`,
            radius: 5000,
            strictbounds: false,
            api_key: process.env.OLAMAPS_APIKEY,
            language: 'English'
        },
        headers: {
            'X-Request-Id': xrequestid,
            'X-Correlation-Id': xCorrelationId
        }
    })
    // console.log("The response is ",response.data.predictions[0]);
    return response.data.predictions[0]

}
const  getcaptionintheradiusfromaddress=async(pickupaddress,radius)=>{
         const { lng, lat }=await getlnglatfromaddress(pickupaddress);
         console.log("The Pick up lng "+lng+"lat"+lat);
          const captains = await captionModel.find({
          location: {
            $geoWithin: {
                $centerSphere: [ [ lng, lat ], radius / 6371 ]
            }
        } });
    console.log("THe caption ",captains);
    return captains;
}

export { getcaptionintheradiusfromaddress,getlnglatfromaddress, getdisttimefromaddress, getlocsuggestions }