import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { FaRegCheckSquare } from 'react-icons/fa';
import TodoItems from './TodoItems';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Todo {
    id: string;
    title: string;
    card:[];
}


interface ChildProps {
    cardId: string;
    render: Todo
}


const Todo: React.FC<ChildProps> = ({ cardId, render }) => {

    const [todos, setTodos] = useState<Todo[]>([]);

    const fetchTodo = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/todo/card/${cardId}`);
            const todoData = response.data;
            setTodos(todoData);
        } catch (error) {
            console.error('Error in fetching TODOs ', error);
        }
    };
    const shouldLog = useRef(true);
    useEffect(() => {
        if (shouldLog.current) {
            shouldLog.current = false
            if (cardId) {
                fetchTodo();
            }
        }
    }, [])
    useEffect(() => {
        setTodos([...todos,render])
    }, [render])
    

    const deleteTodo = async (todoId: string) => {
        alert("Deleting a checklist is permanent and there is no way to get it back.")
        try {
            await axios.delete(`http://localhost:3000/todo/${todoId}`);
            toast.error("TODO Deleted");
            const updatedItems = todos.filter((item) => item.id !== todoId);
            setTodos(updatedItems);

        } catch (error) {
            console.error(error);
        }
    }


    return (
        <>
            {
                todos.map((todo) => {
                    return (
                        <div key={todo.id} className='flex flex-col'>
                            <div className="flex justify-between mt-5">
                                <div className="flex p-2">
                                    <span className="text-2xl">
                                        <FaRegCheckSquare />
                                    </span>
                                    <h3 className="ml-4 font-semibold">{todo.title}</h3>
                                </div>
                                <button onClick={() => (deleteTodo(todo.id))} className=" hover:bg-slate-400 text-slate-700 bg-slate-300  m-1 text-center bg-slaslate-50 text-sm font-semibold p-2 rounded">
                                    Delete
                                </button>
                            </div>

                            <TodoItems todoId={todo.id} />

                        </div>
                    )
                })
            }
        </>
    );
};

export default Todo;
