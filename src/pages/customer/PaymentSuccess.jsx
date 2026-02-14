import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ImHappy2 } from "react-icons/im";
import Loading2 from "../../components/Loading2.jsx";
import { useApi } from "../../../functions/api/api.js";
import { LuCircleArrowOutUpRight } from "react-icons/lu";
import Cookies from "js-cookie";
import { AnimatePresence } from "framer-motion";
import Popup from "../../components/Popup.jsx";


export default function PaymentSuccess() {

    const navigate = useNavigate();
    const { request } = useApi();
    const [param] = useSearchParams();
    const tx_ref = param.get("tx-ref");
    const { round } = useParams();
    const loading = useRef(false);
    const [data, setData] = useState(null);
    const [msg, setMsg] = useState(null);
    const FIRST_FEE = import.meta.env.VITE_FIRST_FEE;
    const LAST_FEE = import.meta.env.VITE_LAST_FEE;
    
    useEffect(() => {
        if (!tx_ref) return navigate("/");
        get_order()
        Cookies.remove("cart");
    }, [tx_ref, round]);

    const get_order = async () => {
        if (loading.current) return;
        loading.current = true;
        const req = await request(`/customer/get-order/${round}/${tx_ref}`);
        const res = !req.error && await req.json();
        let show=true;
        if (req.error || !req.ok) {
            setMsg({msg:req.error||res.msg, type:"error"});
            if (req.status===400) setTimeout(() =>  navigate("/"), 3000);
        } else {
            if (round==="first") {
                if (res.order.first_status!=="paid") {
                    show=false;
                    setMsg({msg:"Payment is not paid.", type:"error"});
                    setTimeout(() => navigate("/", {replace:true}), 3000);
                };
            } else if (round==="last") {
                if (res.order.last_status!=="paid") {
                    show=false;
                    setMsg({msg:"Payment is not paid.", type:"error"});
                    setTimeout(() => navigate("/", {replace:true}), 3000);
                };
            };
            if (show) setData(res.order);
        };
        loading.current = false;
    };

    return (
        <div className="min-h-screen flex items-center justify-center selection:bg-green-400 selection:text-black">
            <div className="p-3 bg-black rounded-lg text-white w-full md:w-1/2">
                {
                    loading.current ? <div className="flex items-center justify-center w-full"><Loading2 color="white" /></div> : (
                        <>
                            <div className="flex items-center gap-4 border-b pb-3 mb-3">
                                <h1 className="font-bold text-green-400 text-xl">Payment Success </h1>
                                <ImHappy2 className="size-5 text-green-400"/>
                            </div>
                            <h1 className="text-gray-400">Order Details</h1>
                            <h1 className="text-sm text-gray-200 my-2">Order Id: {data?.id}</h1>
                            <h1 className="text-sm text-gray-200 my-2">Customer name: {data?.customer_name}</h1>
                            <h1 className="text-sm text-gray-200 my-2">Customer email: {data?.customer_email}</h1>
                            <h1 className="text-sm text-gray-200 my-2">Customer phone: {data?.customer_phone}</h1>
                            <h1 className="text-sm text-gray-200 my-2">Paid at: {new Date(data?.first_at)?.toLocaleString(undefined, {year:'numeric', month:'short', day: 'numeric', hour:'numeric', minute:'numeric', second:'numeric', hour12:'true'})}</h1>
                            <h1 className="text-gray-400">Payment Details</h1>
                            <div className="flex flex-col justify-start items-between gap-5 mt-5 px-2">
                                <div className="flex items-center justify-between gap-10 md:px-10">
                                    <h1 className="text-2xl">Total</h1>
                                    <div className="flex-grow border-b border-dashed"/>
                                    <h1>{Number(data?.price)?.toLocaleString()} ETB</h1>
                                </div>
                                <div className="flex items-center justify-between gap-10 text-green-400 md:px-10">
                                    <h1 className="text-lg">Paid ({FIRST_FEE*100}%)</h1>
                                    <div className="flex-grow border-b border-dashed"/>
                                    <h1>{Number(data?.price*FIRST_FEE)?.toLocaleString()} ETB</h1>
                                </div>
                                <div className={`flex items-center justify-between gap-10 md:px-10 ${round==='first' ? 'text-yellow-400' : 'text-green-400'}`}>
                                    <h1 className="text-lg">{round==='first'?'Remaining':'Paid'} ({LAST_FEE*100}%)</h1>
                                    <div className="flex-grow border-b border-dashed"/>
                                    <h1>{Number(data?.price*LAST_FEE)?.toLocaleString()} ETB</h1>
                                </div>
                                <div className="flex items-center justify-between gap-10 text-blue-400 md:px-10">
                                    <h1 className="text-lg">Reciept</h1>
                                    <div className="flex-grow border-b border-dashed"/>
                                    <a href={data?.reciept} target="_blank">Click here to view</a>
                                </div>
                            </div>
                            <h1 className="text-gray-400 text-center text-sm mt-5">We sent you an email of more details.</h1>
                            {round==='first' ? 
                                <h1 className="text-gray-400 text-center text-sm">We will send you a link to pay the rest once your food is served via email.</h1> 
                                :
                                <h1 className="text-gray-400 text-center text-sm">You have finished your payment. Thank you.</h1>
                            }
                            <h1 className="text-gray-400 text-center text-sm">You can take screen shot and cloth this tab.</h1>
                            <button onClick={() => navigate("/menus")} className="bg-green-600 rounded-full p-2 w-full mt-5 flex items-center justify-center gap-3 cursor-pointer">
                                Go to Menus
                                <LuCircleArrowOutUpRight />
                            </button>

                            <AnimatePresence mode="wait">
                                { msg &&
                                    <Popup msg={msg.msg} type={msg.type ? msg.type : "success"} setMsg={setMsg}/>
                                }
                            </AnimatePresence>
                        </>
                )}
            </div>
        </div>
    )

};