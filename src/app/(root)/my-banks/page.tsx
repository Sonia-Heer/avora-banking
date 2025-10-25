import BankCard from "@/components/BankCard";
import HeaderBox from "@/components/HeaderBox";
import { getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";

const MyBanks = async () => {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({
    userId: loggedIn.$id,
  });

  return (
    <section className="h-screen max-xl:max-h-screen text-white">
      <HeaderBox
        title="Accounts"
        subtext="Effortlessly manage your banking activites."
      />

      <div className="p-6 max-w-[1450px] mx-auto">
        <h2 className="text-lg font-semibold text-gray-900 pb-4">Your cards</h2>
        <div className="flex flex-wrap gap-6">
          {accounts &&
            accounts.data.map((account: Account, index: number) => (
              <BankCard
                key={index}
                account={account}
                userName={loggedIn?.firstName}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default MyBanks;
