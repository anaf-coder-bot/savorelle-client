import { motion } from "framer-motion";
import {useState} from "react";
import Loading2 from "../Loading2.jsx";
import { useApi } from "../../../functions/api/api.js";

export default function EditProduct({ product, setOpenEdit, setMsg, get_product }) {
    const { request } = useApi();

    const [data, setData] = useState({
        name: product.name,
        description: product.description,
        price: product.price,
        img: product.img,
        category: product.category || 'starters',
    });
    const [loading, setLoading] = useState(false);

    const handle_change = (e) => {
        const {name, value} = e.target;
        setData(prev => ({...prev, [name]:value}));
    };

    const submit_form = async (e) => {
        e.preventDefault();

        if (!data.name || !data.price || !data.img || !data.category || loading) return;
        setLoading(true);
        const req = await request("/manager/add-product", {method: "POST", body: JSON.stringify(data)});
        const res = await req.json();

        if (req.error || !req.ok) {
            setMsg({msg: req.error||res.msg, type:"error"});
            setLoading(false);
        } else {
            setMsg({msg: res.msg});
            setOpenEdit(false);
            get_product(); 
        };
    };

   return (
       <motion.div
           initial={{scale:0}}
           animate={{scale:1}}
           exit={{scale:0}}
           transition={{duration:.5}}
           className={'fixed inset-0 bg-black/40 backdrop-blur-sm z-10000 flex justify-center items-center'}
       >
           <div className={`bg-white p-3 rounded-lg w-full md:w-1/2 h-[calc(100vh-7rem)] overflow-y-auto pb-5 ${loading ? 'flex items-center justify-center' :''}`} style={{scrollbarWidth:'thin'}}>
               {loading ? <Loading2 /> : (
                    <form onSubmit={submit_form}>
                        <div className={'text-end pr-3'}>
                            <h1 className={'font-bold text-lg cursor-pointer inline'} onClick={() => setOpenEdit(false)}>X</h1>
                        </div>
                        <h1 className={'text-lg'}>{product.name ? "Edit Product" : "Add Product"}</h1>
                        {data.img &&
                            <div className={'flex items-center justify-center border-b pb-1'}>
                                <img
                                    src={data.img}
                                    alt={data.name}
                                    className={'w-40 h-40 rounded-full bg-red-400 select-none'}
                                    draggable={false}
                                />
                            </div>
                        }
                        <div className={'flex flex-col items-start md:items-end gap-5 md:pr-60 mt-5'}>
                            <div className={'flex flex-col md:flex-row w-full md:w-auto items-center gap-5'}>
                                <h1>Name</h1>
                                <input
                                    type="text"
                                    className={'border-red-400 border-2 text-center outline-none w-50'}
                                    placeholder={'Name...'}
                                    name={'name'}
                                    value={data.name}
                                    onChange={handle_change}
                                    required
                                    maxLength={50}
                                />
                            </div>
                            <div className={'flex flex-col md:flex-row w-full md:w-auto items-center gap-5'}>
                                <h1>Price</h1>
                                <input
                                    type="number"
                                    className={'border-red-400 border-2 text-center outline-none w-50'}
                                    placeholder={'Price...'}
                                    name={'price'}
                                    value={data.price}
                                    onChange={handle_change}
                                    required
                                    maxLength={100}
                                />
                            </div>
                            <div className={'flex flex-col md:flex-row w-full md:w-auto items-center gap-5'}>
                                <h1>Category</h1>
                                <select name="category" onChange={handle_change} value={data.category||''} required className={'border-red-400 border-2 text-center outline-none w-50'}>
                                    <option value="starters">Starters</option>
                                    <option value="main dishes">Main Dishes</option>
                                    <option value="desserts">Desserts</option>
                                    <option value="drinks">Drinks</option>
                                </select>
                            </div>
                            <div className={'flex flex-col md:flex-row w-full md:w-auto items-center gap-5'}>
                                <h1>Image</h1>
                                <input
                                    type="text"
                                    className={'border-red-400 border-2 text-center outline-none w-50'}
                                    placeholder={'Image URL...'}
                                    name={'img'}
                                    value={data.img}
                                    onChange={handle_change}
                                />
                            </div>
                            <div className={'flex flex-col w-full md:w-auto md:flex-row items-center gap-5'}>
                                <h1>Description</h1>
                                <textarea
                                    className={'border-red-400 border-2 text-center outline-none w-70 h-40 rounded-lg p-1 resize-none'}
                                    placeholder={'Description...'}
                                    name={'description'}
                                    value={data.description}
                                    onChange={handle_change}
                                />
                            </div>
                        </div>
                        <button type={'submit'} className={'bg-red-400 p-2 rounded-lg text-white cursor-pointer mt-3'}>
                            Submit
                        </button>
                    </form>
               )}
           </div>
       </motion.div>
   )
};