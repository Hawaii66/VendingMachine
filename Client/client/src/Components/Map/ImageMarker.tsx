import L from "leaflet";
import { Marker, Popup } from "react-leaflet"
import { ILocation } from "../../Interfaces/MachineInterface"

interface Props
{
    pos:ILocation
}

function LocationMarker({pos}:Props) {
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
        <Popup>{pos.name}</Popup>
      </Marker>
    )
}

const GetIcon = (size:{x:number,y:number}) => {
    return L.icon({
        iconUrl:require("../../Images/VendingMachine.png"),
        iconSize:[size.x,size.y]
    });
}

export default LocationMarker