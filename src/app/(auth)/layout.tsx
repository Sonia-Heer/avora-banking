import { getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = await getLoggedInUser();

  if (loggedIn) redirect("/");

  return (
    <main className="grid md:grid-cols-2 h-screen">
      <div className="relative hidden md:block bg-brand-secondary">
        <Image
          src="/placeholder.png"
          alt="Banking illustration"
          fill
          className="object-bottom"
          priority
        />
      </div>

      {children}
    </main>
  );
}
