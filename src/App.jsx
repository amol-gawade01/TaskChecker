import { useState } from 'react'

import './App.css'
import { TodoContextProvider } from './context'
import { useEffect } from 'react';
import TodoForm from './component/TodoForm';
import TodoItem from './component/TodoItem';

function App() {

  const [todos,setTodo] = useState([]);
   
  const addTodo = (todo) => {
    setTodo((prev) => [{id:Date.now(),...todo},...prev])
  }

  const updateTodo = (id,todo) => {
    setTodo((prevTodo) => prevTodo.map((prev) => (prev.id === id ? todo:prev) ))
  }

  const deleteTodo = (id) => {
    setTodo((prevTodo) => prevTodo.filter((prev) => (prev.id !== id))  )
  }
 
  const toggleComplete = (id) => {
   setTodo((prevTodo) => prevTodo.map((prev) => (prev.id === id ? {...prev,  completed:!prev.completed}:(prev))))
  }

  useEffect(() => {

    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length > 0) {
      setTodo(todos)
    }
  
   
  }, [])

  useEffect(() => {
    
  localStorage.setItem("todos",JSON.stringify(todos))
    
  }, [todos])
  
  


  return (
    <TodoContextProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
     <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                       <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {todos.map((todo) => (
                          <div key={todo.id} 
                          className='w-full'>
                            <TodoItem todo={todo}/>
                          </div>
                        ))}
                    </div>
                </div>
            </div>
      
    </TodoContextProvider>
  )
}

export default App
