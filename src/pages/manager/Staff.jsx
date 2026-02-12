import { useEffect, useState } from "react";
import { useApi } from "../../../functions/api/api";
import Sidebar from "../../components/manager/Sidebar";
import Loading2 from "../../components/Loading2";
import { FaPlus } from "react-icons/fa6";
import StaffCard from "../../components/manager/StaffCard";
import { AnimatePresence } from "framer-motion";
import EditStaff from "../../components/manager/EditStaff";
import Popup from "../../components/Popup";


export default function Staff() {

    const { request } = useApi();
    const [staff, setStaff] = useState(null);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState(null);
    const [editStaff, setEditStaff] = useState({
        id: "",
        usename: "",
        email: "",
        role: "",
    });
    const [openEdit, setOpenEdit] = useState(false);

    useEffect(() => {
        get_staff();
    }, []);


    useEffect(() => {
        if (openEdit)
            document.body.classList.add("overflow-hidden");
        else
            document.body.classList.remove("overflow-hidden");

        return () => document.body.classList.remove("overflow-hidden");
    }, [openEdit])
    useEffect(() => {
        if (openEdit)
            document.body.classList.add("overflow-hidden");
        else document.body.classList.remove("overflow-hidden");

        return () => document.body.classList.remove("overflow-hidden");
    }, [openEdit]);

    const get_staff = async () => {
        if (loading===true) return;
        setLoading(true);
        const req = await request("/manager/get-staff");
        const res = !req.error && await req.json();
        if (req.error || !req.ok) setMsg({msg:req.error || res.msg, type:"error"});
        else setStaff(res.staff);
        setLoading(false);
    };

    return (
        <div className={'bg-white min-h-screen pb-10'}>
            <Sidebar />
            <div className="p-5">
                <h1 className="font-bold text-2xl mb-5">Staff Details</h1>
                {loading ? <div className={'flex items-center justify-center h-[calc(100vh-10rem)]'}><Loading2 /></div> : (
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                            <div
                                className={'w-full border border-dashed border-red-400 h-70 md:h-100 rounded-lg flex flex-col items-center justify-center gap-5 cursor-pointer'}
                                onClick={() => {
                                    setEditStaff({
                                        id: "",
                                        username: "",
                                        email: "",
                                        role: ""
                                    });
                                    setOpenEdit(true);
                                }}
                            >
                                <FaPlus className={'size-8'}/>
                                <h1 className={'text-sm'}>Add new Staff</h1>
                            </div>
                            {
                                staff && staff.map(s => 
                                    <StaffCard key={s.id} staff={s} setEditStaff={setEditStaff} setOpenEdit={setOpenEdit} />
                                )
                            }
                        </div>
                        <AnimatePresence>
                            {
                                openEdit &&
                                    <EditStaff staff={editStaff} setOpenEdit={setOpenEdit} setMsg={setMsg} get_staff={get_staff}/>
                            }
                        </AnimatePresence>
                        <AnimatePresence>
                            {
                                msg &&
                                    <Popup msg={msg.msg} type={msg.type ? msg.type : 'success'} setMsg={setMsg}/>
                            }
                        </AnimatePresence>
                    </div>
                )}
            </div>

        </div>
    );
};