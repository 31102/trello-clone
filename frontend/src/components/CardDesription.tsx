import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ChildProps {
  cardId: string;
}

const CardDesription: React.FC<ChildProps> = ({ cardId }) => {
  const [isDescriptionEdiatablde, setIsDescriptionEdiatablde] = useState(false);
  const [description, setDescription] = useState("");


  const fetchDescription = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/card/${cardId}`);
      if (response.status === 200) {
        setDescription(response.data.description || "Add a more detailed description...");
      }
    } catch (error) {
      console.error('Error fetching description:', error);
    }
  };

  const shouldLog = useRef(true);
  useEffect(() => {
    if (shouldLog.current) {
      shouldLog.current = false
      fetchDescription();
    }
  }, []);


  const updateCardDescription = async () => {
    try {
      const response = await axios.patch(`http://localhost:3000/card/${cardId}`, {
        description: description
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status == 200) {
        toast.success("Description Updated")
        setIsDescriptionEdiatablde(false)
      }
    } catch (error: any) {
      console.error(error.response)
    }
  }

  return (
    <>
      <div className="flex justify-between  mt-5">
        <div className="flex p-2">
          <span className="text-3xl">
            <HiOutlineBars3BottomRight />
          </span>
          <h3 className="ml-4 font-semibold">Description</h3>
        </div>
        <button onClick={() => (setIsDescriptionEdiatablde(true))} className="  hover:bg-slate-400 text-slate-700 bg-slate-300  m-1 text-center bg-slaslate-50 text-sm font-semibold p-2 rounded">
          Edit
        </button>
      </div>
      {isDescriptionEdiatablde ? (
        <>
          <div>
            <div className="my-2" >
              <textarea value={description} onChange={(e) => (setDescription(e.target.value))} className="bg-white p-3" name="" id="" cols={58} rows={5}></textarea>
            </div>
            <div className="text-start my-2" >
              <button onClick={updateCardDescription} className="bg-blue-600 font-semibold text-white p-1 mx-2 rounded hover:bg-blue-700 w-16 h-8 ">Save</button>
              <button onClick={() => (setIsDescriptionEdiatablde(false))} className=" font-semibold p-1 mx-2 rounded hover:bg-slate-400 w-16 h-8 ">Cancel</button>
            </div>
          </div>
        </>
      ) : (
        <>

          <p onClick={() => (setIsDescriptionEdiatablde(true))} className="text-start ml-10 bg-slate-200 cursor-pointer rounded-md p-4">
            {description}
          </p>
        </>
      )}
    </>
  );
};

export default CardDesription;
