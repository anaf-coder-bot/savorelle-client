import { MdDoneOutline } from "react-icons/md";
import { MdError } from "react-icons/md";
import { motion } from "framer-motion";

const THEMES = {
    success: {
        bg:"bg-green-600",
        icon: <MdDoneOutline color="white"/>
    },
    error: {
        bg: "bg-red-600",
        icon: <MdError color="white"/>
    }
}

export default function Popup ({ msg, type="success", setMsg }) {

    setTimeout(() => {
        setMsg(null);
    }, 4000);

    return (
        <motion.div initial={{opacity:0, x:50}} animate={{opacity:1, x:0}} exit={{opacity: 0, y: -50}} transition={{duration: .5}} 
            className={`fixed right-1 md:right-10 top-15 p-5 rounded-2xl w-1/2 md:w-90 md:py-8 text-white z-10000000 ${THEMES[type].bg}`}
        >
            <div className="flex items-center gap-5 border-b pb-4 mb-2">
                <div className="bg-black p-1 w-10 h-10 flex items-center justify-center rounded-full">
                    {THEMES[type].icon}
                </div>
                <h1 className="capitalize">{type}</h1>
            </div>
            <h1 className="font-bold">{msg}</h1>
        </motion.div>
    )

};