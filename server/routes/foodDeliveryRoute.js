import expess from 'express'

import * as foodDelivery from '../controllers/foodDelivery.js'

const router = expess.Router()

router.get('/', foodDelivery.getRestaurant);
router.post('/addRestaurant',foodDelivery.addRestaurant);
router.post('/addNewFood',foodDelivery.addNewFoodToRestaurant);
router.post('/createNewOrder',foodDelivery.createNewOrder);

export default router;