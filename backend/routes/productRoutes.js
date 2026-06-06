const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { cloudinary, upload } = require('../config/cloudinary');
const streamifier = require('streamifier');

/** 
 * Route: Post /api/products
 * purpose: create a new product with images and videos upload to cloudinary
 */
/**router.post('/', upload.array('media', 5), async (req, res) => {
    console.log("1.Request received!"); //check if route is hit
    try {
        console.log("2.Files received:", req.files); //check if files are recieved        
        const { title, description, price, category, countInStock, isFeatured } = req.body;

        // if (!req.files || req.files.length === 0 ) {
        //     return res.status(400).json({ message: "Please upload at least one image or video."});
        // }

        const processedMedia = req.files.map((file) => ({
            // return {
                url: file.path,
                mediaType: file.mimetype.startsWith('video') ? 'video' : 'image'
            // };
        }));

        console.log("3.Attempting to save to MongoDB..");

        const newProduct = new Product({
            title: title,
            description: description,
            price: price,
            category: category,
            coountInStock: countInStock,
            isFeatured: isFeatured,
            media: processedMedia
        });

        const savedProduct = await newProduct.save();

        console.log("4.product saved successfully!");
        res.status(201).json({
            message: "Product created successfully!",
            product: savedProduct
        });

    } catch (error) {
        console.log("Error Detected:", error.message);
        // console.error("Error creating product:", error);
        res.status(500).json({ message: "Server error while creating product", error: error.message });
    }
});*/

router.post('/', upload.array('media', 5), async (req, res) => {
    try {
        const { title, description, price, category, countInStock, isFeatured } = req.body;

        //use promise.all to upload all files to cloudinary
        const uploadPromises = req.files.map((file) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "handora_products",
                        resource_type: "auto",
                    },
                    (error, result) => {
                        if (result) resolve(result);
                        else reject(error);
                    }
                );
                //write buffer to stream
                streamifier.createReadStream(file.buffer).pipe(stream);
            });
        });

        const uploadResults = await Promise.all(uploadPromises);

        const processedMedia = uploadResults.map(result => ({
            url: result.secure_url,
            mediaType: result.resource_type === 'video' ? 'video' : 'image'
        }));

        const newProduct = new Product({
            title: title,
            description: description,
            price: price,
            category: category,
            countInStock: countInStock,
            isFeatured: isFeatured,
            media: processedMedia
        });

        const savedProduct = await newProduct.save();
        res.status(201).json({
            message: "Product created successfully!",
            product: savedProduct
        });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Server error while creating product", error: error.message });
    }
});

/**
 * Route: Get /api/products
 * purpose: get all products from the database
 */
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1 });

        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Server error while fetching products", error: error.message });
    }
});

/**
 * Route: Get /api/products/:id
 * purpose: get a single product by id from the database
 */
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;