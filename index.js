import express from "express";

const app = express();

const PORT = 3000;

// middlewares
app.use(express.json());

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

  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "User not found!" });
  }

  try {
    const updatedUser = { ...users[index], ...req.body};
    users[index] = updatedUser;

    res.json({ message: "user updated succesfuly", user: updatedUser });
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
