const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const ProductsController = require('../controllers/products');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {

        //check ':' , '.' characters
        var date = new Date().toISOString().replace('.','_');
        date = date.toString().replace(/:/g, '_');

        cb(null, date + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter
  });

router.get('/', ProductsController.products_get_all);

router.get('/:productID', ProductsController.products_get_product);

router.get('/update/:productID',  ProductsController.products_get_product);

router.post('/:productID', checkAuth, ProductsController.products_delete_product);

router.post('/update/:productID', upload.single('productImage'), ProductsController.products_update_product);

router.post("/", checkAuth, upload.single('productImage'), ProductsController.products_create_product);

module.exports = router;