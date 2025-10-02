import React from "react";
import HeaderBox from "@/components/HeaderBox";
import CardBox from "./CardBox";
import RightSideBar from "@/components/RightSideBar";

const Home = () => {
  const loggedIn = { firstName: "Sonia", lastName: "Heer" };
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome back"
            user={loggedIn?.firstName || "Guest"}
            subtext="Access and manage your account and transactions efficiently."
          />
        </header>
        <CardBox
          user={loggedIn}
          transactions={[]}
          banks={[{ currentBalance: 1250.5 }, { currentBalance: 500.23 }]}
        />
      </div>
      <RightSideBar user={loggedIn} transactions={[]} banks={[]} />
    </section>
  );
};

export default Home;
