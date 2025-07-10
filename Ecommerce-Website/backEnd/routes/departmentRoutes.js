import express from 'express';
import { getAllDepartment } from '../controllers/departmentController.js';

const departmentRouters = express.Router();

departmentRouters.route("/").get(getAllDepartment);


export default departmentRouters;