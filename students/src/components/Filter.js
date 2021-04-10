import React, { useState } from "react";

export default function Filter(data) {
  const defaultValue = {
    gender: "",
  };
  const [user, setUser] = useState(defaultValue);

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUser(defaultValue);
    document.getElementById("rd1").checked = false;
    document.getElementById("rd2").checked = false;
  };
  return (
    <div className="filter">
      <h4>Filter by gender</h4>
      <label>Male:</label>
      <input
        id="rd1"
        type="radio"
        name="gender"
        value="male"
        onChange={handleChange}
      />
      <label>Female:</label>
      <input
        id="rd2"
        type="radio"
        name="gender"
        value="female"
        onChange={handleChange}
      />
      <h4>Filter by age</h4>
      <button onClick={handleSubmit}>submit</button>
    </div>
  );
}
