import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import { useApi } from "../../../functions/api/api";
import Loading from "../../components/Loading";
import { AnimatePresence } from "framer-motion";
import Popup from "../../components/Popup";


export default function CheckPayment() {

    const { request } = useApi();
    const navigate = useNavigate();
    const [param] = useSearchParams();
    const tx_ref = param.get("tx-ref");
    const [msg, setMsg] = useState(null);
    const noRef = useRef(0);   
    const loading = useRef(false);
    const interval = useRef(null);
    
    useEffect(() => {
        if (!tx_ref) return navigate("/", {replace:true});
        interval.current = setInterval(do_check, 5000);

        return () => clearInterval(interval.current);
    }, [tx_ref]);

    const do_check = async () => {
        
        if (loading.current) return;
        noRef.current += 1;
        if (noRef.current<0) return;
        if (noRef.current>6) noRef.current = -6;

        loading.current = true;
        const req = await request(`/customer/check-payment/${tx_ref}`);
        const res = !req.error && await req.json();
        if (req.error || !req.ok) {
            setMsg({msg:res.msg||req.error, type:"error"});
            if (req.status===400) setTimeout(() => navigate("/", {replace:true}), 3000);
        } else {
            if (res.order.status==="paid") 
                navigate(`/payment-success/${res.order.round}?tx-ref=${tx_ref}`, {replace:true});
            else if (res.order.status==="failed")
                navigate(`/payment-failed/${res.order.round}?tx-ref=${tx_ref}`, {replace:true})
        };
        loading.current = false;
    };

    return (
        <div className="min-h-screen flex flex-col gap-5 items-center justify-center">
            <Loading />
            <h1 className="text-white text-2xl font-bold">Checking Payment</h1>
            <h1 className="text-white text-xl">Don't close this page</h1>
            <AnimatePresence mode="wait">
                { msg &&
                    <Popup msg={msg.msg} type={msg.type ? msg.type : "success"} setMsg={setMsg}/>
                }
            </AnimatePresence>
        </div>
    );
};