import expess from 'express'

import * as foodDelivery from '../controllers/foodDelivery.js'

const router = expess.Router()

router.get('/', foodDelivery.getRestaurant);
router.post('/addRestaurant',foodDelivery.addRestaurant);
router.post('/addNewFood/:id',foodDelivery.addNewFoodToRestaurant);
router.post('/createNewOrder',foodDelivery.createNewOrder);
router.get('/getRestaurantList', foodDelivery.getRestaurantList);
router.get('/getRestaurantById/:id',foodDelivery.getRestaurantById);
router.post('/findRestaurantByIdAndUpdate/:id', foodDelivery.findRestaurantByIdAndUpdate);
router.delete('/deleteRestaurantById/:id', foodDelivery.deleteRestaurantById);
router.delete('/deleteFoodFromRestaurant/:rest_id/:food_id', foodDelivery.deleteFoodFromRestaurant);
router.get('/searchRestaurant',foodDelivery.searchRestaurant);
export default router;