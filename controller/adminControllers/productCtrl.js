const Images = require("../../models/ImageSchema");
const CategoryCollection =require("../../models/categorySchema")
const productCollection = require("../../models/ProductSchema");
const CollectionModel = require("../../models/collectionSchema");
const sharp = require("sharp");
const path = require("path");

const productManagement = async (req, res) => {
    try {
        const findProduct = await productCollection.find()
        .populate('categoryName')
        .populate('collectionName')
        .populate("images");
        res.render('./admin/pages/Products', { title: 'Products', productList: findProduct })
    } catch (error) {
        throw new Error(error)
    }
  }

const addProduct = async (req, res) => {
  try {
    const category = await CategoryCollection.find({ isListed: true });    
    const collections = await CollectionModel.find()
    if (category,collections) {
      res.render("./admin/pages/addProducts", {
        title: "addProducts",
        catList: category,
        collList: collections,
        
    
      });
    }
  } catch (error) {
    conole.error(error.message);
  }
};



//Inserting a product 
const insertProduct = async (req, res) => {
  try {
      const imageUrls = []; 

      // Check if req.files exists and has images
      if (req.files && req.files.images.length > 0) {
          const images = req.files.images;

          for (const file of images) {
              try {
                  const imageBuffer = await sharp(file.path)
                      .resize(600, 800)
                      .toBuffer();
                  const thumbnailBuffer = await sharp(file.path)
                      .resize(300, 300)
                      .toBuffer();
                  const imageUrl = path.join("/adminassets/uploads", file.filename);
                  const thumbnailUrl = path.join("/adminassets/uploads", file.filename);
                  imageUrls.push({ imageUrl, thumbnailUrl });
              } catch (error) {
                  console.error("Error processing image:", error);
              }
          }

          const image = await Images.create(imageUrls);
          const imageId = image.map((image) => image._id).reverse()

          const newProduct = await productCollection.create({
              productName: req.body.productName,
              collectionName: req.body.collectionName,
              color: req.body.color,
              description: req.body.description,
              categoryName: req.body.categoryName,
              quantity: req.body.quantity,
              productPrice: req.body.productPrice,
              salePrice: req.body.salePrice,
              images: imageId
          })

          console.log('inserted', newProduct);
          if (newProduct) {
              res.redirect('/admin/Products')
          }
      } else {
          res.status(400).json({ error: "Invalid input: No images provided" });
      }
  } catch (error) {
    console.error(error.message)
  }
};

// ListProduct---
const listProduct = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const listing = await productCollection.findByIdAndUpdate(
      { _id: id },
      { $set: { isListed: true } }
    );
    console.log(listing);
    res.redirect("/admin/Products");
  } catch (error) {
    console.error(error.message);
  }
};

// unlist category---
const unListProduct = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const listing = await productCollection.findByIdAndUpdate(
      { _id: id },
      { $set: { isListed: false } }
    );
    console.log(listing);
    res.redirect("/admin/Products");
  } catch (error) {
    console.error(error.message);
  }
};

const editProduct =async(req,res)=>{
  try {
    res.render('editProduct')
  } catch (error) {
    console.error(error.message)
  }
}


// editProductPage Loading---
const editProductPage = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await CategoryCollection.find({ isListed: true });
    const productFound = await productCollection.findById(id)
      .populate("categoryName")
      .populate("images");
    console.log("images", productFound.images);
    console.log(productFound);
    if (productFound) {
      res.render("/admin/editProduct", {
        title: "editProduct",
        product: productFound,
        catList: category,
      });
    }
  } catch (error) {
    console.error(error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log('id  body', req.body);
    const updateProduct = await productCollection.findByIdAndUpdate(
      { _id: id },
      req.body
    );

    res.redirect("/admin/pages/Products");
  } catch (error) {
    throw new Error(error);
  }
};

// edit image function---
const editImage = async (req, res) => {
  try {
    const imageId = req.params.id;
    const file = req.file;
    console.log("file", req.file);
    const imageBuffer = await sharp(file.path).resize(600, 800).toBuffer();
    const thumbnailBuffer = await sharp(file.path).resize(300, 300).toBuffer();
    const imageUrl = path.join("/adminassets/uploads", file.filename);
    const thumbnailUrl = path.join("/adminassets/uploads", file.filename);

    const images = await Images.findByIdAndUpdate(imageId, {
      imageUrl: imageUrl,
      thumbnailUrl: thumbnailUrl,
    });

    req.flash("success", "Image updated");
    res.redirect("back");
  } catch (error) {
    throw new Error(error);
  }
};
// Delete image using fetch
const deleteImage = async (req, res) => {
  try {
    const imageId = req.params.id;
    // Optionally, you can also remove the image from your database
    await Images.findByIdAndRemove(imageId);
    const product = await productCollection.findOneAndUpdate(
      { images: imageId },
      { $pull: { images: imageId } },
      { new: true }
    );
    res.json({ message: "Images Removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  addProduct,
  insertProduct,
  editProduct,
  listProduct,
  unListProduct,
  editProductPage,
  updateProduct,
  editImage,
  deleteImage,
  productManagement



  // renderForm
};
