import cors from "cors";
import express from "express";
import { router } from "./routes";

const app = express();
const port = process.env.APP_PORT || 3001;

app.use(express.json());
app.use(cors());
app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`🚀 Service listening on port ${port}`);
});
