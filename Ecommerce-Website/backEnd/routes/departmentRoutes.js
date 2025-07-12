import express from 'express';
import { getAllDepartmentController } from '../controllers/departmentController.js';

const departmentRouters = express.Router();

departmentRouters.route("/").get(getAllDepartmentController);


export default departmentRouters;