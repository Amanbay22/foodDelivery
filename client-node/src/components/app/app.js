import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import {HomePage} from '../pages';
import Navbar from '../navbar';
const App = ()=>{
	return(
		<div>
			<BrowserRouter>
			<Navbar/>
			<Route exact path={'/'} component={HomePage}/>
			</BrowserRouter>
		</div>
	)
};
export default App;