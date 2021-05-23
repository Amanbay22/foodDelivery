import axios from "axios";

const API_URL = "http://localhost:8888/";


export const getFood = async() =>{
		return await axios.get(API_URL);	 
}
export const createOrder = async(body)=>{
	return await axios.post(API_URL+"createNewOrder",body);
}
export const getRestaurantList = async()=>{
	return await axios.get(API_URL+"getRestaurantList");
}
export const getRestaurantById = async(id)=>{
	return await axios.get(`${API_URL}getRestaurantById/${id}`);
}
export const findRestaurantByIdAndUpdate = async(id, data)=>{
	return await axios.post(`${API_URL}findRestaurantByIdAndUpdate/${id}`, data);
}
export const deleteRestaurantById = async(id)=>{
	return await axios.delete(`${API_URL}deleteRestaurantById/${id}`);
}
export const addRestaurant = async(body)=>{
	return await axios.post(API_URL+"addRestaurant",body);
}
export const addNewFood = async(id, body)=>{
	return await axios.post(`${API_URL}addNewFood/${id}`,body);
}
export const deleteFoodFromRestaurant = async(rest_id, food_id)=>{
	return await axios.delete(`${API_URL}deleteFoodFromRestaurant/${rest_id}/${food_id}`);
}
export const searchRestaurant = async(search,filter)=>{
	return await axios.get(`${API_URL}searchRestaurant?search=${search}&filter=${filter}`);
}