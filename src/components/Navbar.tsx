import Toggle from "./Toggle";

type NavbarProps = {
  setDarkMode: any;
  darkMode: boolean;
};

const Navbar = ({ setDarkMode, darkMode }: NavbarProps) => {
  return (
    <div className="w-full py-4 bg-pale-purple dark:bg-slate-800 flex flex-row items-center transition-colors">
      <img
        className="pl-4 w-16"
        src="smolwafflenotext.svg"
        alt="Smolwaffle logo"
      />
      <p className="text-lg font-extralight pl-4 sm:block dark:text-pale-red">
        Smolwaffle
      </p>
      <div className="ml-auto mr-6">
        <Toggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </div>
  );
};

export default Navbar;
