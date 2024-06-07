//IMPORT MODEL RECIPE DARI FILE MODEL
const Recipe = require('../models/recipe');

//FUNGSI UNTUK MENAMBAH RESEP BARU (POST)
exports.addRecipe = async (req, res) => {
  try {
    // console.log('Request body:', req.body);
    // console.log('Request file:', req.file);
    //MENGAMBIL DATA DARI BODY REQUEST
    const { judul, kategori, bahan, langkah } = req.body;
    const foto = req.file.path;

    //PARSING STRING BAHAN DAN LANGKAH KE DALAM ARRAY
    const parsedBahan = JSON.parse(bahan);
    const parsedLangkah = JSON.parse(langkah);

    //MEMBUAT INSTANCE BARU DARI MODEL RECIPE
    const newRecipe = new Recipe({ 
      judul, 
      kategori, 
      bahan: parsedBahan, 
      langkah: parsedLangkah, 
      foto 
    });
    //MENYIMPAN INSTANCE BARU KE DB
    await newRecipe.save();
    //MENGIRIM RESPON DENGAN STATUS 201 CREATED
    res.status(201).json(newRecipe);
  } catch (err) {
    //MENCETAK KESALAHAN
    console.error('Error adding recipe:', err);
    res.status(400).json({ message: err.message });
  }
};

//FUNGSI UNTUK MENDAPAT SEMUA RESEP (GET)
exports.getRecipe = async (req, res) => {
  try {
    //MENCARI SEMUA RESEP
    const recipe = await Recipe.find();
    //MENGIRIM RESPON DENGAN DATA SEMUA RESEP
    res.json(recipe);
  } catch (err) {
    //MENANGKAP DAN MENGIRIM RESPON ERROR
    res.status(500).json({ message: err.message });
  }
};

//FUNGSI MENDAPATKAN RESEP BY ID (GET)
exports.getRecipeById = async (req, res) => {
    try {
        //MENGAMBIL ID DARI PARAM REQ
        const { id } = req.params;
        //MENCARI RESEP BERDASAR ID DI DB
        const recipe = await Recipe.findById(id);
        //KALAU TIDAK ADA AKAN DIKIRIM PESAN 404 NOT FOUND
        if (!recipe) return res.status(404).json({ message: "Resep tidak ditemukan" });
        //MENGIRIM RESPONS DENGAN DATA RESEP
        res.json(recipe);
    } catch (err) {
        //MENANGKAP DAN MENGIRIM RESPON ERROR
        res.status(500).json({ message: err.message });
    }
};

//FUNGSI UPDATE RESEP BY ID (PUT)
exports.updateRecipe = async (req, res) => {
  try {
    //MENGAMBIL ID DARI PARAM REQ DAN DATA DARI BODY REQ
    const { id } = req.params;
    const { judul, kategori, bahan, langkah } = req.body;
    const foto = req.file ? req.file.path : req.body.foto;

    //MENCARI DAN UPDATE RESEP BY ID
    const recipe = await Recipe.findByIdAndUpdate(id, { judul, kategori, bahan, langkah, foto }, { new: true });
    //MENANGKAP DAN MENGIRIM RESPON ERROR
    res.json(recipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//FUNGSI HAPUS RESEP BY ID (DELETE)
exports.deleteRecipe = async (req, res) => {
  try {
    //MENGAMBIL ID DARI PARAM REQ
    const { id } = req.params;
    //MENCARI DAN MENGHAPUS RESEP BY ID DI DB
    await Recipe.findByIdAndDelete(id);
    //MENGIRIM RESPON DENGAN PESAN BERHASIL DIHAPUS
    res.json({ message: 'Resep berhasil dihapus' });
  } catch (err) {
    //MENANGKAP ERROR
    res.status(500).json({ message: err.message });
  }
};
