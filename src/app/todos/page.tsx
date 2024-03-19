"use client";
import React, { useEffect, useState } from 'react'
import axios from "axios";
interface Todo {
  id: string;
  desc: string;
  completed: boolean;
}
export default function Todos() {
    const [inputText, setInputText] =useState("");
    const [todos, setTodos] = useState<Todo[]>([]);
    const [editMode, setEditMode] = useState(false);
    const [editTodoInfo, setEditTodoInfo] = useState({
      id:"",
      desc:"",
      completed:false
    });

    useEffect(() => {
      axios.get("/api/todos").then((resp) =>{
        console.log('resp', resp);
        setTodos(resp.data.todos);
      });
    },[])
    
    async function addTodo() {
      const data = {
        desc:inputText
      };
      
      const resp = await axios.post("/api/todos", data);
      
      setTodos(resp.data.allTodos)
    }

    async function clearTodos(){
      const resp = await axios.delete("/api/todos");

      setTodos([]);
    }

    async function deleteTodo(todo:Todo){
      const id = todo.id;

      const resp = await axios.delete(`/api/todos/${id}`);
    }

    async function editTodo(todo:Todo) {
      setEditMode(true);
      
      setEditTodoInfo({
        id:todo.id,
        desc:todo.desc,
        completed:todo.completed
      })
    }

    async function updateTodo() {
      const data = {
        desc:editTodoInfo.desc,
        completed:editTodoInfo.completed
      };

      const resp = await axios.put(`/api/todos/${editTodoInfo.id}`, data);
      
      setEditMode(false);
      
      setTodos(resp.data.allTodos);
    }

    if(editMode)
    {
      return (
        <div className="flex flex-col items-center gap-8 pt-8 bg-violet-200 pb-32">
          <div className="text-2xl">Edit Todo</div>
          <div className="flex gap-4">
            <div className="text-lg">Edit desc:</div>
            <input className="rounded-md shadow-md text-lg" type="text" placeholder="Enter new desc" value={editTodoInfo.desc} onChange={e=>setEditTodoInfo({...editTodoInfo, desc:e.target.value})}/>
          </div>
          <div className="flex gap-4">
            <div className="text-lg">Edit completed:</div>
            <input type="checkbox"  checked={editTodoInfo.completed} 
            onChange={e => setEditTodoInfo({...editTodoInfo, completed: !editTodoInfo.completed})} />
          </div>
          <button onClick={updateTodo} className="text-xl shadow-md bg-blue-600 text-white hover:bg-blue-500 rounded-md px-3 py-1">
             Submit
          </button>
        </div>
      )
    }
  return (
    <div className="flex flex-col items-center gap-8 pt-8 bg-violet-200 pb-32">
        <div className="text-2xl">Todo List </div>
        <div className="flex gap-2">
            <input 
              className="text-xl rounded-md shadow-md"
              type="text" placeholder="Enter todo" value={inputText} onChange={e => setInputText(e.target.value)}/>
            <button className="text-xl shadow-md bg-blue-600 text-white hover:bg-blue-500 rounded-md px-3 py-1" onClick={addTodo}>Add</button>
            <button className="text-xl shadow-md bg-gray-600 text-white hover:bg-gray-500 rounded-md px-3 py-1" onClick={clearTodos}>Clear</button>
        </div>
        <div className="w-5/6 flex-col gap-2">
          {todos.map((todo, index) => {
            return(
              <div className="bg-violet-600 flex justify-between items-center p-2 rounded-lg shadow-md mt-2">
                <div className="flex gap-2">
                  <input type="checkbox" checked={todo.completed}/>
                  <div className="text-lg text-white">{todo.desc} </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => editTodo(todo)} className="text-xl shadow-md bg-green-600 text-white hover:bg-green-500 rounded-md px-1">
                    Edit
                  </button>
                  <button onClick={() => deleteTodo(todo)} className="text-xl shadow-md bg-red-600 text-white hover:bg-red-500 rounded-md px-1">
                    Delete
                  </button>
                </div>
              </div>
            )
          })}
        </div>
    </div>
  )
}
