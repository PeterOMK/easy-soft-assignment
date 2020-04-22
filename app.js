var express = require("express");
var app = express();
var port = 8080;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/employeedb");
var nameSchema = new mongoose.Schema({
    firstName: String,
    things: String
});
var todo = mongoose.model("todo", nameSchema);
//To render The Index File
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


app.post("/add", (req, res) => {
    var myData = new todo(req.body);
    myData.save()
        .then(item => {
            res.send("Details saved to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

//Rout To List The TODO List
app.get("/todoList",(req,res) =>{
	todo.find({}, 'things')
	.exec(function(err,todo){
		if(err){
			res.send("There is an error!!!");
		}
		else{
			res.json(todo);
		}
	});
});

app.get("/employeeList",(req,res) =>{
	todo.find({}, 'firstName')
	.exec(function(err,firstName){
		if(err){
			res.send("There is an error!!!");
		}
		else{
			res.json(firstName);
		}
	});
});

//portNumber Of App
app.listen(port, () => {
    console.log("Server listening on port " + port);
});
