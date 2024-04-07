import express from "express";
import {
  brainTreePaymentController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  realtedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
//routes
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

//payments routes
//token
// router.get("/braintree/token", braintreeTokenController);

// //payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;


// import express from "express"; 
// import { createProductController, deleteProductController, getProductController, getSingleProductController, productFiltersController, productPhotoController, updateProductController } from "../controllers/productController.js";
// import formidable from "express-formidable";
// import { isAdmin, requireSignIn } from './../middlewares/authMiddleware.js';

// const router = express.Router() ;

// router.post("/create-product" , requireSignIn , isAdmin , formidable() , createProductController ) ;

// router.get("/get-product" , getProductController ) ;

// router.get("/get-product/:slug" ,getSingleProductController ) ;

// router.get("/product-photo/:pid" , productPhotoController ) ;

// router.delete("/delete-product/:pid" , deleteProductController ) ;

// router.put("/update-product/:pid" , requireSignIn , isAdmin , formidable() , updateProductController ) ;

// router.post("/product-filters" ,productFiltersController) ;

// //product count
// router.get("/product-count", productCountController);

// //product per page
// router.get("/product-list/:page", productListController);

// //search product
// router.get("/search/:keyword", searchProductController);

// //similar product
// router.get("/related-product/:pid/:cid", realtedProductController);

// //category wise product
// router.get("/product-category/:slug", productCategoryController);

// export default router ;