import {useState} from "react";
import Loading2 from "../Loading2.jsx";
import { MdError } from "react-icons/md";
import { FaArrowsRotate } from "react-icons/fa6";

export default function MostOrdered() {

    const [mostOrders, setMostOrders] = useState([
        {
            id: 1,
            name: "Grilled Salmon",
            description:"Fresh Atlantic salmon with herbs, served with roasted vegetables and lemon butter sauce",
            price: 2400.786,
            img: "/placeholder/grilled.png",
            count: 10
        },
        {
            id: 2,
            name: "Margherita Pizza",
            description:"Classic Italian pizza with fresh mozzarella, basil, and San Marzano tomato sauce",
            price: 716.99,
            img: "/placeholder/margarita.png",
            count: 7
        },
        {
            id: 3,
            name: "Grilled Salmon",
            description:"Fresh Atlantic salmon with herbs, served with roasted vegetables and lemon butter sauce",
            price: 2400.786,
            img: "/placeholder/grilled.png",
            count: 10
        },
        {
            id: 4,
            name: "Margherita Pizza",
            description:"Classic Italian pizza with fresh mozzarella, basil, and San Marzano tomato sauce",
            price: 716.99,
            img: "/placeholder/margarita.png",
            count: 7
        },
        {
            id: 5,
            name: "Grilled Salmon",
            description:"Fresh Atlantic salmon with herbs, served with roasted vegetables and lemon butter sauce",
            price: 2400.786,
            img: "/placeholder/grilled.png",
            count: 10
        },
    ]);
    const [loading, setLoading] = useState(!true);

    const get_most_ordered = async  () => {
        if (loading===true) return;
        setLoading(true);

    };

    return (
        <div className={'border border-black rounded-lg w-full md:w-1/3'}>
            <h1 className={'font-bold text-xl p-5'}>5 Most Ordered</h1>
            <div className={'w-80 ml-5 border border-black mb-3'}/>
            <div className={`flex flex-col overflow-y-auto ${loading ? 'justify-center items-center h-full pb-25' : ''}`} style={{scrollbarWidth: "thin"}}>
                {loading===true ? <Loading2 /> : loading===false ? (
                    <div>
                        {
                            mostOrders.map(m => (
                                <div key={m.id} className={'flex items-center gap-5 border-b hover:bg-gray-200 duration-100 ease-in-out'}>
                                    <img
                                        src={m.img}
                                        alt={m.name}
                                        className={'size-20 rounded-full'}
                                        draggable={false}
                                    />
                                    <div>
                                        <h1 className={'font-bold'}>{m.name}</h1>
                                        <h1 className={'text-gray-400 text-sm'}>{m.count} Dishes Ordered</h1>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <div>
                        <h1 className={'text-red-400 font-bold flex items-center gap-2'}> <MdError /> Can't get data.</h1>
                        <button className={'bg-yellow-300 rounded-lg mt-5 p-2 flex items-center gap-2 cursor-pointer'} onClick={get_most_ordered}>
                            <FaArrowsRotate /> Try again
                        </button>
                    </div>
                )}
            </div>
        </div>
    )

};