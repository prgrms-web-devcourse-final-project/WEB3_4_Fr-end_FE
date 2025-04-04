export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full h-screen bg-[url('/loginHero/your-background.jpg')] bg-cover bg-center overflow-hidden">
      {children}
    </section>
  );
}
