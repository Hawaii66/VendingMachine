import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { ILocation } from '../../Interfaces/MachineInterface'
import ZoomToUser from './ZoomtoUser'
import LocationMarker from './ImageMarker'

interface Props {
  locations:ILocation[]
}

function Map({locations}:Props) {
  return (
    <MapContainer 
    center={[0,0]} 
    zoom={13}
    style={{height:300,width:"90%",margin:"auto",borderRadius:"30px",marginBottom:"2rem"}}
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
        <ZoomToUser/>
    </MapContainer>
  )
}

export default Map