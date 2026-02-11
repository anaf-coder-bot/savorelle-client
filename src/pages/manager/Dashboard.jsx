import Sidebar from "../../components/manager/Sidebar.jsx";
import MostOrdered from "../../components/manager/MostOrdered.jsx";
import TodayInfo from "../../components/manager/TodayInfo.jsx";
import OrderReport from "../../components/manager/OrderReport.jsx";
import { useState } from "react";

export default function Dashboard() {

    const today = new Date().toDateString();
    const [bg, setBg] = useState("from-white");

    return (
        <div className={'relative min-h-screen bg-white pb-10'}>
            <Sidebar />
            <div className={`px-5 pt-5 bg-gradient-to-b transition-colors duration-200 ease-in-out ${bg} via-white to-white`}>
                <h1 className={'text-black font-bold text-3xl'}>Dashboard</h1>
                <h1 className={'text-gray-400 text-sm'}>{today}</h1>
                <div className={'flex flex-col-reverse gap-8 md:gap-0 md:flex-row items-start mt-5'}>
                    <MostOrdered />
                    <div className={'w-full md:px-8'}>
                        <TodayInfo setBg={setBg}/>
                        <OrderReport />
                    </div>
                </div>
            </div>
        </div>
    )
};