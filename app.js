//IMPORT MODUL-MODUL YANG DIBUTUHKAN
//FRAMEWORK UNTUK MEMBANGUN SERVER
const express = require('express');
//ODM UNTUK MONGODB
const mongoose = require('mongoose');
//MIDDLEWARE UNTUK UPLOAD FILE
const multer = require('multer');
//MODUL UNTUK BEKERJA SAMA DENGAN PATH FILE DAN DIREKTORI
const path = require('path');
//MIDDLEWARE UNTUK PARSING REQ BODY
const bodyParser = require('body-parser');

//MEMBUAT INSTANCE DARI EXPRESS
const app = express();
const PORT = 3000;

//MIDDLEWARE UNTUK PARSING JSON
app.use(express.json());

//MIDDLEWARE UNTUK PARSING FORM-DATA (URL-ENCODED)
app.use(express.urlencoded({ extended: true }));

//MIDDLEWARE UNTUK UPLOAD GAMBAR
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //MENENTUKAN FOLDER TUJUAN UNUTK SIMPAN FILE YANG DI UPLOAD
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        //MENENTUKAN NAMA FILE DENGAN MENAMBAH TIMESTAMP UNTUK MENGHINDARI KONFLIK NAMA
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
//MEMBUAT INSTANCE MULTER
const upload = multer({ storage: storage });

//KONEKSI KE MONGO
mongoose.connect('mongodb://127.0.0.1:27017/food-management')
    //MENAMPILKAN PESAN JIKA BERHASIL CONNECT
    .then(() => console.log('MongoDB Connected'))
    //MENAMPILKAN PESAN JIKA ERROR
    .catch(err => console.error('MongoDB Connection Error:', err));

//ROUTING
//IMPORT ROUTE UNTUK RESEP
const recipeRoutes = require('./routes/recipe');
//IMPORT ROUTE UNTUK FOODPLAN
const foodPlanRoutes = require('./routes/food-plan');

//MENGGUNAKAN ROUTE YANG SUDAH DIIMPORT
app.use('/api/recipe', recipeRoutes);
app.use('/api/food-plan', foodPlanRoutes);

//MENJALANKAN SERVER PADA PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});