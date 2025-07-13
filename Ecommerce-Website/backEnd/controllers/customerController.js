import {
  alterCustomerInfo,
  queryAllCustomers,
  queryAllCustomersBySearch,
  queryACustomerInformation,
  alterCustomerStatus
} from "../repositories/customerQuery.js";

export async function getAllCustomersController(req, res) {
  try {
    const customers = await queryAllCustomers();
    res.status(200).json(customers);
  } catch (error) {
    console.error("Error fetching customers: ", error.message);
    res.status(500).json({ error: "Failed to fetch customers" });
  }
}

export async function getCustomerBySearchController(req, res) {
  try {
    const search = req.query.search?.toLowerCase() || "";
    const status = req.query.status;
    const gender = req.query.gender;
    const sort = req.query.sort || "nameAsc";

    const customers = await queryAllCustomersBySearch(search, status, gender, sort);
    return res.json(customers);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getACustomerController(req, res) {
  try {
    const { customerId } = req.params;

    const customer = await queryACustomerInformation(customerId);
    return res.status(200).json(customer);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateCustomerInfoController(req, res) {
  try {
    const { customerId } = req.params;
    const updatedData = req.body;
    const profileImage = req.files?.["profile_picture"]?.[0];

    if (profileImage) {
      updatedData.profile_picture = `http://localhost:3002/uploads/customerProfiles/${profileImage.filename}`;
    }

    const updatedCustomer = await alterCustomerInfo(customerId, updatedData);

    return res.status(200).json({
      message: "Customer updated successfully",
      customer: updatedCustomer,
    });
  } catch (error) {
    console.error("Error updating customer:", error.message);
    return res.status(500).json({ error: error.message });
  }
}

export async function changeCustomerStatusController(req, res) {
  try {
    const { customerId } = req.params;
    const result = await alterCustomerStatus(customerId);
    res.status(200).json(result);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: "Failed to update customer status" });
  }
}
