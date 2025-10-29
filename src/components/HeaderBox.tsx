const HeaderBox = ({
  type = "title",
  title,
  subtext,
  user,
  subtitle,
}: HeaderBoxProps & { subtitle?: string }) => {
  return (
    <header className="header-box">
      <div className="container pb-24">
        {subtitle && <p className="text-secondary-text">{subtitle}</p>}

        <h1>
          {type === "greeting" && user ? (
            <>
              {title}, <span className="font-semibold">{user}</span>
            </>
          ) : (
            title
          )}
        </h1>

        {subtext && (
          <p className="text-secondary-text text-[16.8px]">{subtext}</p>
        )}
      </div>
    </header>
  );
};

export default HeaderBox;
