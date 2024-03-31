
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdAdd } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { FaTasks } from "react-icons/fa";
import CardDialogBox from "./CardDialogBox";

const Card = ({ listId }: any) => {


  interface Card {
    id: string;
    title: string;
  }

  const [cards, setCards] = useState<Card[]>([]);
  const [showAddCard, setShowAddCard] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("");
  const [currentCardId, setCurrentCardId] = useState('');
  const [currentCardTitle, setCurrentCardTitle] = useState('');



  const fetchAllCards = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/card/list/${listId}`);
      const cardData = response.data;
      setCards(cardData)

    } catch (error) {
      console.log("Error in fetching all cards " + error)
    }
  }
  const shouldLog = useRef(true);
  useEffect(() => {
    if (shouldLog.current) {
      shouldLog.current = false
      fetchAllCards();
    }
  }, [])

  const toggleAddCard = () => {
    setShowAddCard(preVal => !preVal);
  };

  const createCard = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/card/${listId}`,
        {
          title
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        });
      if (response.status == 201) {
        toast.success("Card Created")
      }
      setTitle("");
      setCards([...cards,response.data])
      toggleAddCard();

    } catch (error: any) {
      if (error.response.request.status == 400) {
        toast.warn("Please Enter Card Name")
      }
      console.error(error.response)

    }

  }


  const deleteCard = async (cardId: string) => {
    try {
      const response = await axios.delete(`http://localhost:3000/card/${cardId}`);
      await response.data;
      toast.error("Card Deleted");
      const updatedCards = cards.filter((item) => item.id !== cardId);
      setCards(updatedCards);
    } catch (error: any) {
      console.error(error.response)
    }
  }

  const handleContentChange = (event: React.FormEvent<HTMLDivElement>) => {
    const newContent = event.currentTarget.textContent || '';
    setTitle(newContent)
  };


  const updateCardTitle = async (cardId: string) => {
    try {
      const response = await axios.patch(`http://localhost:3000/card/${cardId}`, {
        title
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updatedCardName = await response.data;
      if (response.status == 200) {
        toast.success("Card Updated")
      }
      setTitle("");
      const index = cards.findIndex((item) => item.id === cardId);
            if (index !== -1) {
                const updatedCard = [...cards];
                updatedCard[index] = updatedCardName;
                setCards(updatedCard);
            }
    } catch (error: any) {
      console.error(error.response)
    }
  }

  const openCardController = (cardId: string) => {
    setCurrentCardId(cardId)
    const cardToOpen = cards.find((item) => item.id === cardId);
    if (cardToOpen) {
      setCurrentCardTitle(cardToOpen.title);
      openModal();
    }
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {
        cards.map((currentVal) => {
          return <div className='cards mt-6' key={currentVal.id}>
            <div className="card flex justify-between p-1">
              <p suppressContentEditableWarning={true} onInput={handleContentChange} onBlur={() => (updateCardTitle(currentVal.id))} contentEditable={true} className='bg-white p-2 w-[90%] mr-2 rounded-lg  border-2 cursor-pointer drop-shadow-xl'>{currentVal.title}
              </p>
              <span className="cursor-pointer pt-3 pl-1 hover:bg-slate-400 rounded-lg p-1  text-xl text-black " onClick={() => (openCardController(currentVal.id))}><FaTasks /></span>
              <span onClick={() => (deleteCard(currentVal.id))} className='cursor-pointer pt-3 pl-1 hover:bg-slate-400 rounded-lg p-1  text-xl text-black'><MdDelete /></span>
            </div>
          </div>
        })
      }

      <CardDialogBox isModalOpen={isModalOpen} onRequestClose={closeModal} cardTitle={currentCardTitle} cardId={currentCardId} />
      {showAddCard ? (
        <button onClick={toggleAddCard} className=' w-full hover:bg-slate-300 relative pl-7 rounded-lg mt-5 text-slate-700 text-start  text-sm font-bold p-2'> <span className='absolute left-1 text-black text-lg'><IoMdAdd />
        </span> Add Cards</button>
      ) :
        (
          <div className='w-full bg-white  relative  rounded-lg mt-5 text-slate-700 text-start  text-sm font-bold p-2'>
            <input className="w-full p-2" value={title} onChange={(e) => (setTitle(e.target.value))} type="text" placeholder="Enter Card title..." />
            <div className="flex p-2 ">
              <button onClick={createCard} className="p-2 bg-blue-600 hover:bg-blue-700 w-[100px] text-white" >Add Card</button>
              <span onClick={toggleAddCard} className="text-2xl p-2 w-10 h-10 ml-3 hover:bg-slate-700 hover:text-white rounded "><IoClose /></span>
            </div>
          </div>
        )}
    </>
  )
}

export default Card