const express = require('express');
const { cloudinary } = require('../middleware/cloudinary');
const Book = require('../models/Book');
const protectRoute = require('../middleware/protectRoute')
const router = express.Router();

router.post('/books',protectRoute, async (req, res) => {
    try {
        const { title, caption, rating, image } = req.body;

        if (!image || !title || !caption || !rating) {
            return res.status(400).json({ success: false, message: "Please provide complete details" });
        }

        const upload = await cloudinary.uploader.upload(image, {
            folder: 'uploads', // Optional: Organize images in a specific Cloudinary folder
        });

        return res.status(201).json({
            success: true,
            message: "Image uploaded successfully",
            data: {
                title,
                caption,
                rating,
                imageUrl: upload.secure_url, // Return the uploaded image URL
            },
        });
    } catch (err) {
        console.error("Upload error:", err);
        return res.status(500).json({ success: false, message: "Server error. Try again later." });
    }
});
router.get('/',protectRoute,async(req,res)=>{
    try{
    const page = req.query.page||1
    const limit = req.query.limit||1
    const skip = req.query.skip||1
    const books = await Book.find().sortBy({createdAt:-1}).skip(skip).limit(limit).populate('user',"username image")
    const total = await Book.countDocuments()     
    res.send({books,currentPage:page,totalBooks:total,totalPages:Math.ceil(totalBooks/limit)}) 
    }
    catch(err)
    { 
        console.log("Error in getting all books route") 
        res.status(500).json({message:"Internal Sever Error"})
    }
})
router.delete('/:id',protectRoute,async(req,res)=>{
    try{
            const {id} = req.params         
            const book = await Book.findById(id)
            if(!book) return res.status(400).json({success:false,message:"Cannot find book"})
            if(book.user.toString()!=req.user._id.toString()) return res.status(400).json({success:false,message:"Unauthorized"}) 
            if(book.image&&book.image.includes("cloudinary")) {
                try{ 
                    const publicId = book.image.split('/').pop().split('.')[0]   
                    await cloudinary.uploader.destroy(publicId) 
                }
                catch(err)
                { 
                    console.log("Error deleting image",err) 
                }
            }
            await Book.deleteOne({book}) 
            return res.json({message:"Book deleted Successfully"}) 
    }
    catch(err){
            return res.status(500).json({success:false,message:"Error deleting book"}) 
    }
})
module.exports = router;
