import profilePic from "../assets/profilePic.jpeg";
import { HERO_CONTENT } from "../constants";

const Hero = () => {
  return (
    <div className="pb-4 lg:mb-36">
      <div className="flex flex-wrap lg:flex-row-reverse">
        <div className="w-full lg:w-1/2">
          <div className="flex justify-center lg:p-8">
            <img
              src={profilePic}
              alt="Matias Perez Nauto"
              className="border border-stone-950 rounded-3xl"
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col items-center lg:items-start mt-10">
            <h2 className="pb-2 text-4xl tracking-tighter lg:text-8xl">
              Matías Pérez Nauto
            </h2>
            <span className="bg-gradient-to-r from-stone-300 to-stone-600 bg-clip-text text-3xl tracking-tight text-transparent">
              Developer, Music, Visual
            </span>
            <p className="my-2 max-w-lg py-6 text-xl leading-relaxed tracking-tighter">
              {HERO_CONTENT}
            </p>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="bg-white rounded-full p-4 text-sm text-stone-800"
            >
              Descargar CV
            </a>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
