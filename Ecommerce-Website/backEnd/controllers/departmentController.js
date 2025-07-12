import { queryAllDepartment } from "../repositories/departmentQuery.js";

export async function getAllDepartmentController(req, res) {
  try {
    const data = await queryAllDepartment();
    return res.status(200).json(data);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    return res.status(500).json({ message: "Internal server error" });
  }
}
 