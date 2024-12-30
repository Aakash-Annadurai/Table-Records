import React from "react";
import sorter from "../assets/sorter.png";
import { useState } from "react";
import Input from "./Input";

export default function Table({
  data,
  onInputChange,
  validation,
  inputData,
  error,
  setInputData,
  setUpdateData,
  scrollToTop,
  rowRefs,
  handleDelete,
}) {
  const [theme, settheme] = useState(true);

  return (
    <>
      {data ? (
        <div className={`main-div `}>
          <div className="InputForm">
            <h2 className="formtitle">STUDENT FORM</h2>
            <div className="inputcolumn">
              <Input
                label="Name"
                name={"name"}
                placeholder="Enter your name"
                type={"text"}
                onchange={onInputChange}
                error={error.name}
                value={inputData.name}
              ></Input>
              <Input
                label="Email"
                name={"email"}
                placeholder="Enter your Email"
                type={"email"}
                onchange={onInputChange}
                error={error.email}
                value={inputData.email}
              ></Input>
              <Input
                label="Enrollment Date"
                name={"enrollment_date"}
                placeholder="Enter your enrollment date"
                type={"date"}
                onchange={onInputChange}
                error={error.enrollment_date}
                value={inputData.enrollment_date}
              ></Input>
              <Input
                label="Semester"
                name={"semester"}
                placeholder="Enter your semester"
                type={"number"}
                onchange={onInputChange}
                error={error.semester}
                value={inputData.semester}
              ></Input>
              <Input
                label="GPA"
                name={"gpa"}
                placeholder="Enter your GPA"
                type={"number"}
                onchange={onInputChange}
                error={error.gpa}
                value={inputData.gpa}
              ></Input>
              <Input
                label="Major"
                name={"major"}
                placeholder="Enter your Major"
                type={"text"}
                onchange={onInputChange}
                error={error.major}
                value={inputData.major}
              ></Input>
            </div>
            <button
              className="cell5 submit"
              onClick={() => {
                validation(true);
              }}
            >
              SUBMIT
            </button>
          </div>
          <button
            className="themebtn"
            onClick={() => {
              settheme(!theme);
            }}
          >
            {theme ? (
              <i class="fa-solid fa-moon"></i>
            ) : (
              <i class="fa-regular fa-sun"></i>
            )}
          </button>
          <table className={theme ? "color-light" : "color-dark"}>
            <caption>TABLE</caption>
            <tr className="headingrow">
              <th>
                <div className="sorter">
                  NAME AND EMAIL <img src={sorter} className="arrow" />{" "}
                </div>
              </th>
              <th>
                <div className="sorter">
                  ENROLLMENT DATE <img src={sorter} className="arrow" />{" "}
                </div>
              </th>
              <th>
                <div className="sorter">
                  SEMESTER AND GPA <img src={sorter} className="arrow" />{" "}
                </div>
              </th>
              <th>
                <div className="sorter">
                  MAJOR <img src={sorter} className="arrow" />{" "}
                </div>
              </th>
              <th>
                <div className="sorter">
                  ACTION <img src={sorter} className="arrow" />{" "}
                </div>
              </th>
            </tr>

            {Object.entries(data).map(([key, element]) => (
              <tr
                key={key}
                ref={(el) => {
                  rowRefs.current[key] = el;
                }}
              >
                <td>
                  <div className="cell1">
                    <div className="textinfo">
                      <div className="name">{element.name}</div>{" "}
                      {console.log(element.name)}
                      <div className="mail">{element.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="cell2">{element.enrollment_date}</div>
                </td>
                <td>
                  <div className="cell3">
                    {element.semester} {"and"} {element.gpa}
                  </div>
                </td>
                <td>
                  <div className="cell4">{element.major}</div>
                </td>
                <td>
                  <div className="actionbtns">
                    <div
                      className={`cell5`}
                      onClick={() => {
                        setUpdateData(key);
                        setInputData({ ...element });
                        scrollToTop();
                      }}
                    >
                      <p>EDIT</p>
                    </div>
                    <div className="deletebtn">
                      <button
                        onClick={() => {
                          handleDelete(key);
                        }}
                      >
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </table>
        </div>
      ) : (
        <div>
          <h2>LOADING..</h2>
        </div>
      )}
    </>
  );
}
