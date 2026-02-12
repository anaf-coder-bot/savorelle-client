import { HiMenu, HiX } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { IoLogIn } from "react-icons/io5";

export default function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  
  return (
    <div className={`w-full text-white border-b border-white/10 md:border-none select-none ${location.pathname.startsWith("/gallery")?"bg-black":"bg-[url(/base/bg-gray-1.jpg)]"}`}>
      {/* TOP BAR */}
      <div className="flex justify-between items-center px-6 py-5 md:px-10">
        {/* LOGO */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-bold text-2xl text-green-400"
          onClick={() => navigate("/")}
        >
          Savorelle
        </motion.h1>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-10">
          {["Home", "Menus", "Reserve Teble", "Gallery", "Contact"].map(
            (item, i) => {
              const new_ = item.replace(" ", "-");
              return (
                <motion.h1
                  key={item}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
                  className="cursor-pointer hover:bg-gradient-to-r from-green-300 to-green-700 bg-clip-text hover:text-transparent hover:underline"
                  onClick={() => navigate(`/${new_.toLocaleLowerCase()}`)}
                >
                  {item}
                </motion.h1>
              )
            }
          )}
        </div>

        {/* DESKTOP BUTTON */}
        <motion.button
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className={`hidden md:flex items-center gap-2 bg-green-500 px-4 py-3 rounded-2xl hover:scale-110 transition cursor-pointer`}
          onClick={() => navigate("/login")}
        >
          Login
          <IoLogIn className="size-6 text-black hover:animate-spin" />
        </motion.button>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-3xl text-green-400"
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden flex flex-col gap-6 px-6 py-6 bg-black/80 backdrop-blur-lg"
          >
            {["Home", "Menus", "Reserve Table", "Gallery", "Contact"].map(
              (item) => {
                const new_ = item.replace(" ", "-");
                return (
                  <h1
                    key={item}
                    className="text-lg cursor-pointer hover:text-green-400"
                    onClick={() => {
                      setOpen(false);
                      navigate(`/${new_.toLocaleLowerCase()}`)
                    }}
                  >
                    {item}
                  </h1>
                )
              }
            )}

            <button
              onClick={() => {
                setOpen(false);
                navigate("/login");
              }}
              className={`flex items-center gap-2 bg-green-500 px-4 py-3 rounded-xl w-fit`}
            >
              Login
              <IoLogIn className="size-6 text-black" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
