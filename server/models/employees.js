import mongoose from 'mongoose';

const employeeSchema = mongoose.Schema({
	employee:{
		name:String,
		phone:String
	},
	order:{
		totalPrice:Number,
		address:String
	}
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;