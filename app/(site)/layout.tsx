import { isAuthenticated } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authenticated = await isAuthenticated();

  if (authenticated) {
    redirect('/app');
  }

  return (
    <>
      {children}
    </>
  );
}