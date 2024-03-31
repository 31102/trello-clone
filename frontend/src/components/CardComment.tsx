import React, { useEffect, useState, useRef } from 'react'
import { FaFileImage } from 'react-icons/fa'
import { RxActivityLog } from 'react-icons/rx'
import { CgProfile } from "react-icons/cg";
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDelete } from 'react-icons/md';

interface ChildProps {
    cardId: string;
}
interface Comment {
    id: string
    comment: string;
}

const CardComment: React.FC<ChildProps> = ({ cardId }) => {

    const [isCommentEdiatablde, setIsCommentEdiatablde] = useState(false);
    const [comment, setComment] = useState("");
    const [isCommentAvailable, setIsCommentAvailable] = useState<Comment[]>([])



    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/comment/card/${cardId}`);
            setIsCommentAvailable(response.data)

        } catch (error) {
            console.error('Error fetching Comments:', error);
        }
    };

    const shouldLog = useRef(true);
    useEffect(() => {
        if (shouldLog.current) {
            shouldLog.current = false
            fetchComments();
        }
    }, []);



    const createComment = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/comment/${cardId}/${localStorage.getItem('userId')}`,
                {
                    comment
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            if (response.status == 201) {
                toast.success("Comment Posted");
                setComment("")
                setIsCommentEdiatablde(false);
                setIsCommentAvailable([...isCommentAvailable,response.data])
            }

        } catch (error: any) {
            if (error.response.request.status == 404) {
                toast.warn(error.response.data.message)
            }
            console.error(error.response.data)

        }

    }

    const deleteComment = async (commentId: string) => {
        try {
            const response = await axios.delete(`http://localhost:3000/comment/${commentId}`);
            await response.data;
            toast.error("Comment Deleted");
            const updatedComment = isCommentAvailable.filter((item) => item.id !== commentId);
            setIsCommentAvailable(updatedComment);
        } catch (error: any) {
            console.error("error in deleting comment "+error)
        }
    }




    return (
        <>
            <div className="flex justify-between mt-5">
                <div className="flex p-2">
                    <span className="text-3xl">
                        <RxActivityLog />
                    </span>
                    <h3 className="ml-4 font-semibold">Activity</h3>
                </div>
                <button className="  hover:bg-slate-400 text-slate-700 bg-slate-300  m-1 text-center bg-slaslate-50 text-sm font-semibold p-2 rounded">
                    Show Details
                </button>
            </div>
            {
                isCommentEdiatablde ?
                    (
                        <>
                            <div>
                                <div className='flex mt-10'>
                                    <span className='text-3xl pt-1 h-10 ml-2'><CgProfile /></span>
                                    <input className='ml-3 rounded p-5 w-full text-lg border-1  border-black' placeholder='Write a comment...' value={comment} onChange={(e) => (setComment(e.target.value))} type="text" />
                                </div>
                                <div>
                                    <div className="text-start m-2 ml-10" >
                                        <button onClick={createComment} className="bg-blue-600  text-white p-1 font-semibold mx-2 rounded hover:bg-blue-700 w-16 h-8 ">Save</button>
                                        <button onClick={() => (setIsCommentEdiatablde(false))} className="  font-semibold p-1 mx-2 rounded  hover:bg-slate-400 w-16 h-8 ">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) :
                    (
                        <>
                            <div className="flex mt-10">
                                <span className="text-3xl pt-1 h-10">
                                    <FaFileImage />
                                </span>
                                <input
                                    onClick={() => (setIsCommentEdiatablde(true))}
                                    className="ml-4 cursor-pointer h-10 font-semibold bg-white w-full drop-shadow-xl p-3 rounded-xl"
                                    type="text"
                                    placeholder="Write a comment..."
                                />
                            </div>
                        </>
                    )
            }

            <div className='mt-10'>

                {
                    isCommentAvailable.map((comment) => {
                        return <div key={comment.id} className="flex mt-5">
                            <span className="text-3xl pt-1 h-10">
                                <CgProfile />
                            </span>
                            <p className="ml-4 cursor-pointer h-10 font-semibold mr-2 bg-white w-full drop-shadow-xl p-3 rounded-xl">
                                {comment.comment}
                            </p>
                            <span onClick={() => deleteComment(comment.id)} className=' hover:bg-slate-300 rounded text-4xl cursor-pointer text-center'><MdDelete /></span>
                        </div>
                    })
                }
            </div>

        </>

    )
}

export default CardComment