import Axios from "axios";
import React, { useState } from "react";
import { baseURL } from '../../api/api';
import { useSelector, } from "react-redux";


function Membership() {
  const user = useSelector((state)=>state.user);
  const [name, setName] = useState(user.user.name);
  const [amount, setAmount] = useState("");

  
  const showRazorpay = async () => {
    const res = await loadScript();
    
    const bodyData = new FormData();

    // we will pass the amount and product name to the backend using form data
    bodyData.append("amount", amount.toString());
    bodyData.append("name", name);
    try {
      const response = await Axios.post(`${baseURL}accounts/pay/`, bodyData, {
        headers: {
          // Accept: "application/json",
          Authorization: `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      

      const options = {
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
        amount: response.data.payment.amount,
        currency: "INR",
        name: "Membership",
        description: "Test transaction",
        image: "", // add image url
        order_id: response.data.payment.id,
        handler: function (response) {
          handlePaymentSuccess(response);
        },
        prefill: {
          name: "User.name",
          email: "User's email",
          // contact: "User's phone",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
  
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error in showRazorpay:", error);
      console.error("Server Response:", error.response.data);
    }
  };
  

// this function will handel payment when user submit his/her money
// and it will confim if payment is successfull or not
  const handlePaymentSuccess = async (response) => {
    const order_id = response.razorpay_payment_id // Use razorpay_payment_id as the order ID
    console.log(order_id);

    try {
      const bodyData = new FormData();

      // we will send the response we've got from razorpay to the backend to validate the payment
      bodyData.append("response", JSON.stringify(response));
      bodyData.append("razorpay_order_id", response.razorpay_order_id);
      bodyData.append("razorpay_payment_id", response.razorpay_payment_id);
      bodyData.append("razorpay_signature", response.razorpay_signature);

      // Check if 'response.data' is defined before accessing 'response.data.payment'
      if (response.data && response.data.payment) {
        bodyData.append("payment", JSON.stringify(response.data.payment));
      }


      await Axios.post(`${baseURL}accounts/payment/success/`,bodyData,{
        headers: {
          // Accept: "application/json",
          Authorization: `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
      } )
        .then((res) => {
          console.log("Everything is OK!");

          setName("");
          setAmount("");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(console.error());
    }
  };

  // this will load a script tag which will open up Razorpay payment card to make //transactions
  const loadScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
  };

  

  return (
    
    <div style={{display:"flex"}}>
        <div className="container mt-5 text-center rounded bg-warning border p-5" style={{width:"28%"}}>
            <h1 className="fw-bolder display-2">₹0</h1>
            <p>per year</p>
              <div>
                  <h3 className="fw-semibold">Basic</h3>
                  <div className="text-start mt-3">
                      <ul style={{fontSize:"14px"}}>
                          <li>1 custom domain e.g. img.yourdomain.com</li>
                          <li>Media library backup</li>
                          <li>Automated image analysis reports with Performance Center</li>
                          <li>One-time 30 minute consultation with a media optimization expert</li>
                          <li>Live chat & 12-hr SLA support tickets</li>
                          <li>5 user accounts with role-based permissions</li>
                      </ul>
                  </div>
                  <div className="d-grid mt-3">
                      {/* <button type="button" className="btn btn-light fw-semibold py-3" ></button> */}
                  </div>
              </div>
        </div>
        <div className="container mt-5 text-center rounded bg-warning border p-5" style={{width:"28%"}}>
            <h1 className="fw-bolder display-2" >₹500</h1>
            <p>per year</p>
                <div>
                    <h3 className="fw-semibold">Premium</h3>
                    <div className="text-start mt-3">
                        <ul style={{fontSize:"14px"}}>
                            <li>1 custom domain e.g. img.yourdomain.com</li>
                            <li>Media library backup</li>
                            <li>Automated image analysis reports with Performance Center</li>
                            <li>One-time 30 minute consultation with a media optimization expert</li>
                            <li>Live chat & 12-hr SLA support tickets</li>
                            <li>5 user accounts with role-based permissions </li>

                        </ul>
                    </div>
                    <div className="d-grid mt-3">
                      <button type="button" className="btn btn-light fw-semibold py-3" onClick={() => {setAmount(500);showRazorpay();}}>Upgrad now</button>
                   </div>
                </div>
        </div>
        <div className="container mt-5 text-center rounded bg-warning border p-5" style={{width:"28%"}}>
                <h1 className="fw-bolder display-2" >₹1000</h1>
                <p>per year</p>
                    <div>
                        <h3 className="fw-semibold">Ultra Premium</h3>
                        <div className="text-start mt-3">
                            <ul style={{fontSize:"14px"}}>
                                <li>1 custom domain e.g. img.yourdomain.com</li>
                                <li>Media library backup</li>
                                <li>Automated image analysis reports with Performance Center</li>
                                <li>One-time 30 minute consultation with a media optimization expert</li>
                                <li>Live chat & 12-hr SLA support tickets</li>
                                <li>5 user accounts with role-based permissions</li>
                            </ul>
                        </div>
                        <div className="d-grid mt-3">
                            <button type="button" className="btn btn-light fw-semibold py-3" onClick={() => {setAmount(1000);showRazorpay();}}>Upgrad now</button>
                        </div>
                    </div>
        </div>
     </div>
  );
}

export default Membership;
