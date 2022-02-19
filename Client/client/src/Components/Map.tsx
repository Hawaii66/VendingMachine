import React, { useCallback, useMemo, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import L from 'leaflet'

const GetIcon = (size:{x:number,y:number}) => {
    return L.icon({
        iconUrl:require("../Images/VendingMachine.png"),
        iconSize:[size.x,size.y]
    });
}

function LocationMarker() {
    const [position, setPosition] = useState<any>(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker
      position={position}
      icon={GetIcon({x:30,y:45})}
      > 
        <Popup>You are here</Popup>
      </Marker>
    )
  }

function Map() {
  return (
    <MapContainer 
    center={[51.505, -0.09]} 
    zoom={13}
    style={{height:500,width:"80%"}}
    >
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
    </MapContainer>
  )
}

export default Map