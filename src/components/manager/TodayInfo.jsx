import { BsCoin } from "react-icons/bs";
import { IoFastFood } from "react-icons/io5";
import { TbUsersGroup } from "react-icons/tb";
import {useEffect, useState} from "react";
import Loading2 from "../Loading2.jsx";
import {MdError} from "react-icons/md";
import {FaArrowsRotate} from "react-icons/fa6";

export default function TodayInfo({ setBg }) {

    const [loading, setLoading] = useState(!true);
    const [data, setData] = useState({
        revenue: 0,
        orders: 0,
        customers: 0
    });

    const get_today_info = async () => {
        if (loading===true) return;
        setLoading(true);
    };

    return (
        <div className={'w-full'}>
            {loading===true ? <Loading2 /> : loading===false ? (
                <div className={`flex flex-col md:flex-row gap-5 items-center w-full ${loading ? 'md:justify-center' : 'justify-between'}`}>
                    <div className={'bg-blue-500 p-5 rounded-lg pr-5'} onMouseEnter={() => setBg("from-blue-500")} onMouseLeave={() => setBg("from-white")}>
                        <div className={'flex items-center gap-2'}>
                            <BsCoin className={'bg-white text-blue-500 size-13 p-2 rounded-lg'}/>
                            <h1 className={'text-white font-bold text-lg'}>Today's Total Revenue</h1>
                        </div>
                        <h1 className={'text-white mt-5 text-2xl font-bold'}>{data.revenue} ETB</h1>
                    </div>
                    <div className={'bg-pink-400 p-5 rounded-lg pr-5'} onMouseEnter={() => setBg("from-pink-400")} onMouseLeave={() => setBg("from-white")}>
                        <div className={'flex items-center gap-2'}>
                            <IoFastFood className={'bg-white text-pink-400 size-13 p-2 rounded-lg'}/>
                            <h1 className={'text-white font-bold text-lg w-full'}>Today's Total Ordered</h1>
                        </div>
                        <h1 className={'text-white mt-5 text-2xl font-bold'}>{data.orders} Orders</h1>
                    </div>
                    <div className={'bg-purple-500 p-5 rounded-lg pr-5'} onMouseEnter={() => setBg("from-purple-500")} onMouseLeave={() => setBg("from-white")}>
                        <div className={'flex items-center gap-2'}>
                            <TbUsersGroup className={'bg-white text-purple-500 size-13 p-2 rounded-lg'}/>
                            <h1 className={'text-white font-bold text-lg w-full'}>Today's Total Customers</h1>
                        </div>
                        <h1 className={'text-white mt-5 text-2xl font-bold'}>{data.customers} Customers</h1>
                    </div>
                </div>
            ) : (
                <div>
                    <h1 className={'text-red-400 font-bold flex items-center gap-2'}> <MdError /> Can't get data.</h1>
                    <button className={'bg-yellow-300 rounded-lg mt-5 p-2 flex items-center gap-2 cursor-pointer'} onClick={get_today_info}>
                        <FaArrowsRotate /> Try again
                    </button>
                </div>
            )}
        </div>
    );
};