import { BiLogoPostgresql } from "react-icons/bi";
import { DiPython, DiRedis } from "react-icons/di";
import { FaNodeJs } from "react-icons/fa";
import { RiReactjsLine } from "react-icons/ri";
import { SiMongodb } from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import { motion } from "framer-motion";

const iconVariants = (duration) => ({
  initial: { y: -10 },
  animate: {
    y: [10, -10],
    transition: {
      duration: duration,
      ease: "linear",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
});

const Technologies = () => {
  return (
    <div className="pb-24 text-stone-200">
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 1.5 }}
        className="my-20 text-center text-4xl text-stone-200"
      >
        Tecnologias
      </motion.h2>
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 1.5 }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <motion.div
          initial="initial"
          animate="animate"
          variants={iconVariants(2.5)}
        >
          <RiReactjsLine className="text-7xl text-cyan-400"></RiReactjsLine>
        </motion.div>
        <motion.div
          className="p-4"
          initial="initial"
          animate="animate"
          variants={iconVariants(3)}
        >
          <TbBrandNextjs className="text-7xl"></TbBrandNextjs>
        </motion.div>
        <motion.div
          className="p-4"
          initial="initial"
          animate="animate"
          variants={iconVariants(5)}
        >
          <SiMongodb className="text-7xl text-cyan-400"></SiMongodb>
        </motion.div>
        <motion.div
          className="p-4"
          initial="initial"
          animate="animate"
          variants={iconVariants(2)}
        >
          <FaNodeJs className="text-7xl text-green-500"></FaNodeJs>
        </motion.div>
        <motion.div
          className="p-4"
          initial="initial"
          animate="animate"
          variants={iconVariants(6)}
        >
          <BiLogoPostgresql className="text-7xl text-sky-700"></BiLogoPostgresql>
        </motion.div>
        <motion.div
          className="p-4"
          initial="initial"
          animate="animate"
          variants={iconVariants(4)}
        >
          <DiPython className="text-7xl text-green-500"></DiPython>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Technologies;
