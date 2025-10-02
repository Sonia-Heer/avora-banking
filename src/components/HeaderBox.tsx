const HeaderBox = ({
  type = "title",
  title,
  subtext,
  user,
}: HeaderBoxProps) => {
  return (
    <div className="header-box">
      <div className="header-box-title">
        <h2 className="text-bank-gradient text-[18px]">{title}</h2>
        <h1>
          {type === "greeting" && <span className="text-[24px]">{user}</span>}
        </h1>
      </div>
      <p className="header-box-subtext">{subtext}</p>
    </div>
  );
};

export default HeaderBox;
