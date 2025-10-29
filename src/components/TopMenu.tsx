"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PlaidLink from "./PlaidLink";
import Image from "next/image";
import { logoutAccount } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

const TopMenu = ({ user }: SiderbarProps) => {
  const pathname = usePathname();

  const router = useRouter();

  const handleLogOut = async () => {
    const loggedOut = await logoutAccount();

    if (loggedOut) router.push("/sign-in");
  };

  return (
    <header className="top-menu">
      <div className="container flex items-center justify-between">
        {/* Navigation */}
        <nav className="flex items-center gap-8">
          {sidebarLinks.map(({ label, route }) => {
            const isActive =
              pathname === route || pathname.startsWith(`${route}/`);
            return (
              <Link
                key={label}
                href={route}
                className={cn(
                  "relative transition-colors hover:text-white",
                  isActive ? "text-white" : "text-secondary-text"
                )}
              >
                {label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-white rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <PlaidLink user={user} />
          <div className="badge">
            {user?.firstName[0]?.toUpperCase()}
            {user?.lastName[0]?.toUpperCase()}
          </div>
          <div className="footer_image" onClick={handleLogOut}>
            <Image src="icons/logout.svg" fill alt="jsm" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopMenu;
