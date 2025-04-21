import { BiLogoPostgresql } from "react-icons/bi"
import { DiPython, DiRedis } from "react-icons/di"
import { FaNodeJs } from "react-icons/fa"
import { RiReactjsLine } from "react-icons/ri"
import { SiMongodb } from "react-icons/si"
import { TbBrandNextjs } from "react-icons/tb"


const Technologies = () => {
  return (
    <div className="pb-24">
      <h2 className="my-20 text-center text-4xl">Tecnologias</h2>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <div>
            <RiReactjsLine className="text-7xl text-cyan-400"></RiReactjsLine>
        </div>
        <div className="p-4">
            <TbBrandNextjs className="text-7xl"></TbBrandNextjs>
        </div>
        <div className="p-4">
            <SiMongodb className="text-7xl text-cyan-400"></SiMongodb>
        </div>
        <div className="p-4">
            <FaNodeJs className="text-7xl text-green-500"></FaNodeJs>
        </div>
        <div className="p-4">
            <BiLogoPostgresql className="text-7xl text-sky-700"></BiLogoPostgresql>
        </div>
        <div className="p-4">
            <DiPython className="text-7xl text-green-500"></DiPython>
        </div>
      </div>
    </div>
  )
}

export default Technologies
