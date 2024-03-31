import React from 'react'
import { FaPlus } from "react-icons/fa";

const LeftDashBoard = () => {
    return (
        <>
            <div className='flex py-8'>
                <div className='w-[40%]'></div>
                <div className='w-[60%]'>
                    <div className='my-2'>
                        <button className=' w-[230px] hover:bg-slate-300 text-slate-700  m-1 text-start bg-slaslate-50 text-sm font-bold p-2 rounded'>Boards</button>
                        <button className=' w-[230px] hover:bg-slate-300 text-slate-700  m-1 text-start bg-slaslate-50 text-sm font-bold p-2 rounded'>Templetes</button>
                        <button className=' w-[230px] hover:bg-slate-300 text-slate-700  m-1 text-start bg-slaslate-50 text-sm font-bold p-2 rounded'>Home</button>
                    </div>
                    <hr />
                    <hr />
                    <hr />
                    <div>
                        <div className='flex justify-between m-4'>
                            <p className='text-xl'>WorkSpaces</p>
                            <span className=' mx-5 my-2 cursor-pointer'><FaPlus /></span>
                        </div>
                        <button className=' w-[230px] hover:bg-slate-300 text-slate-700 m-1 text-start bg-slate-50 text-sm font-bold p-2 rounded'>Myst Zex Workspace
                        </button>
                        <div>
                            <button className='ml-4 w-[200px] hover:bg-slate-300 text-slate-700 text-start bg-slate-50 text-sm font-bold p-2 rounded'>Boards</button>
                            <button className='ml-4 w-[200px] hover:bg-slate-300 text-slate-700 text-start bg-slate-50 text-sm font-bold p-2 rounded'>Highlights</button>
                            <button className='ml-4 w-[200px] hover:bg-slate-300 text-slate-700 text-start bg-slate-50 text-sm font-bold p-2 rounded'>Views</button>
                            <button className='ml-4 w-[200px] hover:bg-slate-300 text-slate-700 text-start bg-slate-50 text-sm font-bold p-2 rounded'>Members</button>
                            <button className='ml-4 w-[200px] hover:bg-slate-300 text-slate-700 text-start bg-slate-50 text-sm font-bold p-2 rounded'>Settings</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LeftDashBoard