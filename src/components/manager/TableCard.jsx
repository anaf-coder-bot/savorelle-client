import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { FaD, FaPen } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa6";


export default function TableCard({ table, setEditTable, setOpenEdit }) {

    const qrRef = useRef();

    const handle_download = () => {
        const canvas = qrRef.current.querySelector('canvas');
        const qrSize = canvas.width;
        const padding = 40;

        const combinedCanvas = document.createElement('canvas');
        const ctx = combinedCanvas.getContext("2d");

        combinedCanvas.width = qrSize;
        combinedCanvas.height = qrSize + padding;

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, combinedCanvas.width, combinedCanvas.height);

        ctx.drawImage(canvas, 0, 0);

        ctx.fillStyle = "#000000";
        ctx.font = "bold 16px Arial";
        ctx.textAlign = "center";
        ctx.fillText(`Table: ${table.table_no}`, qrSize / 2, qrSize + 25);

        const pngUrl = combinedCanvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
        
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `${table.table_no}-qr.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const do_edit = () => {
        setEditTable({
            id: table.id,
            table_no: table.table_no,
            waiter_id: table.waiter_id
        });
        setOpenEdit(true);
    };

    return (
        <div className={'w-full border border-dashed border-red-400 h-100 rounded-lg flex flex-col items-center justify-between gap-5 hover:bg-gray-100'}>
            <div className="p-5">
                <h1 className="font-bold text-xl capitalize text-center">Table: {table.table_no}</h1>
                <h1 className="font-bold text-xl text-center">Waiter: {table.waiter_username}</h1>
                <div ref={qrRef}>
                    <QRCodeCanvas 
                    value={table.id} 
                    size={200} 
                    level={"H"}
                    includeMargin={true}
                    />
                </div>
            </div>
            <div className="flex w-full gap-5">
                <button className={'flex items-center justify-center gap-2 w-full bg-yellow-300 h-20 rounded-r-full cursor-pointer'} onClick={do_edit}>
                    <FaPen /> Edit
                </button>
                <button className={'flex items-center justify-center gap-2 w-full bg-blue-400 h-20 rounded-l-full cursor-pointer'} onClick={handle_download}>
                    <FaDownload /> Download QR
                </button>
            </div>
        </div>
    )
};