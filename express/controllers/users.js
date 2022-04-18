import db from "../config/db";
import userModel from "../models/user";

const getAll = (req, res) => {
  const userData = db.firestore().collection("users").get;
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
};

// const getByid = (req, res) => {
//   const userData
// };

// const create = (req, res) => {};

// const updateById = (req, res) => {};

// const deleteById = (req, res) => {};

export default getAll;
// module.exports = {
//   getAll,
//   // getByid,
//   // create,
//   // updateById,
//   // deleteById,
// };
