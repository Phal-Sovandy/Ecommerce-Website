import { findUserByEmailOrPhone, createCustomerWithDetailsAndLocation } from "../repositories/authRepository.js";
import {
  findUserByContact,
  updateCustomerPassword,
  updateSellerPassword,
  updateAdminPassword,
} from "../repositories/resetPassword.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function login(req, res) {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  try {
    const { user, role, error } = await findUserByEmailOrPhone(identifier);

    if (!user) return res.status(404).json({ message: "User not found" });
    if (error) return res.status(403).json({ message: error });

    let hashedPassword;
    if (role === "customer" || role === "seller") {
      hashedPassword = user.details?.password_hash;
    } else if (role === "admin") {
      hashedPassword = user.hashed_password;
    }

    if (!hashedPassword) {
      return res.status(500).json({ message: "Password not found" });
    }

    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    console.log({ user, role, error });
    // Determine the correct ID based on user role
    let userId;
    if (role === 'customer') {
      userId = user.customer_id;
    } else if (role === 'seller') {
      userId = user.seller_id;
    } else if (role === 'admin') {
      userId = user.admin_id;
    } else {
      // Fallback to email/phone if role is unknown (shouldn't happen)
      userId = user.email ?? user.phone;
    }

    const token = jwt.sign(
      { 
        id: userId, 
        role 
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    
    console.log('Generated token with payload:', { id: userId, role });

    res.json({ token });
  } catch (err) {
    console.error("Login failed:", err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function resetPassword(req, res) {
  const { contact, newPassword } = req.body;

  if (!contact || !newPassword) {
    return res
      .status(400)
      .json({ message: "Contact and new password are required." });
  }

  try {
    const { customer, seller, admin } = await findUserByContact(contact);

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    if (customer && customer.details.status) {
      await updateCustomerPassword(customer.customer_id, hashedPassword);
      return res.json({ message: "Customer password reset successfully." });
    }

    if (seller && seller.details.status) {
      await updateSellerPassword(seller.seller_id, hashedPassword);
      return res.json({ message: "Seller password reset successfully." });
    }

    if (admin) {
      await updateAdminPassword(admin.admin_id, hashedPassword);
      return res.json({ message: "Admin password reset successfully." });
    }

    return res.status(404).json({ message: "Account not found or inactive." });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({ message: "Server error." });
  }
}

export async function checkContact(req, res) {
  const { contact } = req.body;
  if (!contact) return res.status(400).json({ message: "Contact is required." });

  try {
    const { customer, seller, admin } = await findUserByContact(contact);
    const exists = (customer && customer.details.status) || (seller && seller.details.status) || !!admin;
    res.json({ exists });
  } catch (error) {
    console.error("Check contact error:", error);
    res.status(500).json({ message: "Server error." });
  }
}

export async function signup(req, res) {
  const {
    firstName,
    lastName,
    username,
    email,
    phone,
    address1,
    address2,
    gender,
    birthDate,
    country,
    state,
    city,
    zipCode,
    password,
  } = req.body;

  if (!email && !phone) {
    return res.status(400).json({ message: "Email or phone is required." });
  }
  if (!password) {
    return res.status(400).json({ message: "Password is required." });
  }
  if (!username) {
    return res.status(400).json({ message: "Username is required." });
  }

  try {
    const existingUser = await findUserByEmailOrPhone(email || phone);
    if (existingUser.user) {
      return res.status(409).json({ message: "User with this contact already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCustomer = await createCustomerWithDetailsAndLocation({
      firstName,
      lastName,
      username,
      email,
      phone,
      address1,
      address2,
      gender,
      birthDate,
      country,
      state,
      city,
      zipCode,
      passwordHash: hashedPassword,
    });

    return res.status(201).json({ message: "Signup successful", customerId: newCustomer.customer_id });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
