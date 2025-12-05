import React, { useState } from "react";

export default function Checkout({ cart, onBack, onSubmit }) {
  const [agree, setAgree] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const totalPrice = Object.values(cart).reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleSubmit = () => {
    if (agree && name && phone) {
      onSubmit({ name, phone });
    } else {
      alert("Please fill all details and agree to the terms.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Checkout</h2>
      <ul className="mb-4">
        {Object.entries(cart).map(([id, item]) => (
          <li key={id} className="flex justify-between">
            <span>{item.name}</span>
            <span>
              {item.quantity} x ${item.price.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between font-bold mb-4">
        <span>Total:</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Phone:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex items-center gap-4 my-4">
        <input
          type="checkbox"
          id="agree"
          checked={agree}
          onChange={() => setAgree(!agree)}
          className="w-5 h-5"
        />
        <label htmlFor="agree" className="text-sm">
          I agree to the terms and conditions
        </label>
      </div>
      <div className="flex gap-4">
        <button
          className="btn bg-gray-500 text-white w-full"
          onClick={onBack}
        >
          Back to Menu
        </button>
        <button
          className="btn bg-blue-500 text-white w-full"
          disabled={!agree || !name || !phone}
          onClick={handleSubmit}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}