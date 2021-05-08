import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
	customer:{
		name:String,
		region:String,
		phone:String,
		address:String
	},
	orderList:[
		{
			name:String,
			totalNumber:Number,
			totalPrice:Number
	  	}
	]
});
orderSchema.index({orderList:1});
const Order = mongoose.model('Order', orderSchema);

export default Order;