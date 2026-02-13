import {useEffect, useState} from "react";
import { IoLogIn } from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import Loading from "../../components/Loading.jsx";
import { login_user } from "../../../functions/auth/auth.api";
import { useAuth } from "../../../context/AuthContext.jsx";

export default function Login() {
    const navigate = useNavigate();
    const { accessToken, user, login } = useAuth();

    const [data, setData] = useState({
        username: "",
        password: "",
        msg: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (accessToken) {
            navigate(`/${user.role}`, { replace:true });
        };
    }, [accessToken, user]);

    const handle_change = (e) => {
        const {name, value} = e.target;
        setData(prev => ({...prev, [name]: value}));
    };

    const handle_login = async (e) => {
        e.preventDefault();
        if (!data.username || !data.password || loading) return;
        setLoading(true);
        setData(prev => ({...prev, msg:""}));
        const do_login = await login_user(data.username, data.password, login);
        if (do_login.status!==200) {
            setLoading(false);
            setData(prev => ({...prev, msg:do_login.msg}));
        };
    };

    return (
        <div className={'min-h-screen bg-[url(/base/bg-gray-1.jpg)] flex items-center justify-center'}>
            <div className={'bg-black/50 backdrop-blur-sm p-2 w-full md:w-1/2 pb-10 rounded-2xl border border-white/50'}>
                <h1 className={'text-center text-2xl text-white font-bold underline'}>Login</h1>
                <h1 className={'text-yellow-500 text-sm text-center mt-1'}>{data.msg}</h1>
                {loading ? <Loading /> : (
                    <form onSubmit={handle_login} className={'flex flex-col items-center gap-5 mt-5 w-full text-white'}>
                        <h1>Username</h1>
                        <input
                            type="text"
                            name="username"
                            className={'bg-white outline-none rounded-2xl py-1 text-center text-black w-70'}
                            placeholder={'Username...'}
                            value={data.username}
                            onChange={handle_change}
                            required
                        />
                        <h1>Password</h1>
                        <input
                            type="password"
                            name="password"
                            className={'bg-white outline-none rounded-2xl py-1 text-center text-black w-70'}
                            placeholder={'Password...'}
                            value={data.password}
                            onChange={handle_change}
                            required
                        />
                        <button className={'flex items-center justify-center gap-2 w-70 p-2 mt-5 rounded-2xl bg-blue-400 cursor-pointer'} type={'submit'}>
                            Log In <IoLogIn />
                        </button>
                        <p className={'text-blue-400 text-sm cursor-pointer select-none'} onClick={() => navigate("/reset-password")}>
                            Forget your password?
                        </p>
                    </form>
                )}
            </div>
        </div>
    )
}