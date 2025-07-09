import { DataTypes } from "sequelize";

// Product Related Tables
const Manufacturer = sequelize.define(
  "Manufacturer",
  {
    manufacturer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
    },
  },
  {
    tableName: "manufacturers",
    timestamps: false,
  }
);

const Department = sequelize.define(
  "Department",
  {
    department_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
    },
  },
  {
    tableName: "departments",
    timestamps: false,
  }
);

const Brand = sequelize.define(
  "Brand",
  {
    brand_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
    },
  },
  {
    tableName: "brands",
    timestamps: false,
  }
);

const Product = sequelize.define(
  "Product",
  {
    asin: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    brand_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "brands",
        key: "brand_id",
      },
      onDelete: "SET NULL",
    },
    manufacturer_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "manufacturers",
        key: "manufacturer_id",
      },
      onDelete: "SET NULL",
    },
    availability: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "products",
    timestamps: true,
    updatedAt: "updated_at",
  }
);

const ProductDetail = sequelize.define(
  "ProductDetail",
  {
    asin: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      references: {
        model: "products",
        key: "asin",
      },
      onDelete: "CASCADE",
    },
    description: {
      type: DataTypes.TEXT,
    },
    model_number: {
      type: DataTypes.TEXT,
    },
    date_first_available: {
      type: DataTypes.DATEONLY,
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1),
      validate: {
        min: 0,
        max: 5,
      },
    },
    item_weight: {
      type: DataTypes.TEXT,
    },
    product_dimensions: {
      type: DataTypes.TEXT,
    },
    department_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "departments",
        key: "department_id",
      },
      onDelete: "SET NULL",
    },
    ingredients: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "product_details",
    timestamps: false,
  }
);

