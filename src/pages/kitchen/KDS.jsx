import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { SiCodechef } from "react-icons/si";
import { useApi } from "../../../functions/api/api";
import Loading2 from "../../components/Loading2";
import { socket } from "../../socket/sockt";
import { AnimatePresence } from "framer-motion";
import Popup from "../../components/Popup";
import newOrderSound from "../../assets/sound/notification.wav"


export default function KDS() {

    const { logout } = useAuth();
    const { request } = useApi();
    // 0 pending, 1 preparing
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState(null);
    const [data, setData] = useState([]);
    const loadingRef = useRef(false);
    const audioRef = useRef(null);

    useEffect(() => {
        get_orders();
    }, []);

    useEffect(() => {
        audioRef.current = new Audio(newOrderSound);
        audioRef.current.volume = 1;
    }, []);

    useEffect(() => {
        socket.connect();
        socket.emit("join-kitchen");
        
        socket.on("new-order", order => {
            setData(prev => [...prev, order]);
            setPage(0);
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch(() => {});
            };
        });

        socket.on("order-updated", updatedOrder => {
            setData(prev => 
                prev
                    .map(o => 
                        o.id === updatedOrder.id ? updatedOrder : o
                    )
                    .filter(o => o.status!=="serving")
            );
        });

        return () => {
            socket.off("new-order");
            socket.off("order-updated");
            socket.disconnect();
        }
    }, []);

    const get_orders = async () => {
        if (loading) return;
        setLoading(true);
        const req = await request("/kitchen/get-orders");
        const res = !req.error && await req.json();
        if (req.error || !req.ok) setMsg({msg:req.error||res.msg, type:"error"});
        else setData(res.orders);
        setLoading(false);
    };

    const getStatus = () => {
        return page === 0 ? "pending" : "preparing";
    };

    const pages_order = data.filter(o => o.status === getStatus());

    const handle_update = async (id, status) => {
        if (!id || !status || loadingRef.current) return;
        loadingRef.current = true;
        const req = await request("/kitchen/update-status", {method:"POST", body:JSON.stringify({id, status})});
        const res = !req.error && await req.json();
        if (req.error || !req.ok) setMsg({msg:req.error||res.msg, type:"error"});
        else {

            const updatedOrder = res.order;

            setData(prev => {
                
                if (status==="done") {
                    return prev.filter(o => o.id!=id);
                } else {
                    return prev.map(o => 
                        o.id === id
                            ? {...o, status}
                            : o
                    )
                };
            });
        };
        loadingRef.current=false;
    };

    const handle_logout = () => {

        logout();
        navigate("/", { replace: true });

    };
    
    return (
        <div className={'bg-white min-h-screen pb-10'}>
            <div className="sticky top-0 z-50 flex items-center justify-between w-full bg-black text-white p-5 px-10">

                <div className="flex flex-col gap-2">
                    <div className="flex items-end gap-5">
                        <h1 className="font-bold text-xl">
                            Welcome Chef
                        </h1>
                        <SiCodechef className="size-10"/>
                    </div>
                    <h1 className="text-sm text-gray-400">
                        Today: {new Date().toLocaleDateString(undefined,
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
                    className="text-red-400 cursor-pointer hover:underline"
                >
                    Logout
                </button>
            </div>
            <h1 className="my-5 ml-5 text-2xl font-bold border-b">Today's Order Status</h1>
            <div className="flex mx-10 text-center">
                    <button className={`w-full text-2xl font-bold border p-3 rounded-l-full ${page===0?'bg-yellow-400':'cursor-pointer hover:bg-gray-200'}`} onClick={() => !loading&&setPage(0)}>Pending</button>
                    <button className={`w-full text-2xl font-bold border p-3 rounded-r-full ${page===1?'bg-blue-400':'cursor-pointer hover:bg-gray-200'}`} onClick={() => !loading&&setPage(1)}>Preparing</button>
            </div>
            
            <div className="mx-10 border mt-5 h-100 rounded-lg p-3 overflow-y-auto">
                {loading ? <div className={'flex items-center justify-center h-100'}><Loading2 /></div> : pages_order.length === 0 ? <p>No orders</p> : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                        {
                            pages_order.map(order => (
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

                                <p className="text-gray-500">
                                    Time: {new Date(order.first_at).toLocaleString(undefined, {hour:"numeric", minute:"numeric", hour12:true})}
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
                                                handle_update(
                                                    order.id,
                                                    "preparing"
                                                )
                                            }
                                            className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
                                        >
                                            Start Preparing
                                        </button>

                                    )}

                                    {order.status === "preparing" && (

                                        <button
                                            onClick={() =>
                                                handle_update(
                                                    order.id,
                                                    "done"
                                                )
                                            }
                                            className="bg-green-500 text-white px-3 py-1 rounded cursor-pointer"
                                        >
                                            Done
                                        </button>

                                    )}

                                </div>

                            </div>
                            ))
                        }
                    </div>
                )}
            </div>
            <AnimatePresence mode="wait">
                { msg &&
                    <Popup msg={msg.msg} type={msg.type ? msg.type : "success"} setMsg={setMsg}/>
                }
            </AnimatePresence>
        </div>
    );
}