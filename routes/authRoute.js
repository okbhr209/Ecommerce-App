import express from "express";
// import registerController from "../controllers/authController.js";
import {forgotPasswordController, getAllOrdersController, getOrdersController, orderStatusController, registerController, testController, updateProfileController} from "../controllers/authController.js";
import { loginController } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { updateProductController } from "../controllers/productController.js";

const router = express.Router() ;

// Register || METHOD :POST 
router.post("/register" , registerController) ;

// Login || METHOD : POST 
router.post("/login" ,loginController ) ;

router.get("/test" , requireSignIn , isAdmin , testController) ;

router.post("/forgot-password" , forgotPasswordController) ;

// protected routes 
router.get("/user-auth" , requireSignIn , (req,res)=>{
    res.status(200).send({ "ok":true}) ;
}) ;

//protected routes for admin
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
  });

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put( "/order-status/:orderId", requireSignIn, isAdmin, orderStatusController );


export default router ;