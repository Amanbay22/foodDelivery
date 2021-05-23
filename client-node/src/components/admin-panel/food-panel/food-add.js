import React, {useState} from 'react';
import FileBase from 'react-file-base64';
import {addNewFood} from '../../../service/FoodService';
const FoodAdd = ({id})=>{
	const [name,setName] = useState('');
	const [price, setPrice] = useState('');
	
	const [image,setImage] = useState('');

	const onHandleName = (e)=>{
		setName(e.target.value);
	}
	const onHandlePrice = (e)=>{
		setPrice(e.target.value);
	}
	const handleSubmit = async (e)=>{
		e.preventDefault();
		await addNewFood(id,{name,number:1,price:parseFloat(price),image}).then(()=>alert("Success Added"));
	}
	return(
		<div className="container">
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<input type="text" value={name} placeholder="Name" onChange={onHandleName} className="form-control"/>
				</div>
				<div className="form-group">
					<input type="text" value={price} placeholder="Price" onChange={onHandlePrice}  className="form-control"/>
				</div>
				<div className="form-group">
					<FileBase type="file" multiple={false} onDone={({base64})=>setImage( base64)} />
				</div>
				<button className="btn btn-primary" type="submit">Add new</button>
			</form>
		</div>
	)
}
export default FoodAdd;