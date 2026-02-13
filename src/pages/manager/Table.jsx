import { useEffect, useState } from "react";
import { useApi } from "../../../functions/api/api";
import Sidebar from "../../components/manager/Sidebar";
import { FaPlus } from "react-icons/fa6";
import Loading2 from "../../components/Loading2";
import TableCard from "../../components/manager/TableCard";
import { AnimatePresence } from "framer-motion";
import EditTable from "../../components/manager/EditTable";
import Popup from "../../components/Popup";


export default function Table() {

    const { request } = useApi();
    const [tables, setTables] = useState(null);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState(null);
    const [editTable, setEditTable] = useState({
        id: "",
        table_no:"",
        waiter_id:""
    });
    const [openEdit, setOpenEdit] = useState(false);
    
    const [waiters, setWaiters] = useState(null);

    useEffect(() => {
        get_tables();
        const get_waiters = async () => {
            const req = await request("/manager/get-staff");
            const res = !req.error && await req.json();
            if (req.error || !req.ok) setMsg({msg: "Please re-fresh the page.", type: "error"});
            else setWaiters(res.staff);
        };
        get_waiters();
    }, []);

    useEffect(() => {
        if (openEdit)
            document.body.classList.add("overflow-hidden");
        else
            document.body.classList.remove("overflow-hidden");

        return () => document.body.classList.remove("overflow-hidden");
    }, [openEdit]);

    const get_tables = async () => {
        if (loading) return;
        setLoading(true);
        const req = await request("/customer/get-table");
        const res = !req.error && await req.json();

        if (!req.ok || req.error) setMsg({msg:res.msg||req.error, type:"error"});
        else setTables(res.tables);
        setLoading(false);
    };

    return (
        <div className={'bg-white min-h-screen pb-10'}>
            <Sidebar />
            <div className="p-5">
                <h1 className="font-bold text-2xl">Tables Details</h1>
                {loading ? <div className={'flex items-center justify-center h-[calc(100vh-10rem)]'}><Loading2 /></div> : (
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-10">
                            <div
                                className={'w-full border border-dashed border-red-400 h-70 md:h-100 rounded-lg flex flex-col items-center justify-center gap-5 cursor-pointer'}
                                onClick={() => {
                                    setEditTable({
                                        id: "",
                                        name: "",
                                        description: "",
                                        price: "",
                                        img: "",
                                        category: "",
                                    });
                                    setOpenEdit(true);
                                }}
                            >
                                <FaPlus className={'size-8'}/>
                                <h1 className={'text-sm'}>Add new Table</h1>
                            </div>
                            {
                                tables && tables.map(t => 
                                    <TableCard key={t.id} table={t} setEditTable={setEditTable} setOpenEdit={setOpenEdit}/>
                                )
                            }
                        </div>
                        <AnimatePresence>
                            {
                                openEdit && 
                                    <EditTable table={editTable} setOpenEdit={setOpenEdit} setMsg={setMsg} get_table={get_tables} waiters={waiters}/>
                            }
                        </AnimatePresence>
                        <AnimatePresence>
                            { msg &&
                                <Popup msg={msg.msg} type={msg.type ? msg.type : "success"} setMsg={setMsg}/>
                            }
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    )
};