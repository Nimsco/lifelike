require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db");

connectDB();

PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/login", (req, res) => {
  res.send("login page");
});

app.listen(PORT || 3000, () => {
  console.log(`Server running on port: ${PORT}`);
});
