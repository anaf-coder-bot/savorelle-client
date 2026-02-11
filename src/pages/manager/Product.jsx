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
import { useApi } from "../../../functions/api/api.js";

export default function Product() {

    const { request } = useApi();
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState(null);
    const [editProduct, setEditProduct] = useState({
        id: "",
        name: "",
        description: "",
        price: "",
        img: "",
        category: "",
    });
    const [openEdit, setOpenEdit] = useState(false);

    useEffect(() => {
        get_products();
    }, []);

    useEffect(() => {
        if (openEdit)
            document.body.classList.add("overflow-hidden");
        else document.body.classList.remove("overflow-hidden");

        return () => document.body.classList.remove("overflow-hidden");
    }, [openEdit]);

    const get_products = async () => {
        if (loading===true) return;
        setLoading(true);
        const req = await request("/customer/get-product");
        const res = !req.error && await req.json();
        if (!req.ok || req.error) {
            setMsg({msg:res.msg || req.error, type:"error"});
            setLoading(false);
        } else {
            setProducts(res.product);
            setLoading(false);
        };
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
                            products && products.map(p => (
                                <ProductCard key={p.id} product={p} setEditProduct={setEditProduct} setOpenEdit={setOpenEdit} />
                            ))
                        }
                        <AnimatePresence mode={'wait'}>
                            { openEdit &&
                                    <EditProduct product={editProduct} setOpenEdit={setOpenEdit} setMsg={setMsg} get_product={get_products} />
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