const Ranking = sequelize.define(
  "Ranking",
  {
    ranking_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    asin: {
      type: DataTypes.STRING(20),
      references: {
        model: "products",
        key: "asin",
      },
      onDelete: "CASCADE",
    },
    root_bs_rank: {
      type: DataTypes.INTEGER,
    },
    bs_rank: {
      type: DataTypes.INTEGER,
    },
    subcategory_rank: {
      type: DataTypes.TEXT,
    },
    badge: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "rankings",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

const Pricing = sequelize.define(
  "Pricing",
  {
    asin: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      references: {
        model: "products",
        key: "asin",
      },
      onDelete: "CASCADE",
    },
    initial_price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    final_price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    currency: {
      type: DataTypes.STRING(10),
    },
    discount: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "pricing",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

const Seller = sequelize.define(
  "Seller",
  {
    seller_id: {
      type: DataTypes.TEXT,
      primaryKey: true,
      allowNull: false,
    },
    seller_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "sellers",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

const SellerDetail = sequelize.define(
  "SellerDetail",
  {
    seller_id: {
      type: DataTypes.TEXT,
      primaryKey: true,
      references: {
        model: "sellers",
        key: "seller_id",
      },
      onDelete: "CASCADE",
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
    password_hash: {
      type: DataTypes.TEXT,
    },
    contact_person: {
      type: DataTypes.STRING(255),
    },
    phone: {
      type: DataTypes.STRING(20),
    },
    profile_picture: {
      type: DataTypes.TEXT,
    },
    login_method: {
      type: DataTypes.STRING(20),
      defaultValue: "email",
    },
    registration_date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "seller_detail",
    timestamps: false,
  }
);

const SellerLocation = sequelize.define(
  "SellerLocation",
  {
    seller_id: {
      type: DataTypes.TEXT,
      primaryKey: true,
      references: {
        model: "seller_detail",
        key: "seller_id",
      },
      onDelete: "CASCADE",
    },
    city: {
      type: DataTypes.STRING(100),
    },
    state: {
      type: DataTypes.STRING(100),
    },
    zipcode: {
      type: DataTypes.STRING(10),
    },
    address_line1: {
      type: DataTypes.TEXT,
    },
    address_line2: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "seller_locations",
    timestamps: false,
  }
);

const ProductSeller = sequelize.define(
  "ProductSeller",
  {
    asin: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      references: {
        model: "products",
        key: "asin",
      },
      onDelete: "CASCADE",
    },
    seller_id: {
      type: DataTypes.TEXT,
      primaryKey: true,
      references: {
        model: "sellers",
        key: "seller_id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "product_sellers",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["asin", "seller_id"],
        name: "unique_product_seller_delivery",
      },
    ],
  }
);

const Media = sequelize.define(
  "Media",
  {
    asin: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      references: {
        model: "products",
        key: "asin",
      },
      onDelete: "CASCADE",
    },
    image_url: {
      type: DataTypes.TEXT,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    images_count: {
      type: DataTypes.INTEGER,
    },
    plus_content: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "media",
    timestamps: false,
  }
);

const Review = sequelize.define(
  "Review",
  {
    asin: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      references: {
        model: "products",
        key: "asin",
      },
      onDelete: "CASCADE",
    },
    reviews_count: {
      type: DataTypes.INTEGER,
    },
    answered_questions: {
      type: DataTypes.INTEGER,
    },
    top_review: {
      type: DataTypes.TEXT,
    },
    bought_past_month: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "reviews",
    timestamps: false,
  }
);

const Category = sequelize.define(
  "Category",
  {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
    },
  },
  {
    tableName: "categories",
    timestamps: false,
  }
);

const ProductCategory = sequelize.define(
  "ProductCategory",
  {
    asin: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      references: {
        model: "products",
        key: "asin",
      },
      onDelete: "CASCADE",
    },
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "categories",
        key: "category_id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "product_categories",
    timestamps: false,
  }
);

const Feature = sequelize.define(
  "Feature",
  {
    feature_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    asin: {
      type: DataTypes.STRING(20),
      references: {
        model: "products",
        key: "asin",
      },
      onDelete: "CASCADE",
    },
    feature: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
  },
  {
    tableName: "features",
    timestamps: false,
  }
);

const Variation = sequelize.define(
  "Variation",
  {
    variation_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    asin: {
      type: DataTypes.STRING(20),
      references: {
        model: "products",
        key: "asin",
      },
      onDelete: "CASCADE",
    },
    variation: {
      type: DataTypes.JSONB,
    },
  },
  {
    tableName: "variations",
    timestamps: false,
  }
);

const DeliveryOption = sequelize.define(
  "DeliveryOption",
  {
    delivery_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    option_name: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    delivery_days: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "delivery_options",
    timestamps: false,
  }
);

// Customer Related Tables
const Customer = sequelize.define(
  "Customer",
  {
    customer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
  },
  {
    tableName: "customers",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

const CustomerDetail = sequelize.define(
  "CustomerDetail",
  {
    customer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "customers",
        key: "customer_id",
      },
      onDelete: "CASCADE",
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
    password_hash: {
      type: DataTypes.TEXT,
    },
    first_name: {
      type: DataTypes.STRING(100),
    },
    last_name: {
      type: DataTypes.STRING(100),
    },
    phone: {
      type: DataTypes.STRING(20),
    },
    birth_date: {
      type: DataTypes.DATEONLY,
    },
    gender: {
      type: DataTypes.STRING(10),
    },
    country: {
      type: DataTypes.STRING(100),
    },
    profile_picture: {
      type: DataTypes.TEXT,
    },
    login_method: {
      type: DataTypes.STRING(20),
      defaultValue: "email",
    },
  },
  {
    tableName: "customer_detail",
    timestamps: false,
  }
);

const CustomerLocation = sequelize.define(
  "CustomerLocation",
  {
    customer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "customer_detail",
        key: "customer_id",
      },
      onDelete: "CASCADE",
    },
    city: {
      type: DataTypes.STRING(100),
    },
    state: {
      type: DataTypes.STRING(100),
    },
    zipcode: {
      type: DataTypes.STRING(10),
    },
    address_line1: {
      type: DataTypes.TEXT,
    },
    address_line2: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "customer_locations",
    timestamps: false,
  }
);

// Order Related Tables
const Order = sequelize.define(
  "Order",
  {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "customers",
        key: "customer_id",
      },
      onDelete: "CASCADE",
    },
    seller_id: {
      type: DataTypes.TEXT,
      allowNull: false,
      references: {
        model: "sellers",
        key: "seller_id",
      },
      onDelete: "SET NULL",
    },
    delivery_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "delivery_options",
        key: "delivery_id",
      },
      onDelete: "SET NULL",
    },
  },
  {
    tableName: "orders",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

const OrderedItem = sequelize.define(
  "OrderedItem",
  {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "orders",
        key: "order_id",
      },
    },
    asin: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      references: {
        model: "products",
        key: "asin",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
  },
  {
    tableName: "ordered_items",
    timestamps: true,
    createdAt: "added_at",
    updatedAt: "last_update",
  }
);

