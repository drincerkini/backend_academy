import express from "express";

const app = express();

const PORT = 3000;

// middlewares
app.use(express.json());

// loging each recived request
app.use((req, res, next) => {
  console.log(`Recived new request: ${req.method} ${req.url}`);
  next();
});

// Main Endpoint
app.get("/", (req, res) => {
  res.send({ message: "welome to express server!" });
});

// GET Endpoint
app.get("/users", (req, res) => {
  res.json(users);
});

// UPDATE Endpoint
app.patch("/users/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  // console.log(isNaN(id));

  // validate that id is a number
  if (isNaN(id)) {
    return res.status(404).json({ error: "Invalid ID. ID must be a number!" });
  }

  const userUpdate = users.find((user) => user.id === id);

  if (!userUpdate) {
    return res.status(404).json({ error: "User not found!" });
  }

  try {
    Object.assign(userUpdate, req.body);

    res.json({ message: "user updated succesfuly", user: userUpdate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE Endpoint
app.delete("/users/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    let index = users.findIndex((user) => user.id === id);

    if (index === -1) {
      res.status(404).json({ error: "User does not exists!" });
    }

    users.splice(index, 1);
    res.status(200).json({ message: "User deleted successfuly" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`server listening on port: ${PORT}`);
});

// users list
const users = [
  {
    id: 1,
    name: "Drin",
    email: "dcerkini@gmail.com",
  },
  {
    id: 2,
    name: "filan",
    email: "filan@gmail.com",
  },
];
