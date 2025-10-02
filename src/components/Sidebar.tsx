"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

const Sidebar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();

  return (
    <section className="sidebar bg-black-900">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Horizon logo"
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="sidebar-logo">Horizon</h1>
        </Link>
        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);

          return (
            <Fragment key={item.route}>
              <span
                className={cn("inverted-radius-top", { active: isActive })}
              ></span>

              <Link
                href={item.route}
                className={cn("sidebar-link", {
                  "bg-background": isActive,
                })}
              >
                <div className="relative size-6">
                  <Image
                    src={item.imgURL}
                    alt={item.label}
                    fill
                    className={cn({
                      "brightness-[0] invert-0": isActive,
                    })}
                  />
                </div>
                <p
                  className={cn("sidebar-label", {
                    "!text-black-900": isActive,
                  })}
                >
                  {item.label}
                </p>
              </Link>
              <span
                className={cn("inverted-radius-bottom", { active: isActive })}
              ></span>
            </Fragment>
          );
        })}
        USER
      </nav>
      FOOTER
    </section>
  );
};

export default Sidebar;
