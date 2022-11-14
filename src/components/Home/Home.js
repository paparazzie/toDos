import React from 'react';
import './Home.module.css';
import { useState, useEffect } from 'react';
import { FaPlus } from "react-icons/fa";
import { FaCheckCircle } from 'react-icons/fa';
import { getResponse } from './api';
import Checklist from '../Checklist/Checklist';

const Home = () => {
  const [checkBoxList, setcheckBoxList] = useState([])
  const [checkboxListItem, setcheckBoxListItem] = useState({ value: "", id: null, isEditing: false })
  const [removeAdd, setRemoveAdd] = useState(true)


  const handleClick = () => {
    const data = { value: "", placeholder: "Type Something .....", id: Math.random(500), done: false }
    fetch('http://localhost:8000/checkList', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(() => {
      setcheckBoxList([...checkBoxList, data])
      console.log("new Checklist added")
    })
  }

  const handleCheck = (id) => {
    let newList = [...checkBoxList]

    newList.map(list => {
      if(id == list.id){
        const data = { ...list, done: !list.done }
          fetch('http://localhost:8000/checkList/' + list.id, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
          }).then(() => {
           getData()
          })
      }
    })
    
  }

  const handleFocus = (e) => {
    console.log(e.target.value)
    if (checkboxListItem.isEditing) {
      let newList = [...checkBoxList]

      newList = newList.map(item => {
        if (item.id == checkboxListItem.id) {
          const data = { ...item, value: e.target.value }
          fetch('http://localhost:8000/checkList/' + item.id, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
          }).then(() => {
            setcheckBoxListItem({ isEditing: false})
            console.log("Checklist updated")
          })
        }
      
      })

    }
  }

  const handleDelete = (id) => {
    fetch('http://localhost:8000/checkList/' + id, {
      method: 'DELETE'
    }).then(() => {
      console.log('deleted')
      console.log(checkBoxList)
      const newList = checkBoxList.filter(list => id !== list.id)
      setcheckBoxList(newList)
    })

  }
 const getData = () => {
  getResponse().then(data => {
    setcheckBoxList([...data])
   })
 }

 const handleCompleted = () => {
  setRemoveAdd(false)
  getResponse().then(data => {
    const newList = data.filter(list => list.done !== false)
    setcheckBoxList([...newList])
   })

 }

 const handleAll = () => {
  setRemoveAdd(true)
    getData()
 }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="home">
      <div className="box-content">
        <h2>My Checklist</h2>
        <hr />
        <Checklist 
        checkBoxList = {checkBoxList} 
        handleCheck = {handleCheck} 
        handleFocus = {handleFocus}
        handleDelete = {handleDelete}
        setcheckBoxListItem = {setcheckBoxListItem}
        />
        <hr />

        <div className="tabs">
        {removeAdd &&       
          <div className="add" onClick={handleClick}>
            <FaPlus className="icon" />
            <p className="add-task">Add Task</p>
          </div>
        }
        <div className="complete" onClick={handleCompleted}>
          <FaCheckCircle className="icon" />
          <p className="completed-text">Completed Task</p>
        </div>

        <div className="all" onClick={handleAll}>
          <FaCheckCircle className="icon" />
          <p className="all-task">All Task</p>
        </div>
        </div>

      </div>
    </div>);
}

export default Home;