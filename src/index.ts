import dotenv from "dotenv";
import { AddressInfo } from "net";
import express from "express";
import signup from "./endpoints/signup";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/signup", signup)
app.post("/login", login)


const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Server is running at http://localhost:${address.port}`);
    } else {
      console.log(`Server failed to start`);
    }
  });


