"use client";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import {
  cn,
  formUrlQuery,
  formatAmount,
  getAccountTypeColors,
} from "@/lib/utils";

const BankInfo = ({ account, appwriteItemId, type }: BankInfoProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isActive = appwriteItemId === account?.appwriteItemId;

  const handleBankChange = () => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "id",
      value: account?.appwriteItemId,
    });
    router.push(newUrl, { scroll: false });
  };

  const colors = getAccountTypeColors(account?.type as AccountTypes);

  return (
    <div
      onClick={handleBankChange}
      className={cn(
        "flex items-center gap-4 p-4 transition-all duration-200",
        "bg-white rounded-xl border cursor-pointer hover:shadow-md hover:-translate-y-0.5",
        isActive
          ? "border-brand-primary ring-2 ring-brand-secondary"
          : "border-foreground",
        type === "card" && "max-w-sm"
      )}
    >
      {/* Bank Icon */}
      <figure
        className={cn(
          "flex justify-center items-center h-12 w-12 rounded-full bg-brand-secondary flex-shrink-0",
          colors.lightBg
        )}
      >
        <Image
          src="/icons/connect-bank.svg"
          width={22}
          height={22}
          alt={account.subtype}
          className="opacity-80"
        />
      </figure>

      {/* Bank Info */}
      <div className="flex w-full flex-col justify-center">
        <div className="flex items-center justify-between">
          <h2
            className={cn(
              "font-semibold text-foreground truncate text-base",
              colors.title
            )}
          >
            {account.name}
          </h2>

          {type === "full" && (
            <span
              className={cn(
                "ml-2 rounded-full px-3 py-1 text-xs font-medium",
                "bg-brand-secondary text-primary-text",
                colors.subText,
                colors.lightBg
              )}
            >
              {account.subtype}
            </span>
          )}
        </div>

        <p
          className={cn(
            "mt-1 text-sm font-medium text-foreground",
            colors.subText
          )}
        >
          {formatAmount(account.currentBalance)}
        </p>
      </div>
    </div>
  );
};

export default BankInfo;
