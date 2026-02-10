import Header from "../../components/chef/Header.jsx";
import {useState} from "react";
import {AnimatePresence} from "framer-motion";
import OrderItems from "../../components/chef/OrderItems.jsx";


export default function ChefDashboard() {

    const [data, setData] = useState({
        "123": {
            id: 124,
            table_no: 120,
            items: ["apple", "banana"],
            status: "pending",
        },
        "143": {
            id: 143,
            table_no: 120,
            items: ["apple", "banana"],
            status: "pending",
        },
        "523": {
            id: 1224,
            table_no: 120,
            items: ["apple", "banana","apple", "banana","apple", "banana","apple", "banana","apple", "banana",],
            status: "preparing",
        },
    });


    return (
        <div className={'bg-white min-h-screen'}>
            <Header />
            <div className={'p-5'}>
                <h1 className={'font-bold text-xl'}>Orders</h1>
                <div className={'border-b'}/>

                <div className={'grid grid-cols-1 md:grid-cols-3 gap-3 mt-5'}>
                    {
                        Object.values(data).map(d => (
                            <OrderItems key={d.id} order={d} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}