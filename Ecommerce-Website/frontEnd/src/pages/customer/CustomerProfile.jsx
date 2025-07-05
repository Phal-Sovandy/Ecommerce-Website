import React, { useState } from "react";
import "../../styles/customer/Profile.css";
import ModalInfo from "../../components/common/modals/ModalInfo";
import ModalEditProfileInfo from "../../components/common/modals/ModalEditProfileInfo";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationDot,
  faGlobe,
  faTreeCity,
  faMapLocationDot,
  faPhone,
  faHouseFlag,
  faUserPen,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import { Pie, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

function CustomerProfile() {
  const [showOrderItem, setShowOrderItem] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const navigate = useNavigate();

  const sampleItem = {
    asin: "1233234",
    title: "Hello this is the product",
    final_price: 1323.233,
    currency: "USD",
    categories: ["Sport", "Kitchen", "Bedroom"],
    image_url:
      "https://images.pexels.com/photos/3094799/pexels-photo-3094799.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    availability: "Only 10 in stock",
    quantity: 69,
  };

  const boughtProduct = {
    labels: ["Technology", "Clothing", "Utensils", "Education"],
    datasets: [
      {
        data: [2139, 2222, 3736, 1422],
        backgroundColor: [
          "#081c15",
          "#1b4332",
          "#2d6a4f",
          "#40916c",
          "#52b788",
          "#74c69d",
          "#95d5b2",
          "#b7e4c7",
          "#d8f3dc",
        ],
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Total Expenditure",
        data: [150, 200, 250, 180, 220, 300],
        borderColor: "#40916c",
        backgroundColor: "#1b4332",
        tension: 0.3, // smooth curve
        fill: true,
        pointBackgroundColor: "#081c15",
      },
    ],
  };
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#eee",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };
  const profileInfo = {
    first_name: "Alice",
    last_name: "Johnson",
    username: "alicej",
    email: "alice.johnson@example.com",
    phone_number: "012-345-678",
    address_line1: "123 Main Street",
    address_line2: "Apt 4B",
    gender: "female",
    birthdate: new Date("1995-06-15"), // IMPORTANT: use Date object, not string
    country: { value: "US", label: "United States" }, // for react-select
    state: "California",
    city: "Los Angeles",
    zipcode: "90001",
  };

  const logOut = () => {
    navigate("/");
    // TODO
  }
  return (
    <div className="profile-container">
      <ModalEditProfileInfo
        show={showEdit}
        onClose={() => setShowEdit(false)}
        profileInfo={profileInfo}
      />
      <aside className="sidebar">
        <div className="log-out" onClick={logOut}><FontAwesomeIcon icon={faRightFromBracket}/></div>
        <div
          className="edit-user-info"
          title="Edit Your Info"
          onClick={() => setShowEdit(true)}
        >
          <FontAwesomeIcon icon={faUserPen} />
        </div>
        <div className="avatar">
          <img
            src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
            alt="Profile"
          />
        </div>
        <h2 title="Full Name">Mr. Pol Pot</h2>
        <h3 title="Username">@polpotprime007</h3>
        <p className="dob" title="Birthdate">
          1907-07-07 (69)
        </p>
        <ul className="info">
          <li title="Email">
            <FontAwesomeIcon icon={faEnvelope} /> phalsovandy007@gmail.com
          </li>
          <li title="Phone">
            <FontAwesomeIcon icon={faPhone} /> 0967273000
          </li>
          <li title="Address Line 1">
            <FontAwesomeIcon icon={faLocationDot} /> SihanoukVille, Ek reach
            Street
          </li>
          <li title="Address Line 2">
            <FontAwesomeIcon icon={faLocationDot} /> House No.123
          </li>
          <li title="Country">
            <FontAwesomeIcon icon={faGlobe} /> North Korea
          </li>
          <li title="State">
            <FontAwesomeIcon icon={faHouseFlag} /> Pyongyang
          </li>
          <li title="City">
            <FontAwesomeIcon icon={faTreeCity} /> Pyongyang City
          </li>
          <li title="ZIP Code">
            <FontAwesomeIcon icon={faMapLocationDot} /> 12345-DIKH
          </li>
        </ul>
      </aside>

      <main className="main">
        <section className="stats">
          <div className="stat-box">
            <Doughnut data={boughtProduct} options={{ cutout: "65%" }} />
            <h3>Order By Category Stats</h3>
            <p>
              <strong>Total:</strong> 10,365 orders
            </p>
          </div>
          <div className="stat-box">
            <Line data={lineData} options={lineOptions} />
            <h3>Total Expenditure</h3>
            <p>
              <strong>Total:</strong> $22099
            </p>
            <p>
              <strong>Average Spent:</strong> $61
            </p>
          </div>
        </section>

        <section className="profile-stats">
          <h3>Your Orders History</h3>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Seller ID</th>
                  <th>Date-Time</th>
                  <th>Status</th>
                  <th>Total Price</th>
                  <th>Payment Method</th>
                  <th>Delivery Option</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>93e32377DDD</td>
                  <td>1020291</td>
                  <td>25.08.2022</td>
                  <td className="status delivered">Delivered</td>
                  <td>9:32 AM</td>
                  <td>ABA</td>
                  <td>Standard Delivery</td>
                  <td className="order-details">
                    <button onClick={() => setShowOrderItem(true)}>
                      Details
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>93e32377DDD</td>
                  <td>10332291</td>
                  <td>25.08.2022</td>
                  <td className="status cancelled">Cancelled</td>
                  <td>9:32 AM</td>
                  <td>ABA</td>
                  <td>Standard Delivery</td>
                  <td className="order-details">
                    <button onClick={() => setShowOrderItem(true)}>
                      Details
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>93e32377DDD</td>
                  <td>3323042</td>
                  <td>25.08.2022</td>
                  <td className="status processing">Processing</td>
                  <td>9:32 AM</td>
                  <td>ABA</td>
                  <td>Standard Delivery</td>
                  <td className="order-details">
                    <button onClick={() => setShowOrderItem(true)}>
                      Details
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        
        <ModalInfo
          show={showOrderItem}
          title={"Order Item(s)"}
          onClose={() => setShowOrderItem(false)}
        >
          <div className="order-items-container">
            <OrderItem product={sampleItem} />
            <OrderItem product={sampleItem} />
            <OrderItem product={sampleItem} />
            <OrderItem product={sampleItem} />
            <OrderItem product={sampleItem} />
            <OrderItem product={sampleItem} />
            <OrderItem product={sampleItem} />
            <OrderItem product={sampleItem} />
            <OrderItem product={sampleItem} />
            <OrderItem product={sampleItem} />
            <OrderItem product={sampleItem} />
            <OrderItem product={sampleItem} />
            <OrderItem product={sampleItem} />
            <OrderItem product={sampleItem} />
            <OrderItem product={sampleItem} />
          </div>
        </ModalInfo>
      </main>
    </div>
  );
}

export default CustomerProfile;

function OrderItem({ product }) {
  return (
    <div className="order-item" key={product.asin}>
      <p>{product.asin}</p>
      <div className="item-image">
        <img src={product.image_url} alt={product.title}></img>
      </div>
      <div className="item-details">
        <h2>{product.title}</h2>
        <p className="product-categories">
          {product.categories
            .slice(
              0,
              product.categories.length > 3 ? 4 : product.categories.length
            )
            .join(" | ")}
        </p>
        <h4>
          ${product.final_price} {product.currency}
        </h4>
      </div>
      <div className="ordered-item-quantity">{product.quantity}</div>
      <button
        className="item-buy-again"
        onClick={() => {}}
      >
        Buy Again
      </button>
    </div>
  );
}
