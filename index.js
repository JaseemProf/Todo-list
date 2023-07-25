import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const items = [];
const workitems = [];
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("index.ejs",{heading:"Today",tasks:items});
});

app.get("/work",(req,res)=>{
    res.render("index.ejs",{heading:"Work", tasks:workitems })
})

app.post("/",(req,res)=>{
    const newTask = req.body.task;
    let list = req.body.list
    if (list === "Today"){
        items.push(newTask);
        res.redirect("/");
    } else {
        workitems.push(newTask);
        res.redirect("/work")
    }
})

app.listen(port, ()=>{
    console.log(`The server is running in port ${port}`);
});