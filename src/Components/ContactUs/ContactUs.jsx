import React, { useState } from "react";
const API_URL =
  "https://react-http-1c2c7-default-rtdb.asia-southeast1.firebasedatabase.app/users.json";
const ContactUs = () => {
  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUserFormInput = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(userFormData),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        throw new Error("Failed to store data!");
      }
      console.log("Submitted Data:", userFormData);
      setUserFormData({
        name: "",
        email: "",
        phonenumber: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleUserFormInput}>
        <div>
          <label htmlFor="name">
            Name:
            <input
              type="text"
              name="name"
              id="name"
              value={userFormData.name}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="email">
            Email:{" "}
            <input
              type="email"
              name="email"
              id="email"
              value={userFormData.email}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="phonenumber">
            PhoneNumber:{" "}
            <input
              type="number"
              name="phonenumber"
              id="phonenumber"
              value={userFormData.phonenumber}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <button type="submit">submit</button>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
