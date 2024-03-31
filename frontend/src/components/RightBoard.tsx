
import { FaRegStar } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useEffect, useState, useRef } from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "./Card";
import { useParams } from 'react-router-dom';

const RightBoard = () => {

    interface List {
        id: string;
        title: string;
    }

    const [lists, setLists] = useState<List[]>([]);
    const [showAddList, setShowAddList] = useState<boolean>(true);
    const [title, setTitle] = useState<string>("");
    const { boardId } = useParams<{ boardId: string }>();


    const fetchAllLists = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/list/board/${boardId}`);
            const listData = response.data;
            setLists(listData)

        } catch (error) {
            console.log("Error in fetching all lists "+error)
        }
    }


    const shouldLog = useRef(true);
    useEffect(() => {
        if (shouldLog.current) {
            shouldLog.current = false
            toast.success("Welcome to Board ")
            fetchAllLists();
        }
    }, [])

    const toggleAddList = () => {
        setShowAddList(preVal => !preVal);
    };

    const createList = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/list/${boardId}`, { title }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.status == 201) {
                toast.success("List Created")
            }
            setTitle("")
            toggleAddList();
            setLists([...lists, response.data])

        } catch (error: any) {
            if (error.response.request.status == 400) {
                toast.warn("Please Enter board Name")
            }
            console.error(error.response)

        }

    }


    const deleteList = async (ListId: string) => {

        try {
            const response = await axios.delete(`http://localhost:3000/list/${ListId}`);
            await response.data;
            toast.error("List Deleted")
            const updatedLists = lists.filter((item) => item.id !== ListId);
            setLists(updatedLists);
        } catch (error: any) {
            console.error(error.response)
        }
    }

    const handleContentChange = (event: React.FormEvent<HTMLDivElement>) => {
        const newContent = event.currentTarget.textContent || '';
        setTitle(newContent)
    };


    const updateListTitle = async (listId: string) => {
        try {
            const response = await axios.patch(`http://localhost:3000/list/${listId}`, {
                title
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const updatedListName = await response.data;
            if (response.status == 200) {
                toast.success("List Updated")
            }
            setTitle("")
            const index = lists.findIndex((item) => item.id === listId);
            if (index !== -1) {
                const updatedTodos = [...lists];
                updatedTodos[index] = updatedListName;
                setLists(updatedTodos);
            }
        } catch (error: any) {
            console.error(error.response)
        }
    }


    return (
        <>
            <div>
                <div>
                    <div className='flex justify-between p-3 bg-sky-200 '>
                        <div className="left flex  ">
                            <button className=' hover:bg-slate-300 text-slate-700  m-1 text-start bg-slate-50 text-sm font-bold p-2 px-3 rounded-sm'>1st Project</button>
                            <button className=' hover:bg-slate-300 text-slate-700  m-1 text-start bg-slate-50 text-xl font-bold p-2 px-3 rounded-sm'><FaRegStar /></button>
                            <div className='hover:bg-slate-300 text-slate-500  m-1 text-start bg-slate-50 text-sm font-bold p-2 px-3 rounded-sm flex'>
                                <span className='pt-1 '><RiGitRepositoryPrivateFill /></span>
                                <button className='ml-1'>Private</button>
                            </div>
                            <button className=' hover:bg-slate-300  m-1 text-start bg-slate-600 text-white hover:text-black text-sm font-bold p-2 px-3 rounded-sm'>Board</button>
                            <button className=' hover:bg-slate-300  m-1 text-start bg-slate-600 text-white hover:text-black text-xl font-bold p-2 px-3 rounded-sm'><MdOutlineKeyboardArrowDown /></button>
                        </div>
                        <div className="right flex  ">
                            <button className=' hover:bg-slate-300 text-slate-700  m-1 text-start bg-slate-50 text-sm font-bold p-2 px-3 rounded-sm'>Power Ups</button>
                            <button className=' hover:bg-slate-300 text-slate-700  m-1 text-start bg-slate-50 text-sm font-bold p-2 px-3 rounded-sm'>Automation</button>
                            <button className=' hover:bg-slate-300 text-slate-700  m-1 text-start bg-slate-50 text-sm font-bold p-2 px-3 rounded-sm'>Filters</button>
                        </div>
                    </div>
                </div>
                <hr />
                <div className='overflow-x-scroll bg-[url("https://images.pexels.com/photos/2171277/pexels-photo-2171277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")] bg-cover bg-fixed w-full h-[630px]'>
                    <div className=' flex'>
                        {
                            lists.map((list) => (
                                <div key={list.id}>
                                    <div className='list w-[280px] min-w-[250px] bg-slate-200 rounded-3xl m-5  p-3 pr-'>
                                        <div className='flex justify-between'>
                                            <h2 suppressContentEditableWarning={true} onInput={handleContentChange} onBlur={() => (updateListTitle(list.id))} contentEditable={true} className='cursor-pointer text-lg w-full p-1 text-slate-700 font-semibold'>{list.title}</h2>
                                            <span onClick={() => deleteList(list.id)} className=' hover:bg-slate-300 rounded text-2xl cursor-pointer w-8 h-8 p-1  text-center'><MdDelete /></span>
                                        </div>
                                        <Card listId={list.id} />
                                    </div>
                                </div>
                            ))
                        }

                        {showAddList ? (<button onClick={toggleAddList} className=' w-[250px] mx-3 min-w-[250px] h-12 hover:bg-slate-300 bg-slate-200 relative pl-10 rounded-xl mt-5 text-slate-700 text-start  text-sm font-semibold p-2'> <span className='absolute left-3 text-black text-lg'><IoMdAdd />
                        </span> Add another List</button>) :
                            (
                                <div className=' w-[250px] min-w-[250px] h-[110px] mx-3 bg-white rounded-2xl mt-5 text-slate-700 text-start text-sm font-semibold p-3'>
                                    <input className="w-full p-2" value={title} onChange={(e) => (setTitle(e.target.value))} type="text" placeholder="Enter list title..." />
                                    <div className="flex p-2 ">
                                        <button onClick={createList} className="p-2 bg-blue-600 hover:bg-blue-700 w-[100px] text-white" >Add List</button>
                                        <span onClick={toggleAddList} className="text-2xl p-2 w-10 h-10 ml-3 hover:bg-slate-700 hover:text-white rounded "><IoClose /></span>
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default RightBoard