import models from "../models/index.js";

export async function queryAllReviews() {
  try {
    return await models.CustomerReview.findAll({
      include: [
        { model: models.Product, as: "product" },
        { model: models.Customer, as: "customer" },
      ],
    });
  } catch (error) {
    throw error;
  }
}

// Query all reviews by customer_id
export async function queryReviewsByCustomerId(customer_id) {
  try {
    return await models.CustomerReview.findAll({
      where: { customer_id },
      include: [{ model: models.Product, as: "product" }],
    });
  } catch (error) {
    throw error;
  }
}

// Query all reviews by ASIN (product id)
export async function queryReviewsByAsin(asin) {
  try {
    const reviewData = await models.TopReview.findByPk(asin);

    const customerReviews = await models.CustomerReview.findAll({
      where: { asin },
      include: [
        {
          model: models.Customer,
          include: [{ model: models.CustomerDetail, as: "customer_details" , attributes: ["first_name", "last_name", "profile_picture"]}],
          as: "customer",
        },
      ],
    });
    return {
      top_review: reviewData?.top_review,
      customer_review: {profile: customerReviews.customer.customer_details},
    };
  } catch (error) {
    throw error;
  }
}

// Add a new customer review
export async function addCustomerReview(reviewData) {
  try {
    const newReview = await models.CustomerReview.create(reviewData);
    return newReview;
  } catch (error) {
    throw error;
  }
}

// Delete a customer review by review_id
export async function deleteCustomerReview(review_id) {
  try {
    const deleted = await models.CustomerReview.destroy({
      where: { review_id },
    });
    return deleted; // returns number of rows deleted (0 or 1)
  } catch (error) {
    throw error;
  }
}

// Edit/update a customer review by review_id
export async function updateCustomerReview(review_id, updatedData) {
  try {
    const [updatedRowsCount] = await models.CustomerReview.update(updatedData, {
      where: { review_id },
    });
    return updatedRowsCount; // number of updated rows (0 or 1)
  } catch (error) {
    throw error;
  }
}
