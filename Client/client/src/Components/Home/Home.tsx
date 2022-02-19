import React, { useEffect, useState } from 'react'

import Map from "../Map/Map";
import "./Home.css";

function Home() {
	const [locations,setLocations] = useState([]);

	useEffect(()=>{
		const GetLocations = async () => {
			const result = await fetch(`${process.env.REACT_APP_SERVER_URL}/machines/locations`,{
				method:"GET"
			});
			const locations = await result.json();
			setLocations(locations);
		}

		GetLocations();
	},[])

	return (
		<div>
			<h1 style={{textAlign:"center",margin:"1rem",color:"#3c40c6"}}><b>🍬 Vending Nyköping 🍫</b></h1>
			<p style={{textAlign:"center",color:"#575fcf"}}><b>- - - Välj maskin och börja shoppa - - -</b></p>
			<Map single={false} locations={locations}/>
			<h3 className="InstruktionText">Instruktioner:</h3>
			<ol className="instructions">
				<li>Gå till en av maskinerna på kartan ovan</li>
				<li>Klicka på maskinen du står vid</li>
				<li>Välj en godis som maskinen erbjuder</li>
				<li>Köp godisen med ditt kort</li>
				<li>Klicka på den gröna knappen på maskinen</li>
				<li>Vänta 1 minut</li>
				<li>Din godis levereras till dig utan kontanter</li>
			</ol>
		</div>
	)
}

export default Home