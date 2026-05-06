const Todo = ({ todo, deleteTodo, index }) => {
  return (
    <div>
      <h3>{todo}</h3>
      <button  onClick={() => deleteTodo(index)}>X</button>
    </div>
  );
};

export default Todo;
