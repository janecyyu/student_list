import React, { useEffect, useState } from "react";
import axios from "axios";

let sort = false;

export default function StudentTable() {
  const [students, setStudents] = useState([]);
  const [girls, setGirls] = useState([]);
  const [boys, setBoys] = useState([]);
  const [origin, setOrigin] = useState([]);
  let sortedStudents = [...students];
  let id = 0;
  let minAge = 0;
  let maxAge = 100;

  useEffect(() => {
    axios
      .get(`https://randomuser.me/api/?results=12`)
      .then((re) => {
        setGirls(re.data.results.filter((s) => s.gender === "female"));
        setBoys(re.data.results.filter((s) => s.gender === "male"));
        setOrigin(re.data.results);
        setStudents(re.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setStudents]);

  useEffect(() => reset(), []);

  function sortByAge(sorted) {
    const _ = sorted
      ? sortedStudents.sort((a, b) => a.dob.age - b.dob.age)
      : sortedStudents.sort((a, b) => b.dob.age - a.dob.age);
    setStudents(sortedStudents);
  }

  function sortByFirstName(sorted) {
    const _ = sorted
      ? sortedStudents.sort((a, b) => a.name.first.localeCompare(b.name.first))
      : sortedStudents.sort((a, b) => b.name.first.localeCompare(a.name.first));
    setStudents(sortedStudents);
  }

  function sortByLastName(sorted) {
    const _ = sorted
      ? sortedStudents.sort((a, b) => a.name.last.localeCompare(b.name.last))
      : sortedStudents.sort((a, b) => b.name.last.localeCompare(a.name.last));
    setStudents(sortedStudents);
  }

  function handleChange(e) {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    if (value === "female") {
      setStudents(girls);
    } else if (value === "male") {
      setStudents(boys);
    } else setStudents(students);
  }

  function genderFilter(e) {
    const clicked = e.target.closest(".filter");
    if (!clicked) {
      return;
    } else {
      handleChange(e);
    }
  }

  function handleAgeMin(e) {
    const value = e.target.value;
    minAge = value;
  }

  function handleAgeMax(e) {
    const value = e.target.value;
    maxAge = value;
    console.log(value);
  }

  function SubmitAge() {
    const renewStudents = [...origin];
    if (minAge === 0 && maxAge === 100) {
      return;
    } else if (parseInt(minAge) > parseInt(maxAge)) {
      console.log(minAge > maxAge);
      alert("wrong number");
      reset();
    } else {
      setStudents(
        renewStudents.filter((s) => s.dob.age >= minAge && s.dob.age <= maxAge)
      );
      document.getElementById("minAge").value = "";
      document.getElementById("maxAge").value = "";
      minAge = 0;
      maxAge = 100;
    }
  }

  function reset() {
    document.getElementById("rd1").checked = false;
    document.getElementById("rd2").checked = false;
    document.getElementById("minAge").value = "";
    document.getElementById("maxAge").value = "";
    minAge = 0;
    maxAge = 100;
  }
  return (
    <div>
      <h1>Students List</h1>
      <div className="resetContainer">
        <button
          className="resetButton"
          onClick={() => {
            setStudents(origin);
            reset();
          }}
        >
          Reset
        </button>
      </div>
      <div className="content">
        <div className="filter">
          <h4>Filter by gender</h4>
          <label>Female:</label>
          <input
            id="rd2"
            type="radio"
            name="gender"
            value="female"
            onChange={genderFilter}
          />{" "}
          <label>Male:</label>
          <input
            id="rd1"
            type="radio"
            name="gender"
            value="male"
            onChange={genderFilter}
          />
          <h4>Filter by age</h4>
          <input
            type="number"
            id="minAge"
            name="age"
            onChange={handleAgeMin}
            placeholder="0"
          ></input>
          ~
          <input
            type="number"
            id="maxAge"
            name="age"
            onChange={handleAgeMax}
            placeholder="100"
          ></input>
          <button
            className="submitAge"
            onClick={() => {
              SubmitAge();
            }}
          >
            Go
          </button>
        </div>
        <div>
          <tr>
            <th>Id</th>
            <th>Photo</th>
            <th
              className="cursor firstName"
              onClick={() => {
                sortByFirstName(!sort);
                sort = !sort;
              }}
            >
              First Name ↕
            </th>
            <th
              className="cursor lastName"
              onClick={() => {
                sortByLastName(!sort);
                sort = !sort;
              }}
            >
              Last Name ↕
            </th>
            <th
              className="cursor age"
              onClick={() => {
                sortByAge(!sort);
                sort = !sort;
              }}
            >
              Age ↕
            </th>
            <th>Email</th>
            <th>Address</th>
          </tr>
          {students.map((s) => {
            return (
              <tr>
                <td>{(id += 1)}</td>
                <td>
                  <img
                    src={s.picture.medium}
                    alt={s.name.first + " " + s.name.last}
                  />
                </td>
                <td>{s.name.first}</td>
                <td>{s.name.last}</td>
                <td>{s.dob.age}</td>
                <td>{s.email}</td>
                <td>
                  {s.location.street.number +
                    " " +
                    s.location.street.name +
                    ", " +
                    s.location.city +
                    ", " +
                    s.location.country}
                </td>
              </tr>
            );
          })}
        </div>
      </div>
    </div>
  );
}
