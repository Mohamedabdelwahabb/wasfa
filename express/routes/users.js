import { Router } from "express";

// import * as userCont from "../controllers/users";
// import getAll from "../controllers/users";
const userRouter = Router();

/* GET users listing. */
userRouter.get("/", function (req, res) {
  const userData = app.firestore().collection("users").get;
  let arr = [];
  userData.forEach((element) => {
    new user({
      TheName: element.data().TheName,
      email: element.data().email,
      age: element.data().age,
    });
    arr.push(user);
  });
  res.json(user);
});

// userRouter.get("/:id", userCont.getById);

// userRouter.post("/", userCont.create);

// userRouter.put("/:id", userCont.updateById);

// userRouter.delete("/:id", userCont.deleteById);

export default userRouter;
