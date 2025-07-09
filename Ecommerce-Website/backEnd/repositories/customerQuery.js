import models from "../models/index.js";

// Qeury All customer
// TODO
export async function queryAllCustomers(req, res) {
  try {
    const allCustomers = await models.Customer.findAll();
    res.status(200).json(allCustomers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: "Failed to retrieve customers" });
  }
}
// Query Customer by customer_id
// TODO
// Query Customer + details + location by customer_id
// TODO
// Add customer
// TODO
// Delete customer
// TODO
// Edit customer
// TODO
// Query customer order history
// TODO
