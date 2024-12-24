import React from 'react'
import Table from './Table'
import { Route, Routes, useNavigate } from 'react-router-dom'
import path from "./path"


const Home =()=>{
  const navigate = useNavigate()
  return(<>
  <div className="homepage">
  <h1>Aakash's Demo Table</h1>
  <button className='cell5 store1' onClick={()=>{
    navigate(path.table)
  }}>View Table</button>
  </div>
  </>)
}

function App() {
   
  
  return (
    <>
    <Routes>
    <Route path={path.home} element={<Home/>}>
    </Route>
    <Route path={path.table} element={<Table/>}>
    </Route>
    </Routes>
    </>
  )
}

export default App
