import "./App.css";
import PayHere from "./components/PayHere";
import SendMail from "./components/SendMail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SendMail />} />
          <Route path="/payment/:id" element={<PayHere />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
