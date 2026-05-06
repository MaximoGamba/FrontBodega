import { useState } from "react";
import Todo from "./Todo";

const Form = () => {
  const [todos, setTodos] = useState([]);
  const[todo, setTodo] = useState("");

  const handleChange = (e) => {
    setTodo(e.target.value);
  };  //target saber cual fue el elemento que disparo el evento de cambio


  const handleClick = () => {
    if (todo.trim() === "") {// con las condiciones primero que me atajé de los malo y si pasa que haga el camino feliz
      alert("El campo no puede estar vacio");
      return;
    }
      setTodos([...todos, {todo}]);

  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>Agregar tarea</label><br />
        <input type="text" name="todo" onChange={handleChange}/>
        <button type="button" onClick={handleClick}>agregar</button>
      </form>
      {
        todos.map((value , index) => (
          <Todo todo={value.todo}
          key={index}
          index={index}
          deleteTodo={deleteTodo}
          />
        ))
      }
    </>
  );
};

export default Form;
