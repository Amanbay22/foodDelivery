import React from 'react';

import {NavLink} from "react-router-dom";


const Navbar = () => {



	return(
	<>
	<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <a className="navbar-brand" href="?">Navbar</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarColor01">
	 <ul className="navbar-nav mr-auto">
		<li className="nav-item">
			<NavLink to="/" activeClassName="nav-link active" className="nav-link">
											Home
							</NavLink>
			</li>
    </ul>
	 
    
    
  </div>
</nav>
	</>);
}
export default Navbar;