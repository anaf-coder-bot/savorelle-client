import { useEffect, useState } from "react"
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Header from "../../components/customer/Header";
import Footer from "../../components/customer/Footer";
import Loading from "../../components/Loading";
import AnimatedList from "../../components/customer/CartCard";
import { MdExposurePlus1 } from "react-icons/md";
import { TbExposureMinus1 } from "react-icons/tb";
import formatMoney from "../../../functions/func";
import VerifyEmail from "../../components/customer/VerifyEmail";
import { AnimatePresence } from "framer-motion";

export default function Cart() {
    const navigate = useNavigate();

    const FIRST_FEE = import.meta.env.VITE_FIRST_FEE;
    const LAST_FEE = import.meta.env.VITE_LAST_FEE;

    const [cart, setCart] = useState(null);
    const [table, setTable] = useState(null);

    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    const [checkCart, setCheckCart] = useState(false);
    const [total, setTotal] = useState(0);

    const [onVerify, setOnVerify] = useState(false);
    const [data, setData] = useState({
        name: "",
        phone: "",
        email: "",
    });

    useEffect(() => {
        const table_cookie = Cookies.get("table");
        if (!table_cookie) return navigate("/menus");
        setTable(JSON.parse(table_cookie));
        setTotal(0);
        const cart_cookie = Cookies.get("cart");
        if (!cart_cookie) return navigate("/menus");
        const tot = Object.values(JSON.parse(cart_cookie)).map(v => setTotal(prev => prev+(v.price*v.quantity)));
        setCart(JSON.parse(cart_cookie));
        setLoading(false);
    }, [checkCart]);

    useEffect(() => {
        if (!cart || Object.keys(cart).length<=0) return;
        setList([]);
        if (Object.keys(cart).length>0) {
            Object.keys(cart).map(c => {
                const item = cart[c];
                const el = (
                    <div 
                        key={c}
                        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5"
                    >
                        <div className="flex items-center gap-3">
                            <img 
                                src={item.img} 
                                alt={item.name}
                                className="w-30"
                                draggable="false"
                            />
                            <h1 className="text-white line-clamp-1">{item.name}</h1>
                        </div>
                        <div className="flex items-center justify-between">
                            <h1 className="text-white">{formatMoney((item.price*item.quantity))} ETB</h1>
                            <div className="flex items-center justify-between gap-3 w-1/2">
                                <TbExposureMinus1 
                                    className="bg-red-400 w-6 h-6 rounded-full p-1 text-black"
                                    onClick={() => {
                                        const cart_cookie = JSON.parse(Cookies.get("cart"));
                                        if (item.quantity>1) {
                                            const payload = {
                                                ...cart_cookie,
                                                [c]: {
                                                    ...item,
                                                    quantity:item.quantity-1
                                                },
                                            };
                                            Cookies.set("cart", JSON.stringify(payload), {expires: new Date(Date.now() + 3 * 60 * 60 * 1000)});
                                        } else {
                                            if (Object.keys(cart_cookie).length===1) {
                                                Cookies.remove("cart");
                                            } else {
                                                const {[c]:_, ...rest} = cart_cookie;
                                                const payload = {...rest};
                                                Cookies.set("cart", JSON.stringify(payload), {expires: new Date(Date.now() + 3 * 60 * 60 * 1000)})
                                            };
                                        };
                                        setCheckCart(prev => !prev);
                                    }}
                                />
                                <input 
                                    type="number" 
                                    readOnly
                                    className="w-1/4 py-2 text-center border-b border-green-400 outline-none select-none"
                                    value={item.quantity}

                                />
                                <MdExposurePlus1 
                                    className="bg-green-400 w-6 h-6 rounded-full p-1 text-black"
                                    onClick={() => {
                                        const cart_cookie = JSON.parse(Cookies.get("cart"));
                                        const payload = {
                                            ...cart_cookie,
                                            [c]: {
                                                ...item,
                                                quantity:item.quantity+1,
                                            },
                                        };
                                        Cookies.set("cart", JSON.stringify(payload), {expires: new Date(Date.now() + 3 * 60 * 60 * 1000)});
                                        setCheckCart(prev => !prev);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                );
                setList(prev => [...prev, el]);
            });
        };
    }, [cart]);

    useEffect(() => {
        if (onVerify) {
            document.body.classList.add("overflow-hidden")
        } else {
            document.body.classList.remove("overflow-hidden");
        };

        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [onVerify]);

    return (
        <div className="min-h-screen bg-[url(/base/bg-gray-1.jpg)] selection:bg-green-400 selection:text-black pb-2 px-2" style={{overflowX:"hidden"}}>
            <Header />
            {loading ? <Loading /> : (
                <div className="relative flex flex-col md:flex-row items-start gap-3">
                    <AnimatedList
                        items={list}
                        className="w-full drop-shadow-[0_10px_20px_rgba(255,255,255,.4)]"
                    />
                    <div className="flex flex-col gap-7 items-start rounded-2xl border border-white/30 w-full p-2 bg-black/40">
                        <div>
                            <h1 className="text-white text-2xl font-bold">Order Summery</h1>
                            <small className="text-green-400 font-bold ">Table: {table.table_no}</small>
                        </div>
                        <div className="border-b border-white w-full"/>
                        <div className="flex items-center justify-between w-full text-white text-xl">
                            <h1>Total({Object.keys(cart).length})</h1>
                            <div className="flex-grow border-b border-white/30 mx-2"/>
                            <h1>{formatMoney(total)} ETB</h1>
                        </div>
                        <div className="w-full">
                            <div className="flex items-center justify-between w-full text-white text-xl">
                                <h1>Initalize Payment ({FIRST_FEE*100}%)</h1>
                                <div className="flex-grow border-b border-white/30 mx-2"/>
                                <h1 className="text-green-500">{formatMoney((total*FIRST_FEE))}</h1>
                            </div>
                            <p className="text-sm text-yellow-500 text-center">* Pay this now to confirm your order.</p>
                        </div>
                        <div className="w-full">
                            <div className="flex items-center justify-between w-full text-white text-xl">
                                <h1>Final Payment ({LAST_FEE*100}%)</h1>
                                <div className="flex-grow border-b border-white/30 mx-2"/>
                                <h1 className="text-blue-500">{formatMoney((total*LAST_FEE))}</h1>
                            </div>
                            <p className="text-sm text-yellow-500 text-center">* Pay the rest after receiving your meal.</p>
                        </div>
                        <button
                            onClick={() => setOnVerify(true)} 
                            className="text-xl bg-green-500 rounded-2xl text-black p-2 self-center cursor-pointer"
                        >
                            Pay {formatMoney((total*FIRST_FEE))} ETB Now
                        </button>
                        <button 
                            onClick={() => navigate("/menus")}
                            className="text-xl bg-gray-500 rounded-2xl text-black p-2 self-center cursor-pointer"
                        >
                            Back to Menus
                        </button>
                    </div>
                    <AnimatePresence mode="wait">
                        {onVerify&&<VerifyEmail data={data} setData={setData} setOnVerify={setOnVerify} />}
                    </AnimatePresence>
                </div>
            )}
            <Footer />
        </div>
    )
};