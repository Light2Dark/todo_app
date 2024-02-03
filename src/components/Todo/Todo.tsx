import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";

export interface TodoProps {
  id: number;
  item: string;
}

const Todo = () => {
  const [todos, setTodos] = useState<TodoProps[] | []>(() => {
    const savedTodos = localStorage.getItem("todos");
    if (!savedTodos || savedTodos.length === 0) {
      return [];
    } else {
      return JSON.parse(savedTodos);
    }
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo(todo: TodoProps): boolean {
    let duplicate: boolean = false;
    todos.forEach((todoLocal) => {
      if (todoLocal.item === todo.item) {
        duplicate = true;
      }
    });
    if (!duplicate) {
      setTodos([...todos, todo]);
      return true;
    } else {
      alert("Todo already exists");
      return false;
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = (event.target as HTMLFormElement).elements.namedItem(
      "todo_input"
    ) as HTMLInputElement;

    const todo: TodoProps = {
      id: Date.now(),
      item: input.value,
    };
    addTodo(todo);
    (event.target as HTMLFormElement).reset(); // reset the form
  };

  function updateTodo({ id, item }: TodoProps) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.item = item;
        }
        return todo;
      })
    );
  }

  function deleteTodo({ id }: TodoProps) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  let colourIndex = 0;
  const colours = [
    "bg-green-200",
    "bg-teal-100",
    "bg-pink-200",
    "bg-sky-200",
    "bg-rose-200",
    "bg-fuchsia-200",
  ];
  const getRandomColour = () => {
    colourIndex++;
    colourIndex = colourIndex % colours.length; // so if larger than length of colours, it will start from 0
    return colours[colourIndex];
  };

  return (
    <div className="mt-8 flex flex-col items-center w-4/5 md:w-1/2">
      <h1 className="text-3xl font-bold dark:text-pale-cream">To-Do</h1>

      <form
        className="mt-5 mb-6 flex flex-col md:flex-row gap-2 items-center"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="todo_input"
          id="todo_input"
          required
          placeholder="Follow your dreams"
          className="px-4 py-1 border-black border-2 rounded-lg w-60 md:w-80 dark:border-pale-cream"
          autoComplete="off"
        />
        <button
          type="submit"
          className="w-1/2 md:w-fit bg-slate-200 p-2 rounded-md hover:bg-slate-300 dark:bg-pale-red dark:hover:bg-red-300 transition-all"
        >
          Add To-Do
        </button>
      </form>

      {todos &&
        todos.map((todo, index) => (
          <TodoItem
            key={index}
            id={todo.id}
            item={todo.item}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
            randomColour={getRandomColour()}
          />
        ))}
    </div>
  );
};

export default Todo;
