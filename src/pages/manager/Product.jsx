import Sidebar from "../../components/manager/Sidebar.jsx";
import {useEffect, useState} from "react";
import Loading2 from "../../components/Loading2.jsx";
import {FaArrowsRotate} from "react-icons/fa6";
import {MdError} from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import ProductCard from "../../components/manager/ProductCard.jsx";
import EditProduct from "../../components/manager/EditProduct.jsx";
import { AnimatePresence } from "framer-motion";
import Popup from "../../components/Popup.jsx";

export default function Product() {

    const [products, setProducts] = useState([
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
            category: "desserts"
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
    ]);
    const [loading, setLoading] = useState(!true);
    const [msg, setMsg] = useState(null);
    const [editProduct, setEditProduct] = useState({
        name: "",
        description: "",
        price: "",
        img: "",
        category: "",
    });
    const [openEdit, setOpenEdit] = useState(false);

    useEffect(() => {
        if (openEdit)
            document.body.classList.add("overflow-hidden");
        else document.body.classList.remove("overflow-hidden");

        return () => document.body.classList.remove("overflow-hidden");
    }, [openEdit]);

    const get_products = async () => {
        if (loading===true) return;
        setLoading(true);
    };

    return (
        <div className={'bg-white min-h-screen pb-10'}>
            <Sidebar />
            <div className={'p-5'}>
                <h1 className={'font-bold text-2xl'}>Products Details</h1>
                {loading===true ? <div className={'flex items-center justify-center h-[calc(100vh-10rem)]'}><Loading2 /></div> : loading===false ? (
                    <div className={'grid grid-cols-1 md:grid-cols-4 gap-5 mt-10'}>
                        <div
                            className={'w-full border border-dashed border-red-400 h-70 md:h-100 rounded-lg flex flex-col items-center justify-center gap-5 cursor-pointer'}
                            onClick={() => {
                                setEditProduct({
                                    name: "",
                                    description: "",
                                    price: "",
                                    img: "",
                                    category: "",
                                })
                                setOpenEdit(true);
                            }}
                        >
                            <FaPlus className={'size-8'}/>
                            <h1 className={'text-sm'}>Add new Dish</h1>
                        </div>
                        {
                            products.map(p => (
                                <ProductCard key={p.id} product={p} setEditProduct={setEditProduct} setOpenEdit={setOpenEdit} />
                            ))
                        }
                        <AnimatePresence mode={'wait'}>
                            { openEdit &&
                                    <EditProduct product={editProduct} setOpenEdit={setOpenEdit} setMsg={setMsg} />
                            }
                        </AnimatePresence>
                        <AnimatePresence mode="wait">
                            { msg &&
                                <Popup msg={msg.msg} type={msg.type ? msg.type : "success"} setMsg={setMsg}/>
                            }
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className={'flex flex-col items-center justify-center h-[calc(100vh-10rem)]'}>
                        <h1 className={'text-red-400 font-bold flex items-center gap-2'}> <MdError /> Can't get data.</h1>
                        <button className={'bg-yellow-300 rounded-lg mt-5 p-2 flex items-center gap-2 cursor-pointer'} onClick={get_products}>
                            <FaArrowsRotate /> Try again
                        </button>
                    </div>
                    )}
            </div>
        </div>
    )
};