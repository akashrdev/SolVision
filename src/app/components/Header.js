import LoginButton from './LoginButton';

const Header = () => {
  return (
    <div className=" w-screen border-b border-white flex flex-row">
      <div className="flex flex-row space-x-2 ml-5">
        <img src="icons8-zoom-region-mode-96.png" />
        <h1 className="text-4xl text-purple-900 font-extrabold mt-8">
          SolVision
        </h1>
      </div>
      <div className="flex-grow flex justify-end items-center mr-5">
        <LoginButton />
      </div>
    </div>
  );
};

export default Header;
