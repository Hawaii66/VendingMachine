import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import StripePayment from './Components/StripePayment';
import Swish from './Components/Swish';
import Map from "./Components/Map"

function App() {
	return (
		<div className="App">
			<Map/>
			<StripePayment/>
		</div>
	);
}

export default App;
