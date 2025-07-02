import { useState } from "react";
import priceFormat from "../../../utils/priceFormat.js";
import { useCart } from "../../../context/CartContext.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

import abaQr from "../../../assets/paymentMethods/khqr_for_check_out.jpg";
import masterVisa from "../../../assets/paymentMethods/visa_master.png";
import payPal from "../../../assets/paymentMethods/paypal.png";

import "../../../styles/customer/component-styles/check-out/CheckOutWindow.css";

function CheckOutWindow() {
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const { cart } = useCart();

  const DAY_TO_MIL = 86400000;
  {
    /*20 * 24 * 60 * 60 * 1000)*/
  }
  const DISCOUNT = 0.0;
  const TAX_RATE = 0.05;

  let today = new Date();

  let free_day = new Date(today.getTime() + 20 * DAY_TO_MIL);
  let free_day_off = new Date(free_day.getTime() + 3 * DAY_TO_MIL);

  let standard_day = new Date(today.getTime() + 12 * DAY_TO_MIL);
  let standard_day_off = new Date(free_day.getTime() + 3 * DAY_TO_MIL);

  let one_week_day = new Date(today.getTime() + 7 * DAY_TO_MIL);
  let one_week_day_off = new Date(free_day.getTime() + 2 * DAY_TO_MIL);

  let one_day = new Date(today.getTime() + DAY_TO_MIL);

  const deliveries = [
    {
      name: "Free Delivery",
      description1: "Duration: 20-23 days",
      description2: `${free_day.toDateString()} - ${free_day_off.toDateString()}`,
      price: "FREE",
    },
    {
      name: "Standard Delivery",
      description1: "Duration: 12-15 days",
      description2: `${standard_day.toDateString()} - ${standard_day_off.toDateString()}`,
      price: 349,
    },
    {
      name: "One-Week Delivery",
      description1: "Duration: 5-7 days",
      description2: `${one_week_day.toDateString()} - ${one_week_day_off.toDateString()}`,
      price: 699,
    },
    {
      name: "One-Day Delivery",
      description1: "Duration: ~ 24 hours",
      description2: `~ ${one_day.toDateString()}`,
      price: 1599,
    },
    {
      name: "Nominated Day Delivery",
      description1: "Duration: To be selected",
      description2: "Carrier may contact on phone number: (+855) 123-456-789",
      price: "To be selected",
    },
  ];

  const payments = [
    { method: "ABA KHQR", img: abaQr, id: "pay-method1" },
    { method: "Master / Visa Card", img: masterVisa, id: "pay-method2" },
    { method: "Paypal", img: payPal, id: "pay-method3" },
  ];

  const toggledelivery = (deliveryName) => {
    setSelectedDelivery(
      deliveryName === selectedDelivery ? null : deliveryName
    );
  };

  const togglePayment = (paymentId, img) => {
    setSelectedPayment(selectedPayment === paymentId ? null : img);
  };

  function calculateCartPrice() {
    return cart.reduce((acc, cur) => acc + cur.priceCents * cur.quantity, 0);
  }

  function handleDeliveryPrice() {
    let seleced = deliveries.find(
      (delivery) => delivery.name === selectedDelivery
    );
    if (seleced) {
      return isNaN(seleced.price) ? seleced.price : seleced.price;
    }
  }

  function calculateTax() {
    return isNaN(handleDeliveryPrice())
      ? calculateCartPrice() * TAX_RATE
      : (calculateCartPrice() + handleDeliveryPrice()) * TAX_RATE;
  }

  function calculateTotal() {
    if (isNaN(handleDeliveryPrice())) {
      return calculateCartPrice() + calculateTax() - DISCOUNT;
    } else {
      return (
        calculateCartPrice() + handleDeliveryPrice() + calculateTax() - DISCOUNT
      );
    }
  }
  return (
    <div id="check-out-form">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (!selectedDelivery || !selectedPayment) {
            window.alert(
              "Please Select a valid Delivery and/or Payment Method"
            );
            return false;
          }
          if (cart.length <= 0) {
            window.alert("Cart is empty. Please add some products");
            return false;
          }
          window.alert("Orders Received!");
        }}
        onReset={() => {
          togglePayment("", "");
          toggledelivery("", "");
        }}
      >
        <div id="check-out-form-inner">
          {/* HEADER */}
          <div id="head">
            <h2>Check Out</h2>
          </div>
          {/*Total Section*/}
          <div id="total-section">
            <h4>Order Summary</h4>
            <div>
              <table>
                <tbody>
                  <tr>
                    <th className="title">Items:</th>
                    <th>${priceFormat(calculateCartPrice())}</th>
                  </tr>
                  <tr>
                    <th className="title">Delivery:</th>
                    <th>
                      {isNaN(handleDeliveryPrice())
                        ? handleDeliveryPrice()
                        : `$${priceFormat(handleDeliveryPrice())}`}
                    </th>
                  </tr>
                  <tr>
                    <th className="title">Discount:</th>
                    <th>$0.00</th>
                  </tr>
                  <tr>
                    <th className="title">Tax({TAX_RATE * 100}%):</th>
                    <th>${priceFormat(calculateTax())}</th>
                  </tr>
                </tbody>
                <tfoot>
                  <tr id="total-final-price">
                    <th className="title">Total:</th>
                    <th>${priceFormat(calculateTotal())}</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          {/* delivery SELECTION */}
          <div id="delivery-selection">
            <h4>Pick your delivery</h4>
            <div id="delivery-card-checkout-container">
              {deliveries.map((delivery, index) => (
                <div
                  key={index}
                  className={`delivery-card-checkout ${
                    selectedDelivery === delivery.name
                      ? "selected-delivery"
                      : ""
                  }`}
                  onClick={() => toggledelivery(delivery.name)}
                >
                  <div className="check-upper">
                    <h4 id="delivery-name">{delivery.name}</h4>
                    <p>
                      <strong>{delivery.description1}</strong>
                    </p>
                    <p>Get item by:</p>
                    <p>{delivery.description2}</p>
                  </div>
                  <div className="price-check">
                    <h4>
                      {isNaN(delivery.price)
                        ? delivery.price
                        : `$${priceFormat(delivery.price)}`}
                    </h4>
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      size="lg"
                    ></FontAwesomeIcon>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* EMAIL, PHONE & PAYMENT METHOD */}
          <div id="info">
            <div id="info-left">
              <div id="mid">
                <h4>What is your email?</h4>
                <input
                  type="email"
                  placeholder="someone@example.com"
                  required
                />
                <p>
                  Already have an account?{" "}
                  <a
                    href="https://myaccount.google.com/?utm_source=sign_in_no_continue&pli=1"
                    target="_blank"
                  >
                    Sign in here.
                  </a>
                </p>
              </div>

              <div id="mid-2">
                <h4>What is your Phone Number?</h4>
                <input
                  type="tel"
                  placeholder="123-45-567"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  required
                />
                <p>When the item(s) arrived, we will be calling you.</p>
              </div>

              {/* PAYMENT METHOD */}
              <div id="bottom">
                <div id="payment-method">
                  <h4>Payment Method</h4>
                  <div id="payment-card-container">
                    {payments.map((pay, index) => (
                      <div
                        key={index}
                        className={`payment-card ${pay.id} ${
                          selectedPayment === pay.img ? "is-toggled" : ""
                        }`}
                        onClick={() => togglePayment(pay.id, pay.img)}
                      >
                        <div></div>
                        <p>{pay.method}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CARD INFO */}
                {selectedPayment === masterVisa ||
                selectedPayment === payPal ? (
                  <div id="card-info">
                    <h4>Card Info</h4>
                    <div id="card-info-input">
                      <input
                        type="text"
                        placeholder="Card Number ( MM / YY / CVC )"
                        required
                      />
                      <input type="text" placeholder="Name on card" required />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>

            {/* DISPLAY PAYMENT IMAGE */}
            <div id="info-right">
              {selectedPayment && (
                <img src={selectedPayment} alt="Payment Method" />
              )}
            </div>
          </div>

          {/* BUTTONS */}
          <div id="btn">
            <button type="reset">Reset</button>
            <button type="submit">Check Out</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CheckOutWindow;
