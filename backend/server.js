import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import connectDB from "./src/db/db.js";

connectDB()

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT || 3000, () => {
  console.log(`Server running on port: ${PORT}`);
});
