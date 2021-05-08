
import Restaurant from '../models/restaurants.js';
import Order from '../models/orderLine.js';

export const getRestaurant = async(req,res)=>{
	try{
		const restaurants = await Restaurant.aggregate([
			{$project: {name: 1, _id: 0, menuList: 1, cuisine:1}},
			{
			$unwind:"$menuList"
		}
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
		 const {name, foodName, foodPrice} = req.body;
		 const newFood = {name:foodName, price:foodPrice};
		 
		 await Restaurant.findOneAndUpdate(
			 {"name":name},
			 {$push:{'menuList':newFood}});
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




