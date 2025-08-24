
import React,{useEffect} from "react";
import { OlaMaps } from 'olamaps-web-sdk'
import { useRef } from "react";
const LiveTracking= ({ lat, lng ,zoom}) => {
  console.log("The latitude "+lat+"the longitude "+lng);
  const mapContainer = useRef(null);

  useEffect(() => {
    const ola = new OlaMaps({ apiKey: '9QR4MQ3ap1NWFOTJdEypq7tQXLV05d0tUjqe09mN' });
     console.log("The lat "+lat+"The long "+lng);
    const map = ola.init({
      container: mapContainer.current,
      style: "https://api.olamaps.io/styleEditor/v1/styleEdit/styles/0d7c63a9-c8ce-4517-b6d1-1e472db1b284/uberclone",
      center: [lng,lat], // [longitude, latitude]
      zoom: zoom,
    });
    const marker=ola
    .addMarker({offset:[0,-10],anchor:'bottom',color:'red' })
    .setLngLat([lng,lat])
    .addTo(map)
     //   onMapLoad:() => {
    //   map.addMarker({
    //     id: 'marker-1',
    //     position: [lng,lat],
    //     title: 'Your Location',
    //     iconUrl: localogo,
    //     iconSize: [40, 40],
    //         });
    //         },
    // onMapFailure:(err)=>
    //     console.log("Map failed toload ",err),
    // onMapClick:(e)=>
    //     console.log("Map Clicked at ",e),
    // console.log("Map initialized", map);

    return () => {
      map?.remove(); // Clean up on unmount
    };
  }, [lat, lng]);

    return(
    <div ref={mapContainer} className="h-full w-full"></div>
    )
}
export default LiveTracking;