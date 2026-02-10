import Header from "../../components/customer/Header";
import Footer from "../../components/customer/Footer";
import InfinityMenu from "../../components/customer/InfiniteMenu";

export default function Gallery() {

    const items = [
        {
            image: "/base/chef-2.png",
            title: "Chef",
            description: "Best of all."
        },
        {
            image: "/base/chef-1.png",
            title: "Waiter",
            description: "Best of all."
        },
        {
            image: "/base/chef-3.png",
            title: "Chef",
            description: "Best of all."
        },
        {
            image: "/base/chef-4.png",
            title: "Waiter",
            description: "Best of all."
        },
    ];
    
    return (
        <div className="min-h-screen bg-black selection:bg-green-400 selection:text-black pb-2 px-2 text-white" style={{overflowX:"hidden"}}>
            <Header />
            <h1 className="text-white text-7xl text-center">Gallery</h1>
            <h1 className="text-white text-2xl text-center">Try to drag the album</h1>
            <div style={{ height: '600px', position: 'relative' }}>
                <InfinityMenu items={items} scale={1}/>
            </div>
            <Footer />
        </div>
    )
};