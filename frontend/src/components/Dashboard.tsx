import React from 'react'
import RightDashBoard from './RightDashBoard'
import LeftDashBoard from './LeftDashBoard'


const Dashboard = () => {
  return (
    <>
        <div className='flex p-4 bg-slate-50'>
            <div className=' w-[30%] h-full'>
                <LeftDashBoard/>
            </div>
            <div className=' w-[70%] h-full'>
                <RightDashBoard/>
            </div>
        </div>
    </>
  )
}

export default Dashboard