import AnimatedCounter from "./AnimatedCounter";
import DoughnutChart from "./DoughnutChart";

const TotalBalanceBox = ({
  accounts = [],
  totalBanks,
  totalCurrentBalance,
}: TotalBalanceBoxProps) => (
  <section className="flex flex-col md:flex-row gap-6 rounded-[20px] bg-white p-6 shadow-lg">
    <DoughnutChart accounts={accounts} />

    <div className="flex flex-col gap-4 text-gray-800">
      <h2 className="text-lg font-semibold text-purple-800 tracking-tight">
        Bank Accounts:
        <span className="ml-2 text-gray-900 text-0lg font-bold">
          {totalBanks}
        </span>
      </h2>

      <div className="w-12 h-[2px] bg-purple-200 rounded-full" />

      <div>
        <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">
          Total Current Balance
        </p>
        <div className="flex items-end gap-2 text-3xl font-bold text-gray-900 leading-none">
          <AnimatedCounter amount={totalCurrentBalance} />
          <span className="text-base font-medium text-gray-500 mb-[2px]">
            USD
          </span>
        </div>
      </div>
    </div>
  </section>
);

export default TotalBalanceBox;
