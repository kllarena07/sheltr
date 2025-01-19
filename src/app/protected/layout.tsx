import Navbar from "../../components/navbar/navbar";

export default function ProtectedRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col w-full h-dvh">
      {children}
      <Navbar />
    </main>
  );
}
