import { useState, useRef, useEffect, useReducer } from 'react'
import './App.css'
import Card from './Card'
// import data from './data.json';

function reducer(todos,action){
  switch (action.type){
    case 'Add':
      return [...todos, newTodo(action.payload.name)]
    case "checked":
        return action.payload.check

     case "delete":
      return action.payload.check
  }
}

function newTodo(inputRef) {
  return {id: Date.now(), todo: inputRef, checkers: false}
}

function App() {
  const inputRef = useRef('')
  const [state, dispatch] = useReducer(reducer, [])

  const handleClick = () => {
  dispatch({type: 'Add', payload: { name: inputRef.current.value } })
  }


  useEffect(()=>{ 
    inputRef.current.value=''
  },[state])

  return (
    <div className="Todo">
      <div className='Head_wrap'>
        <div className='Head'>
          <input ref={inputRef} placeholder='Add new Todo...' />
          <button className='add_button' onClick={() =>{handleClick(); }} >+</button>
        </div>
      </div>
      <Card Todo={state} update={dispatch} />
    </div>
  )
}

export default App
