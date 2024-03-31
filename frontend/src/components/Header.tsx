import React from 'react';
import {CgMenuGridO} from 'react-icons/cg';
import { FaTrello } from "react-icons/fa";
import { MdNotificationsActive } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaCircleQuestion } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
        <div className='flex justify-between p-4 bg-slate-50 '>
            <div className="left flex  ">
            <div className='mx-4 my-2 text-xl'>
            <CgMenuGridO />
            </div>
            <div className='mx-4 my-2 text-xl'>
         
            <FaTrello />
            </div>
            <h3 className='text-xl my-1 font-bold'>Trello</h3>
            <div className='hidden md:flex  mx-2'>
                <div className='flex relative mx-4 w-[120px] hover:bg-slate-300 rounded'>
                <button className='mx-2 outline-none rounded px-2'>Workspcae <span className='absolute left-[80%] top-[12px]'><MdOutlineKeyboardArrowDown /></span></button>
                
                </div>
               

                <div className='flex relative mx-4 w-[90px] hover:bg-slate-300 rounded'>
                <button className='mx-2 outline-none rounded px-2'>Recent <span className='absolute left-[80%] top-[12px]'><MdOutlineKeyboardArrowDown /></span></button>

                </div>



                <div className='flex relative mx-4 w-[90px] hover:bg-slate-300 rounded'>
                <button className='mx-2 outline-none rounded px-2'>Starred <span className='absolute left-[80%] top-[12px]'><MdOutlineKeyboardArrowDown /></span></button>
                
                </div>

                <div className='flex relative mx-4 w-[120px] hover:bg-slate-300 rounded'>
                <button className='mx-2 outline-none rounded px-2'>Templates <span className='absolute left-[80%] top-[12px]'><MdOutlineKeyboardArrowDown /></span></button>
                
                </div>
            </div>
            <button className='bg-blue-600 hidden md:block hover:bg-blue-700 text-white p-2 rounded w-[100px] font-semibold ml-4'>Create</button>
            </div>
            <div className="right flex  ">
                <input className='border outline-none rounded-lg px-4' placeholder='Search' type="text" />
                <div className='mx-4 my-2 text-xl'>
        
                <MdNotificationsActive />
            </div>
                <div className='mx-4 my-2 text-xl'>
      
                <FaCircleQuestion />
            </div>
                <div className='mx-4 my-2 text-xl'>
                <Link onClick={()=>{
                    localStorage.removeItem("userId")
                }} to="/login"><MdLogout/></Link>
            </div>
            </div>
        </div>
        <hr />
    </>
  )
}

export default Header