import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRouter.js";
import adminRouter from "./routes/adminRouter.js";
import uploadRouter from "./routes/uploadRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import departmentRouter from "./routes/departmentRouter.js";
import topicRouter from "./routes/topicRouter.js";
import postRouter from "./routes/postRouter.js";

dotenv.config();
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connect to the database");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/seed", seedRouter);
app.use("/api/users", adminRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/departments", departmentRouter);
app.use("/api/topics", topicRouter);
app.use("/api/posts", postRouter);
app.use("/api/upload", uploadRouter);

app.get("/api/users", (req, res) => {
  res.send(data.users);
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
