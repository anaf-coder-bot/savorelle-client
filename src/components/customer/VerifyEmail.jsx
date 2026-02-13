import {AnimatePresence, motion} from "framer-motion";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdMarkEmailUnread } from "react-icons/md";
import Loading from "../Loading";
import { useEffect, useState } from "react";
import { useApi } from "../../../functions/api/api";
import Popup from "../Popup";

export default function VerifyEmail({data, setData, setOnVerify}) {

    const { request } = useApi();
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState({
        code: "",
        user_code:"",
    });
    const [timeLeft, setTimeLeft] = useState(0);
    const [msg, setMsg] = useState(null);

    useEffect(() => {
        if (code.user_code.length===4) {
            if (code.user_code===code.code) {
                setLoading(true);
                // INITALIZE THE PAYMENT
            } else {
                setMsg({msg:"Invalid code, try again.", type:"error"});
                setCode(prev => ({...prev, user_code:""}));
            };
        };
    }, [code.user_code]);

    useEffect(() => {
        if (timeLeft===0) return;
        const timer = setInterval(() => {
            setTimeLeft(t => t-1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const handle_input = (e) => {
        const {name, value} = e.target;
        if (name === "phone" && !/^\d*$/.test(value)) return;
        setData(prev => ({...prev, [name]:value}));
    };

    const send_email = async (e) => {
        e.preventDefault();
        if (!data.name || !data.phone || !data.email || loading) return;
        setLoading(true);
        
        const req = await request("/customer/verify-email", {method:"POST", body:JSON.stringify(data)});
        const res = !req.error && await req.json();
        if (req.error || !req.ok) setMsg({msg:req.error||res.msg, type:"error"});
        else setCode({code:String(res.code), user_code:""});

        setLoading(false);
        setTimeLeft(20); // TIMER
    };

    const check_code = (e) => {
        const {value} = e.target;
        if (!/^\d*$/.test(value)) return;
        setCode(prev => ({...prev, user_code:value}));
    };
    
    return (
        <motion.div 
            initial={{scale:0}}
            animate={{scale:1}}
            exit={{scale:0}}
            transition={{duration:.5}}
            className="fixed bg-black/20 inset-0 backdrop-blur-sm flex items-center justify-center z-10000"
        >
            {loading ? <Loading /> : (
                <form onSubmit={send_email} className="bg-gray-900 w-full md:w-1/2 py-5 p-2 rounded-2xl border border-white border-dashed flex flex-col items-center gap-5 text-white">
                    <h1 className="text-2xl">Tell us about your self</h1>
                    <div className="flex items-center gap-5">
                        <h1 className="font-bold">Name:</h1>
                        <input 
                            type="text" 
                            maxLength={50}
                            required
                            className="bg-black p-2 rounded-3xl border border-white text-white text-center focus:border-green-400 outline-none"
                            name="name"
                            value={data.name}
                            onChange={handle_input}
                            placeholder="Anaf..."
                        />
                    </div>
                    <div className="flex items-center gap-5">
                        <h1 className="font-bold">Phone number:</h1>
                        <input 
                            type="text" 
                            maxLength={10}
                            required
                            className="bg-black p-2 rounded-3xl border border-white text-white text-center focus:border-green-400 outline-none"
                            name="phone"
                            value={data.phone}
                            onChange={handle_input}
                            inputMode="numeric"
                            placeholder="0900123456"
                        />
                    </div>
                    <div className="flex items-center gap-5">
                        <h1 className="font-bold">G-mail:</h1>
                        <input 
                            type="email" 
                            maxLength={50}
                            required
                            className="bg-black p-2 rounded-3xl border border-white text-white text-center focus:border-green-400 outline-none"
                            name="email"
                            value={data.email}
                            onChange={handle_input}
                            placeholder="anaf.coder@gmail.com"
                        />
                    </div>
                    <small className="text-yellow-600">*We will send a verification code to this gmail.</small>
                    <div className={`items-center gap-5 ${code.code?'flex':'hidden'}`}>
                        <h1 className="font-bold">Code:</h1>
                        <input 
                            type="text" 
                            maxLength={4}
                            className="bg-black p-2 rounded-3xl border border-white text-white text-center focus:border-green-400 outline-none"
                            name="code_user"
                            value={code.user_code}
                            onChange={check_code}
                            inputMode="numeric"
                            placeholder="1234"
                        />
                    </div>
                    <small className={`text-yellow-600 ${code.code?'block':'hidden'}`}>*Input the code we sent to you</small>
                    <div className="flex items-center gap-10">
                        <button type="button" className="bg-gray-400 p-2 rounded-2xl cursor-pointer flex items-center gap-2" onClick={() => {setOnVerify(false);setData({name:"", phone:"", email:""}); setCode({code:"", user_code:"", code_msg:"Input the code we sent to you."})}}>
                            <IoMdArrowRoundBack /> Back to Cart
                        </button>
                        <button type="submit" className={`bg-green-${timeLeft?'600':'400'} text-black p-2 rounded-2xl cursor-pointer flex items-center gap-2`} disabled={timeLeft?true:false}>
                            <MdMarkEmailUnread /> Send Code {timeLeft?timeLeft:""}
                        </button>
                    </div>
                    <AnimatePresence mode="wait">
                        { msg &&
                            <Popup msg={msg.msg} type={msg.type ? msg.type : "success"} setMsg={setMsg}/>
                        }
                    </AnimatePresence>
                </form>
            )}
        </motion.div>
    )
};