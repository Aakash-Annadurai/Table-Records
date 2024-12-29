import React from "react";
import Table from "./Table";
import { Route, Routes} from "react-router-dom";
import path, { method, route } from "./constant";
import Home from "./components/Home";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { areAllKeysEmpty, scrollTobottom, scrollToTop } from "./utils/commonfunctions";
import { genrealService } from "./utils/servicesUtils";

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
  const [deleteData, setDeleteData] = useState();

  const [error, setError] = useState({
    name: "",
    major: "",
    semester: "",
    gpa: "",
    email: "",
    enrollment_date: "",
  });

  const rowRefs = useRef([]);

  const onInputChange = (e) => {
    let temp = inputData;
    const name =e.target.name
    temp[name] = e.target.value;
    setInputData({ ...temp });
    validationForKey(name);
  };
  // const highlightRow = (index) => {
  //   if (rowRefs.current[index]) {
  //     rowRefs.current[index].style.backgroundColor = "yellow";
  //   }
  // };
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

  
const validationForKey =(key)=>{
  let temp = error;
  if (!inputData[key]) {
    temp[key] = `*require vaild ${key}`;
  } else {
    temp[key] = "";
  }
  setError({ ...temp });
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
      {updateData ? putStudentData() : postStudentData();}
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
        rowRefs.current[index].style.backgroundColor = "white";
      }, 2000); 
    
    }
  };



  const putStudentData = async () => {
    const url = `https://studentinfoapi.p.rapidapi.com/students/update/${updateData}`;
const options = {
	method: 'PUT',
	headers: {
		'x-rapidapi-key': '15ffea1c9fmsh31fafcf35aab04cp1f718ejsnd16f8057c7cf',
		'x-rapidapi-host': 'studentinfoapi.p.rapidapi.com',
		'Content-Type': 'application/json'
	},
	body: JSON.stringify(inputData),
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
  console.log(result);
  handleReset();
  alert("Updated Successfully!")
  getStudentData();
  highlightRow(updateData);
  setUpdateData(null);
} catch (error) {
	console.error(error);
}
  }

  const postStudentData = async () => {
    const body=JSON.stringify(inputData)
    const result= await genrealService(method.post,route.add,{Content_Type: "application/json"},body)
    alert("Input added successfully.");
     handleReset();
    getStudentData();
    scrollTobottom()
  };

  const getStudentData = async () => {
    const result = await genrealService("GET","")
    setStudentData(result.students);
  };

  const deleteStudentData = async (id) => {
const result = await genrealService(method.delete,route.delete(id))  
getStudentData();
  }
 
  const handleDelete = (id) => {
    const updatedId =id;
    // setDeleteData(updatedId);
    
    if(confirm("Are you want to Delete the row")){
      deleteStudentData(id);
    }
    // deleteStudentData();
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
            />
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
