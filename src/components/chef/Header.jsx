import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";


export default function Header() {
    const navigate = useNavigate();

    const handle_logout = () => {
        Cookies.remove("login");
        return navigate("/", {replace:true});
    };

    return (
        <div className={'w-full bg-black h-20 p-5 px-20 flex items-center justify-between'}>
            <h1 className={'text-white font-bold'}>Welcome, Chef 👋</h1>
            <h1 className={'text-red-400 select-none cursor-pointer'} onClick={handle_logout}>Logout</h1>
        </div>
    )
}