import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoCloseSharp } from "react-icons/io5";
import { BsCheckSquareFill, BsPersonWorkspace } from "react-icons/bs";
import { FaEye, FaRegCheckSquare } from "react-icons/fa";
import { CgClose, CgProfile } from "react-icons/cg";
import { BiLabel } from "react-icons/bi";
import { MdChecklist } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { HiTemplate } from "react-icons/hi";
import { MdAttachment } from "react-icons/md";
import { SiCoveralls } from "react-icons/si";
import { LuRectangleHorizontal } from "react-icons/lu";
import CardDesription from "./CardDesription";
import CardComment from "./CardComment";
import Todo from "./Todo";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ChildProps {
  isModalOpen?: boolean;
  onRequestClose: () => void;
  cardTitle: string;
  cardId: string;
}



const CardDialogBox: React.FC<ChildProps> = ({ isModalOpen = false, onRequestClose, cardTitle, cardId }) => {

  interface Todo {
    id: string;
    title: string;
    card:[]
  }

  const [inputValue, setInputValue] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);



  const AddTodo = async () => {
    try {
      if (inputValue) {

        const response = await axios.post(`http://localhost:3000/todo/${cardId}`, {
          title: inputValue
        });

        const newTodo = response.data;
        
        setTodos(newTodo)
        toast.success("Todo Created");
        setInputValue("")
        setPopupVisible(false);

      }

    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };




  return (
    <Transition.Root show={isModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={onRequestClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-90 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel>
                <div className=" my-[80px] m-auto w-[750px] rounded-2xl text-slate-700 bg-slate-200 p-5">
                  <div className="flex justify-between w-[700px]">
                    <div className="flex ">
                      <span className="text-3xl">
                        <BsPersonWorkspace />
                      </span>
                      <h3 className="font-semibold text-xl ml-4">{cardTitle}</h3>
                    </div>
                    <span onClick={onRequestClose} className="text-3xl cursor-pointer">
                      <IoCloseSharp />
                    </span>
                  </div>
                  <p className="text-start text-sm px-12">
                    in list{" "}
                    <span className="underline cursor-pointer">Doing</span>
                  </p>
                  <div className="flex justify-between w-[700px]">
                    <div className="w-[70%] ">
                      <div className="flex font-semibold text-slate-700 px-12 mt-5 flex-col text-start">
                        <p>Notifications</p>
                        <div className="px-4 bg-slate-300 w-[80px] rounded hover:bg-slate-400">
                          <button className="flex p-2 relative  outline-none">
                            {" "}
                            <span className="absolute left-[-15px] px-1 top-3">
                              <FaEye />
                            </span>
                            Watch
                          </button>
                        </div>
                      </div>



                      <CardDesription cardId={cardId} />


                      <Todo cardId={cardId} render={todos} />
                      

                      <CardComment cardId={cardId} />



                    </div>
                    <div className="w-[30%] ml-4">
                      <div className="mt-5">
                        <p className="text-slate-700 font-semibold text-start p-1">
                          Add to card
                        </p>
                        <button className=" w-[180px] hover:bg-slate-400 text-slate-700 bg-slate-300  m-1 text-start  text-sm font-semibold p-2 pl-10 rounded relative">
                          <span className="absolute text-xl left-2">
                            <CgProfile />
                          </span>
                          Members
                        </button>
                        <button className=" w-[180px] hover:bg-slate-400 text-slate-700 bg-slate-300  m-1 text-start  text-sm font-semibold p-2 pl-10 rounded relative">
                          <span className="absolute text-xl left-2">
                            <BiLabel />
                          </span>
                          Labels
                        </button>


                        {/* ????????????????????????????????????????? */}



                        <div className="c">
                          <button onClick={() => (setPopupVisible(true))} className=" w-[180px] hover:bg-slate-400 text-slate-700 bg-slate-300  m-1 text-start  text-sm font-semibold p-2 pl-10 rounded relative">
                            <span className="absolute text-xl left-2">
                              <MdChecklist />
                            </span>
                            Checklist
                          </button>
                          {popupVisible && (
                            <div className='h-auto bg-white w-80 rounded-md absolute left-[550px] top-[300px] z-10 p-5'>
                              <div className=' mb-3'>
                                <div className=' relative font-semibold text-lg  text-center'>Add Checklist
                                  <div className="absolute right-0 top-0" onClick={() => (setPopupVisible(false))}>
                                    <CgClose size={20} color='black' className='hover-bg-gray-200 hover-rounded cursor-pointer' />
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col ">
                                <label className="text-start font-semibold" htmlFor="title">Title</label>
                                <input
                                  type="text"
                                  id="title"
                                  className='w-full h-10 border-2 outline-none px-2 mt-2 rounded-md'
                                  value={inputValue}
                                  onChange={(e) => (setInputValue(e.target.value))}
                                />
                                <button
                                  className='w-fit py-1 px-4 rounded-sm text-white font-bold mt-3 bg-blue-500'
                                  onClick={AddTodo}
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                          )}

                        </div>

                        {/* ????????????????????????????????????????? */}


                        <button className=" w-[180px] hover:bg-slate-400 text-slate-700 bg-slate-300  m-1 text-start  text-sm font-semibold p-2 pl-10 rounded relative">
                          <span className="absolute text-xl left-2">
                            <MdDateRange />
                          </span>
                          Dates
                        </button>
                        <button className=" w-[180px] hover:bg-slate-400 text-slate-700 bg-slate-300  m-1 text-start  text-sm font-semibold p-2 pl-10 rounded relative">
                          <span className="absolute text-xl left-2">
                            <HiTemplate />
                          </span>
                          Templetes
                        </button>
                        <button className=" w-[180px] hover:bg-slate-400 text-slate-700 bg-slate-300  m-1 text-start  text-sm font-semibold p-2 pl-10 rounded relative">
                          <span className="absolute text-xl left-2">
                            <MdAttachment />
                          </span>
                          Attachments
                        </button>
                        <button className=" w-[180px] hover:bg-slate-400 text-slate-700 bg-slate-300  m-1 text-start  text-sm font-semibold p-2 pl-10 rounded relative">
                          <span className="absolute text-xl left-2">
                            <SiCoveralls />
                          </span>
                          Cover
                        </button>
                        <button className=" w-[180px] hover:bg-slate-400 text-slate-700 bg-slate-300  m-1 text-start  text-sm font-semibold p-2 pl-10 rounded relative">
                          <span className="absolute text-xl left-2">
                            <LuRectangleHorizontal />
                          </span>
                          Custom Fields
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default CardDialogBox