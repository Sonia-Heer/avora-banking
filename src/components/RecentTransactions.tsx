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
        <h2 className="text-lg font-semibold text-gray-700">Payment History</h2>
        <Link
          href={`/transaction-history/?id=${appwriteItemId}`}
          className="text-sm font-medium text-brand-primary hover:text-brand-secondary transition-colors"
        >
          View all →
        </Link>
      </header>

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
              <div className="pt-4 border-t border-foreground">
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
