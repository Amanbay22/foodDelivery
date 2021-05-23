import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import {HomePage} from '../pages';
import AdminPanel from '../admin-panel';
import Navbar from '../navbar';
const App = ()=>{
	return(
		<div>
			<BrowserRouter>
			<Navbar/>
				<Route exact path={'/'} component={HomePage}/>
				<Route path={'/admin'} component={AdminPanel}/>
			</BrowserRouter>
		</div>
	)
};
export default App;