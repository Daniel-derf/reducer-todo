import { useReducer, useState } from 'react'
import './App.css'

type Task = {
  id: number,
  name: string
}

type ActionType = 
  | { type: 'add', payload: { name: string } }
  | { type: 'delete', payload: { id: number } }

type StateType = Task[]

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'add':
      const newTask: Task = {
        id: Math.random(),
        name: action.payload.name
      }
      return [...state, newTask]

    case 'delete':
      return state.filter(task => task.id !== action.payload.id)

    default:
      return state
  }
}

function App() {
  const [tasks, dispatch] = useReducer(reducer, [])
  const [taskInput, setTaskInput] = useState('')

  const handleAddTask = (taskName: string) => {
    dispatch({ type: 'add', payload: { name: taskName } })
  }

  const handleDeleteTask = (taskId: number) => {
    dispatch({ type: 'delete', payload: { id: taskId } })
  }

  return (
    <>
      <span>TASK: </span>
      <input 
        type="text" 
        onChange={e => setTaskInput(e.target.value)} 
      />
      <button onClick={() => handleAddTask(taskInput)}>ADD</button>

      {tasks.map(task => (
        <p key={task.id}>
          {task.name} 
          <button onClick={() => handleDeleteTask(task.id)}>DELETE</button>
        </p>
      ))}
    </>
  )
}

export default App
