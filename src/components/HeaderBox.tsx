const HeaderBox = ({
  type = "title",
  title,
  subtext,
  user,
}: HeaderBoxProps) => {
  return (
    <header className="flex flex-col justify-center items-center h-[40%] bg-black gap-2 pt-15">
      <div className="max-w-[1650px] w-full pt-40 px-6 md:px-20">
        <h2 className="capitalize font-semibold text-[30px]">
          {title}
          {type === "greeting" && user ? `, ${user}` : ""}
        </h2>

        <p className="header-box-subtext text-[15px]">{subtext}</p>
      </div>
    </header>
  );
};

export default HeaderBox;
