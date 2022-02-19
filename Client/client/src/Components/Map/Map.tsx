import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { ILocation } from '../../Interfaces/MachineInterface'
import ZoomToUser from './ZoomtoUser'
import LocationMarker from './LocationMarker'
import PopupLocationMarker from './PopupLocationMarker'

interface Props {
  single:boolean,
  locations:ILocation[]
}

function Map({locations,single}:Props) {
  var center = [58.75321580188817,17.00903028791578];
  if(locations.length === 1){
    center = [locations[0].lat,locations[0].lng];
  }

  return (
    <MapContainer
    center={{lat:center[0],lng:center[1]}} 
    zoom={12}
    style={{height:300,width:"90%",margin:"auto",borderRadius:"30px",marginBottom:"2rem"}}
    tap={false}
    >
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {single === false && locations.map((loc,index)=>{
          return(
            <PopupLocationMarker key={index} pos={loc} />
          )
        })}
        {single === true && 
            <LocationMarker pos={locations[0]} />
        }
        {single === false && <ZoomToUser/>}
    </MapContainer>
  )
}

export default Map