import * as reviewQuery from "../repositories/reviewQuery.js";

export async function getAllReviews(req, res) {
  try {
    const reviews = await reviewQuery.queryAllReviews();
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching all reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
}

// Get all reviews by customer_id
export async function getReviewsByCustomer(req, res) {
  const { customer_id } = req.params;
  try {
    const reviews = await reviewQuery.queryReviewsByCustomerId(customer_id);
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews by customer:", error);
    res.status(500).json({ error: "Failed to fetch reviews by customer" });
  }
}

// Get all reviews by ASIN (product id)
export async function getReviewsByProduct(req, res) {
  const { asin } = req.params;
  try {
    const reviews = await reviewQuery.queryReviewsByAsin(asin);
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews by product:", error);
    res.status(500).json({ error: "Failed to fetch reviews by product" });
  }
}

// Add a new customer review
export async function addReview(req, res) {
  const reviewData = req.body;
  try {
    const newReview = await reviewQuery.addCustomerReview(reviewData);
    res.status(201).json(newReview);
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ error: "Failed to add review" });
  }
}

// Delete a customer review
export async function deleteReview(req, res) {
  const { review_id } = req.params;
  try {
    const deletedCount = await reviewQuery.deleteCustomerReview(review_id);
    if (deletedCount) {
      res.status(200).json({ message: "Review deleted successfully" });
    } else {
      res.status(404).json({ error: "Review not found" });
    }
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ error: "Failed to delete review" });
  }
}

// Update/edit a customer review
export async function updateReview(req, res) {
  const { review_id } = req.params;
  const updatedData = req.body;
  try {
    const updatedCount = await reviewQuery.updateCustomerReview(review_id, updatedData);
    if (updatedCount) {
      res.status(200).json({ message: "Review updated successfully" });
    } else {
      res.status(404).json({ error: "Review not found" });
    }
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ error: "Failed to update review" });
  }
}
