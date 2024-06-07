//IMPORT MODUL MONGOOSE UNTUK BEKERJA DENGAN MONGODB
const mongoose = require('mongoose');

//DEFINISI SKEMA UNTUK KOLEKSI RECIPE
const RecipeSchema = new mongoose.Schema({
  judul: { type: String, required: true },
  kategori: { type: String, required: true },
  bahan: { type: [String], required: true },
  langkah: { type: [String], required: true },
  foto: { type: String, required: true }
});

//MENGEKSPOR MODEL RECIPE BERDASARKAN SKEMA RECIPESCEMA
module.exports = mongoose.model('Recipe', RecipeSchema);
