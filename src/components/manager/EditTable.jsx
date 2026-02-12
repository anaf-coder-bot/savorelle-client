import { motion } from "framer-motion";
import { useApi } from "../../../functions/api/api";
import { useState } from "react";
import Loading2 from "../Loading2";

export default function EditTable ({ table, setOpenEdit, setMsg, get_table, waiters }) {

    const { request } = useApi();

    const [data, setData] = useState({
        id: table.id,
        table_no: table.table_no,
        waiter_id: table.waiter_id || "",
    });
    const [loading, setLoading] = useState(false);

    const handle_change = (e) => {
        const {name, value} = e.target;
        setData(prev => ({...prev, [name]:value}));
    };

    const submit_form = async (e) => {
        e.preventDefault();

        if (!data.table_no || !data.waiter_id || loading || ( table.id && !data.id)) return;
        setLoading(true);

        let req;
        if (!table.id)
            req = await handle_add();
        else
            req = await handle_edit();

        const res = !req.error && await req.json();

        if (req.error || !req.ok) setMsg({msg: req.error || res.msg, type:"error"});
        else {
            setMsg({msg: res.msg});
            setOpenEdit(false);
            get_table();
        };
        setLoading(false);
    };

    const handle_add = async () => await request("/manager/add-table", {method: "POST", body:JSON.stringify(data)});
    
    const handle_edit = async () => await request("/manager/edit-table", {method: "POST", body:JSON.stringify(data)});

    const handle_delete = async () => {
        if (!table.id || loading) return;
        setLoading(true);
        const req = await request("/manager/delete-table", {method:"POST", body:JSON.stringify(data)});
        const res = !req.error && await req.json();

        if (req.error || !req.ok) setMsg({msg:req.error||res.msg, type:"error"});
        else {
            setMsg({msg:res.msg});
            setOpenEdit(false);
            get_table();
        };
        setLoading(false);
    };

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
                        <h1 className={'text-lg'}>{table.id ? "Edit Table" : "Add Table"}</h1>
                        <div className={'flex flex-col items-start md:items-end gap-5 md:pr-60 mt-5'}>
                            <div className={'flex flex-col md:flex-row w-full md:w-auto items-center gap-5'}>
                                <h1>Table number</h1>
                                <input
                                    type="text"
                                    className={'border-red-400 border-2 text-center outline-none w-50'}
                                    placeholder={'Table no...'}
                                    name={'table_no'}
                                    value={data.table_no}
                                    onChange={handle_change}
                                    required
                                    maxLength={50}
                                />
                            </div>
                            <div className={'flex flex-col md:flex-row w-full md:w-auto items-center gap-5'}>
                                <h1>Table's waiter</h1>
                                <select name="waiter_id" onChange={handle_change} value={data.waiter_id} required className={'border-red-400 border-2 text-center outline-none w-50'}>
                                    <option value="">Select Waiter</option>
                                    {
                                        waiters.map(w => 
                                            <option key={w.id} value={w.id}>{w.username}</option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                         <button type={'submit'} className={'bg-green-400 p-2 rounded-lg text-white cursor-pointer mt-3'}>
                            Submit
                        </button>
                        { table.id && 
                            <button type={'button'} onClick={handle_delete} className={'bg-red-400 p-2 ml-5 rounded-lg text-white cursor-pointer mt-3'}>
                                Delete
                            </button>
                        }
                    </form>
                )}
            </div>
       </motion.div>
    )
};