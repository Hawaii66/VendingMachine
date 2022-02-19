import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import RouterApp from './Components/RouterApp';

function App() {
	return (
		<div className="App">
			<Router>
				<RouterApp/>
			</Router>
		</div>
	);
}

export default App;
