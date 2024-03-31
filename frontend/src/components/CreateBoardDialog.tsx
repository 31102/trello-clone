import { IoClose } from "react-icons/io5";
import axios from 'axios';
import { useState } from "react";
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Board {
    id: string;
    name: string;
}

interface ChildProps {
    modalOpening: boolean;
    toggleModal: () => void;
    updateState: (newBoard:Board) => void;
}

const CreateBoardDialog: React.FC<ChildProps> = ({ modalOpening, toggleModal, updateState }) => {


    const [name, setName] = useState<string>("")


    const createBoard = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/board/${localStorage.getItem('userId')}`, { name }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const newBoard = response.data
            if (response.status == 201) {
                toast.success("Board Created")
                toggleModal();
            }
            setName("")
            updateState(newBoard);

        } catch (error: any) {
            if (error.response.request.status == 400) {
                toast.warn("Please Enter board Name")
            }
            console.error(error.response)
        }

    }
    const closeDialog = () => {
        toggleModal();
    }

    return (
        <>
            <ToastContainer hideProgressBar={true} autoClose={3000} />
            <Transition.Root show={modalOpening} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={toggleModal}>
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
                                    <form className="w-[100%] text-slate-800" action="">
                                        <div className="w-[400px] bg-slate-50 p-5 rounded ">
                                            <div className="flex flex-col relative p-3">
                                                <span onClick={closeDialog} className="absolute right-0 top-0 hover:bg-slate-300 rounded-lg text-2xl cursor-pointer"><IoClose /></span>
                                                <label className="mb-3 font-bold text-lg text-left" htmlFor="">Board Title</label>
                                                <input
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="bg-white border-2 border-gray-800 outline-none p-3 rounded text-lg font-medium" placeholder="Enter board name..." type="text" />
                                            </div>
                                            <button onClick={createBoard} className="w-[94%] bg-blue-600 my-4 hover:bg-blue-700 p-3 rounded text-white font-semibold text-lg " >Create</button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}

export default CreateBoardDialog