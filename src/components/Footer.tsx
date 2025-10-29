"use client";

import { logoutAccount } from "@/lib/actions/user.actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Footer = ({ user, type = "desktop" }: FooterProps) => {
  const router = useRouter();

  const handleLogOut = async () => {
    const loggedOut = await logoutAccount();

    if (loggedOut) router.push("/sign-in");
  };

  return (
    <footer className="footer border-t border-gray-200">
      <div className={type === "mobile" ? "footer_name-mobile" : "footer_name"}>
        <p className="text-xl font-bold text-primary-text bg-foreground rounded-2xl p-1">
          {user?.firstName[0].toLocaleUpperCase()}
          {user?.lastName[0].toLocaleUpperCase()}
        </p>
      </div>

      <div
        className={type === "mobile" ? "footer_email-mobile" : "footer_email"}
      >
        <h2 className="text-14 truncate text-tertiary-text font-semibold capitalize">
          {user?.firstName} {user?.lastName}
        </h2>
        <p className="text-14 truncate font-normal text-tertiary-text">
          {user?.email}
        </p>
      </div>

      <div className="footer_image" onClick={handleLogOut}>
        <Image src="icons/logout.svg" fill alt="jsm" />
      </div>
    </footer>
  );
};

export default Footer;
