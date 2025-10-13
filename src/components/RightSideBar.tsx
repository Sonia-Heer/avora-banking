import React from "react";
import TotalBalanceBox from "./TotalBalanceBox";

const RightSideBar = ({ accounts, totalBanks }: TotalBalanceBoxProps) => {
  return (
    <aside className="right-sidebar">
      <TotalBalanceBox
        accounts={accounts?.data}
        totalBanks={totalBanks}
        totalCurrentBalance={totalBanks}
      />
    </aside>
  );
};

export default RightSideBar;
