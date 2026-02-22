import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "sreeman@db",
  port: 5432,
  status: "connected",
});

db.connect();
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
let totalItems=[];

app.get("/",async (req, res) => {
  const totalItems=await db.query("SELECT * FROM items");
  res.render("index.ejs", {
    listTitle: "Today",
    listItems:totalItems.rows,
  });
});

app.post("/add",async (req, res) => {
  const item = req.body.newItem;
  const addItem= await db.query("INSERT INTO items(title) VALUES($1)",[item]);
  totalItems.push({ title: item });
  res.redirect("/");
});

app.post("/edit",async (req, res) => {
  const id=req.body.updatedItemId;
  const editItem= req.body.updatedItemTitle;
  const updateItem=await db.query("UPDATE items SET title = $1 WHERE id= $2",[editItem, id]);
  res.redirect("/");
});

app.post("/delete",async (req, res) => {
  const deleteId=req.body.deleteItemId;
  const deleteItem=await db.query("DELETE FROM items WHERE id=$1",[deleteId]);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
