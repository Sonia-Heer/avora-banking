import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = await getLoggedInUser();

  if (!loggedIn) redirect("/sign-in");

  return (
    <main className="flex h-screen w-full font-inter bg-background">
      <Sidebar user={loggedIn} />
      <div className="flex size-full flex-col bg-[#f6f6f6]">
        <div className="root-layout bg-black-900">
          <MobileNav user={loggedIn} />
        </div>
        {children}
      </div>
    </main>
  );
}
