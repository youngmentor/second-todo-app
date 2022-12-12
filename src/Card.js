import { useState, useReducer } from 'react'
import './App.css'
import { MdDelete } from "react-icons/md";
const Card = ({ Todo, update }) => {
    let Total = Todo.length
    let completed = 0
    let pending = 0

    Todo.map((item) => { 
        item.checkers ? completed += 1 : pending += 1
     })

    const HandleDelete = (item) => {
        let newList = Todo.filter((value) => { return value.id !== item.id })
      update({type: "checked", payload: { check: newList } })
    }

    const setChecked = (id) => {
        const newArr = Todo.map((i) => i.id === id ? { ...i, checkers: !i.checkers } : { ...i }); 
        update({type: "checked", payload: { check: newArr } }) 
    }


    return (
        <div className="Card">
            <div className='Card_wrap'>
                <div className="text">
                    <h1>Todo's</h1>
                    <p>{Total} Total, {completed} Complete and {pending} Pending</p>
                </div>
                <div className="card">
                    <div className="card_head">
                        <div className='card_top'>
                            <div className='wrap'>
                                <div className='parent'>
                                    <p>#</p>
                                    <p>Todo Title</p>
                                </div>
                                <p> Status</p>
                            </div>
                        </div>
                    </div>
                    <div className='scroll'>
                        {Todo?.map((item) => <div key={item.id} className="Main_card">
                            <div className='Main_cardtop' style={{ backgroundColor: item.checkers === true ? '#b9f4b7' : "#fff" }} >
                                <div className='wrap'>
                                    <div className='parent'>
                                        <input
                                            className='check'
                                            type="checkbox"
                                            onChange={() => setChecked(item.id)}
                                        />
                                        <p>{item.todo}</p>
                                    </div>
                                    <div className='status'>
                                        <p>{item.checkers ? "completed" : "pending"}</p>
                                        <MdDelete className='delete' onClick={() => { HandleDelete(item) }} />
                                    </div>
                                </div>
                            </div>
                        </div>)}
                    </div>


                </div>
            </div>

        </div>
    )
}

export default Card 