const HeaderBox = ({
  type = "title",
  title,
  subtext,
  user,
}: HeaderBoxProps) => {
  return (
    <header className="flex items-center justify-between h-[20%] bg-black md:rounded-tl-4xl px-6">
      <div className="font-semibold">
        <h2 className="capitalize text-[30px]">
          {title}
          {type === "greeting" && user ? `, ${user}` : ""}
        </h2>
      </div>
      <p className="header-box-subtext text-[15px]">{subtext}</p>
    </header>
  );
};

export default HeaderBox;
