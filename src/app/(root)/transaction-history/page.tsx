import HeaderBox from "@/components/HeaderBox";
import { Pagination } from "@/components/Pagination";
import TransactionsTable from "@/components/TransactionsTable";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { formatAmount } from "@/lib/utils";
import React from "react";

const TransactionHistory = async ({ searchParams }: SearchParamProps) => {
  const sp = searchParams ? await searchParams : {};
  const page = Array.isArray(sp.page) ? sp.page[0] : sp.page;
  const id = sp?.id;
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
    <div>
      <HeaderBox
        title="Transaction History"
        subtext="See your bank details and transactions."
      />
      <div className="container">
        <section className="ring">
          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-tertiary-text tracking-tight">
              {account?.data.name}
            </h2>
            <p className="text-sm text-tertiary-text">
              {account?.data.officialName}
            </p>
            <p className="text-base font-semibold tracking-[1.1px] text-tertiary-text">
              ●●●● ●●●● ●●●● {account?.data.mask}
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end mx-auto md:mx-0 gap-2 text-tertiary-text bg-brand-secondary rounded-xl p-6">
            <p className="text-sm uppercase tracking-wide text-tertiary-text">
              Current Balance
            </p>
            <div className="flex items-end gap-2 text-3xl font-bold text-tertiary-text leading-none">
              <span>{formatAmount(account?.data.currentBalance)}</span>
              <span className="text-base font-medium text-tertiary-text mb-[2px]">
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
