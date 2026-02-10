import {useState} from "react";
import Loading2 from "../Loading2.jsx";
import {useNavigate} from "react-router-dom";
import {MdError} from "react-icons/md";
import {FaArrowsRotate} from "react-icons/fa6";

const STATUS_COLOR = {
    pending: "bg-yellow-300",
    preparing: "bg-purple-400",
    serving: "bg-blue-400",
    done: "bg-green-400",
    delay: "bg-red-400"
};

export default function OrderReport() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(!true);
    const [data, setData] = useState({
        123: {
            id: 123,
            table_no: 101,
            customer_name: "Koket",
            price: 1900,
            status: "pending",
        },
        345: {
            id: 345,
            table_no: 120,
            customer_name: "Ana",
            price: 1900,
            status: "preparing",
        },
        567: {
            id: 567,
            table_no: 110,
            customer_name: "Olanty",
            price: 1900,
            status: "serving",
        },
        678: {
            id: 678,
            table_no: 110,
            customer_name: "Olanty",
            price: 1900,
            status: "done",
        },
        789: {
            id: 789,
            table_no: 110,
            customer_name: "Olanty",
            price: 1900,
            status: "delay",
        },
        910: {
            id: 910,
            table_no: 110,
            customer_name: "Olanty",
            price: 1900,
            status: "delay",
        },

    });

    const get_order_report = async () => {
        if (loading===true) return;
        setLoading(true);
    };

    return (
        <div className={'w-full border mt-8 rounded-xl min-h-100 p-5 bg-gray-300'}>
            <h1 className={'font-bold text-2xl mb-5'}>Today's Order Report</h1>
            {loading===true ? <Loading2 /> : loading===false ? (
                <div className={'overflow-auto max-h-90 md:max-h-full'} style={{scrollbarWidth:'thin'}}>
                    <table className={'min-w-full table-fixed border-separate border-spacing-y-3'}>
                        <thead className={'border-b'}>
                        <tr>
                            <th className={'px-4 py-3 text-center text-sm font-semibold text-gray-700 whitespace-nowrap'}>
                                Table N<u>o</u>
                            </th>
                            <th className={'px-4 py-3 text-center text-sm font-semibold text-gray-700 whitespace-nowrap'}>
                                Customer Name
                            </th>
                            <th className={'px-4 py-3 text-center text-sm font-semibold text-gray-700 whitespace-nowrap'}>
                                Total Payment
                            </th>
                            <th className={'px-4 py-3 text-center text-sm font-semibold text-gray-700 whitespace-nowrap'}>
                                Status
                            </th>
                            <th className={'px-4 py-3 text-center text-sm font-semibold text-gray-700 whitespace-nowrap'}>
                                View Order
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            Object.keys(data).map(d => (
                                <tr key={d} className={'bg-white rounded-lg shadow-sm hover:bg-gray-200 duration-100 ease-in-out'}>
                                    <td className={'first:rounded-l-lg last:rounded-r-lg px-4 py-3 text-center text-sm font-semibold text-gray-700'}>
                                        {data[d].table_no}
                                    </td>
                                    <td className={'first:rounded-l-lg last:rounded-r-lg px-4 py-3 text-center text-sm font-semibold text-gray-700'}>
                                        {data[d].customer_name}
                                    </td>
                                    <td className={'first:rounded-l-lg last:rounded-r-lg px-4 py-3 text-center text-sm font-semibold text-gray-700'}>
                                        {Number(data[d].price).toLocaleString()} ETB
                                    </td>
                                    <td className={`first:rounded-l-lg last:rounded-r-lg text-center text-sm font-semibold text-black w-1 h-3 ${STATUS_COLOR[data[d].status]}`}>
                                        {data[d].status}
                                    </td>
                                    <td className={`first:rounded-l-lg last:rounded-r-lg text-center text-sm font-semibold text-blue-500 cursor-pointer hover:underline`} onClick={() => navigate(`/view-order/${data[d].id}`)}>
                                        View Order
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>
                    <h1 className={'text-red-400 font-bold flex items-center gap-2'}> <MdError /> Can't get data.</h1>
                    <button className={'bg-yellow-300 rounded-lg mt-5 p-2 flex items-center gap-2 cursor-pointer'} onClick={get_order_report}>
                        <FaArrowsRotate /> Try again
                    </button>
                </div>
            )}
        </div>
    )
}