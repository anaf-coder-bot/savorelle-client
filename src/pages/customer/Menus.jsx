import Header from "../../components/customer/Header";
import Footer from "../../components/customer/Footer";
import MenusCard from "../../components/customer/MenusCard";
import { FaShoppingCart } from "react-icons/fa";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { useApi } from "../../../functions/api/api.js";

export default function Menus() {
    const navigate = useNavigate();
    const { request } = useApi();
    
    const [menus, setMenus] = useState(null);
    const [table, setTable] = useState(null);
    
    const [cartNo, setCartNo] = useState(null);
    const [doCartCheck, setDoCartCheck] = useState(false);
    const [fetchText, setFetchText] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const cart_cookie = Cookies.get("cart");
        setCartNo(cart_cookie?Object.keys(JSON.parse(cart_cookie)).length:0);
    }, [doCartCheck]);

    useEffect(() => {
        const table_cookie = Cookies.get("table");
        setTable(table_cookie?JSON.parse(table_cookie):null);
        get_menus();
    }, []);

    const get_menus = async () => {
        if (loading) return;
        setLoading(true)
        setFetchText("");
        const req = await request("/customer/get-product");
        
        const res = !req.error &&  await req.json();
        if (req.error || !req.ok) {
            setFetchText(req.error||res.msg);
            setLoading(false);
        } else {
            setMenus(res.product);
            setLoading(false);
        };
    };

    return (
        <div className="min-h-screen bg-[url(/base/bg-gray-1.jpg)] selection:bg-green-400 selection:text-black pb-2 px-2" style={{overflowX:"hidden"}}>
            <Header />
            <h1 className="text-white text-center text-4xl font-bold my-5">Menus</h1>
            {!table ? (
                <h1 className="text-red-600 text-sm text-center">Scan the table QR code to start ordering.</h1>
            ) : table ==="loading" ? (
                <Loading />
            ) : (
                <h1 className="text-green-600 text-sm text-center">Table <span className="font-bold">{table.table_no}</span> selected.</h1>
            )}
            {loading ? (
                <div className="flex items-center justify-center mt-10">
                    <Loading />
                </div>
            ) : (
                <>
                    <div className={`${menus && menus.length > 0 ? 'grid grid-cols-2 md:grid-cols-4 gap-10' : ''} pt-25 px-2 md:px-10`}>
                        {
                            menus && menus.length>0 ? (
                                menus.map((m, index) => (
                                    <MenusCard key={m.id} menu={m} index={index} setDoCartCheck={setDoCartCheck}/>
                                ))
                            ) : (
                                <div className="flex flex-col items-center gap-5">
                                    <h1 className="text-2xl text-center col-span-full text-yellow-500">{fetchText}</h1>
                                    <button className="bg-yellow-400 text-black p-3 w-1/3 rounded-full cursor-pointer" onClick={get_menus}>Try again</button>
                                </div>
                            )
                        }
                    </div>
                    {cartNo && (
                        <div className="fixed bottom-10 right-10 md:right-20 flex items-center justify-center w-15 h-15 rounded-full bg-green-400 cursor-pointer select-none" onClick={() => navigate("/cart")}>
                            <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1 w-6 h-6 flex items-center justify-center text-white">
                                <h1>{cartNo}</h1>
                            </div>
                            <FaShoppingCart />
                        </div>
                    )}
                </>
            )}
            <Footer />
        </div>
    );
};