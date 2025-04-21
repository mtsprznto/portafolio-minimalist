import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa"
import logo from "../assets/logo.jpg"

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-6">
        <div className="flex flex-shrink-0 items-center">
            <a href="/" aria-label="Home" className="">
                <img src={logo} alt="logo" className="mx-2" width={50} height={50}/>
            </a>
        </div>
        <div className="m-8 flex items-center justify-center gap-4 text-2xl">
            <a href="https://www.linkedin.com/in/matiaspereznauto/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin></FaLinkedin>
            </a>
            <a href="https://github.com/lllit" target="_blank" rel="noopener noreferrer" aria-label="Github">
                <FaGithub></FaGithub>
            </a>
            <a href="https://www.instagram.com/lllit_3/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram></FaInstagram>
            </a>
            
        </div>
    </nav>
  )
}

export default Navbar
