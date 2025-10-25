import HeaderBox from "@/components/HeaderBox";
import { Pagination } from "@/components/Pagination";
import TransactionsTable from "@/components/TransactionsTable";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { formatAmount } from "@/lib/utils";
import React from "react";

const TransactionHistory = async ({
  searchParams: { id, page },
}: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({
    userId: loggedIn.$id,
  });

  if (!accounts) return;

  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId });

  const rowsPerPage = 10;
  const totalPages = Math.ceil(account?.transactions.length / rowsPerPage);

  const indexOfLastTransaction = currentPage * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

  const currentTransactions = account?.transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  return (
    <div className="h-screen max-xl:max-h-screen text-white">
      <HeaderBox
        title="Transaction History"
        subtext="See your bank details and transactions."
      />
      <div className="max-w-[1650px] mx-auto px-6 md:px-20">
        <section className="flex flex-col md:flex-row justify-between items-start gap-6 rounded-[20px] bg-white text-gray-800 border border-purple-600 ring-2 ring-purple-100 hover:shadow-md hover:-translate-y-0.5 rounded-xl bg-white text-purple-800 p-6 my-6 md:my-10">
          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-purple-800 tracking-tight">
              {account?.data.name}
            </h2>
            <p className="text-sm text-gray-500">
              {account?.data.officialName}
            </p>
            <p className="text-base font-semibold tracking-[1.1px] text-gray-700">
              ●●●● ●●●● ●●●● {account?.data.mask}
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end mx-auto md:mx-0 gap-2 text-purple-700 bg-purple-100 rounded-xl p-6">
            <p className="text-sm uppercase tracking-wide text-gray-500">
              Current Balance
            </p>
            <div className="flex items-end gap-2 text-3xl font-bold text-gray-900 leading-none">
              <span>{formatAmount(account?.data.currentBalance)}</span>
              <span className="text-base font-medium text-gray-500 mb-[2px]">
                USD
              </span>
            </div>
          </div>
        </section>

        <section className="flex w-full flex-col gap-6 pb-20">
          <TransactionsTable transactions={currentTransactions} />

          {totalPages > 1 && (
            <div className="my-4 w-full">
              <Pagination totalPages={totalPages} page={currentPage} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default TransactionHistory;
