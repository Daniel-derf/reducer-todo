import { useReducer, useState } from 'react'
import './App.css'

const reducer = (state, action) => {

  switch (action.type){

    case 'add':
      const newTask = {
        id:  Math.random(),
        name: action.payload
      }
      return [...state, newTask ]

    case 'delete':
      const newTasks = state.filter(
        task => task.id != action.payload.id
      )
      return [...newTasks]
  }


}

function App() {
  const [tasks, dispatch] = useReducer(reducer, [])

  const [taskInput, setTaskInput] = useState('')

  const handleAddTask = (task: string) => {
    dispatch({type: 'add', payload: task})
  }

  const handleDeleteTask = (id: number) => {
    dispatch({type: 'delete', payload: {
      id: id
    }})
  }


  return (
    <>
    <span>TASK: </span>
    <input type="text" onChange={e =>{
      setTaskInput(e.target.value)
    }} />
    <button onClick={() => handleAddTask(taskInput) } >ADD</button>

    {tasks?.map(
      task => {
        return <p key={task.id}> {task.name} <button
        onClick={()=>handleDeleteTask(task.id)} >DELETE</button> </p>
      }
    )}

    </>
  )
}

export default App
