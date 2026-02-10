import Header from "../../components/customer/Header";
import Footer from "../../components/customer/Footer";
import MenusCard from "../../components/customer/MenusCard";
import { FaShoppingCart } from "react-icons/fa";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

export default function Menus() {
    const navigate = useNavigate();
    const menus = [
        {
            id: 1,
            name: "Grilled Salmon",
            description:"Fresh Atlantic salmon with herbs, served with roasted vegetables and lemon butter sauce",
            price: 2400.786,
            img: "/placeholder/grilled.png",
            category: "starters"
        },
        {
            id: 2,
            name: "Margherita Pizza",
            description:"Classic Italian pizza with fresh mozzarella, basil, and San Marzano tomato sauce",
            price: 716.99,
            img: "/placeholder/margarita.png",
            category: "starters"
        },
        {
            id: 3,
            name: "Beef Burger",
            description:"Angus beef patty with cheddar cheese, lettuce, tomato, and special sauce on brioche bun",
            price: 618.99,
            img: "/placeholder/burger.png",
            category: "starters"
        },
        {
            id: 4,
            name: "Chocolate Lava Cake",
            description:"Warm chocolate cake with molten center, served with vanilla ice cream",
            price: 78.99,
            img: "/placeholder/lava.png",
            category: "main dishes"
        },
        {
            id: 6,
            name: "Margherita Pizza",
            description:"Classic Italian pizza with fresh mozzarella, basil, and San Marzano tomato sauce",
            price: 176.99,
            img: "/placeholder/margarita.png",
            category: "main dishes"
        },
        {
            id: 7,
            name: "Beef Burger",
            description:"Angus beef patty with cheddar cheese, lettuce, tomato, and special sauce on brioche bun",
            price: 718.99,
            img: "/placeholder/burger.png",
            category: "main dishes"
        },
        {
            id: 5,
            name: "Grilled Salmon",
            description:"Fresh Atlantic salmon with herbs, served with roasted vegetables and lemon butter sauce",
            price: 247.99,
            img: "/placeholder/grilled.png",
            category: "desserts"
        },
        {
            id: 8,
            name: "Chocolate Lava Cake",
            description:"Warm chocolate cake with molten center, served with vanilla ice cream",
            price: 78.99,
            img: "/placeholder/lava.png",
            category: "desserts"
        },
        {
            id: 10,
            name: "Margherita Pizza",
            description:"Classic Italian pizza with fresh mozzarella, basil, and San Marzano tomato sauce",
            price: 716.99,
            img: "/placeholder/margarita.png",
            category: "messerts"
        },
        {
            id: 9,
            name: "Grilled Salmon",
            description:"Fresh Atlantic salmon with herbs, served with roasted vegetables and lemon butter sauce",
            price: 274.99,
            img: "/placeholder/grilled.png",
            category: "drinks",
        },
        {
            id: 12,
            name: "Chocolate Lava Cake",
            description:"Warm chocolate cake with molten center, served with vanilla ice cream",
            price: 87.99,
            img: "/placeholder/lava.png",
            category: "drinks",
        },
        {
            id: 11,
            name: "Beef Burger",
            description:"Angus beef patty with cheddar cheese, lettuce, tomato, and special sauce on brioche bun",
            price: 718.99,
            img: "/placeholder/burger.png",
            category: "drinks",
        },
    ];

    const [table, setTable] = useState(null);

    // MUST DELETE AFTER BACKEND
    // Cookies.set("table", JSON.stringify({table_no:1234, table_id:"1234"}), {expires:1})
    
    const [cartNo, setCartNo] = useState(null);
    const [doCartCheck, setDoCartCheck] = useState(false);
    const [fetchText, setFetchText] = useState("");
    const [loading, setLoading] = useState(!true);

    useEffect(() => {
        const cart_cookie = Cookies.get("cart");
        setCartNo(cart_cookie?Object.keys(JSON.parse(cart_cookie)).length:0);
    }, [doCartCheck]);

    useEffect(() => {
        const table_cookie = Cookies.get("table");
        setTable(table_cookie?JSON.parse(table_cookie):null);
    }, []);


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
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pt-25 px-2 md:px-10">
                        {
                            menus.length>0 ? (
                                menus.map((m, index) => (
                                    <MenusCard key={m.id} menu={m} index={index} setDoCartCheck={setDoCartCheck}/>
                                ))
                            ) : <h1 className="text-2xl text-center col-span-full text-yellow-500">{fetchText}</h1>
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