import MobileNav from "@/components/MobileNav";
import TopMenu from "@/components/TopMenu";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = await getLoggedInUser();

  if (!loggedIn) redirect("/sign-in");

  return (
    <main className="flex w-full min-h-screen bg-background">
      <div className="flex size-full flex-col">
        <TopMenu user={loggedIn} />
        <div className="root-layout bg-foreground w-full fixed z-100">
          <MobileNav user={loggedIn} />
        </div>
        {children}
      </div>
    </main>
  );
}
