import React from 'react'
import LeftBoard from './LeftBoard'
import RightBoard from './RightBoard'


const Board = () => {
    return (
        <>
            <div className='flex'>
                <div className='w-[15%]'>
                    <LeftBoard/>
                </div>
                <div className='w-[85%]'>
                    <RightBoard/>
                </div>
            </div>
        </>
    )
}

export default Board