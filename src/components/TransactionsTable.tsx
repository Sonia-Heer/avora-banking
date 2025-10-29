import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { transactionCategoryStyles } from "@/constants";
import {
  cn,
  formatAmount,
  formatDateTime,
  getTransactionStatus,
  removeSpecialCharacters,
} from "@/lib/utils";

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  const { borderColor, backgroundColor, textColor, chipBackgroundColor } =
    transactionCategoryStyles[
      category as keyof typeof transactionCategoryStyles
    ] || transactionCategoryStyles.default;

  return (
    <div
      className={cn(
        "flex items-center truncate w-fit gap-1 rounded-2xl border-[1.5px] py-[2px] pl-1.5 pr-2",
        borderColor,
        chipBackgroundColor
      )}
    >
      <div className={cn("size-2 rounded-full", backgroundColor)} />
      <p className={cn("text-[12px] font-medium capitalize", textColor)}>
        {removeSpecialCharacters(category)}
      </p>
    </div>
  );
};

interface TransactionTableProps {
  transactions: Transaction[];
  visibleColumns?: {
    transaction?: boolean;
    amount?: boolean;
    status?: boolean;
    date?: boolean;
    channel?: boolean;
    category?: boolean;
  };
}

const TransactionsTable = ({
  transactions,
  visibleColumns = {
    transaction: true,
    amount: true,
    status: true,
    date: true,
    channel: true,
    category: true,
  },
}: TransactionTableProps) => {
  return (
    <Table>
      <TableHeader className="bg-muted-foreground">
        <TableRow>
          {visibleColumns.transaction && (
            <TableHead className="px-2">Transaction</TableHead>
          )}
          {visibleColumns.status && (
            <TableHead className="px-2 max-md:hidden">Status</TableHead>
          )}
          {visibleColumns.date && (
            <TableHead className="px-2 max-md:hidden">Date</TableHead>
          )}

          {visibleColumns.channel && (
            <TableHead className="px-2 max-md:hidden">Channel</TableHead>
          )}
          {visibleColumns.category && (
            <TableHead className="px-2 max-md:hidden">Category</TableHead>
          )}
          {visibleColumns.amount && (
            <TableHead className="px-2">Amount</TableHead>
          )}
        </TableRow>
      </TableHeader>

      <TableBody>
        {transactions.map((t: Transaction) => {
          const status = getTransactionStatus(new Date(t.date));
          const amount = formatAmount(t.amount);
          const isDebit = t.type === "debit";
          const isCredit = t.type === "credit";

          return (
            <TableRow key={t.id}>
              {visibleColumns.transaction && (
                <TableCell className="max-w-[250px] pl-2 pr-10">
                  <div className="flex flex-col gap-3 leading-4">
                    <h2 className="text-[15.8px] truncate font-semibold text-[#344054] capitalize">
                      {removeSpecialCharacters(t.name)}
                    </h2>
                    <h2 className="text-secondary-text text-[13.5px] capitalize">
                      {removeSpecialCharacters(t.category)}
                    </h2>
                  </div>
                </TableCell>
              )}

              {visibleColumns.status && (
                <TableCell className="pl-2 pr-10 max-md:hidden">
                  <CategoryBadge category={status} />
                </TableCell>
              )}

              {visibleColumns.date && (
                <TableCell className="min-w-32 pl-2 pr-10 text-foreground max-md:hidden">
                  {formatDateTime(new Date(t.date)).dateTime}
                </TableCell>
              )}

              {visibleColumns.channel && (
                <TableCell className="pl-2 pr-10 capitalize min-w-24 text-foreground max-md:hidden">
                  {t.paymentChannel}
                </TableCell>
              )}

              {visibleColumns.category && (
                <TableCell className="pl-2 pr-10 max-md:hidden">
                  <CategoryBadge category={t.category} />
                </TableCell>
              )}

              {visibleColumns.amount && (
                <TableCell
                  className={`pl-2 pr-10 font-semibold ${
                    isDebit || amount[0] === "-"
                      ? "text-foreground"
                      : "text-[#039855]"
                  }`}
                >
                  {isDebit ? `-${amount}` : isCredit ? `+${amount}` : amount}
                </TableCell>
              )}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;
