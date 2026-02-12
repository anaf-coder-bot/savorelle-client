import StaggeredMenu from "../../components/manager/StaggeredMenu.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx";

const menuItems = [
    {label: 'Dashboard', ariaLabel: 'Go to Dashboard', link: '/manager'},
    {label: 'Products', ariaLabel: 'Go to Products', link: '/manager/product'},
    {label: 'Staff', ariaLabel: 'Go to Staff', link: '/manager/staff'},
    {label: 'Table', ariaLabel: 'Go to Table', link: '/manager/table'},
    {label: 'Report', ariaLabel: 'Go to Report', link: '/manager/report'},
];

export default function Sidebar() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handle_logout = () => {
        if (loading) return;
        setLoading(true);
        logout();
        return navigate("/", { replace: true });
    };

    return (
        <div className={`overflow-hidden ${isOpen ? 'fixed inset-0 h-screen bg-[#5227FF]' : 'h-20 bg-black/90 backdrop-blur-sm'}`}>

            <StaggeredMenu
                position={'right'}
                items={menuItems}
                displayItemNumbering={false}
                menuButtonColor={'#fff'}
                openMenuButtonColor={'#fff'}
                changeMenuColorOnOpen={true}
                colors={['#B19EEF', '#5227FF']}
                accentColor={'#5227FF'}
                logoUrl={'/base/burger-two.png'}
                onMenuOpen={() => setIsOpen(true)}
                onMenuClose={() => setTimeout(() => setIsOpen(false), 500)}
                socialItems={[{label:"Logout", ariaLabel: "Logout user", link:"/manager/logout"}]}
                displaySocials={true}
                handle_logout={handle_logout}
            />
        </div>
    )
};