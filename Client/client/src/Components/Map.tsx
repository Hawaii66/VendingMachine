import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import L from 'leaflet'
import { ILocation } from '../Interfaces/MachineInterface'

const GetIcon = (size:{x:number,y:number}) => {
    return L.icon({
        iconUrl:require("../Images/VendingMachine.png"),
        iconSize:[size.x,size.y]
    });
}

interface Props {
  locations:ILocation[]
}

interface LocProps{
  pos:ILocation
}

function LocationMarker({pos}:LocProps) {
    return pos === null ? null : (
      <Marker
      position={
        {
          lat:pos.lat,
          lng:pos.lng
        }
      }
      icon={GetIcon({x:20,y:30})}
      > 
        <Popup>You are here</Popup>
      </Marker>
    )
  }

  function LocationMarker123() {
    const [position, setPosition] = useState<any>(null);

    const map = useMap();

    useEffect(() => {
      map.locate().on("locationfound", function (e:any) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        const radius = e.accuracy;
        const circle = L.circle(e.latlng, radius);
        circle.addTo(map);
      });
    }, [map]);

    return position === null ? null : (<></>
    );
  }


function Map({locations}:Props) {
  const [position, setPosition] = useState<any>([0,0]);
  

  return (
    <MapContainer 
    center={position} 
    zoom={13}
    style={{height:300,width:"90%",margin:"auto",borderRadius:"30px"}}
    >
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((loc, index)=>{
          return(
            <LocationMarker key={index} pos={loc} />
          )
        })}
        <LocationMarker123/>
    </MapContainer>
  )
}

export default Map