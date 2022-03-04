import React, {useState, useEffect} from "react"
import L from "leaflet";
import { useMap } from "react-leaflet";

function ZoomToUser() {
    const [position, setPosition] = useState<any>(null);

    const map = useMap();

	
	useEffect(() => {
		const moveUser = () => {
			map.locate().on("locationfound", function (e:any) {
				setPosition(e.latlng);
				map.flyTo(e.latlng, map.getZoom());
				const radius = Math.min(e.accuracy, 30);
				const circle = L.circle(e.latlng, radius);
				circle.addTo(map);
			});
		}

		moveUser();
	},[map]);

	return position === null ? null : (<></>
	);
}

export default ZoomToUser