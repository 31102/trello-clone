import React from 'react'

const LeftBoard = () => {
    return (
        <>
            <div className='flex flex-col bg-sky-200 h-[700px]'>
                <div className='mx-4 my-2'>
                    <h4 className='font-bold text-slate-700 text-lg'>Myst Zex's workspace</h4>
                    {/* <p className='text-slate-700'>free</p> */}
                </div>
                <hr />
                <button className='pl-4 w-full hover:bg-blue-400 text-slate-700 text-start  text-sm font-bold p-2'>Boards</button>
                <button className='pl-4 w-full hover:bg-blue-400 text-slate-700 text-start  text-sm font-bold p-2'>Highlights</button>
                <button className='pl-4 w-full hover:bg-blue-400 text-slate-700 text-start text-sm font-bold p-2 rounded'>Views</button>
                <h4 className='my-4 font-semibold pl-4 text-lg'>Workspace views</h4>
                <button className='pl-4 w-full hover:bg-blue-400 text-slate-700 text-start  text-sm font-bold p-2'>Boards</button>
                <button className='pl-4 w-full hover:bg-blue-400 text-slate-700 text-start  text-sm font-bold p-2'>Highlights</button>
                <h4 className='my-4 font-semibold pl-4 text-lg'>Your Boards</h4>
                <button className='pl-4 w-full hover:bg-blue-400 text-slate-700 text-start  text-sm font-bold p-2'>Boards</button>
                <button className='pl-4 w-full hover:bg-blue-400 text-slate-700 text-start  text-sm font-bold p-2'>Highlights</button>
            </div>
        </>
    )
}

export default LeftBoard