import { FaPen } from "react-icons/fa6";


export default function StaffCard({staff, setOpenEdit, setEditStaff }) {

    const do_edit = () => {
        setEditStaff({
            id: staff.id,
            username: staff.username,
            email: staff.email,
            role: staff.role,
            is_active: staff.is_active
        });
        
        setOpenEdit(true);
    };

    return (
        <div className={'w-full border border-dashed border-red-400 h-100 rounded-lg flex flex-col justify-between hover:bg-gray-100'}>
            <div className="flex flex-col gap-5 p-3">
                <h1 className="text-lg">Staff: <span className="font-bold">{staff.role}</span> </h1>
                <h1 className="text-lg">Username: <span className="font-bold">{staff.username}</span></h1>
                <h1 className="text-lg">Email: <span className="font-bold">{staff.email}</span></h1>
                <h1 className="text-lg">Joined at: <span className="font-bold">
                    {new Date(staff.created_at).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}</span>
                </h1>
                <h1 className="border-b">Tables assigned:</h1>
            </div>
            <button className={'flex items-center justify-center gap-2 w-full bg-yellow-300 h-20 cursor-pointer'} onClick={do_edit}>
                <FaPen /> Edit
            </button>
        </div>
    );
};