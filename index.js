import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import apiHandler from "./src/server/apiHandler.js";
import authHendler from "./src/server/authHendler.js";

const port = 5090;
const app = express();
const PORT = process.env.PORT || port;

// parser for the data the reciving
app.use(bodyParser.json());
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:4000",
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/", apiHandler);
app.use("/auth", authHendler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${PORT}`);
});
