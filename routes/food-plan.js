//IMPORT MODULE EXPRESS
const express = require('express');
//MEMBUAT INSTANCE ROUTER DARI EXPRESS
const router = express.Router();

//IMPORT FUNGSI KONTROLER YANG AKAN DIGUNAKAN UNTUK RUTE
const {
    addFoodPlan,
    getFoodPlan,
    getFoodPlanById,
    updateFoodPlan,
    deleteFoodPlan
} = require('../controllers/foodPlanController');

//MENANGANI POST KE ENDPOINT ROOT
router.post('/', addFoodPlan);
//MENANGANI GET KE ENDPOINT ROOT
router.get('/', getFoodPlan);
//MENANGANI GET KE ENDPOINT DENGAN PARAMETER ID
router.get('/:id', getFoodPlanById);
//MENANGANI PUT KE ENDPOINT DENGAN PARAMETER ID
router.put('/:id', updateFoodPlan);
//MENANGANI DELETE KE ENDPOINT DENGAN PARAMETER ID
router.delete('/:id', deleteFoodPlan);

//EXPORT ROUTER SEHINGGA BISA DIGUNAKAN DI BAGIAN LAIN DARI APP
module.exports = router;
