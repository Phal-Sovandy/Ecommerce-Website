import models from "../models/index.js";

export async function queryAllDepartment(){
    try{
        const departments = await models.Department.findAll({
            attributes: ["department_id", "name"]
        });
        return departments;
    }
    catch(err){
        console.error("Error Fetching department", err);
        throw new Error(`Error Fetching department: ${err}`)
    }
}