import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BankTabItem } from "./BankTabItem";
import BankInfo from "./BankInfo";
import TransactionsTable from "./TransactionsTable";
import { Pagination } from "./Pagination";

const RecentTransactions = ({
  accounts,
  transactions = [],
  appwriteItemId,
  page = 1,
}: RecentTransactionsProps) => {
  const rowsPerPage = 5;
  const totalPages = Math.ceil(transactions.length / rowsPerPage);

  const indexOfLastTransaction = page * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  return (
    <section>
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Payment History</h2>
        <Link
          href={`/transaction-history/?id=${appwriteItemId}`}
          className="text-sm font-medium text-purple-700 hover:text-purple-900 transition-colors"
        >
          View all →
        </Link>
      </header>
      {/* <div className="w-[80%] h-[2px] bg-purple-200 rounded-full my-6 mx-auto" /> */}

      <Tabs defaultValue={appwriteItemId}>
        <TabsList className="flex flex-wrap gap-2 mb-6 bg-transparent mx-auto">
          {accounts.map((account: Account) => (
            <TabsTrigger key={account.id} value={account.appwriteItemId}>
              <BankTabItem
                key={account.id}
                account={account}
                appwriteItemId={appwriteItemId}
              />
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tab Panels */}
        {accounts.map((account: Account) => (
          <TabsContent
            key={account.id}
            value={account.appwriteItemId}
            className="space-y-6"
          >
            <BankInfo
              account={account}
              appwriteItemId={appwriteItemId}
              type="full"
            />

            <TransactionsTable
              transactions={currentTransactions}
              visibleColumns={{
                transaction: true,
                amount: true,
                status: true,
                date: true,
                channel: true,
                category: false,
              }}
            />

            {totalPages > 1 && (
              <div className="pt-4 border-t border-gray-200">
                <Pagination totalPages={totalPages} page={page} />
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default RecentTransactions;
