//IMPORT MODUL DAN DECLARE VAR
const foodPlan = require('../models/food-plan');
const Recipe = require('../models/recipe');

//FUNGSI UNTUK MENAMBAHKAN RENCANA MAKAN BARU (POST)
exports.addFoodPlan = async (req, res) => {
    try {
        //MENAMBAH DATA TANGGAL DAN RESEP DARI REQ BODY
        const { tanggal, resep } = req.body;
        
        //MEMERIKSA RESEP ADA DI DATABASE ATAU TIDAK
        const recipeExists = await Recipe.findById(resep);
        if (!recipeExists) {
            //JIKA TIDAK ADA, KIRIM RESPON 404
            return res.status(404).json({ message: 'Resep tidak ditemukan' });
        }

        //MEMBUAT OBJEK RENCANA MAKAN BARU
        const newFoodPlan = new foodPlan({ tanggal, resep });
        //MENYIMPAN KE DATABASE
        await newFoodPlan.save();
        //MENGIRIM RESPON DENGAN STATUS 201 DAN DATA RENCANA MAKAN YANG BARU DI TAMBAHKAN
        res.status(201).json(newFoodPlan);
    } catch (err) {
        //MENANGANI KESALAHAN
        console.error('Error adding food plan:', err);
        res.status(400).json({ message: err.message });
    }
};

//FUNGSI UNTUK MENDAPAT SEMUA RECANA MAKAN (GET)
exports.getFoodPlan = async (req, res) => {
    try {
        //MENDAPAT SEMUA RENCANA DARI DB
        const plan = await foodPlan.find().populate('resep');
        //mMENGIRIM RESPON DENGAN DATA RENCANA MAKAN
        res.json(plan);
    } catch (err) {
        //MENANGANI ERROR
        res.status(500).json({ message: err.message });
    }
};

//FUNGSI UNTUK MENDAPAT RENCANA MAKAN BY ID (GET)
exports.getFoodPlanById = async (req, res) => {
    try {
        //MENDAPAT ID DARI PARAMETER REQ
        const { id } = req.params;
        //MENCARI RENCANA MAKAN BY ID DAN POPULATE RESEP
        const plan = await foodPlan.findById(id).populate('resep');
        //MEMERIKSA APAKAH PLANNYA ADA ATAU TIDAK
        if (!plan) return res.status(404).json({ message: "Rencana masak tidak ditemukan" });
        //MENGIRIM RESPON DENGAN DATA YAGN DITEMUKAN
        res.json(plan);
    } catch (err) {
        //MENANGANI ERROR
        res.status(500).json({ message: err.message });
    }
};

//FUNGSI UNTUK UPDATE BY ID (PUT)
exports.updateFoodPlan = async (req, res) => {
    try {
        //MENDAPAT ID DARI PARAM REQ
        const { id } = req.params;
        //MENDAPAT DATA TANGGAL DAN RESEP DARI REQ BODY
        const { tanggal, resep } = req.body;
        //IPDATE FOOD PLAN BERDASAR ID
        const plan = await foodPlan.findByIdAndUpdate(id, { tanggal, resep }, { new: true });
        //MENGIRIM RESPON
        res.json(plan);
    } catch (err) {
        //MENANGANI ERROR
        res.status(400).json({ message: err.message });
    }
};

//FUNGSI UNTUK MENGHAPUS FOOD PLAN BY ID (DELETE)
exports.deleteFoodPlan = async (req, res) => {
    try {
        //MENDAPAT ID
        const { id } = req.params;
        //MENGHAPUS FOOD PLAN
        await foodPlan.findByIdAndDelete(id);
        //MENGIRIM RESPON KONFIRMASI PENGHAPUSAN RENCANA MAKAN
        res.json({ message: 'Rencana masak berhasil dihapus' });
    } catch (err) {
        //MENANGANI ERROR
        res.status(500).json({ message: err.message });
    }
};
