import express from "express";
import cors from "cors";
import pg from "pg";
import env from "dotenv";

const port = 5000;

const app = express();

app.use(cors());
app.use(express.json());
env.config();

const db = new pg.Client({
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();



// Get all todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await db.query("SELECT * FROM todo");
    console.log(todos.rows);
    res.json(todos.rows);
  } catch (error) {
    console.log(error);
  }
});
// Get a to-do
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await db.query("SELECT * FROM todo WHERE id=($1)", [id]);
    res.json(todo.rows);
  } catch (err) {
    console.error(err.message);
  }
});


// Create(Post) a new To Do
app.post("/todos", async (req, res) => {
  const { description } = req.body;
  try {
    const newToDo = await db.query(
      "INSERT INTO todo(description) VALUES ($1) RETURNING *",
      [description]
    );
    res.json(newToDo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});


// Edit a to-do
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updatedTodo = await db.query(
      "Update todo SET description =$1 WHERE id=$2 RETURNING *",
      [description, id]
    );

    res.json(updatedTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Delete a to-do
app.delete("/todos/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const deletedTodo=await db.query("DELETE FROM todo WHERE id=$1 RETURNING *",[id]);
        console.log(deletedTodo.rows[0]);
        res.json(deletedTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
        
    }
});



app.listen(port, () => {
  console.log(`Server started on port:${port}`);
});
