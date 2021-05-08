import axios from "axios";

const API_URL = "http://localhost:8888/";


export const getFood = async() =>{
		return await axios.get(API_URL);	 
}
export const createOrder = async(body)=>{
	return await axios.post(API_URL+"createNewOrder",body);
}
