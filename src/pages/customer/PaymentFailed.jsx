import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useApi } from "../../../functions/api/api";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { FaSadTear } from "react-icons/fa";
import { MdOutlineReplayCircleFilled } from "react-icons/md";
import { AnimatePresence } from "framer-motion";
import Popup from "../../components/Popup";
import Loading2 from "../../components/Loading2";


export default function PaymentFailed() {

    const navigate = useNavigate();
    const { request } = useApi();
    const [param] = useSearchParams();
    const tx_ref = param.get("tx-ref");
    const { round } = useParams();
    const [data, setData] = useState(null);
    const loading = useRef(false);
    const [msg, setMsg] = useState(null);

    useEffect(() => {
        if (!tx_ref) return navigate("/");
        get_order();
    }, [tx_ref]);

    const get_order = async () => {
        if (loading.current) return;
        loading.current = true;
        const req = await request(`/customer/get-order/${round}/${tx_ref}`);
        const res = !req.error && await req.json();
        if (req.error || !req.ok) {
            setMsg({msg:req.error||res.msg, type:"error"});
            if (req.status===400) setTimeout(() => navigate("/"), 3000);
        } else {
            let show = true;
            if (round==="first") {
                if (res.order.first_status!=="failed") {
                    show=false;
                    setMsg({msg:"Payment is not failed.", type:"error"});
                    setTimeout(() => navigate("/", {replace:true}), 3000);
                };
            } else if (round==="last") {
                if (res.order.last_status!=="failed") {
                    show=false;
                    setMsg({msg:"Payment is not failed.", type:"error"});
                    setTimeout(() => navigate("/", {replace:true}), 3000);
                };
            };
            if (show) setData(res.order);
        };
        loading.current = false;
    };

    const handle_again = async () => {
        if (loading.current || !data) return;
        loading.current = true;
        const req = await request("/customer/retry-payment", {method:"POST", body:JSON.stringify({id:data.id, round})});
        const res = !req.error && await req.json();
        if (req.error || !req.ok) setMsg({msg:req.error||res.msg, type:"error"});
        else window.location = res.msg.data.checkout_url;
        loading.current = false;
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center selection:bg-green-400 selection:text-black">
            
            <div className="p-3 bg-black rounded-lg text-white w-full md:w-1/2">
                {
                    loading.current ? <div className="flex items-center justify-center w-full"><Loading2 color="white" /></div> : (
                        <>
                            <div className="flex items-center gap-4 border-b pb-3 mb-3">
                                <h1 className="font-bold text-red-400 text-xl">Payment Failed </h1>
                                <FaSadTear className="size-5 text-red-400"/>
                            </div>
                            <h1 className="text-gray-400">Order Details</h1>
                            <h1 className="text-sm text-gray-200 my-2">Order Id: {data?.id}</h1>
                            <h1 className="text-sm text-gray-200 my-2">Customer name: {data?.customer_name}</h1>
                            <h1 className="text-sm text-gray-200 my-2">Customer email: {data?.customer_email}</h1>
                            <h1 className="text-sm text-gray-200 my-2">Customer phone: {data?.customer_phone}</h1>
                            <h1 className="text-sm text-gray-200 my-2">Failed at: {
                                    data && new Date(data[data.first_status==="failed" ? 'first_at' : 'last_at']).toLocaleString(undefined, {year:'numeric', month:'short', day:'numeric', hour:'numeric', minute:'numeric', hour12:true})
                                }</h1>
                            <h1 className="text-sm text-gray-200 my-2">Failed count: {
                                data && data[data.first_status==="failed" ? 'first_failed': 'last_failed'].toLocaleString(undefined, {year:'numeric', month:'short', day: 'numeric', hour:'numeric', minute:'numeric', hour12:true})}</h1>
                            <h1 className="text-gray-400">Payment Details</h1>
                            <div className="flex items-center justify-between gap-10 md:px-10">
                                <h1 className="text-2xl">Amount</h1>
                                <div className="flex-grow border-b border-dashed"/>
                                <h1>{data && Number(data.first_status==="failed" ? data.first_price : data.last_price).toLocaleString()} ETB</h1>
                            </div>
                            <h1 className="text-gray-400 text-center text-sm mt-5">Payment is failed.</h1>
                            <h1 className="text-gray-400 text-center text-sm">You can try again by clicking on the button below.</h1>
                            <button onClick={handle_again} className="bg-red-600 rounded-full p-2 w-full mt-5 flex items-center justify-center gap-3 cursor-pointer">
                                Try again
                                <MdOutlineReplayCircleFilled className="size-5" />
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
    );
};