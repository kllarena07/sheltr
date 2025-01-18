import Navbar from "../../components/navbar/navbar";

export default function ProtectedRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col w-full h-dvh">
      <section className="bg-white h-full">{children}</section>
      <Navbar />
    </main>
  );
}
