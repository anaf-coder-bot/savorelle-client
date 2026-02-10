import { FaPen } from "react-icons/fa";

export default function ProductCard({ product, setEditProduct, setOpenEdit }) {

    const do_edit = () => {
        setEditProduct({
            name: product.name,
            description: product.description,
            price: product.price,
            img: product.img,
            category: product.category,
        });
        setOpenEdit(true);
    };

    return (
        <div className={'w-full border border-dashed border-red-400 h-100 rounded-lg flex flex-col items-center justify-between gap-4 hover:bg-gray-100'}>
            <img
                src={product.img}
                alt={product.name}
                className={'w-50'}
                draggable={false}
            />
            <h1 className={'font-bold text-xl'}>{product.name}</h1>
            <h1 className={'text-sm text-gray-400 text-center line-clamp-1'}>{product.description}</h1>
            <h1>{product.price} ETB</h1>
            <button className={'flex items-center justify-center gap-2 w-full bg-yellow-300 h-20 cursor-pointer'} onClick={do_edit}>
                <FaPen /> Edit
            </button>
        </div>
    )
};