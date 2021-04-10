import React, { useEffect, useState } from "react";
import axios from "axios";

let sort = false;

export default function StudentTable() {
  const [students, setStudents] = useState([]);
  const [girls, setGirls] = useState([]);
  const [boys, setBoys] = useState([]);
  let sortedStudents = [...students];
  let id = 0;

  console.log(students);
  useEffect(() => {
    axios
      .get(`https://randomuser.me/api/?results=10`)
      .then((re) => {
        console.log(re.data.results);

        setGirls(re.data.results.filter((s) => s.gender == "female"));
        setBoys(re.data.results.filter((s) => s.gender == "male"));
        setStudents(re.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setStudents]);

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
    console.log(girls);

    if (value == "female") {
      setStudents(girls);
    } else if (value == "male") {
      setStudents(boys);
    } else setStudents(students);
  }

  return (
    <div>
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
      </div>
      <tr>
        <th>Id</th>
        <th>Photo</th>
        <th
          onClick={() => {
            sortByFirstName(!sort);
            sort = !sort;
          }}
        >
          First Name
        </th>
        <th
          onClick={() => {
            sortByLastName(!sort);
            sort = !sort;
          }}
        >
          Last Name
        </th>
        <th
          onClick={() => {
            sortByAge(!sort);
            sort = !sort;
          }}
        >
          Age
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
  );
}
