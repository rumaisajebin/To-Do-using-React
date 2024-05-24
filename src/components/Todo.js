import React, { useState, useRef, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import "./tailwind.css";

function Todo() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [editId, setEditId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addTodo = () => {
    if (!input.trim()) {
      return;
    }
    setData([...data, { list: input, id: Date.now(), status: false }]);
    setInput("");
    if (editId) {
      const updatedTodo = data.map((to) =>
        to.id === editId ? { ...to, list: input } : to
      );
      setData(updatedTodo);
      setEditId(0);
      setInput("");
    }
  };

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });

  const onDelete = (id) => {
    setData(data.filter((dd) => dd.id !== id));
    setDeleted(true);
  };

  const onComplete = (id) => {
    let updatedData = data.map((item) => {
      if (item.id === id) {
        return { ...item, status: !item.status };
      }
      return item;
    });
    setData(updatedData);
  };

  const onEdit = (id) => {
    const editTodo = data.find((to) => to.id === id);
    setInput(editTodo.list);
    setEditId(editTodo.id);
  };


  return (
    <div className="container mx-auto mt-8 max-w-md ">
      <h1 className="text-3xl font-bold mb-4">To Do List</h1>
      <form className="flex mb-4" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          ref={inputRef}
          placeholder="Enter your To do"
          className="form-input flex-grow mr-2 py-2 px-4 rounded-lg outline-none focus:ring focus:ring-indigo-300"
          onChange={(event) => setInput(event.target.value)}
        />
        <button
          onClick={addTodo}
          className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors duration-300"
        >
          {editId ? "EDIT" : "ADD"}
        </button>
      </form>

      <div className="space-y-2">
        {deleted && (
          <h6>
            <b>Deleted</b>
          </h6>
        )}
        {data.map((todo) => (
          <div
            className="flex items-center justify-between bg-gray-100 py-2 px-4 rounded-lg"
            key={todo.id}
          >
            <span className={`flex-grow ${todo.status ? "line-through" : ""}`}>
              {todo.list}
            </span>
            <div className="flex space-x-2">
              <input
                type="checkbox"
                checked={todo.status}
                onChange={() => onComplete(todo.id)}
                className="cursor-pointer"
              />

              <MdEdit
                title="Edit"
                onClick={() => onEdit(todo.id)}
                className="text-blue-500 cursor-pointer"
              />
              <MdDelete
                title="Delete"
                onClick={() => onDelete(todo.id)}
                className="text-red-500 cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>

      
    </div>
  );
}

export default Todo;
