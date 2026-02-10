import { LiaCartArrowDownSolid } from "react-icons/lia";
import {motion} from "framer-motion";
import { useState } from "react";
import Cookies from "js-cookie";
import formatMoney from "../../../functions/func";


export default function MenusCard({menu, index, setDoCartCheck}) {
    const even = index%2===0;
    const [inCart, setInCart] = useState(false);

    const add_to_cart = () => {
        if (!inCart) {
            const cart_cookie = Cookies.get("cart");
            let cart = {};
            if (cart_cookie) cart = JSON.parse(cart_cookie);
            const payload = {
                ...cart,
                [menu.id]: {
                    ...menu,
                    quantity: 1,
                },
            };
            Cookies.set("cart", JSON.stringify(payload), {expires: new Date(Date.now() + 1 * 60 * 60 *1000)});
            setInCart(true);
            setDoCartCheck(prev => !prev)
        };
    };

    return (
        <motion.div
            initial={{opacity:0, y:50}}
            animate={{opacity:1, y:0}}
            transition={{duration:1.5, delay:index<8?index:0}}
            className={`relative bg-gray-100/10 backdrop-blur-sm rounded-2xl h-60 flex flex-col items-center justify-start gap-3 pt-20 select-none hover:scale-105 group duration-300 ${!even ? 'mt-20' : ''}`}
        >
            <img 
                src={menu.img} 
                alt={menu.name} 
                className="absolute w-40 -top-15 left-1/2 -translate-x-1/2 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] group-hover:rotate-45 duration-300"
                draggable={false}
            />
            <h1 className="text-white font-bold line-clamp-2 text-center">{menu.name}</h1>
            <h1 className="text-gray-400 text-sm text-center line-clamp-2">{menu.description}</h1>
            <div className="relative flex flex-col items-start justify-between w-full pl-4">
                <h1 className="text-lg text-green-400">{formatMoney(menu.price)} ETB</h1>
                <h1 className={'bg-white/40 rounded-2xl p-1 text-white text-sm uppercase'}>{menu.category}</h1>
                <LiaCartArrowDownSolid 
                    className="absolute size-10 -right-4 -bottom-3 bg-green-400 rounded-2xl skew-6 hover:skew-0 hover:rounded-sm duration-300 cursor-pointer"
                    onClick={add_to_cart}
                />
            </div>
        </motion.div>
    );
};