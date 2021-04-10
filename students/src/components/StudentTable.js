import React, { useEffect, useState } from "react";
import axios from "axios";

let sort = false;

export default function StudentTable() {
  const [students, setStudents] = useState([]);
  let sortedStudents = [...students];
  let id = 0;

  useEffect(() => {
    axios
      .get(`https://randomuser.me/api/?results=10`)
      .then((re) => {
        console.log(re.data.results);
        setStudents(re.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setStudents]);

  function sortByAge(sorted) {
    if (!sorted) {
      sortedStudents.sort((a, b) => {
        if (a.dob.age < b.dob.age) {
          return -1;
        }
        if (a.dob.age > b.dob.age) {
          return 1;
        }
        return 0;
      });
      setStudents(sortedStudents);
    } else {
      sortedStudents.sort((a, b) => {
        if (a.dob.age < b.dob.age) {
          return 1;
        }
        if (a.dob.age > b.dob.age) {
          return -1;
        }
        return 0;
      });
      setStudents(sortedStudents);
    }
  }

  return (
    <div>
      <tr>
        <th>Id</th>
        <th>Photo</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th
          onClick={() => {
            sortByAge(!sort);
            console.log(sort);
            sort = !sort;
            console.log(sort);
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
            {/* <td>{Avatars(s.picture.medium)}</td> */}
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
