const express=require('express');

const router=express.Router();

const predController=require('../controller/prediction_controller');

router.post('/entry',predController.addPrediction);
router.post('/updateParamsAndroid',predController.updateParamsAndroid);
router.post('/updateParamsBackend',predController.updateParamsFromBackendTraining);
router.post('/extraDetails',predController.addExtraDetails);

module.exports=router; 
