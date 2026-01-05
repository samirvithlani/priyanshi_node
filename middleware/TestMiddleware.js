//middlware alwasy expect 3 paarms
//1 req
//2 res
//3 next
const testing = (req,res,next)=>{

    var name = req.query.name
    var year = req.query.year
    console.log(req.query)
    //name must not undifined..
    if(name || year){

        if(name=="royal" && year ==2025){
            next() //allowing to enter in controller
        }
        else{
            res.json({
                message:"you are not invited.."
            })
        }

    }
    else{
        res.json({
            message:"name is required to enter.."
        })
    }

}
module.exports = {
    testing
}