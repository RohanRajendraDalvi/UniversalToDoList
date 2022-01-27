const port = 8080;
const mongoose = require("mongoose");
//const conn_str ="C"
const conn_str = "mongodb+srv://RohanDalvi:RohanDalvi@cluster0.0ewjj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(conn_str, { useNewUrlParser: true , useUnifiedTopology: true})
    .then( () => console.log("Connected successfully...") )
    .catch( (err) => console.log(err) );

const cardSchema = new mongoose.Schema({
Title: String ,
Description: String,
});


const card = new mongoose.model("card", cardSchema);
/** Express Mongoose Integration **/
const express = require("express");
var cors = require('cors');
const app = express();
//add middlewares
app.use(express.json());
app.use(cors());



app.route("/card")
.get(async (req, res) => {
    let data = await card.find();
    res.json({
        success:true,
        data:data,
    });
})
.post(async(req,res)=>{
    let data = req.body;
    console.log(data);
    // res.send("temp")
    if(Object.keys(data).length != 0){
        let obj=new card(data);
        let result= await obj.save();
        res.json({
            success:true,
            data:result,
        })
    }
    else{
        res.json({
            success:false,
            message:"Body empty",
        })
    }
})
.put(async(req,res)=>{
    let data = req.body;
    // console.log(data);
    // res.send("temp")
    if(Object.keys(data).length != 0){
        let result = await card.updateOne({
            "_id":data.id,
        },{
            "$set":{
            
                    "Title":data.Title,
                    "Description":data.Description
        
            }
        } )
      
        res.json({
            success:true,
            data:result,
        })
    }
    else{
        res.json({
            success:false,
            message:"Body empty",
        })
    }
})
.delete(async (req, res) => {
	let d_data = await card.deleteOne({"_id": req.body.id});
	res.json({
        success:true,
        message:"Deleted data"
    });
})


// .post(async (req, res) => {
// let req_data = req.body;
// let obj = new card(req_data)
// let result = await obj.save();
// res.send(result);
// })
// .put(async (req, res) => {
// console.log(req.body);
// //model.updateOne({where}, {set});
// let u_data = await card.updateOne({"_id": req.body._id}, {
// "$set": {
// "name" : req.body.name,
// "age" : req.body.age,
// "city" : req.body.city
// }
// });
// res.send(u_data);
// })
// .delete(async (req, res) => {
// let d_data = await card.deleteOne({"_id": req.body._id});
// res.send(d_data);
// })
app.listen(process.env.PORT || port, () => {
console.log("listening 8080...");
});