// Wishlist Tables
const Wishlist = sequelize.define(
  "Wishlist",
  {
    wishlist_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "customers",
        key: "customer_id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "wishlists",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

const WishlistItem = sequelize.define(
  "WishlistItem",
  {
    wishlist_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "wishlists",
        key: "wishlist_id",
      },
      onDelete: "CASCADE",
    },
    asin: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      references: {
        model: "products",
        key: "asin",
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "wishlist_items",
    timestamps: true,
    createdAt: "added_at",
    updatedAt: false,
  }
);

const CustomerReview = sequelize.define(
  "CustomerReview",
  {
    review_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    asin: {
      type: DataTypes.STRING(20),
      references: {
        model: "products",
        key: "asin",
      },
      onDelete: "CASCADE",
    },
    customer_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "customers",
        key: "customer_id",
      },
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1),
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "customer_reviews",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

const UserEnquiry = sequelize.define(
  "UserEnquiry",
  {
    enquiry_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("Guess", "Customer", "Seller"),
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("Male", "Female"),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
    },
    comment: {
      type: DataTypes.TEXT,
    },
    badge: {
      type: DataTypes.ENUM("Priority", "Regular"),
      allowNull: false,
    },
    enquiry_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "user_enquiries",
    timestamps: false, 
  }
);

const SellerRequest = sequelize.define(
  "SellerRequest",
  {
    request_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "customers",
        key: "customer_id",
      },
      onDelete: "CASCADE",
    },
    request_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    tableName: "seller_requests",
    timestamps: false,
  }
);

const Admin = sequelize.define('Admin', {
  admin_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  hashed_password: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'admin',
  timestamps: true
});
// --- Model Associations ---

// Product to Brand, Manufacturer, Department
Product.belongsTo(Brand, { foreignKey: "brand_id", as: "brand" });
Brand.hasMany(Product, { foreignKey: "brand_id", as: "products" });

Product.belongsTo(Manufacturer, {
  foreignKey: "manufacturer_id",
  as: "manufacturer",
});
Manufacturer.hasMany(Product, {
  foreignKey: "manufacturer_id",
  as: "products",
});

ProductDetail.belongsTo(Department, {
  foreignKey: "department_id",
  as: "department",
});
Department.hasMany(ProductDetail, {
  foreignKey: "department_id",
  as: "productDetails",
});

// Product details
Product.hasOne(ProductDetail, { foreignKey: "asin", as: "details" });
ProductDetail.belongsTo(Product, { foreignKey: "asin" });

Product.belongsTo(Product, { foreignKey: "input_asin", as: "inputProduct" });

// Product to Pricing, Rankings, Media, Reviews
Product.hasOne(Pricing, { foreignKey: "asin", as: "pricing" });
Pricing.belongsTo(Product, { foreignKey: "asin" });

Product.hasMany(Ranking, { foreignKey: "asin", as: "rankings" });
Ranking.belongsTo(Product, { foreignKey: "asin" });

Product.hasOne(Media, { foreignKey: "asin", as: "media" });
Media.belongsTo(Product, { foreignKey: "asin" });

Product.hasOne(Review, { foreignKey: "asin", as: "aggregatedReviews" });
Review.belongsTo(Product, { foreignKey: "asin" });

// Product to Sellers (Many-to-Many through ProductSeller)
Product.belongsToMany(Seller, {
  through: ProductSeller,
  foreignKey: "asin",
  otherKey: "seller_id",
  as: "sellers",
});
Seller.belongsToMany(Product, {
  through: ProductSeller,
  foreignKey: "seller_id",
  otherKey: "asin",
  as: "products",
});
// Also define direct relations for the join table
ProductSeller.belongsTo(Product, { foreignKey: "asin" });
ProductSeller.belongsTo(Seller, { foreignKey: "seller_id" });

