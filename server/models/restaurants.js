import mongoose from 'mongoose';

const restaurantSchema = mongoose.Schema({
    name:String,
	 cuisine:String,
	 region:String,
	 phone:String,
	 address:String,
    menuList:[
        {
            name: String,
				price:Number,
				number:Number,
				image:String
        }
    ]

});
restaurantSchema.index({menuList:1});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;