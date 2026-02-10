import { BouncyArc } from 'ldrs/react'
import 'ldrs/react/BouncyArc.css'
import {motion} from "framer-motion";


export default function Loading() {
    return (
        <div className='flex flex-col items-center justify-start'>
            <BouncyArc
            size="150"
            speed="1.5"
            color="green" 
            />
            <div className='flex items-end gap-5 justify-center text-2xl text-green-700 font-bold'>
                <motion.h1
                    animate={{ y: [0, -22, 0, 0] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        times: [0, 0.15, 0.3, 1],
                        ease: "easeOut"
                    }}
                >
                    L
                </motion.h1>
                <h1>oadin</h1>
                <motion.h1
                    animate={{ y: [0, -22, 0, 0] }}
                    transition={{
                        duration: 1.5,
                        delay:.7,
                        repeat: Infinity,
                        times: [0, 0.15, 0.3, 1],
                        ease: "easeOut"
                    }}
                >
                    g
                </motion.h1>
            </div>
        </div>
    );
};