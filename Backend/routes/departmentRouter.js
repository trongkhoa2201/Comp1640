import express from "express";
import Department from "../Model/departmentModel.js";
import expressAsyncHandler from "express-async-handler";

const departmentRouter = express.Router();

departmentRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const departments = await Department.find({});
    res.send(departments);
  })
);

departmentRouter.post(
  "/createDepartment",
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

departmentRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const department = await Department.findById(req.params.id);
    if (department) {
      await department.deleteOne();
      res.send({ message: "Department Deleted" });
    } else {
      res.status(404).send({ message: "Department Not Found" });
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
