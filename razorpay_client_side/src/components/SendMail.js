import React, { useState } from "react";
const reparedCars = [
  {
    id: "1001",
    carName: "Tesla",
    carModel: "Model S",
    price: "700",
  },

  {
    id: "1003",
    carName: "Honda",
    carModel: "xuv-700",
    price: "900",
  },
  {
    id: "1004",
    carName: "Ford",
    carModel: "Mustang",
    price: "600",
  },
];
const SendMail = () => {
  const [email, setEmail] = useState("md.hasibuzzaman28@gmail.com");
  const [subject, setSubject] = useState("Sending email");
  const [message, setMessage] = useState("hi");

  const submitMail = async () => {
    // e.preventDefault();

    const emailData = {
      email,
      subject,
      message,
    };
    console.log(emailData);
    const response = await fetch("http://localhost:8080/access", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(emailData),
    });
    const resData = await response.json();
    if (resData.status === "success") {
      alert("Message Sent!");
      this.resetForm();
    } else if (resData.status === "fail") {
      alert("Message failed to send!");
    }
    // fetch("http://localhost:8080/access", {
    //   method: "POST",
    //   body: "hi",
    // });
  };

  return (
    <div className="container">
      <h1 className="text-center mt-5">Send Customer billing details</h1>
      <h2 className="text-center mb-4">Car to Machenic bills</h2>

      <div className=" row g-4">
        {reparedCars.map((car) => (
          <div className="col-md-6" key={car.id}>
            <div
              className="div"
              style={{
                border: "1px solid black",
                borderRadius: "10px",
                padding: "20px",
              }}
            >
              <h2>Car name: {car.carName}</h2>
              <h3>Car Model: {car.carModel}</h3>
              <button className="btn-primary">{car.price} $</button>
              <button className="btn-success ml-4" onClick={submitMail}>
                Send Mail
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SendMail;
