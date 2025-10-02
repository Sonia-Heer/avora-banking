import React from "react";
import Link from "next/link";
import { formatAmount } from "@/lib/utils";
import Image from "next/image";

const BankCard = ({ account, userName, showBalance }: CreditCardProps) => {
  return (
    <div className="flex flex-row w-full gap-8 overflow-x-auto no-scrollbar">
      {account.map((account: object) => {
        return (
          <div key={account.id} className="bank-card flex-shrink-0 ">
            <Link href="/" className="flex">
              <div className="bank-card_content">
                <p className="font-ibm-plex-serif font-black text-white text-[18px]">
                  {formatAmount(account.currentBalance)}
                </p>
                <article className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <h1 className="text-[12px] font-semibold text-white">
                      {userName}
                    </h1>
                    <h2 className="text-[12px] font-semibold text-white">
                      ** / **
                    </h2>
                  </div>
                  <p className="text-[14px] tracking-[1.1px] font-semibold text-white">
                    **** **** **** &nbsp;
                    <span className="text-[16px]">{1234}</span>
                  </p>
                </article>
              </div>
              <div className="bank-card_icon">
                <Image
                  src="/icons/Paypass.svg"
                  width={20}
                  height={20}
                  alt="paypass"
                />
                <Image
                  src="/icons/mastercard.svg"
                  width={45}
                  height={42}
                  alt="mastercard"
                />
              </div>
              <Image
                src="/icons/lines.png"
                className="absolute top-0"
                width={316}
                height={190}
                alt="lines"
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default BankCard;
