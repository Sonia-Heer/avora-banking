export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid grid-cols-2 h-screen">
      <div className="auth-asset" />
      {children}
    </main>
  );
}
