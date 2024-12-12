import { createContext,useContext } from "react";

export const TodoContext = createContext({
   todo:[
    {
        id:1,
        todo:"Todo",
        completed:false,
        
    }
   ],
   addTodo: (todo) => {},
   updateTodo: (id,todo) => {},
   deleteTodo: (id) => {},
   toggleComplete: (id) => {}


})

export const TodoContextProvider = TodoContext.Provider

export  function useTodo(){
    return useContext(TodoContext)
}