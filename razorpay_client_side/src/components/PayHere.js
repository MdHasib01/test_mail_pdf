function PayHere() {
  const car = {
    id: "1002",
    carName: "Mercidies",
    carModel: "Benz",
    price: "800",
  };
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  const displayRazorpay = async (amount) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("You are offline!");
      return;
    }

    const options = {
      key: "rzp_test_UcE06rfvrv9izC",
      currency: "INR",
      amount: car.price * 100,
      name: "Hasib",
      description: "Pay this included bill",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/BMW_logo_%28gray%29.svg/480px-BMW_logo_%28gray%29.svg.png",

      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert("payment is successfull");
      },
      prefil: {
        name: "Md Hasib",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="container">
      <h1 className="text-center mt-5">Send Customer billing details</h1>
      <h2 className="text-center mb-4">Car to Machenic bills</h2>

      <div className="text-center" key={car.id}>
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
          <button className="btn-primary mr-5">{car.price} $</button>
          <button
            className="btn-success"
            onClick={() => displayRazorpay(car.price)}
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default PayHere;
