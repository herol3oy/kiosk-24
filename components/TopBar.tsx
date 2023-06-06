const NAVIGATION_BUTTONS = ["About", "Github"];

const TopBar = () => {
  return (
    <nav className="flex justify-between align-items-center">
      <h1 className="font-black text-5xl">KIOSK 24</h1>
      <div className="flex gap-5">
        {NAVIGATION_BUTTONS.map((item) => (
          <h3
            className="bg-slate-300 p-3 rounded hover:bg-slate-600 hover:text-slate-100 cursor-pointer"
            key={item}
          >
            {item}
          </h3>
        ))}
      </div>
    </nav>
  );
};

export default TopBar;
