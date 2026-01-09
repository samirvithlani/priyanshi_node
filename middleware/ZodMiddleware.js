const zodMiddleware = (schema)=>async(req,res,next)=>{

    try{

        await schema.parseAsync({body:req.body})
        next()
    }
    catch(err){
        res.json({
            message:"validaiton failed..",
            errors:err
        })
    }
}
module.exports = zodMiddleware