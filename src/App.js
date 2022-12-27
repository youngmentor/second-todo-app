import { useRef, useEffect, useReducer } from 'react'
import './App.css'
import Card from './Card'
import data from './data.json';
function reducer(todos, action) {
  switch (action.type) {
    case 'Add':
      return [...todos, { id: action.payload.id + 1, todo: action.payload.todo, checkers: false }]
    case "checked":
      return action.payload.check
    case "delete":
      return action.payload.delet
    default:
      return todos
  }
}


function App() {
  const inputRef = useRef('')
  const [state, dispatch] = useReducer(reducer, JSON.parse(localStorage.getItem('state')))


  const handleClick = () => {
    if (inputRef.current.value) {
      dispatch({ type: 'Add', payload: { todo: inputRef.current.value, id: state.length + 1 } })
    }
  }
  const HandleDelete = (item) => {
    let newList = state.filter((val) => { return val.id !== item.id })
    dispatch({ type: "delete", payload: { delet: newList } })
  }

  const setChecked = (id) => {
    const newArr = state.map((i) => i.id === id ? { ...i, checkers: !i.checkers } : { ...i });
    dispatch({ type: "checked", payload: { check: newArr } })
  }


  useEffect(() => {
    inputRef.current.value = '';
    localStorage.setItem('state', JSON.stringify(state));
  }, [state])

  return (
    <div className="Todo">
      <div className='Head_wrap'>
        <div className='Head'>
          <input ref={inputRef} placeholder='Add new Todo...' />
          <button className='add_button' onClick={() => { handleClick(); }} >+</button>
        </div>
      </div>
      <Card Todo={state} setChecked={setChecked} HandleDelete={HandleDelete} />
    </div>
  )
}

export default App
