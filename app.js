const express = require("express")
const mongoose = require("mongoose")

const PORT = 3000

const app = express()

app.use(express.json())

const TodoSchema = new mongoose.Schema ({
    name: String,
    completed: Boolean,
})

const Todo = mongoose.model("Todo", TodoSchema);

//Connection to Database
const ConnectionString = "mongodb+srv://madhubhashana:abcd1234@todolist.txj3vx4.mongodb.net/?retryWrites=true&w=majority&appName=todolist"

//Routes
app.get("/", (req, res) => {
    res.send("Todo List Home Page");
})

app.get("/todos", async (req, res) => {
    const todo = await Todo.find({});
    res.json(todo);
})

app.post("/todos", async (req, res) => {
    const todo = await Todo.create(req.body);
    res.json(todo);
})

app.get("/todos/:id", async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    res.json(todo);
})

app.put("/todos/:id", async (req, res) => {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body);
    res.json(todo);
})

app.delete("/todos/:id", async (req, res) => {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    res.json(todo);
})

//Server Configurations
function connectDB(url) {
    return mongoose.connect(url)
}

async function start() {
    try {
        await connectDB(ConnectionString)
        app.listen(PORT, () => console.log("Sever Started listening on port: 3000"))
    }
    catch (err) {
        console.log(err);
    }
}

start()