import React,{useState, useEffect} from 'react';

import {getRestaurantList, deleteRestaurantById, addRestaurant} from '../../../service/FoodService';
import {NavLink} from 'react-router-dom';
const RestaurantContent =()=>{	

	const [restaurants, setRestaurantsList] = useState([]);

	const [name, setName] = useState();
	const [cuisine, setCuisine] = useState();
	const [address, setAddress] = useState();
	const [phone, setPhone] = useState();
	const [region, setRegion] = useState();

	const onHandleName = (e)=>{
		setName(e.target.value);
	}	
	const onHandleAddress = (e)=>{
		setAddress(e.target.value);
	}
	const onHandleCuisine = (e)=>{
		setCuisine(e.target.value);
	}
	const onHandlePhone = (e)=>{
		setPhone(e.target.value);
	}
	const onHandleRegion = (e)=>{
		setRegion(e.target.value);
	}

	useEffect(()=>{
		getRestaurantList()
			.then(res=>setRestaurantsList(res.data));
	},[]);

	const onDelete = async(id)=>{
		await deleteRestaurantById(id);
		const idx = restaurants.findIndex((el)=>el._id ===id);
		const newArray = [...restaurants.slice(0,idx),...restaurants.slice(idx+1)];
		setRestaurantsList(newArray);
	}
	
	const onAddRestaurant = (e)=>{
		 e.preventDefault();
		 addRestaurant({name,address,phone,region,cuisine})
		 	.then(res=>setRestaurantsList([...restaurants, res.data]));

	}

	return(
		<div>
			<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
				AddNew+
			</button>
			<table className="table">
				<thead>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Cuisine</th>
						<th scope="col">Phone</th>
						<th scope="col">Address</th>
						<th scope="col">FoodList</th>
						<th scope="col">Operation</th>
					</tr>
				</thead>
				<tbody>
					{
						restaurants.map(el=>{
							const menuList = el.menuList.length>0? el.menuList : null;
							
							return(
								<tr key={el._id}>
									<td>{el.name}</td>	
									<td>{el.cuisine}</td>	
									<td>{el.phone}</td>	
									<td>{el.address}</td>
									<td>
										<div className="dropdown">
											<button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
												{menuList?menuList[0].name:"Empty"}
											</button>
											
											{menuList?
											(	
											<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
												{menuList.map(ele=><a key ={ele._id} className="dropdown-item" href="?">{ele.name}</a>)}
												<NavLink className="dropdown-item" to={`/admin/addNewFood/${el._id}`} >+Add New </NavLink>
												</div>):<div className="dropdown-menu" aria-labelledby="dropdownMenuButton"></div>}
										</div>
										</td> 
									<td><NavLink  className ="btn btn-primary" to={`/admin/restaurant/${el._id}`} >
										Edit
								</NavLink>
								<button className="btn btn-danger ml-2" onClick={()=>onDelete(el._id)}>Delete</button>
								</td>	
								</tr>
							)
						})
					}
				</tbody>
			</table>
			<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
					<h5 className="modal-title" id="exampleModalLabel">Add new</h5>
					<button type="button" className="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					</div>
					<div className="modal-body">
						<form onSubmit={onAddRestaurant}>
							<div className="form-group">
								<input type="text" name="name" className="form-control" 
								placeholder="Name" onChange={onHandleName}
								value={name}/>
							</div>
							<div className="form-group">
								<input type="text" name="cuisine" className="form-control" 
								placeholder="Cuisine" onChange={onHandleCuisine}
								value={cuisine}/>
							</div>
							<div className="form-group">
								<input type="text" name="phone" className="form-control"
								 placeholder="Phone" onChange={onHandlePhone}
								 value={phone}/>
							</div>
							<div className="form-group">
								<input type="text" name="address" className="form-control" 
								placeholder="Address" onChange={onHandleAddress}
								value={address}/>
							</div>
							<div className="form-group">
								<input type="text" name="address" className="form-control" 
								placeholder="Region" onChange={onHandleRegion}
								value={region}/>
							</div>
							<button type="submit" className="btn btn-primary">Add New</button>
						</form>
					</div>
					<div className="modal-footer">
					<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
			</div>
		</div>
	)

}


export default RestaurantContent;