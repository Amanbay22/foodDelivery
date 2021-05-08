import React,{useEffect,useState} from 'react';
import { getFood, createOrder } from '../../service/FoodService';

import './home-page.css';

const HomePage = () =>{
	const [foodList, setFoodList] = useState([]);
	const [orderList,setOrderList] = useState([]);

	const [name, setName] = useState("");
	const [region, setRegion] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");


	const onHandleName=(e)=>{
		setName(e.target.value);
	}
	const onHandleRegion=(e)=>{
		setRegion(e.target.value);
	}
	const onHandlePhone=(e)=>{
		setPhone(e.target.value);
	}
	const onHandleAddress=(e)=>{
		setAddress(e.target.value);
	}
	const onSubmit =(e)=>{
		e.preventDefault();
		const customer = {name, region, phone,address};
		createOrder({customer, orderList}).then(()=>{
			
				localStorage.setItem("orderList", JSON.stringify([]));
				setOrderList([]);
				setName('');
				setAddress('');
				setPhone('');
				setRegion('');
		}
			);
	}
	const addToCard = (data)=>{
		const {id, foodName:name, foodPrice:price, number} = data;

		let check = true;
		let totalPrice = price;
		let totalNumber = number;
		let newArray = [...orderList];
		newArray.forEach(el=>{
			if(el.id===id) {
				el.totalPrice+=price;
				el.totalNumber+=number;
				el.totalPrice = Math.round(el.totalPrice*100)/100
				check = false;
			}
		});

		if(check){
			newArray = [...newArray, {id, name,price, totalPrice, totalNumber}];
			localStorage.setItem("orderList", JSON.stringify(newArray));
			setOrderList(newArray);
		}
		else{
			setOrderList(newArray);
			localStorage.setItem("orderList", JSON.stringify(newArray));
		}
	}


	const totalPrice = ()=>{
		let total=0;
		orderList.forEach(el=>{
			total+=el.totalPrice;
		});
		return Math.round(total*100)/100;
	}

	const deleteFromCard = (id, price)=>{
		const idx = orderList.findIndex((el)=>el.id===id);

		let newArray = [...orderList];
		
		newArray[idx].totalPrice -= price;
		newArray[idx].totalNumber -=1; 
		if(newArray[idx].totalPrice<=0) {
			newArray = [...newArray.slice(0,idx),...newArray.slice(idx+1)]
		}
		else{
		newArray[idx].totalPrice = Math.round(newArray[idx].totalPrice*100)/100;}
		setOrderList(newArray);
		localStorage.setItem("orderList", JSON.stringify(newArray));
		
	}

	useEffect(()=>{
		getFood().then(res=>setFoodList(res.data));
		setOrderList(JSON.parse(localStorage.getItem("orderList"))||[]);
	},[]);

	return(
		<div>
			<div className="row mr-0">
				<div className="col-2 mt-5 ml-5 ">
				<ul className="list-group mb-4">
					{
						orderList.map(data=>
						<li className="list-group-item d-flex justify-content-between align-items-center" key = {data.id}>
							<p className="pt-3">{data.name} x {data.totalNumber} ({data.totalPrice})$</p>
						<button className="btn btn-danger btn-sm ml-2" onClick={()=>deleteFromCard(data.id, data.price)}>Delete</button></li>
						)
					}
					<li className="list-group-item">Total Price: {totalPrice()}$</li>
				</ul>
				<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
					Create Order
				</button>
				</div>
				<div className="col-9 ml-5">
					<div className="row  mt-5 mr-0">
					{
						foodList.map(data=>{
							const {name:foodName, price:foodPrice, _id:id , number} = data.menuList;
							return(
								<div className="card col-3 mr-4 mt-2" key={id}>
									
									<div className="card-body">
										<h5 className="card-title">{foodName}</h5>
										<p className="card-text">
											Price: {foodPrice}<br/>
											Cuisine: {data.cuisine}<br/>
											Restauran: {data.name}
										</p>
									</div>
									<button className="btn btn-primary mb-2" onClick={()=>addToCard({id, foodName,foodPrice, number })}>Add to Card</button>
								</div>
							)
						})
					}
				
				</div>
				</div>
			
		</div>
		<div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div className="modal-dialog" role="document">
			<div className="modal-content">
				<div className="modal-header">
				<h5 className="modal-title" id="exampleModalLabel">Create Order</h5>
				<button type="button" className="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				</div>
				<div className="modal-body">
					<form onSubmit={onSubmit}>
						<div className="form-group">
							<input type = "text" value={name} placeholder="Full name:" 
							className="form-control"
							onChange={onHandleName}/>
						</div>
						<div className="form-group">
							<input type = "text" value={region} placeholder="Region: " 
							 className="form-control"
							 onChange={onHandleRegion}/>
						</div>
						<div className="form-group">
							<input type = "text" value={phone} placeholder="Phone: " 
							 className="form-control"
							 onChange={onHandlePhone}
							 />
						</div>
						<div className="form-group">
							<input type = "text" value={address} placeholder="Address: "  
							className="form-control"
							onChange={onHandleAddress}/>
						</div>
						<button className="btn btn-secondary" type="submit">Create Order</button>
					</form>
				</div>
				<div className="modal-footer">
				<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
		</div>
		</div>
		
	);
}
export default HomePage;