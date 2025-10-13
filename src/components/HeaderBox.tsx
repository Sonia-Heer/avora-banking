const HeaderBox = ({
  type = "title",
  title,
  subtext,
  user,
}: HeaderBoxProps) => {
  return (
    <div className="header-box border-b border-gray-400">
      <div className="header-box-title flex">
        <h2>
          {title}
          {type === "greeting" && user ? `, ${user}` : ""}
        </h2>
      </div>
      <p className="header-box-subtext">{subtext}</p>
    </div>
  );
};

export default HeaderBox;
