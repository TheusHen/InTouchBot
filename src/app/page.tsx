import { FaArrowLeft } from 'react-icons/fa';
import Particles from "./particles";

const InTouchBotPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black relative">
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <div className="text-center z-10">
        <div className="py-2 px-0.5 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text">
          InTouchBot - Beta
        </div>
        <a href='https://theushen.me'>
        <div className="flex justify-center items-center text-2xl mt-4">
          <div className="flex items-center text-lg text-gray-500 cursor-pointer mr-4">
            <FaArrowLeft className="mr-2" /> Go Back
          </div>
          In development
        </div>
        </a>
      </div>
    </div>
  );
};

export default InTouchBotPage;
