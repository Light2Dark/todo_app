import { useState, useRef, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import EditButton from "./EditButton";
import { TodoProps } from "./Todo";

type TodoItemProps = {
  id: number;
  item: string;
  updateTodo: (props: TodoProps) => void;
  deleteTodo: ({ id }: TodoProps) => void;
  randomColour?: string;
};

const TodoItem = ({
  item,
  id,
  updateTodo,
  deleteTodo,
  randomColour,
}: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const todoText = useRef<HTMLParagraphElement>(null);

  // we wrap this in hook instead of inside a method because setState happens in async,
  // so we need to wait for isEditing to be updated which will then trigger this useEffect hook
  // this hook checks if user has finished editing, which will then update the todo in server
  useEffect(() => {
    let apiSubscribed = true;
    if (!isEditing && apiSubscribed) {
      handleUpdate();
    }

    return () => {
      apiSubscribed = false;
    };
  }, [isEditing]);

  // method for both edit button and todo item to handle updating todo in server
  // because there are 2 ways to edit a to-do, by pressing enter & clicking the button
  const handleUpdate = () => {
    if (!todoText.current) throw Error("todoText ref is not assigned");
    updateTodo({ id, item: todoText.current.innerText });
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLParagraphElement>) => {
    if (e.key === "Enter") {
      // user pressed enter key, which we assume to be finish editing
      setIsEditing(false);
    }
  };

  const enableEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    deleteTodo({ id, item });
  };

  return (
    <div
      className={`p-1 ${randomColour} rounded-full mt-2 flex flex-row w-full lg:w-11/12 items-center`}
    >
      <p
        onKeyDown={handleEnter}
        onClick={enableEdit}
        contentEditable={isEditing}
        ref={todoText}
        className={`focus-visble:border-none focus-visible:outline-none cursor-pointer w-full rounded-xl py-[3px] mr-2 ml-1 pl-2 ${
          isEditing ? "bg-white" : ""
        }`}
        suppressContentEditableWarning
      >
        {item}
      </p>

      <div className="ml-auto flex flex-row mr-2">
        <EditButton setIsEditing={setIsEditing} isEditing={isEditing} />
        <FaTrash
          onClick={handleDelete}
          className="cursor-pointer hover:stroke-[24] hover:stroke-blue-700"
        />
      </div>
    </div>
  );
};

export default TodoItem;
