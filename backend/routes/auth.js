import express from "express";

import { logIn , signUp} from "../mongodb/mongodb.js";

import { User } from "../mongodb/models/User.js";

export const userRoutes = express();

/*
 * POST /signin (logs user in)
 *returns success reply
 */
userRoutes.post("/signin", async (req, res) => {
    const resData = await logIn(req.body, User);
    return res.send(resData);
  });
/*
 * POST /signup (signs user up)
 * returns success reply
 */
userRoutes.post("/signup", (req, res) => {
    signUp(req.body, User)
      .then((msg) => {
        return res.send(msg);
      })
      .catch((err) => {
        console.log(err);
        return res.send({ msg: "some err occurred" });
      });
  });