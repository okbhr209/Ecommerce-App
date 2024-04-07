import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
    try {
        console.log( req.body ) ;

      const { name } =    req.body;
      if (!name) {
        console.log(name) ;
         return res.status(401).send({ message: "Name is required" });
      }
    //   console.log(name) ;
      const existingCategory = await categoryModel.findOne({ name });
      if (existingCategory) {
        return res.status(200).send({
          success: false,
          message: "Category Already Exisits",
        });
      }
      const category = await new categoryModel({
        name,
        slug: slugify(name),
      }).save();
      res.status(201).send({
        success: true,
        message: "new category created",
        category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in Category",
      });
    }
  };

//update category
export const updateCategoryController = async(req,res)=>{
    try {
        const {name} = req.body ;
        const {id} = req.params  ;

        const category = await categoryModel.findByIdAndUpdate( id , { name ,slug: slugify(name) } , {new: true } ) ;
        res.status(200).send({
            success:true ,
            message :"category updated successfully" ,
            category
        }) ;

    } catch (error) {
        console.log(error) ;
        res.status(500).send({
            success: false ,
            error ,
            message:"Error in update category"
        })
    }
} ;

// get all categories
export const categoryController= async(req,res)=>{
    try {
        const category = await categoryModel.find({}) ;
        res.status(200).send({
            success:true , 
            category ,
            message:"All categories list"
        })  ;

    } catch (error) {
        console.log(error) ;
        res.status(500).send({
            success:false ,
            error,
            message:"Error in getting all categories"
        })
    }
} ;

export const singleCategoryController= async(req,res)=>{
    try {
        const category = await categoryModel.find({ slug: req.params.slug } ) ;
        res.status(200).send({
            success:true , 
            category ,
            message:"Get single category successfully"
        })  ;
        
    } catch (error) {
        console.log(error) ;
        res.status(500).send({
            success:false ,
            error,
            message:"Error in getting single category"
        })
    }
} ;

export const deleteCategoryController= async(req,res)=>{
    try {
        const {id} = req.params ;
        const category = await categoryModel.findByIdAndDelete(id ) ;
        res.status(200).send({
            success:true , 
            category ,
            message:"category  deleted successfully"
        })  ;
        
    } catch (error) {
        console.log(error) ;
        res.status(500).send({
            success:false ,
            error,
            message:"Error while deleting category"
        })
    }
} ;
