import React,{useEffect, useState} from 'react';
import {getRestaurantById, findRestaurantByIdAndUpdate, deleteFoodFromRestaurant} from '../../../service/FoodService';
const RestaurantEdit = ({id})=>{
	const [name, setName] = useState();
	const [cuisine, setCuisine] = useState();
	const [address, setAddress] = useState();
	const [phone, setPhone] = useState();
	const [region, setRegion] = useState();
	const [menuList, setMenuList] = useState([]);
	useEffect(()=>{
		getRestaurantById(id)
			.then(({data:{name,cuisine,address,phone,region,menuList}})=>{
				setName(name);
				setCuisine(cuisine);
				setAddress(address);
				setPhone(phone);
				setRegion(region);
				setMenuList(menuList);
			}
	)},[id]);
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
	const onHandleSubmit = (e)=>{
		e.preventDefault();
		findRestaurantByIdAndUpdate(id, {name,address,phone,cuisine,region});
		alert("Success Changed");
	}
	const onHandleDelete= async(food_id) =>{
		await deleteFoodFromRestaurant(id, food_id);
		const idx = menuList.findIndex((el)=>el._id ===food_id);
		const newArray = [...menuList.slice(0,idx),...menuList.slice(idx+1)];
		setMenuList(newArray);
		alert("Food was deleted");
	}
	return(
		<div className="container">
			<form onSubmit={onHandleSubmit}>
				<div className="form-group">
					<label>Name:</label>
					<input className="form-control" type="text" value={name} onChange={onHandleName}/>
				</div>
				<div className="form-group">
					<label>Address:</label>
					<input className="form-control" type="text" value={address} onChange={onHandleAddress}/>
				</div>
				<div className="form-group">
					<label>Cuisine:</label>
					<input className="form-control" type="text" value={cuisine} onChange={onHandleCuisine}/>
				</div>
				<div className="form-group">
					<label>Phone:</label>
					<input className="form-control" type="text" value={phone} onChange={onHandlePhone}/>
				</div>
				<div className="form-group">
					<label>Region:</label>
					<input className="form-control" type="text" value={region} onChange={onHandleRegion}/>
				</div>
				<button className="btn btn-primary" type="submit">
					Save
				</button>
			</form>
			<h1 className="mt-5">Food List:</h1>
			<ul className="list-group mb-5">
				{
					menuList.length>0? 
					menuList.map(el=>
					<li className="list-group-item" key={el._id}>
					{el.name}
						<button className="btn btn-danger ml-5" onClick={()=>onHandleDelete(el._id)}>-</button>
						</li>
					):<h3 style={{"color":"red"}}>Empty</h3>
				}
			</ul>
		</div>
	)
}

export default RestaurantEdit;