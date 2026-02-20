import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useApi } from "../../../functions/api/api";
import Loading2 from "../../components/Loading2";
import { BsEmojiKissFill } from "react-icons/bs";
import { BsChatSquareHeartFill } from "react-icons/bs";


export default function PayRest () {
    
    const navigate = useNavigate();
    const { request } = useApi();
    const [param] = useSearchParams();
    const order_id = param.get("order-id");
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState(null);
    const [data, setData] = useState([]);
    const [tip, setTip] = useState();

    useEffect(() => {
        if (!order_id) navigate("/", { replace:true });
        get_data();
    }, [order_id]);

    const get_data = async () => {
        if (loading) return;
        setLoading(true);
        const req = await request(`/customer/get-order/last/${order_id}`);
        const res = !req.error && await req.json();
        if (req.error || !req.ok) {
            setMsg(req.error||res.msg);
            if (req.status===400) return navigate("/", {replace:true});
        } else {
            if (res.order.status!=="paying") return navigate("/", {replace:true});
            else setData(res.order);
        };
        setLoading(false);
    };

    const send_data = async () => {
        if (loading) return;
        setLoading(true);
        const inp = JSON.stringify({id:data.id, tip:tip||0});
        const req = await request("/customer/pay-rest", {method:"POST", body:inp});
        const res = !req.error && await req.json()
        if (req.error || !req.ok) setMsg(req.error||res.msg);
        else {
            window.location = res.data.data.checkout_url;
        };
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center selection:bg-green-400 selection:text-black">
            <div className="p-3 bg-black rounded-lg text-white w-full md:w-1/2">
                    {
                        loading ?   <div className="flex items-center justify-center w-full">
                                        <Loading2 color="white"/>
                                    </div> : (
                            <>
                                <div className="flex items-center gap-4 border-b pb-3 mb-3">
                                    <h1 className="font-bond text-green-400 text-xl">Pay the Rest</h1>
                                    <BsEmojiKissFill className="size-6 text-pink-500"/>
                                </div>
                                <h1 className="text-gray-400">Order Detail</h1>
                                <div className="flex items-center gap-5">
                                    <h1 className="text-2xl text-white my-2">Total</h1>
                                    <div className="flex-grow border-b border-dashed"/>
                                    <h1 className="text-2xl text-green-400 my-2">{Number(data.price).toLocaleString()} Birr</h1>
                                </div>
                                <div className="flex items-center gap-5">
                                    <h1 className="text-2xl text-white my-2">Already paid</h1>
                                    <div className="flex-grow border-b border-dashed"/>
                                    <h1 className="text-2xl text-green-400 my-2">{Number(data.first_price).toLocaleString()} Birr</h1>
                                </div>
                                <div className="flex items-center gap-5">
                                    <h1 className="text-2xl text-white my-2">Remains</h1>
                                    <div className="flex-grow border-b border-dashed"/>
                                    <h1 className="text-2xl text-yellow-400 my-2">{Number(data.last_price).toLocaleString()} Birr</h1>
                                </div>
                                <div className="flex items-center gap-4 mb-3">
                                    <h1>Have Tip for waiter?</h1>
                                    <BsChatSquareHeartFill className="size-6 text-red-500"/>
                                </div>
                                <input type="number" min={1} className="border border-dashed border-green-400 rounded-2xl p-2 text-center w-full block outline-none" placeholder="No" value={tip} onChange={(e) => setTip(e.target.value)}/>
                                <button onClick={send_data} className="bg-green-400 p-2 rounded-2xl text-black mt-5 cursor-pointer">
                                    Pay ${Number(data.last_price)} Now
                                </button>
                            </>
                        )
                    }
            </div>
        </div>
    );
};