//IMPORT MODUL EXPRESS
const express = require('express');
//IMPORT MODUL MULTER UNTUK KELOLA UPLOAD FILE
const multer = require('multer');
//IMPORT FUNGSI KONTROLER UNTUK RESEP DARI RECIPECONTROLLER
const { addRecipe, getRecipe, getRecipeById, updateRecipe, deleteRecipe } = require('../controllers/recipeController');
//MEMBUAT INSTANCE ROUTER DARI EXPRESS
const router = express.Router();

//KONFIGURASI PENYIMPANAN UNTUK MULTER
const storage = multer.diskStorage({
  //MENENTUKAN FOLDER TUJUAN PENYIMPANAN FILE
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  //TENTUKAN NAMA FILE YANG AKAN DISIMPAN
  filename: function (req, file, cb) {
    //MENAMBAH TIMESTAMP UNTUK MENGHINDARI KONFLIK NAMA
    cb(null, Date.now() + '-' + file.originalname);
  }
});

//BUAT INSTANCE UPLOAD
const upload = multer({ storage: storage });

//RUTE UNTUK POST RESEP BARU
router.post('/', upload.single('foto'), addRecipe);
//RUTE GET SEMUA RESEP
router.get('/' , getRecipe);
//RUTE GET BY ID RESEP
router.get('/:id' , getRecipeById);
//RUTE UPDATE RESEP BY ID
router.put('/:id', upload.single('foto'), updateRecipe);
//RUTE DELETE RESEP BY ID
router.delete('/:id', deleteRecipe);

//EXPORT ROUTER
module.exports = router;
