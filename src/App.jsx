import React from "react";
import Table from "./Table";
import { Route, Routes, useNavigate } from "react-router-dom";
import path from "./path";
import Home from "./components/Home";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [studentData, setStudentData] = useState([]);
  const [inputData, setInputData] = useState({
    name: "",
    major: "",
    semester: "",
    gpa: "",
    email: "",
    enrollment_date: "",
  });

  const [error, setError] = useState({
    name: "",
    major: "",
    semester: "",
    gpa: "",
    email: "",
    enrollment_date: "",
  });

  const onInputChange = (e) => {
    let temp = inputData;
    temp[e.target.name] = e.target.value;
    setInputData({ ...temp });
    validation();
    console.log(temp);
  };

  const handleReset = () => {
    setInputData({
      ...{
        name: "",
        major: "",
        semester: "",
        gpa: "",
        email: "",
        enrollment_date: "",
      },
    });
  };

  function areAllKeysEmpty(obj) {
    return Object.values(obj).every(
      (value) =>
        value === null ||
        value === undefined ||
        value === "" ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === "object" &&
          value !== null &&
          Object.keys(value).length === 0)
    );
  }

  const validation = (click = false) => {
    let temp = error;
    Object.entries(inputData).map(([key, element]) => {
      console.log(inputData[key], element, key);
      if (!inputData[key]) {
        temp[key] = `*require vaild ${key}`;
      } else {
        temp[key] = "";
      }
    });
    if (areAllKeysEmpty(temp) && click) {
      postStudentData();
    }
    setError({ ...temp });
  };

  const postStudentData = async () => {
    const url = "https://studentinfoapi.p.rapidapi.com/students/add";
    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": "15ffea1c9fmsh31fafcf35aab04cp1f718ejsnd16f8057c7cf",
        "x-rapidapi-host": "studentinfoapi.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      alert("Input added successfully.");
      handleReset();
      getStudentData();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const getStudentData = async () => {
    const url =
      "https://studentinfoapi.p.rapidapi.com/students?url=https%3A%2F%2Fstudentinfoapi.p.rapidapi.com%2Fstudents";
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "15ffea1c9fmsh31fafcf35aab04cp1f718ejsnd16f8057c7cf",
        "x-rapidapi-host": "studentinfoapi.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setStudentData(result.students);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getStudentData();
  }, []);

  return (
    <>
      <Routes>
        <Route path={path.home} element={<Home />}></Route>
        <Route
          path={path.table}
          element={
            <Table
              data={studentData}
              onInputChange={onInputChange}
              validation={validation}
              inputData={inputData}
              error={error}
            />
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
