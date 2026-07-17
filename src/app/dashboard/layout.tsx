import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MobileTopbar } from "@/components/dashboard/mobile-topbar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login?callbackUrl=/dashboard");

  return (
    <div className="min-h-screen bg-canvas-light dark:bg-canvas-dark">
      <Sidebar name={session.user?.name} />
      <MobileTopbar />
      <div className="md:pl-64">
        <main className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-10">{children}</main>
      </div>
    </div>
  );
}
