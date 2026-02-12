import Header from "../../components/customer/Header";
import { FaLocationDot } from "react-icons/fa6";
import { FaClock, FaFacebook, FaPhoneAlt, FaTelegram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FiInstagram } from "react-icons/fi";
import { AiFillTikTok } from "react-icons/ai";
import {motion} from "framer-motion";
import {useState} from "react";

export default function Contact() {

  const [data, setData] = useState({
    name: "",
    email: "",
    subject: "",
    comment: ""
  });

  const handle_change = (e) => {
    const {name, value} = e.target;
    setData(prev => ({...prev, [name]:value}));
  };
    
    return (
        <div className="min-h-screen selection:bg-green-400 selection:text-black pb-5 px-2" style={{overflowX:"hidden"}}>
          <Header />
          <motion.h1 initial={{opacity:0, y:-50}} animate={{opacity:1, y:0}} transition={{duration:1.5}} className="text-center text-white text-3xl mb-4">Contact Us</motion.h1>
          <div className="w-full p-2 pb-10 md:pb-2 bg-black/50 backdrop-blur-sm rounded-3xl flex flex-col md:flex-row items-center gap-2">
            <div className="w-full md:w-1/2 h-full border-b pb-5 md:pb-0 md:border-b-transparent md:border-r border-white flex flex-col items-start gap-8 pl-3">
              <motion.div initial={{opacity:0, x:-50}} animate={{opacity:1, x:0}} transition={{duration:1.5, delay:.5}} className="flex items-center text-gray-400 mt-5 w-1/2 md:w-1/4">
                <div className="flex-grow border-b border-white mx-2" />
                <h1>Keep Close</h1>
              </motion.div>
              <motion.h1 initial={{opacity:0, x:-50}} animate={{opacity:1, x:0}} transition={{duration:1.5, delay:1}} className="text-white text-3xl font-bold">Get In Touch</motion.h1>
              <motion.h1 initial={{opacity:0, x:-50}} animate={{opacity:1, x:0}} transition={{duration:1.5, delay:1.3}} className="text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit exercitationem consectetur perspiciatis adipisci nam qui animi, 
                  optio quidem iusto ex autem excepturi aspernatur aperiam commodi itaque, repellendus reiciendis saepe magni!
              </motion.h1>
              <motion.div initial={{opacity:0, x:-50}} animate={{opacity:1, x:0}} transition={{duration:1.5, delay:1.5}} className="flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-30 w-full text-white text-xl">
                <h1 className="flex items-center gap-3">
                    <FaLocationDot /> Ethiopia, Addis Ababa
                </h1>
                <h1 className="flex items-center gap-3">
                      <FaPhoneAlt /> +2519-9492-4132
                  </h1>
              </motion.div>
              <motion.div initial={{opacity:0, x:-50}} animate={{opacity:1, x:0}} transition={{duration:1.5, delay:2}} className="flex flex-col md:flex-row items-start md:items-center gap-10 justify-between pr-10 w-full text-white text-xl">
                <h1 className="flex items-center gap-3">
                      <MdEmail /> anaf.coder@gmail.com
                  </h1>
                <h1 className="flex items-center gap-3">
                    <FaClock /> Mon-Sun: 12:00AM-10:00PM
                </h1>
              </motion.div>
              <motion.div initial={{scale:0, opacity:0}} animate={{opacity:1, scale:1}} transition={{duration:1.5, delay:2.3}} className="md:border-b border-white w-100 self-center"/>
              <motion.h1 initial={{opacity:0, x:-50}} animate={{opacity:1, x:0}} transition={{duration:1.5, delay:2.5}} className="text-white font-bold">Follow Us</motion.h1>
              <div className="flex items-center gap-5">
                <motion.div initial={{opacity:0, scale:0}} animate={{opacity:1, scale:1}} transition={{duration:1.5, delay:3}}>
                  <FiInstagram
                      className="text-white size-5 cursor-pointer"
                      onClick={() => window.open("https://www.instagram.com/anafthecoder/")}
                  />
                </motion.div>
                <motion.div initial={{opacity:0, scale:0}} animate={{opacity:1, scale:1}} transition={{duration:1.5, delay:3.5}}>
                  <FaFacebook
                      className="text-white size-5 cursor-pointer"
                      onClick={() => window.open("https://www.google.com")}
                  />
                </motion.div>
                <motion.div initial={{opacity:0, scale:0}} animate={{opacity:1, scale:1}} transition={{duration:1.5, delay:4}}>
                  <AiFillTikTok
                      className="text-white size-5 cursor-pointer"
                      onClick={() => window.open("https://www.google.com")}
                  />
                </motion.div>
                <motion.div initial={{opacity:0, scale:0}} animate={{opacity:1, scale:1}} transition={{duration:1.5, delay:4.5}}>
                  <FaTelegram
                      className="text-white size-5 cursor-pointer"
                      onClick={() => window.open("https://www.google.com")}
                  />
                </motion.div>
              </div>
            </div>
            <motion.form initial={{opacity:0, x:50}} animate={{opacity:1, x:0}} transition={{duration:1.5, delay:5}} className="w-full md:w-1/2 h-full flex flex-col items-start gap-8 pl-2">
              <h1 className="text-white text-2xl font-bold mt-5">Your Details <br /> <small className="text-sm font-normal">Let us know how to get back to you.</small></h1>
              <div className="flex flex-col md:flex-row md:items-center gap-10 w-full">
                <div className="text-white font-bold">
                  <h1><span className="text-red-500">*</span>Name</h1>
                  <input 
                    type="text" 
                    name="name" 
                    className="bg-black p-2 rounded-3xl mt-3 outline-none border border-white w-full"
                    placeholder="Name"
                    maxLength={50}
                    required
                    value={data.name}
                    onChange={handle_change}
                  />
                </div>
                <div className="text-white font-bold">
                  <h1><span className="text-red-500">*</span>G-mail</h1>
                  <input 
                    type="email" 
                    name="email" 
                    className="bg-black p-2 rounded-3xl mt-3 outline-none border border-white w-full"
                    placeholder="Gmail"
                    maxLength={50}
                    required
                    value={data.email}
                    onChange={handle_change}
                  />
                </div>
              </div>
              <div className="text-white font-bold w-full">
                <h1><small className="text-red-500">*</small>Subject</h1>
                <input 
                  type="text" 
                  name="subject" 
                  className="bg-black p-2 rounded-3xl mt-3 outline-none border border-white w-full"
                  placeholder="Subject"
                  maxLength={50}
                  required
                  value={data.subject}
                  onChange={handle_change}
                />
              </div>
              <div className="text-white font-bold w-full">
                <h1><small className="text-red-500">*</small>Comment/Question</h1>
                <textarea 
                  type="textarea" 
                  name="comment" 
                  className="bg-black p-2 rounded-3xl mt-3 outline-none border border-white w-full h-35 resize-none"
                  placeholder="Comment"
                  required
                  value={data.comment}
                  onChange={handle_change}
                />
                <button type="submit" className="bg-green-400 text-black p-2 rounded-3xl mt-3 cursor-pointer">Contact Us</button>
              </div>
            </motion.form>
          </div>
        </div>
    )
};