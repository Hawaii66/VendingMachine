import L from "leaflet";
import { Button } from "react-bootstrap";
import { Marker, Popup } from "react-leaflet"
import { Link } from "react-router-dom";
import { ILocation } from "../../Interfaces/MachineInterface"

interface Props
{
    pos:ILocation
}

function PopupLocationMarker({pos}:Props) {
    return pos === null ? null : (
      <Marker
      position={
        {
          lat:pos.lat,
          lng:pos.lng
        }
      }

      icon={GetIcon({x:50,y:50})}
      >
        <Popup>
            <h3 style={{textAlign:"center"}}>{pos.name}</h3>
            <Button variant="seccondary"><Link to={`/machine?id=${pos.machineID}`}>Välj automat</Link></Button>
        </Popup>
      </Marker>
    )
}

const GetIcon = (size:{x:number,y:number}) => {
    return L.icon({
        iconUrl:require("../../Images/VendingMachine.png"),
        iconSize:[size.x,size.y],
        iconAnchor:[25,0],
        popupAnchor:[0,0]
    });
}

export default PopupLocationMarker