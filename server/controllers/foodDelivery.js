
import Restaurant from '../models/restaurants.js';
import Order from '../models/orderLine.js';
import mongoose from 'mongoose';
export const getRestaurant = async(req,res)=>{
	try{
		const restaurants = await Restaurant.aggregate([
			{$project: {name: 1, _id: 0, menuList: 1, cuisine:1}},
			{
			$unwind:"$menuList"
		},
		{ $sort : { "menuList.price" : 1 } }

	]);
		res.status(200).json(restaurants);
	}
	catch(error){
		res.status(404).json({message:error.message});
  }
}

export const addRestaurant = async(req,res)=>{
	try{
		const rest = req.body;
		rest.menuList=[];
		const newRes = new Restaurant(rest);
		await newRes.save();
       res.status(201).json(newRes);
	}
	catch(error){
		res.status(404).json({message:error.message});
  }
}

export const addNewFoodToRestaurant = async(req,res)=>{
	
	try{
		 const data = req.body;
		 const {id} = req.params;
		//  console.log(image);
		 const newFood = await Restaurant.findByIdAndUpdate(
			 id,	
			 {$push:{'menuList':data}});
		 res.status(201).json(newFood);
		 
	}
	catch(error){
		res.status(404).json({message:error.message});
  }
}

export const createNewOrder = async(req,res)=>{
	try{
		const order = req.body;
		const newOrder = new Order(order);
		await newOrder.save();
		res.status(201).json(newOrder);
	}
	catch(error){
		res.status(404).json({message:error.message});
  }
}

export const getRestaurantList = async(req,res)=>{
	try{
		const restaurants = await Restaurant.find();
		res.status(200).json(restaurants);
	}
	catch(error){
		res.status(404).json({message:error.message});
  }
}

export const getRestaurantById = async(req,res)=>{
	try{
		const {id} = req.params;
		const rest = await Restaurant.findById(id);
		res.status(200).json(rest);
	}
	catch(error){
		res.status(404).json({message:error.message});
  }
}

export const findRestaurantByIdAndUpdate = async(req,res)=>{
	try{
		const {id} = req.params;
		const data = req.body;
		const rest = await Restaurant.findByIdAndUpdate(id, data);
		res.status(200).json(rest);
	}
	catch(error){
		res.status(404).json({message:error.message});
  }
}

export const deleteRestaurantById = async(req,res)=>{
	try{
		const {id} = req.params;
		const rest = await Restaurant.findByIdAndRemove(id);
		res.status(200).json(rest);

	}
	catch(error){
		res.status(404).json({message:error.message});
  }
}

export const deleteFoodFromRestaurant = async(req,res)=>{
	try{

		const{rest_id, food_id} = req.params;
		
		const rest = await Restaurant.findByIdAndUpdate(
			rest_id,
			{ $pull: { 'menuList': { _id: mongoose.Types.ObjectId(food_id) } } }
			);
		res.status(200).json(rest);
	}
	catch(error){
		res.status(404).json({message:error.message});
  }
}
export const searchRestaurant=async(req,res)=>{
	try{
		const {search,filter} =  req.query;
		let restaurants;
		if(filter==='asc'){
		 restaurants = await Restaurant.aggregate([
			{$project: {name: 1, _id: 0, "menuList": 1, cuisine:1}},
			{
			$unwind:"$menuList"
		},
		{$match: {$expr: { $gt: [{ $indexOfCP: [ "$menuList.name", search ] }, -1]}}},
		{ $sort : { "menuList.price" : 1 } }
	]);}
	else{
		restaurants = await Restaurant.aggregate([
			{$project: {name: 1, _id: 0, "menuList": 1, cuisine:1}},
			{
			$unwind:"$menuList"
		},
		{$match: {$expr: { $gt: [{ $indexOfCP: [ "$menuList.name", search ] }, -1]}}},
		{ $sort : { "menuList.price" : -1 } }]);}
	
		res.status(200).json(restaurants);
	}catch(error){
		res.status(404).json({message:error.message});
  }
	
}