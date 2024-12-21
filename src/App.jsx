import React from 'react'
import googlelogo from "./assets/googlelogo.png"
import karin from "./assets/karin.png"
import shab from "./assets/shab.png"
import joel from "./assets/joel.png"
import kevin from "./assets/kevin.png"
import sorter from "./assets/sorter.png"
import mailicon from "./assets/mailicon.png"
import { useState } from 'react'

function App() {

  const [theme,settheme]=useState(true);
  const tablerecords = [
    {name:"Karin",
     profileimage:karin,
     email:"karin@gmail.com",
     lastcontacted:"Mon 9 Aug, 10.49 AM",
     company:"Google",
     companylogo:{googlelogo},
     contactto:"mikeanderson@gmail.com",
     leadsource:"Online Store",
     sourcecolor: "store1"
    },
    {name:"Shabrina",
      profileimage: shab,
      email:"Shabrina@gmail.com",
      lastcontacted:"Mon 9 Aug, 10.49 AM",
      company:"Google",
      companylogo:{googlelogo},
      contactto:"mikeanderson@gmail.com",
      leadsource:"Online Store",
      sourcecolor: "store2"
     },
     {name:"Joel",
      profileimage: joel,
      email:"joel@gmail.com",
      lastcontacted:"Mon 9 Aug, 10.49 AM",
      company:"Google",
      companylogo:{googlelogo},
      contactto:"mikeanderson@gmail.com",
      leadsource:"Online Store",
      sourcecolor: "store3"
     },
     {name:"Kevin",
      profileimage: kevin,
      email:"kevin@gmail.com",
      lastcontacted:"Mon 9 Aug, 10.49 AM",
      company:"Google",
      companylogo:{googlelogo},
      contactto:"mikeanderson@gmail.com",
      leadsource:"Online Store",
      sourcecolor: "store4"
     },
  ]

 
  return (
    <>
      <div className={`main-div `}>
       
      <button onClick={()=>{settheme(!theme)}}>{theme?<i class="fa-solid fa-moon"></i>:<i class="fa-regular fa-sun"></i>}</button>
        <table className={theme?"color-light":'color-dark'}>
          <tr className='headingrow'>
          <th><div className="sorter">CONTACT NAME <img src={sorter} className='arrow' /> </div></th>
          <th><div className="sorter">LAST CONTACTED <img src={sorter} className='arrow' /> </div></th>
          <th><div className="sorter">COMPANY <img src={sorter} className='arrow' /> </div></th>
          <th><div className="sorter">CONTACT <img src={sorter} className='arrow' /> </div></th>
          <th><div className="sorter">LEAD SOURCE <img src={sorter} className='arrow' /> </div></th>
          </tr>
          
            {tablerecords.map(element=> <tr> 
            <td><div className="cell1"><img src={element.profileimage} className='profimg' /><div className="textinfo"><div className="name">{element.name}</div><div className="mail">{element.email}</div></div></div></td> 
            <td><div className="cell2">{element.lastcontacted}</div></td> 
            <td><div className="cell3"><img src={googlelogo} className='googlelogo' />{element.company}</div></td> 
            <td><div className="cell4"><img src={mailicon} className='mailicon' />{element.contactto}</div></td> 
            <td><div className={`cell5 ${ element.sourcecolor}` }><div className={`circle ${ element.sourcecolor}`}></div>{element.leadsource}</div></td> </tr>)}
          
        </table>
      </div>
    </>
  )
}

export default App
