const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express(); // create express app
app.use(express.json());

app.get("/user", async (req, res) => {
  
  const users = await prisma.user.findMany();
  res.send(users);
});

app.get("/user/:id", async (req, res) => {
  
  const user = await prisma.user.findMany({
    where: { id: req.params.id },
  });
  res.send(user);
});

app.post("/user", async (req, res) => {

  const user = await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
    },
  });
  res.send(user);
});

app.patch("/user/:id", async (req, res) => {
  try {
    
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: {
        name: req.body.name,
        email: req.body.email,
      },
    });
    res.send(user);
  } catch (error) {
    res.status(404).send({ error: "user not found" });
  }
});

app.delete("/user/:id", async (req, res) => {
  try {
    
    const user = await prisma.user.delete({
      where: { id: req.params.id },
    });
    res.send(user);
  } catch (error) {
    res.status(404).send({ error: "user not found" });
  }
});

// booking
app.get("/booking", async (req, res) => {
  
  const booking = await prisma.booking.findMany();
  res.send(booking);
});



app.post("/booking/:id", async (req, res) => {
  try {
    
    const booking = await prisma.booking.create({
      data: {
        num_of_seats: req.body.num_of_seats,
        userId: req.body.userId, // Connect the booking to an existing user
      },
    });
    res.send(booking);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while creating the booking.");
  } finally {
    await prisma.$disconnect();
  }
});

app.listen(3001, () => {
  console.log("server started at 3000");
});
