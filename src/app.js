import express, { urlencoded } from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();

//Middlewares
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.get(`/ping`, (req, res) => {
  res.send(`pong`);
});

app.get("/tasks", (req, res) => {
  res.json([]);
});

app.post(`/tasks`, (req, res) => {
  res.json({ test: { messages: "Testt is run" } });
});

app.post(`/tasks/id`, (req, res) => {
  const { title, description } = req.body;

  if (title === undefined || description === undefined) return res.sendStatus(400);

  req.json({
    id: uuidv4(),
    title: title,
    description: description,
  });
});

app.listen(3000);
console.log(`Listening on port 3000`);

export default app;
