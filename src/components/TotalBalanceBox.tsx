import AnimatedCounter from "./AnimatedCounter";
import DoughnutChart from "./DoughnutChart";

const TotalBalanceBox = ({
  accounts = [],
  totalBanks,
  totalCurrentBalance,
}: TotalBalanceBoxProps) => (
  <section className="flex flex-col gap-6 data-container min-w-[300px]">
    <DoughnutChart accounts={accounts} />

    <div className="flex flex-col gap-4 text-secondary-text my-auto">
      <h2 className="text-lg font-semibold text-gray-700">
        Bank Accounts:
        <span className="ml-2 text-brand-primary text-lg font-bold">
          {totalBanks}
        </span>
      </h2>

      <div className="w-12 h-[2px] bg-brand-primary rounded-full" />

      <div>
        <p className="text-sm uppercase text-tertiary-text tracking-wide mb-1">
          Total Current Balance
        </p>
        <div className="flex items-end gap-2 text-3xl font-bold text-brand-primary leading-none">
          <AnimatedCounter amount={totalCurrentBalance} />
          <span className="text-base font-medium text-brand-primary mb-[2px]">
            USD
          </span>
        </div>
      </div>
    </div>
  </section>
);

export default TotalBalanceBox;
