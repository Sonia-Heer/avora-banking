import React from "react";
import TotalBalanceBox from "./TotalBalanceBox";

const RightSideBar = ({ user, transactions, banks }: RightSidebarProps) => {
  return (
    <aside className="right-sidebar">
      <TotalBalanceBox
        accounts={[]}
        totalBanks={1}
        totalCurrentBalance={1250.35}
      />
    </aside>
  );
};

export default RightSideBar;
