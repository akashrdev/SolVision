import LoginButton from './LoginButton';

const Header = () => {
  return (
    <div className=" w-screen h-20 border-b border-black flex flex-row">
      <div className="flex flex-row space-x-2 ml-5">
        <img src="/SolVisionLogo.png" className="h-16 mt-2" />
      </div>
      <div className="flex-grow flex justify-end items-center mr-5">
        <LoginButton />
      </div>
    </div>
  );
};

export default Header;
