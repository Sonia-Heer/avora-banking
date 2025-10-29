import React from "react";

import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RecentTransactions from "@/components/RecentTransactions";
import BankCard from "@/components/BankCard";
import Category from "@/components/Category";

import { getLoggedInUser } from "@/lib/actions/user.actions";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { countTransactionCategories } from "@/lib/utils";
import TransactionChart from "@/components/TransactionsChart";

const Home = async (props: {
  searchParams?: { [key: string]: string | string[] };
}) => {
  const searchParams = await props.searchParams;
  const id = searchParams?.id;
  const page = searchParams?.page;
  const currentPage = Number(page as string) || 1;

  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ userId: loggedIn.$id });
  if (!accounts) return null;

  const accountsData = accounts.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;
  const account = await getAccount({ appwriteItemId });

  const transactions = account.transactions;
  const categories: CategoryCount[] = countTransactionCategories(transactions);
  const banks = accountsData.slice(0, 2);

  return (
    <section className="h-screen">
      <HeaderBox
        subtitle="Dashboard"
        type="greeting"
        title="Welcome back"
        user={loggedIn?.firstName || "Guest"}
        subtext="Access and manage your account and transactions efficiently."
      />

      <div
        style={{
          background: "linear-gradient(to bottom, #141820 10%, #f6f6f6 10%)",
        }}
      >
        <div className="container pb-20 flex flex-col gap-6 md:gap-10">
          <div className="flex flex-col lg:flex-row gap-6 md:gap-10">
            <TotalBalanceBox
              accounts={accounts.data}
              totalBanks={accounts.totalBanks}
              totalCurrentBalance={accounts.totalCurrentBalance}
            />
            <div className="data-container w-full">
              <TransactionChart transactions={account.transactions} />
            </div>
          </div>

          <div className="flex flex-col xl:flex-row gap-6 md:gap-10">
            <div className="flex flex-col lg:flex-row xl:flex-col gap-6 md:gap-10 w-full">
              <section className="pb-10 lg:w-[50%] xl:w-[100%] min-w-[350px] m-auto">
                {banks.length > 0 && (
                  <div className="relative flex flex-col items-center justify-center gap-5">
                    <div className="relative z-10">
                      <BankCard
                        key={banks[0].$id}
                        account={banks[0]}
                        userName={`${loggedIn.firstName} ${loggedIn.lastName}`}
                        showBalance={false}
                      />
                    </div>

                    {banks[1] && (
                      <div className="absolute right-0 top-8 z-0 w-[90%]">
                        <BankCard
                          key={banks[1].$id}
                          account={banks[1]}
                          userName={`${loggedIn.firstName} ${loggedIn.lastName}`}
                          showBalance={false}
                        />
                      </div>
                    )}
                  </div>
                )}
              </section>

              <section className="data-container lg:w-[50%] xl:w-[100%]">
                <div className="flex flex-col gap-6 md:gap-10">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Top Categories
                  </h2>
                  <div className="space-y-5">
                    {categories.map((category) => (
                      <Category key={category.name} category={category} />
                    ))}
                  </div>
                </div>
              </section>
            </div>

            <div className="data-container">
              <RecentTransactions
                accounts={accounts.data}
                transactions={account.transactions}
                appwriteItemId={appwriteItemId}
                page={currentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
