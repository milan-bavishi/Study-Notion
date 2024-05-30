const Category = require("../models/Category")


exports.createCategory = async (req,res) => {

    try{

        const{ name, description} = req.body;

        if(!name || !description){
            return res.status(400).json({
                success: false,
                message: "All field are Required",
            })
        }

        const categoryDetails = await Category.create({
            name: name,
            description: description,
        });
        console.log(categoryDetails);

        return res.status(200).json({
            success: true,
            message: "Category Created Successfully",
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

exports.showAllCategories = async (req,res) => {

    try{
        const allCategories = await Category.find({},{name:true, description:true});

        res.status(200).json({
            success: true,
            data: allCategories,
        });
    }catch(error){
        return res.status(500).json({
			success: false,
			message: error.message,
		});
    }
} 

exports.CategoryPageDetails = async (req,res) => {
    try{
        const{ categoryId} = req.body;
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Interna; server error",
            error: error.message,
        })
    }
}


exports.addCourseToCategory = async (req,res) => {
    try{

    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
}