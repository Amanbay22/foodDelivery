import React from 'react';
import {RestaurantContent, RestaurantEdit} from './restaurant-panel';
import FoodAdd from './food-panel';
import {  BrowserRouter as Router,
	Switch,
	Route,
	NavLink  } from 'react-router-dom';

const AdminPanel = ()=>{
	return(
		<Router>
		<div className="container-fluid mt-5">
					
			<div className="row">
				<div className="col-3">
				<ul className="list-group">
						<NavLink   
						className ="list-group-item list-group-item-action" 
						to="/admin/restaurants" 
						>
								Restaurant Managing
								</NavLink>
					
					<NavLink  className ="list-group-item list-group-item-action" to="/admin/foodlist" >
									Food List
							</NavLink>
					<NavLink   className="list-group-item list-group-item-action" to="/admin/couriers">
									Couriers
							</NavLink>
				</ul>
				</div>
				
				<div className="col-9">
					<Switch>
						<Route path="/admin/restaurants" exact component={RestaurantContent}/>
						<Route path="/admin/restaurant/:id" exact render={({match})=><RestaurantEdit id={match.params.id}/>}/>

						<Route path="/admin/addNewFood/:id" exact render={({match})=><FoodAdd id={match.params.id}/>}/>

					</Switch>
				</div>
			</div>

		</div>
		</Router>
	)
}
export default AdminPanel;