import {useState} from "react";
import Loading2 from "../Loading2.jsx";

const STATUS_COLOR = {
    pending: "bg-yellow-300",
    preparing: "bg-purple-400",
}

export default function OrderItems({ order }) {

    const [loading, setLoading] = useState(false);

    const handle_accept = async () => {
        alert(5)
    };

    const handle_finishe = async () => {

    };

    return (
        <div className={'border p-5 w-full rounded-2xl shadow-2xl flex flex-col justify-between gap-5'}>
            <div>
                <div  className={'flex items-center gap-5'}>
                    <h1 className={'font-bold bg-black text-white text-center p-3 rounded-full inline'}>Table {order.table_no}</h1>
                    <h1 className={`p-2 rounded-full ${STATUS_COLOR[order.status]}`}>{order.status}</h1>
                </div>
                <h1 className={'border-b mt-5'}>Orders</h1>
                <div className={'grid grid-cols-2 mt-5 gap-3'}>
                    {
                        order.items.map(i => (
                            <h1 className={'font-bold text-gray-400'}>• {i}</h1>
                        ))
                    }

                </div>
            </div>
            {
                order.status === "pending" ?
                    <button className={`${STATUS_COLOR[order.status]} ${loading?'':'p-2'} rounded-full cursor-pointer`} disabled={loading} onClick={handle_accept}>
                        {loading ? <Loading2 /> : "Accept Order" }
                    </button> :
                    <button className={`${STATUS_COLOR[order.status]} p-2 rounded-full cursor-pointer`} disabled={loading} onClick={handle_finishe}>
                        Finished
                    </button>
            }
        </div>
    )
}