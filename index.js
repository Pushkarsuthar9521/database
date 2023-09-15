const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cors = require("cors");

const app = express(); // create express app
app.use(express.json());
app.use(
  cors({
    origin:[ "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// create user
app.post("/user", async (req, res) => {
  try {
    
    const user = await prisma.user.create({
      data: {
        "name" : req.body.name,
        "email" : req.body.email,
        "password" : req.body.password,
      }
    });
    res.json(user);
  } catch (err) {
    res.json(err);
  }
});
// get user 
app.get("/user", async (req, res) => {
  try{
    const user = await prisma.user.findMany();
    res.json(user);
  }catch(err){
    res.json(err);
  }
});

// delete user
app.delete("/user/:id", async (req, res) => {
  try{
    const user = await prisma.user.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.json(user);
  }catch(err){
    res.json(err);
  }
});

//update user
app.put("/user/:id", async (req, res) => {
  try{
    const user = await prisma.user.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        "name" : req.body.name,
        "email" : req.body.email,
        "password" : req.body.password,
      },
    });
    res.json(user);
  }catch(err){
    res.json(err);
  }
});

// create booking
app.post("/booking/:id", async (req, res) => {
  try {
    
    const booking = await prisma.booking.create({
      data: {
        "numOfSeats" : req.body.numOfSeats,
        "userId" : parseInt(req.params.id),
      }
    });
    res.json(booking);
  } catch (err) {
    res.json(err)
  }
});

//get booking
app.get("/booking", async (req, res) => {
  try{
    const booking = await prisma.booking.findMany();
    res.json(booking);
  }catch(err){
    res.json(err);
  }
});

//delete booking
app.delete("/booking/:id", async (req, res) => {
  try{
    const booking = await prisma.booking.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.json(booking);
  }catch(err){
    res.json(err);
  }
});

//update booking
app.put("/booking/:id", async (req, res) => {
  try{
    const booking = await prisma.booking.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        "numOfSeats" : req.body.numOfSeats,
      },
    });
    res.json(booking);
  }catch(err){
    res.json(err);
  }
});


// get users with booking
app.get("/user/booking", async (req, res) => {
  try{
    const user = await prisma.user.findMany({
      include: {
        booking: true,
      },
    });
    res.json(user);
  }catch(err){
    res.json(err);
  }
});


app.listen(3006, () => {
  console.log("server started at 3002");
});
