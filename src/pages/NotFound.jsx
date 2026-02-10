import { useNavigate } from "react-router-dom";
import TargetCursor from "../components/TargetCursor";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center h-screen text-white bg-[url(/base/bg-gray-1.jpg)]">
            <div>
                <TargetCursor 
                    spinDuration={2}
                    hideDefaultCursor
                    parallaxOn
                    hoverDuration={0.2}
                />
                <h1 className="text-yellow-400 text-4xl mb-5 cursor-target">404 NOT FOUND</h1>
                <h1 className="text-gray-400">The page, your are trying to visit is not found.</h1>
                <button className="bg-green-400 p-2 rounded-3xl text-black mt-5 text-center cursor-target" onClick={() => navigate("/")}>
                    Back to Home
                </button>
            </div>
        </div> 
    )
};