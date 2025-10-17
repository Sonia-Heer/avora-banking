const HeaderBox = ({
  type = "title",
  title,
  subtext,
  user,
}: HeaderBoxProps) => {
  return (
    <div className="header-box border-b border-gray-400 py-7">
      <div className="header-box-title flex leading-2 ">
        <h2 className="capitalize text-[20px]">
          {title}
          {type === "greeting" && user ? `, ${user}` : ""}
        </h2>
      </div>
      <p className="header-box-subtext text-[15px]">{subtext}</p>
    </div>
  );
};

export default HeaderBox;
