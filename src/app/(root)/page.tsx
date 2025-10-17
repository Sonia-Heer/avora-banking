import React from "react";
import HeaderBox from "@/components/HeaderBox";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RecentTransactions from "@/components/RecentTransactions";
import Link from "next/link";
import Image from "next/image";
import BankCard from "@/components/BankCard";
import { countTransactionCategories } from "@/lib/utils";
import Category from "@/components/Category";

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

  const transactions = account.transactions;
  const categories: CategoryCount[] = countTransactionCategories(transactions);

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
          <div className="banks">
            <div className="flex w-full justify-between">
              <h2 className="header-2">My Banks</h2>
              <Link href="/" className="flex gap-2">
                <Image
                  src="/icons/plus.svg"
                  width={20}
                  height={20}
                  alt="plus"
                />
                <h2 className="text-[14px] font-semibold text-gray-600">
                  Add Bank
                </h2>
              </Link>
            </div>
            {accounts &&
              accounts.data.map((account: Account, index: number) => (
                <BankCard
                  key={index}
                  account={account}
                  userName={loggedIn?.firstName}
                />
              ))}
          </div>
          <div className="mt-10 flex flex-1 flex-col gap-6">
            <h2 className="header-2">Top categories</h2>

            <div className="space-y-5">
              {categories.map((category, index) => (
                <Category key={category.name} category={category} />
              ))}
            </div>
          </div>
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
