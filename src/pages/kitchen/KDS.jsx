import { SiCodechef } from "react-icons/si";
import { useApi } from "../../../functions/api/api";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loading2 from "../../components/Loading2";

export default function KDS() {
    
    const { logout } = useAuth();
    const { request } = useApi();
    const navigate = useNavigate();

    // 0 = pending, 1 = preparing
    const [page, setPage] = useState(0);

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState(null);


    useEffect(() => {
        get_orders();
    }, []);


    const get_orders = async () => {

        if (loading) return;

        setLoading(true);

        const req = await request("/kitchen/get-orders");

        const res = !req.error && await req.json();

        if (req.error || !req.ok) {

            setMsg({
                msg: req.error || res.msg,
                type: "error"
            });

        } else {

            // only store pending + preparing
            const filtered =
                (res.orders || []).filter(
                    o =>
                        o.status === "pending" ||
                        o.status === "preparing"
                );

            setOrders(filtered);

        }

        setLoading(false);

    };


    const handle_logout = () => {

        logout();
        navigate("/", { replace: true });

    };


    const getStatus = () => {
        return page === 0 ? "pending" : "preparing";
    };


    const filteredOrders =
        orders.filter(
            order => order.status === getStatus()
        );


    const updateStatus = async (id, status) => {

        const req = await request(
            `/kitchen/update-status`,
            {
                method: "POST",
                body: JSON.stringify({ id, status })
            }
        );

        if (!req.ok) return;

        // move pending → preparing OR remove if done
        if (status === "done") {

            setOrders(prev =>
                prev.filter(o => o.id !== id)
            );

        } else {

            setOrders(prev =>
                prev.map(o =>
                    o.id === id
                        ? { ...o, status }
                        : o
                )
            );

        }

    };


    return (
        <div className="relative min-h-screen bg-white pb-10">


            {/* HEADER */}
            <div className="sticky top-0 z-50 flex items-center justify-between w-full bg-black text-white p-5 px-10">

                <div className="flex flex-col gap-2">

                    <div className="flex items-end gap-5">
                        <h1 className="font-bold text-xl">
                            Welcome Chef
                        </h1>
                        <SiCodechef className="size-10"/>
                    </div>

                    <h1 className="text-sm text-gray-400">
                        Today: {
                            new Date().toLocaleDateString(
                                undefined,
                                {
                                    year:"numeric",
                                    month:"short",
                                    day:"numeric"
                                }
                            )
                        }
                    </h1>

                </div>

                <button
                    onClick={handle_logout}
                    className="text-red-400 hover:underline"
                >
                    Logout
                </button>

            </div>


            {/* TITLE */}
            <h1 className="my-5 text-2xl font-bold ml-5">
                Kitchen Orders
            </h1>


            {/* TABS */}
            <div className="flex mx-10">

                <button
                    onClick={() => setPage(0)}
                    className={`w-full p-3 font-bold border cursor-pointer ${
                        page === 0
                            ? "bg-yellow-400"
                            : "hover:bg-gray-200"
                    }`}
                >
                    Pending
                </button>

                <button
                    onClick={() => setPage(1)}
                    className={`w-full p-3 font-bold border cursor-pointer ${
                        page === 1
                            ? "bg-yellow-400"
                            : "hover:bg-gray-200"
                    }`}
                >
                    Preparing
                </button>

            </div>


            {/* CONTENT */}
            <div className="border mt-5 mx-10 min-h-[400px] rounded-lg p-5">

                {loading ? (

                    <div className="flex justify-center">
                        <Loading2/>
                    </div>

                ) : filteredOrders.length === 0 ? (

                    <p>No orders</p>

                ) : (

                    <div className="grid gird-cols-1 md:grid-cols-3 gap-5">

                        {filteredOrders.map(order => (

                            <div
                                key={order.id}
                                className="border rounded-lg p-4 shadow"
                            >

                                <h2 className="font-bold text-lg">
                                    Table {order.table_no}
                                </h2>

                                <p className="text-gray-500">
                                    Customer: {order.customer_name}
                                </p>

                                <p className="text-gray-500">
                                    Waiter: {order.waiter_name}
                                </p>


                                {/* ITEMS */}
                                <div className="mt-3">

                                    {order.items.map(item => (

                                        <div key={item.id}>
                                            {item.quantity} × {item.name}
                                        </div>

                                    ))}

                                </div>


                                {/* BUTTON */}
                                <div className="mt-4">

                                    {order.status === "pending" && (

                                        <button
                                            onClick={() =>
                                                updateStatus(
                                                    order.id,
                                                    "preparing"
                                                )
                                            }
                                            className="bg-blue-500 text-white px-3 py-1 rounded"
                                        >
                                            Start Preparing
                                        </button>

                                    )}

                                    {order.status === "preparing" && (

                                        <button
                                            onClick={() =>
                                                updateStatus(
                                                    order.id,
                                                    "done"
                                                )
                                            }
                                            className="bg-green-500 text-white px-3 py-1 rounded"
                                        >
                                            Done
                                        </button>

                                    )}

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );

}