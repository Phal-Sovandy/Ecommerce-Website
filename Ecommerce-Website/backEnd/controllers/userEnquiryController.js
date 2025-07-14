import {
  queryAllUserEnquiry,
  queryAUserEnquiry,
  queryAllUserEnquiryBySearch,
  alterEnquiryPriority,
  removeUserEnquiry
} from "../repositories/userEnquiryQuery.js";

export async function getAllUserEnquiryController(req, res) {
  try {
    const enquiries = await queryAllUserEnquiry();
    res.status(200).json(enquiries);
  } catch (error) {
    console.error("Error fetching user enquiries: ", error.message);
    res.status(500).json({ error: "Failed to fetch user enquiries" });
  }
}

export async function getAUserEnquiryController(req, res) {
  try {
    const {enquiryId} = req.params;
    const enquiries = await queryAUserEnquiry(enquiryId);
    res.status(200).json(enquiries);
  } catch (error) {
    console.error("Error fetching user enquiry: ", error.message);
    res.status(500).json({ error: "Failed to fetch user enquiry" });
  }
}

export async function getAllUserEnquiryBySearchController(req, res) {
  try {
    const { search, priority, role, gender, sort } = req.query;
    const enquiries = await queryAllUserEnquiryBySearch(
      search,
      priority,
      role,
      gender,
      sort
    );
    res.status(200).json(enquiries);
  } catch (error) {
    console.error("Error fetching user enquiries: ", error.message);
    res.status(500).json({ error: "Failed to fetch user enquiries" });
  }
}

export async function changeEnquiryPriorityController(req, res) {
  try {
    const { enquiryId } = req.params;
    const { priority } = req.body;
    const result = await alterEnquiryPriority(enquiryId, priority);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error changing user enquiries priority: ", error.message);
    res
      .status(500)
      .json({ error: "Failed to changing user enquiries priority" });
  }
}

export async function deleteUserEnquiryController(req, res) {
  try {
    const { enquiryId } = req.params;
    const result = await removeUserEnquiry(enquiryId);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error changing user enquiries priority: ", error.message);
    res
      .status(500)
      .json({ error: "Failed to changing user enquiries priority" });
  }
}
