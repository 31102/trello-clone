import axios from 'axios';
import { useEffect, useState, useRef } from 'react'
import { FaRegClock } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import CreateBoardDialog from './CreateBoardDialog';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const RightDashBoard = () => {


    const [open, setOpen] = useState<boolean>(false);
    const [boards, setBoards] = useState<Board[]>([])

    const navigate = useNavigate();


    interface Board {
        id: string;
        name: string;
    }


    const fetchAllBoards = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/board/user/${localStorage.getItem('userId')}`);
            const boardsData = response.data;
            setBoards(boardsData)
        } catch (error) {
            console.log("Error in fetching all boards "+error)
        }
    }
    const shouldLog = useRef(true);
    useEffect(() => {
        if (shouldLog.current) {
            shouldLog.current = false
            fetchAllBoards();
            toast.success("Login Scuccess")
        }
    }, [])


    const deleteBoard = async (boardId: string) => {
        try {
            const response = await axios.delete(`http://localhost:3000/board/${boardId}`);
            await response.data;
            toast.error("Board Deleted")
            const updatedBoards = boards.filter((item) => item.id !== boardId);
            setBoards(updatedBoards);
        } catch (error: any) {
            console.error(error.response)
        }
    }

    const handleState = (newBoard: Board) => {
        setBoards([...boards, newBoard]);
    }

    const toggleModal = async () => {
        setOpen((prevVal) => !prevVal);
    }

    const openBoard = (boardId: string) => {
        navigate(`/board/${boardId}`);
    }

    return (
        <>
            <div>

                <div className='flex flex-col px-5 py-10'>
                    <div className='relative'>
                        <span className='absolute top-1 left-2 text-xl text-slate-800'><FaRegClock /></span>
                        <h2 className='ml-10 text-xl font-bold text-slate-600'>Recently Viewed</h2>
                    </div>
                    <div className='flex mt-3'>
                        <div className='relative text-[18px]'>
                            <h4 className='absolute text-white font-bold top-3 z-10 left-3'>1st Project</h4>
                            <img className='w-[220px] h-[110px] hover:opacity-[0.9] m-2 rounded' src="https://images.pexels.com/photos/18046342/pexels-photo-18046342/free-photo-of-snow-covering-mountain-side-in-desert.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            <span className='absolute right-3 bottom-4 cursor-pointer text-2xl text-red-600'><MdDelete /></span>
                        </div>
                        <div className='relative text-[18px]'>
                            <h4 className='absolute text-white font-bold top-3 z-10 left-3'>2nd Project</h4>
                            <img className='w-[220px] h-[110px] hover:opacity-[0.9] m-2 rounded' src="https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            <span className='absolute right-3 bottom-4 cursor-pointer text-2xl text-red-600'><MdDelete /></span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='p-5 flex flex-col'>
                <h2 className=' text-lg text-slate-600 font-semibold'>YOUR WORKSPACE</h2>
                <div className='flex justify-between'>
                    <h2 className='text-lg text-slate-800 font-semibold mt-5'>Myst Zex WorkSpace</h2>
                    <div className='mr-[20%] mt-5'>
                        <button className='ml-1 w-[80px] hover:bg-slate-300 text-slate-700  text-center bg-slate-200 text-sm font-semibold p-2 rounded-sm'>Boards</button>
                        <button className='ml-1 w-[80px] hover:bg-slate-300 text-slate-700  text-center bg-slate-200 text-sm font-semibold p-2 rounded-sm'>Views</button>
                        <button className='ml-1 w-[120px] hover:bg-slate-300 text-slate-700  text-center bg-slate-200 text-sm font-semibold p-2 rounded-sm'>Members (0)</button>
                        <button className='ml-1 w-[80px] hover:bg-slate-300 text-slate-700  text-center bg-slate-200 text-sm font-semibold p-2 rounded-sm'>Settings</button>
                        <button className='ml-1 w-[80px] hover:bg-slate-300 text-slate-700  text-center bg-slate-200 text-sm font-semibold p-2 rounded-sm'>Upgrade</button>
                    </div>
                </div>
                <div>
                    <div className='flex mt-6 flex-wrap '>
                        {boards.map((board) => (
                            <div className='relative mx-2 text-[18px] cursor-pointer' key={board.id}>
                                <h4 className='absolute text-white font-bold top-3 z-10 left-3'>{board.name}</h4>
                                <img onClick={() => (openBoard(board.id))} className='w-[220px] h-[110px] hover:opacity-[0.9] m-2 rounded' src="https://images.pexels.com/photos/18046342/pexels-photo-18046342/free-photo-of-snow-covering-mountain-side-in-desert.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                                <span onClick={() => deleteBoard(board.id)} className='absolute right-3 bottom-4 cursor-pointer text-2xl text-red-600'><MdDelete /></span>
                            </div>
                        ))}

                        <div onClick={toggleModal} className='w-[220px] h-[110px] flex justify-center items-center  hover:opacity-[0.9] m-2 rounded hover:bg-slate-300 text-slate-700  text-center cursor-pointer bg-slate-200 '>
                            <p className=""> Create new board</p>
                        </div>
                        <CreateBoardDialog modalOpening={open} toggleModal={toggleModal} updateState={handleState} />
                    </div>
                </div>
                <button className='mt-10 w-[200px] hover:bg-slate-300 text-slate-700  text-center bg-slate-200 text-sm font-bold p-2 rounded-sm'>View all close boards</button>
            </div>
        </>
    )
}

export default RightDashBoard