export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="forms">
      <div className="forms_bg">{children}</div>
    </div>
  );
}
