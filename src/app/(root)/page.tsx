import React from "react";
import HeaderBox from "@/components/HeaderBox";
import CardBox from "./CardBox";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RecentTransactions from "@/components/RecentTransactions";

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({
    userId: loggedIn.$id,
  });

  if (!accounts) return;

  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId });

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
        <div className="flex flex-row gap-8">
          <TotalBalanceBox
            accounts={accounts?.data}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
          <CardBox user={loggedIn} transactions={[]} banks={accounts?.data} />
        </div>
        <RecentTransactions
          accounts={accounts?.data}
          transactions={account?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>
    </section>
  );
};

export default Home;
