import React from "react";
import Table from "./components/Table";
import { Route, Routes } from "react-router-dom";
import path, { method, route } from "./constant";
import Home from "./components/Home";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import {
  areAllKeysEmpty,
  scrollToBottom,
  scrollToTop,
} from "./utils/commonfunctions";
import { generalService } from "./utils/servicesUtils";

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

  const [updateData, setUpdateData] = useState();

  const [error, setError] = useState({
    name: "",
    major: "",
    semester: "",
    gpa: "",
    email: "",
    enrollment_date: "",
  });

  const [tableTheme, setTableTheme] = useState(true);

  const rowRefs = useRef([]);

  const onInputChange = (e) => {
    let temp = inputData;
    const name = e.target.name;
    temp[name] = e.target.value;
    setInputData({ ...temp });
    validationForKey(name);
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

  const validationForKey = (key) => {
    let temp = error;
    if (!inputData[key]) {
      temp[key] = `*require vaild ${key}`;
    } else {
      temp[key] = "";
    }
    setError({ ...temp });
  };
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
      {
        updateData ? putStudentData() : postStudentData();
      }
    }
    setError({ ...temp });
  };

  const highlightRow = (index) => {
    if (rowRefs.current[index]) {
      rowRefs.current[index].style.backgroundColor = "yellow";
      rowRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setTimeout(() => {
        rowRefs.current[index].style.backgroundColor = tableTheme
          ? "#fffcf5"
          : "#1a1a1a";
      }, 2000);
    }
  };

  const putStudentData = async () => {
    const body = JSON.stringify(inputData);
    const result = await generalService(
      method.put,
      route.put(updateData),
      { Content_Type: "application/json" },
      body
    );
    handleReset();
    alert("Updated Successfully!");
    getStudentData();
    highlightRow(updateData);
    setUpdateData(null);
  };

  const postStudentData = async () => {
    const body = JSON.stringify(inputData);
    const result = await generalService(
      method.post,
      route.add,
      { Content_Type: "application/json" },
      body
    );
    alert("Input added successfully.");
    handleReset();
    getStudentData();
    scrollToBottom();
  };

  const getStudentData = async () => {
    const result = await generalService(method.get, route.get);
    setStudentData(result.students);
  };

  const deleteStudentData = async (id) => {
    const result = await generalService(method.delete, route.delete(id));
    getStudentData();
  };

  const handleDelete = (id) => {
    highlightRow(id);
    if (confirm("Do you want to Delete this row?")) {
      deleteStudentData(id);
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
              setInputData={setInputData}
              setUpdateData={setUpdateData}
              scrollToTop={scrollToTop}
              rowRefs={rowRefs}
              handleDelete={handleDelete}
              setTableTheme={setTableTheme}
            />
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