// Product to Categories (Many-to-Many through ProductCategory)
Product.belongsToMany(Category, {
  through: ProductCategory,
  foreignKey: "asin",
  otherKey: "category_id",
  as: "categories",
});
Category.belongsToMany(Product, {
  through: ProductCategory,
  foreignKey: "category_id",
  otherKey: "asin",
  as: "products",
});
// Also define direct relations for the join table
ProductCategory.belongsTo(Product, { foreignKey: "asin" });
ProductCategory.belongsTo(Category, { foreignKey: "category_id" });

// Product to Features, Variations
Product.hasMany(Feature, { foreignKey: "asin", as: "features" });
Feature.belongsTo(Product, { foreignKey: "asin" });

Product.hasMany(Variation, { foreignKey: "asin", as: "variations" });
Variation.belongsTo(Product, { foreignKey: "asin" });

// Customer to CustomerDetail, CustomerLocations
Customer.hasOne(CustomerDetail, { foreignKey: "customer_id", as: "details" });
CustomerDetail.belongsTo(Customer, { foreignKey: "customer_id" });

CustomerDetail.hasOne(CustomerLocation, {
  foreignKey: "customer_id",
  as: "location",
}); // Assuming one location per customer for simplicity based on SQL
CustomerLocation.belongsTo(CustomerDetail, { foreignKey: "customer_id" });

// Orders
Order.belongsTo(Customer, { foreignKey: "customer_id", as: "customer" });
Customer.hasMany(Order, { foreignKey: "customer_id", as: "orders" });

Order.belongsTo(Seller, { foreignKey: "seller_id", as: "seller" });
Seller.hasMany(Order, { foreignKey: "seller_id", as: "orders" });

Order.belongsTo(DeliveryOption, {
  foreignKey: "delivery_id",
  as: "deliveryOption",
});
DeliveryOption.hasMany(Order, { foreignKey: "delivery_id", as: "orders" });

Order.hasMany(OrderedItem, { foreignKey: "order_id", as: "orderedItems" });
OrderedItem.belongsTo(Order, { foreignKey: "order_id" });
OrderedItem.belongsTo(Product, { foreignKey: "asin", as: "product" });
Product.hasMany(OrderedItem, { foreignKey: "asin", as: "orderedInItems" });

// Wishlists
Wishlist.belongsTo(Customer, { foreignKey: "customer_id", as: "customer" });
Customer.hasMany(Wishlist, { foreignKey: "customer_id", as: "wishlists" });

Wishlist.hasMany(WishlistItem, {
  foreignKey: "wishlist_id",
  as: "wishlistItems",
});
WishlistItem.belongsTo(Wishlist, { foreignKey: "wishlist_id" });
WishlistItem.belongsTo(Product, { foreignKey: "asin", as: "product" });
Product.hasMany(WishlistItem, { foreignKey: "asin", as: "inWishlistItems" });

// Customer Reviews
CustomerReview.belongsTo(Product, { foreignKey: "asin", as: "product" });
Product.hasMany(CustomerReview, { foreignKey: "asin", as: "customerReviews" });

CustomerReview.belongsTo(Customer, {
  foreignKey: "customer_id",
  as: "customer",
});
Customer.hasMany(CustomerReview, {
  foreignKey: "customer_id",
  as: "customerReviews",
});

Seller.hasOne(SellerDetail, { foreignKey: "seller_id", as: "details" });
SellerDetail.belongsTo(Seller, { foreignKey: "seller_id" });

SellerDetail.hasOne(SellerLocation, {
  foreignKey: "seller_id",
  as: "location",
});
SellerLocation.belongsTo(SellerDetail, { foreignKey: "seller_id" });

// Seller requests
Customer.hasMany(SellerRequest, {
  foreignKey: "customer_id",
  as: "sellerRequests",
});
SellerRequest.belongsTo(Customer, {
  foreignKey: "customer_id",
  as: "customer",
});

export default {
  Manufacturer,
  Department,
  Brand,
  Product,
  ProductDetail,
  Ranking,
  Pricing,
  Seller,
  ProductSeller,
  Media,
  Review,
  Category,
  ProductCategory,
  Feature,
  Variation,
  DeliveryOption,
  Customer,
  CustomerDetail,
  CustomerLocation,
  Order,
  OrderedItem,
  Wishlist,
  WishlistItem,
  CustomerReview,
  UserEnquiry,
  SellerRequest,
  SellerDetail,
  SellerLocation
};
