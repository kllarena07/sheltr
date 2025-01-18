import Navbar from "../../../components/navbar/navbar";

export default function ProtectedRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full">
      <section className="h-[calc(100dvh-80px)] bg-white">{children}</section>
      <Navbar />
    </main>
  );
}
