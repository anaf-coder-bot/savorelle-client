import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../components/customer/Header";
import { BiSolidRightTopArrowCircle } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { PiHamburgerDuotone } from "react-icons/pi";
import { IoMdFlame } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import CircularText from "../../components/customer/CircularText";
import { TbToolsKitchen2 } from "react-icons/tb";
import { FaMobile } from "react-icons/fa";
import { BsTable } from "react-icons/bs";
import { GiChefToque } from "react-icons/gi";
import { FaClock } from "react-icons/fa";
import { FaChair } from "react-icons/fa";
import TextType from "../../components/customer/TextInput";
import { MdArrowDropDownCircle } from "react-icons/md";
import ScrollTriggered from "../../components/customer/ScrollTriggered";
import Footer from "../../components/customer/Footer";
import ShinyText from "../../components/customer/ShinyText";
import { useEffect, useState } from "react";
import { useApi } from "../../../functions/api/api";
import Popup from "../../components/Popup";
import Cookies from "js-cookie";

export default function Home() {
  const { request } = useApi();
  const navigate = useNavigate();
  const [param, setParam] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const table_id = param.get("table-id");
  useEffect(() => {
    if (table_id) get_table();
  }, []);

  const get_table = async () => {
    if (loading) return;
    setLoading(true);
    const req = await request(`/customer/get-table/${table_id}`);
    const res = !req.error && await req.json();
    if (req.error||!req.ok) setMsg({msg:req.error||res.msg, error:"error"});
    else {
      setMsg({msg:`Table ${res.table[0].table_no} selected.`});
      Cookies.set("table", JSON.stringify(res.table[0]), { expires: new Date(Date.now() + 2 * 60 * 60 * 1000) });
    };
    param.delete("table-id");
    setParam(param, { replace:true });
  };

  return (
    <div
      className="min-h-screen bg-black selection:bg-green-400 selection:text-black pb-2"
      style={{ overflowX: "hidden" }}
    >
      <Header />
      {/* Hero */}
      <div className="relative flex items-center flex-col md:flex-row md:items-center md:justify-between bg-[url(/base/bg-gray-1.jpg)] pb-40 md:pb-60">
        <div className="flex flex-col items-center justify-start md:items-start p-4 md:w-1/2 gap-8 mb-20 md:mb-0">
          <motion.h1
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="text-white text-4xl text-center md:text-start md:text-8xl"
          >
            Savor Every <br /> Moment with <br />{" "}
            <ShinyText 
              text={"Every Bite"}
              speed={2}
              delay={0}
              color="#22c55e"
              shineColor="#ffff"
              spread={120}
              direction="left"
              yoyo={true}
              pauseOnHover={false}
              disabled={false}

            />
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="text-gray-400 text-center md:text-start"
          >
            Experience gourmet dining crafted with passion, fresh ingredients,
            and unforgettable flavours.
          </motion.h1>
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.5, delay: 1.5 }}
            className="flex items-center text-2xl gap-3 bg-green-500 p-3 text-white rounded-3xl cursor-pointer"
            onClick={() => navigate("/menus")}
          >
            <ShinyText
                text={"Order Now"}
                speed={2}
                delay={0}
                color="#000"
                shineColor="#ffff"
                spread={120}
                direction="left"
                yoyo={false}
                pauseOnHover={false}
                disabled={false}
            />
            <BiSolidRightTopArrowCircle className="text-black size-8" />
          </motion.button>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 3, delay: 1.5 }}
          className="relative md:flex-1 flex justify-center items-start md:justify-end w-full z-100 select-none"
        >
          <motion.img
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            whileHover={{ rotate: 360 }}
            src="/base/pizza-0.png"
            alt="burger"
            draggable={false}
            className="w-60 md:w-130 md:mr-30 rounded-full drop-shadow-2xl drop-shadow-[0_5px_20px_rgba(255,165,0,.5)]"
          />
          <CircularText text={"PIZZA"} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50, x: -50 }}
          whileInView={{ opacity: 1, y: 0, x: 0 }}
          viewport={{ once: 1, amount: 0.5 }}
          transition={{ duration: 1.5, delay: 1.7 }}
          className="md:absolute md:left-1/2 md:-translate-x-1/3 md:bottom-42 bg-gray-200/10 backdrop-blur-sm flex flex-col items-start justify-start text-white p-3 rounded-xl"
        >
          <div className="flex items-center justify-start gap-3">
            <FaStar className="size-5" />
            <div className="flex flex-col items-start justify-center">
              <h1 className="text-xl">Special Events</h1>
              <h1 className="text-sm">
                Let us bring luxury to your special event
              </h1>
            </div>
          </div>
          <div className="flex items-center justify-start gap-3">
            <PiHamburgerDuotone className="size-5" />
            <div className="flex flex-col items-start justify-center">
              <h1 className="text-xl">Chef's Experience</h1>
              <h1 className="text-sm">
                Enjoy a front-row seat to culinary excellence
              </h1>
            </div>
          </div>
          <div className="flex items-center justify-start gap-3">
            <IoMdFlame className="size-5" />
            <div className="flex flex-col items-start justify-center">
              <h1 className="text-xl">Teriyaki Wings</h1>
              <h1 className="text-sm">
                Crispy, saucy wings with a hint of sesame
              </h1>
            </div>
          </div>
        </motion.div>
        <MdArrowDropDownCircle className="absolute hidden md:block bottom-30 left-1/2 -translate-x-1/2 size-10 text-green-400" />
      </div>
      {/* Features */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center text-white pl-5 my-8">
        <div className="flex flex-col items-start gap-8 justify-between md:w-1/2">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-5xl md:text-8xl text-center md:text-start"
          >
            Serving You Better
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 1.5 }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-gray-400 text-center md:text-start"
          >
            We offer more than great food. From online orders to world-class
            chefs, we ensure every part of your experience is exceptions.
          </motion.h1>
          <div className="grid grid-cols-2 w-full gap-10 md:gap-5">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 1.5 }}
              viewport={{ once: true, amount: 0.5 }}
              className="flex gap-3 items-center"
            >
              <FaMobile className="bg-green-400 size-11 p-2 text-black rounded-full" />
              <h1 className="text-gray-200">Online Order</h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 2 }}
              viewport={{ once: true, amount: 0.5 }}
              className="flex gap-3 items-center"
            >
              <TbToolsKitchen2 className="bg-green-400 size-11 p-1 text-black rounded-full" />
              <h1 className="text-gray-200">Spotless Kitchen</h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 2.5 }}
              viewport={{ once: true, amount: 0.5 }}
              className="flex gap-3 items-center"
            >
              <BsTable className="bg-green-400 size-11 p-2 text-black rounded-full" />
              <h1 className="text-gray-200">Table Reservation</h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 3 }}
              viewport={{ once: true, amount: 0.5 }}
              className="flex gap-3 items-center"
            >
              <GiChefToque className="bg-green-400 size-11 p-1 text-black rounded-full" />
              <h1 className="text-gray-200">Best Chef</h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 3.1 }}
              viewport={{ once: true, amount: 0.5 }}
              className="flex gap-3 items-center"
            >
              <FaClock className="bg-green-400 size-11 p-2 text-black rounded-full" />
              <h1 className="text-gray-200">Flexable</h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 3.2 }}
              viewport={{ once: true, amount: 0.5 }}
              className="flex gap-3 items-center"
            >
              <FaChair className="bg-green-400 size-11 p-1 text-black rounded-full" />
              <h1 className="text-gray-200">Organized Space</h1>
            </motion.div>
          </div>
          <motion.button
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.5, delay: 3.5 }}
            className="bg-green-500 p-2 rounded-2xl flex gap-2 items-center cursor-pointer text-black"
            onClick={() => navigate("/reserve-table")}
          >
            Book a Table{" "}
            <BiSolidRightTopArrowCircle className="size-5 text-black" />
          </motion.button>
        </div>
        <div className="relative flex items-center justify-center md:w-1/2 overflow-hidden md:p-5 select-none">
          <motion.img
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1.5 }}
            viewport={{ once: true, amount: 0.5 }}
            src="base/waiter.png"
            alt="waiter"
            className="w-70 md:w-100 bg-[url(/base/bg-gray-1.jpg)] rounded-2xl mt-20 drop-shadow-2xl drop-shadow-[0_5px_10px_rgba(255,255,255,.4)] mb-5"
            draggable={false}
          />
          <motion.img
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 3 }}
            viewport={{ once: true, amount: 0.5 }}
            src="base/burger-two.png"
            alt="burger"
            className="absolute w-30 md:w-55 top-10 left-5 md:-top-4 md:left-25 rounded-2xl"
            draggable={false}
          />
        </div>
      </div>
      {/* Cheat chat */}
      <div className="flex flex-col gap-20 md:gap-0 md:flex-row justify-start items-start border-t border-gray-400/40 pt-6 md:border-none">
        <div className="relative w-full md:w-1/2 flex justify-center md:block">
          <img
            src="base/chicken-one.png"
            alt="chicken"
            className="w-70 md:w-100 md:ml-25 mt-20 bg-[url(/base/bg-gray-1.jpg)] rounded-4xl select-none drop-shadow-2xl drop-shadow-[0_5px_10px_rgba(255,255,255,.4)]"
            draggable={false}
          />
          <motion.img
            initial={{ y: 350, rotate: -360 }}
            whileInView={{ y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 1 }}
            src="base/chicken-2.png"
            alt="chicken"
            className="absolute w-25 md:w-40 top-5 md:top-0 right-6 md:right-45 bg-[url(/base/bg-gray-1.jpg)] rounded-4xl select-none drop-shadow-2xl drop-shadow-[0_5px_10px_rgba(255,255,255,.4)]"
            draggable={false}
          />
          <motion.img
            initial={{ y: -350, rotate: -360 }}
            whileInView={{ y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 1 }}
            src="base/chicken-3.png"
            alt="chicken"
            className="absolute w-25 md:w-40 -bottom-5 left-5 bg-[url(/base/bg-gray-1.jpg)] rounded-4xl select-none drop-shadow-2xl drop-shadow-[0_5px_10px_rgba(255,255,255,.4)]"
            draggable={false}
          />
        </div>
        <div className="flex flex-col items-center md:items-start justify-center gap-10 md:w-1/3">
          <TextType
            text={[
              "Luxury dining starts here",
              "Where taste meets elegance",
              "Fine dining, perfected",
              "More than a meal",
              "Hospitality at its finest",
            ]}
            className="text-white text-4xl md:text-7xl font-bold text-center md:text-start h-30 md:h-60"
            cursorCharacter="_"
            typingSpeed={100}
            deletingSpeed={70}
          />
          <h1 className="text-gray-400 text-center md:text-start">
            Whether it's an intimate dinner or a grand celebration, we're here
            to make it special.
          </h1>
          <button
            className="flex items-center gap-2 bg-green-500 p-3 rounded-2xl cursor-pointer text-black"
            onClick={() => navigate("/reserve-table")}
          >
            Book a Table <BiSolidRightTopArrowCircle className="size-5" />
          </button>
        </div>
      </div>
      {/* Chefs */}
      <div>
        <div className="flex flex-col md:flex-row gap-10 items-center justify-start md:justify-between my-8 mt-25 border-t border-gray-400/30 md:border-none pt-5">
          <h1 className="text-white text-3xl md:text-5xl text-center md:text-start">
            Crafterd by <br />
            Experts
          </h1>
          <h1 className="text-gray-400 md:w-100 md:mr-10 text-center md:text-start">
            Each dish begins with vision, skill, and passion. Get to know the
            culinary artists who turn fresh ingredients into works of art.
          </h1>
        </div>
        <ScrollTriggered
          items={[
            ["base/chef-1.png", "Alex", 340, 10],
            ["base/chef-2.png", "Mike", 20, 40],
            ["base/chef-3.png", "Cebrina", 60, 90],
            ["base/chef-4.png", "Sia", 80, 120],
          ]}
        />
      </div>
      <div className="w-full bg-[url(/base/bg-2.jpg)] h-150 bg-cover bg-no-repeat flex flex-col items-start md:items-end justify-center md:pr-20 gap-10 overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-7xl text-white text-center md:text-start  drop-shadow-2xl drop-shadow-[0_10px_20px_rgba(255,255,255,.7)]"
        >
          Let Flavor <br /> Lead the Way
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="text-gray-200 text-center md:text-end drop-shadow-2xl drop-shadow-[0_10px_20px_rgba(255,255,255,1)]"
        >
          Reserve your table today and indulge in a taste that lingers.
        </motion.h1>
        <motion.button
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="bg-green-500 p-3 rounded-2xl flex items-center gap-2 self-center md:self-end"
        >
          Book a Table <BiSolidRightTopArrowCircle className="size-5" />
        </motion.button>
      </div>
      <AnimatePresence mode="wait">
          {
            msg &&
              <Popup msg={msg.msg} type={msg.type ? msg.type : "success"} setMsg={setMsg}/>
          }
      </AnimatePresence>
      <Footer />
    </div>
  );
}
