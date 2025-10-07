import React from "react";
import Link from "next/link";
import Image from "next/image";
import BankCard from "@/components/BankCard";
const CardBox = ({ user, transactions, banks }: RightSidebarProps) => {
  return (
    <section className="banks ">
      <div className="flex w-full justify-between">
        <h2 className="header-2">My Banks</h2>
        <Link href="/" className="flex gap-2">
          <Image src="/icons/plus.svg" width={20} height={20} alt="plus" />
          <h2 className="text-[14px] font-semibold text-gray-600">Add Bank</h2>
        </Link>
      </div>
      {banks?.length > 0 && (
        <BankCard
          key={banks[0].$id}
          account={banks}
          userName={`${user?.name}`}
          showBalance={true}
        />
      )}
    </section>
  );
};

export default CardBox;
