import { motion } from "framer-motion"
import { useApi } from "../../../functions/api/api"
import { useState } from "react";
import Loading2 from "../Loading2";

export default function EditStaff({ staff, setOpenEdit, setMsg, get_staff }) {
    
    const { request } = useApi();

    const [data, setData] = useState({
        name: "",
        id: staff.id,
        email: staff.email,
    });

    const [loading, setLoading] = useState(false);

    const handle_change = (e) => {
        const {name, value} = e.target;
        setData(prev => ({...prev, [name]:value}));
    };

    const submit_form = async (e) => {
        e.preventDefault();

        if (!data.email || loading || ( staff.id && !data.id) || ( !staff.id && !data.name)) return;
        setLoading(true);

        let req;
        if (!staff.id)
            req = await handle_add();
        else
            req = await handle_edit();
        
        const res = !req.error && await req.json();
        console.log(res);
        if (req.error || !req.ok) setMsg({msg:req.error||res.msg, type:"error"});
        else {
            setMsg({msg:res.msg});
            setOpenEdit(false);
            get_staff();
        };
        setLoading(false);
    };

    const handle_add = async () => await request("/manager/add-staff", {method: "POST", body:JSON.stringify(data)});

    const handle_edit = async () => await request("", {method: "POST", body:JSON.stringify(data)});

    return (
        <motion.div
           initial={{scale:0}}
           animate={{scale:1}}
           exit={{scale:0}}
           transition={{duration:.5}}
           className={'fixed inset-0 bg-black/40 backdrop-blur-sm z-10000 flex justify-center items-center'}
       >
            <div className={`bg-white p-3 rounded-lg w-full md:w-1/2 overflow-y-auto pb-5 ${loading ? 'flex items-center justify-center' :''}`} style={{scrollbarWidth:'thin'}}>
                {loading ? <Loading2 /> : (
                    <form onSubmit={submit_form}>
                        <div className={'text-end pr-3'}>
                            <h1 className={'font-bold text-lg cursor-pointer inline'} onClick={() => setOpenEdit(false)}>X</h1>
                        </div>
                        <h1 className={'text-lg'}>{staff.id ? `Edit Staff: ${staff.username}` : "Add Staff"}</h1>
                        <div className={'flex flex-col items-start md:items-end gap-5 md:pr-60 mt-5'}>
                            <div className={'flex flex-col md:flex-row w-full md:w-auto items-center gap-5'}>
                                {
                                    !staff.id && (
                                        <>
                                            <h1>Name</h1>
                                            <input
                                                type="text"
                                                className={'border-red-400 border-2 text-center outline-none w-50'}
                                                placeholder={'Name...'}
                                                name={'name'}
                                                value={data.name}
                                                onChange={handle_change}
                                                required
                                                maxLength={45}
                                            />
                                        </>
                                    )
                                }
                            </div>
                            <div className={'flex flex-col md:flex-row w-full md:w-auto items-center gap-5'}>
                                <h1>Email</h1>
                                <input
                                    type="email"
                                    className={'border-red-400 border-2 text-center outline-none w-50'}
                                    placeholder={'Email...'}
                                    name={'email'}
                                    value={data.email}
                                    onChange={handle_change}
                                    required
                                    maxLength={100}
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