import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import { MdDelete } from 'react-icons/md';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Line } from 'rc-progress';


interface ChildProps {
  todoId: string
}

interface Todoitem {
  id: string;
  text: string;
  status: boolean;
}

const TodoItems: React.FC<ChildProps> = ({ todoId }) => {


  const [addTodoItems, setAddTodoItems] = useState(false)
  const [inputValue, setInputValue] = useState("");
  const [todoItemList, setTodoItemList] = useState<Todoitem[]>([]);
  const [check, setCheck] = useState(false);
  const [percentageCompleted, setPercentageCompleted] = useState(0)

  const fetchTodoItems = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/todo-item/todo/${todoId}`);
      const todoList = response.data;
      setTodoItemList(todoList);
    }
    catch (error) {
      console.error('Error fetching from API of TodoItems', error);
    }
  };




  const shouldLog = useRef(true);
  useEffect(() => {
    if (shouldLog.current) {
      shouldLog.current = false
      fetchTodoItems();
      Cal();
    }
  }, []);

  function Cal() {
    const completedTodos = todoItemList.filter(todo => todo.status === true);
    const percentageCompleted = (completedTodos.length / todoItemList.length) * 100;
    setPercentageCompleted(percentageCompleted)

  }

  
  const createTodoItem = async () => {

    if (inputValue.trim() === '') {
      return;
    }
    try {
      const response = await axios.post(`http://localhost:3000/todo-item/${todoId}`, {
        text: inputValue,
        status: check
      });
      setTodoItemList([...todoItemList, response.data]);
      toast.success("Todo Item Created")
      setInputValue('');
      Cal();

    } catch (error: any) {
      console.error(error.response);
    }
  };

  const deleteTodoItem = async (todoItemId: string) => {
    try {
      await axios.delete(`http://localhost:3000/todo-item/${todoItemId}`);
      toast.warn("Todo Item Deleted");
      const updatedItems = todoItemList.filter((item) => item.id !== todoItemId);
      setTodoItemList(updatedItems);
      Cal();

    }
    catch (error) {
      console.error(error);
    }
  };

  const ToggleBtn = () => {
    return setAddTodoItems((prevVal) => (!prevVal))
  }



  const handleToggle = async (todoItemId: string, status: boolean) => {
    try {
      const response = await axios.patch(`http://localhost:3000/todo-item/${todoItemId}`, {
        status
      });
      if (response.status == 200) {
        toast.success("TodoItem Updated")
        // setTodoItemList(todoItemList.map(todoItem => (todoItem.id === todoItemId ? response.data : todoItem)));
        const index = todoItemList.findIndex((item) => item.id === todoItemId);
        if (index !== -1) {
          const updatedTodoItem = [...todoItemList];
          updatedTodoItem[index] = response.data;
          setTodoItemList(updatedTodoItem);
        }
      }
      Cal();

    }
    catch (error: any) {
      console.error(error)
    }
  };

  let value = Math.floor(percentageCompleted)

  return (
    <>
      <div className="w-full ">
        <span className="w-[5%] text-slate-600 text-xs font-semibold" >{value || 0}%</span>
        <Line className="inline p-1 w-[90%] ml-2" percent={value || 0} strokeWidth={2} trailWidth={2} strokeColor="gray" />
      </div>
      {
        todoItemList.map((currentVal) => {
          return (
            <div key={currentVal.id} className='flex p-2'>
              <input className="text-3xl scale-150 translate-x-1" checked={currentVal.status} onChange={(e) => handleToggle(currentVal.id, e.target.checked)} type="checkbox" name="" id="" />
              <p className="ml-4 font-semibold text-start relative w-full hover:bg-slate-300 rounded-lg p-1 ">{currentVal.text}
                <span onClick={() => (deleteTodoItem(currentVal.id))} className='text-2xl absolute right-2 top-[4px] cursor-pointer' ><MdDelete /></span>
              </p>
            </div>
          )
        })
      }

      {addTodoItems ? (
        <div className='ml-[45px]'>
          <div className="my-2 " >
            <textarea value={inputValue} onChange={(e) => (setInputValue(e.target.value))} className="bg-white p-2 rounded" name="" id="" cols={55} rows={2}></textarea>
          </div>
          <div className="text-start my-2" >
            <button onClick={createTodoItem} className="bg-blue-600 font-semibold text-white p-1 mx-2 rounded hover:bg-blue-700 w-16 h-8 ">Add</button>
            <button onClick={ToggleBtn} className=" p-1 mx-2 rounded font-semibold hover:bg-slate-400 w-16 h-8 ">Cancel</button>
          </div>
        </div>

      ) :
        (
          <button onClick={ToggleBtn} className=" hover:bg-slate-400 text-slate-700 w-[100px] ml-[45px] bg-slate-300  m-1 text-center bg-slaslate-50 text-sm font-semibold p-2 rounded">
            Add an item
          </button>
        )}

    </>
  )
}

export default TodoItems