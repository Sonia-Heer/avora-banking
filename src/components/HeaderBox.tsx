const HeaderBox = ({
  type = "title",
  title,
  subtext,
  user,
}: HeaderBoxProps) => {
  return (
    <header className="flex flex-col items-center justify-center h-[30%] max-h-[260px] bg-black md:rounded-tl-4xl px-6 gap-2 pt-15">
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
