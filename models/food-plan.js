//IMPORT MODUL MONGOOSE FOR MONGODB
const mongoose = require('mongoose');

//DEFINE SKEMA UNTUK FOODPLAN
const foodPlanSchema = new mongoose.Schema({
  //SIMPAN TANGGAL
  tanggal: { 
    type: Date, 
    required: true,
    //VALIDASI BAHWA TANGGAL VALID
    validate: {
      validator: function(value) {
        //CEK APAKAH TANGGAL VALID
        return !isNaN(Date.parse(value));
      },
      //PESAN KESALAHAN JIKA TIDAK VALID
      message: props => `${props.value} is not a valid date!`
    }
  },
  //MENYIMPAN REFERENSI KE RESEP, MENGGUNAKAN OBJECTID YANG MENGACU KE MODEL RECIPE
  resep: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Recipe', 
    required: true 
  }
});

//MENGEKSPOR MODEL FOODPLAN BERDASAR SKEMA FOODPLANSCHEMA
module.exports = mongoose.model('FoodPlan', foodPlanSchema);
