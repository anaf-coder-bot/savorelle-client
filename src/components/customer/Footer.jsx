import { FiInstagram } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { FaTelegram } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import {motion} from "framer-motion";


export default function Footer() {
    const navigate = useNavigate();

    return (
        <div className="bg-[url(/base/bg-gray-1.jpg)] w-full h-100 mt-30 flex flex-col items-center px-5 overflow-hidden">
            <div className="flex-1 w-full flex items-center justify-between">
                <motion.div 
                    initial={{opacity:0, y:50}}
                    whileInView={{opacity:1, y:0}}
                    viewport={{once:true, amount:.5}}
                    transition={{duration:1.5, delay:.5}}
                    className="flex flex-col items-start justify-start gap-5"
                >
                    <h1 className="text-6xl text-white">Savorele</h1>
                    <h1 className="text-white">Where Taste Meets Elegance</h1>
                    <h1 className="text-white">Visit Us</h1>
                    <div className="flex items-center gap-5">
                        <FiInstagram 
                            className="text-white size-5 cursor-pointer"
                            onClick={() => window.open("https://www.instagram.com/anafthecoder/")}
                        />
                        <FaFacebook 
                            className="text-white size-5 cursor-pointer"
                            onClick={() => window.open("https://www.google.com")}
                        />
                        <AiFillTikTok 
                            className="text-white size-5 cursor-pointer"
                            onClick={() => window.open("https://www.google.com")}
                        />
                        <FaTelegram 
                            className="text-white size-5 cursor-pointer"
                            onClick={() => window.open("https://www.google.com")}
                        />
                    </div>
                </motion.div>
                <motion.div 
                    initial={{opacity:0, y:50}}
                    whileInView={{opacity:1, y:1}}
                    viewport={{once:true, amount:.5}}
                    transition={{duration:1.5, delay:1}}
                    className="hidden md:block flex flex-col items-center justify-start text-white text-xl gap-3"
                >
                    <h1>Savorelle</h1>
                    {["Home", "Menus", "Reserve Table", "Gallery", "Contact"].map(item => {
                        const new_ = item.replace(" ", "-");
                        return <h1 key={item} className="cursor-pointer" onClick={() => navigate(`/${new_.toLocaleLowerCase()}`)}>{item}</h1>
                    })}
                </motion.div>
                <motion.div 
                    initial={{opacity:0, y:50}}
                    whileInView={{opacity:1, y:0}}
                    viewport={{amount:.5, once:true}}
                    transition={{duration:1.5, delay:1.5}}
                    className="hidden md:block flex flex-col items-start justify-start text-gray-400 text-xl gap-3 w-1/4"
                >
                    <h1 className="flex items-center gap-3">
                        <FaLocationDot /> Ethiopia, Addis Ababa
                    </h1>
                    <h1 className="flex items-center gap-3">
                        <FaPhoneAlt /> +2519-9492-4132
                    </h1>
                    <h1 className="flex items-center gap-3">
                        <MdEmail /> anaf.coder@gmail.com
                    </h1>
                    <h1 className="flex items-center gap-3">
                        <FaClock /> Mon-Sun: 06:00AM-10:00PM
                    </h1>
                </motion.div>
            </div>
            <div className="border-t border-gray-400 flex flex-col gap-5 md:flex-row md:items-center md:justify-between w-full text-gray-400 text-sm p-3">
                <motion.h1 
                    initial={{opacity:0, x:-50}}
                    whileInView={{opacity:1, x:0}}
                    viewport={{once:true, amount:.5}}
                    transition={{duration:1.5, delay:2}}
                    className="text-center"
                >
                    @2026 Savorelle Restaurant. All rights reserved.
                </motion.h1>
                <motion.h1 
                    initial={{opacity:0, y:-30}}
                    whileInView={{opacity:1, y:0}}
                    viewport={{once:true, amount:.5}}
                    transition={{duration:1.5, delay:1}}
                    className="text-center"
                >
                    Powered by: 
                    <span className="text-white">Anaf Mezgebu (<a href="mailto:anaf.coder@gmail.com">anaf.coder@gmail.com</a>)</span>
                </motion.h1>
                <motion.h1 
                    initial={{opacity:0, x:50}}
                    whileInView={{opacity:1, x:0}}
                    viewport={{once:true, amount:.5}}
                    transition={{duration:1.5, delay:2}}
                    className="text-center"
                >
                    Privacy Policy | Terms & Conditions | Accessibility
                </motion.h1>
            </div>
        </div>
    )
};