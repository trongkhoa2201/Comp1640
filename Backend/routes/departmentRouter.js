import express from "express";
import Department from "../Model/departmentModel.js";
import User from "../Model/userModel.js";
import expressAsyncHandler from "express-async-handler";
import { isAdmin, isAuth } from "../utils.js";

const departmentRouter = express.Router();

departmentRouter.get(
  "/",
  isAuth, 
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const departments = await Department.find({});
    res.send(departments);
  })
);

departmentRouter.post(
  "/createDepartment",
  isAuth, 
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newDepartment = new Department({
      name: req.body.name,
    });
    const department = await newDepartment.save();
    res.send({
      _id: department._id,
      name: department.name,
    });
  })
);

// departmentRouter.delete(
//   "/:id",
//   expressAsyncHandler(async (req, res) => {
//     const department = await Department.findById(req.params.id);
//     if (department) {
//       await department.deleteOne();
//       res.send({ message: "Department Deleted" });
//     } else {
//       res.status(404).send({ message: "Department Not Found" });
//     }
//   })
// );
departmentRouter.delete(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({ department: req.params.id });
    if(users.length === 0){
      const department = await Department.findById(req.params.id);
      if (department) {
        await department.deleteOne();
        res.send({ message: "Department Deleted" });
      } else {
        res.status(404).send({ message: "Department Not Found" });
      }
    }
    else{
      res.status(404).send({ message: "This department can be deleted" });
    }
  })
);

departmentRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const department = await Department.findById(req.params.id);
    if (department) {
      res.send(department);
    } else {
      res.status(404).send({ message: "Department Not Found" });
    }
  })
);

departmentRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const department = await Department.findById(req.params.id);
    if (department) {
        department.name = req.body.name || department.name;
      const updatedDepartment = await department.save();
      res.send({ message: "Department Updated", department: updatedDepartment });
    } else {
      res.status(404).send({ message: "Department Not Found" });
    }
  })
);

export default departmentRouter;
