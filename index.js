import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 3000;
const URL = process.env.URL; // Paste your URL from MongoDB Atlas

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection , Schema and model are created here
try {
  await mongoose.connect(URL, { 
    useNewUrlParser: true,
  });
} catch (error) {
  console.log(error);
}
const itemSchema = new mongoose.Schema({ item: String });
const Item = mongoose.model("Item", itemSchema);
const Work = mongoose.model("Work", itemSchema);

app.get("/", async (req, res) => {
  const items = await Item.find({});
  res.render("index.ejs", { heading: "Today", tasks: items });
});

app.get("/work", async (req, res) => {
  const workitems = await Work.find({});
  res.render("index.ejs", { heading: "Work", tasks: workitems });
});

app.post("/", async (req, res) => {
  const newTask = req.body.task;
  let list = req.body.list;

  if (list === "Today") {
    const newItem = Item({ item: newTask });
    await newItem.save();
    res.redirect("/");
  } else {
    const workItem = Work({ item: newTask });
    await workItem.save();
    res.redirect("/work");
  }
});

app.post("/delete", async(req, res) => {
  const id = req.body.id;
  if (req.body.list === "Today") {
    await Item.findByIdAndRemove(id).exec();
    res.redirect("/");
  } else {
    await Work.findByIdAndRemove(id).exec();
    res.redirect("/work");
  }
});

app.listen(port, () => {
  console.log(`The server is running in port ${port}`);
});
