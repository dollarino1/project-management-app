import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="w-full flex flex-row">
            <Sidebar />
            <main className="grow">
                <Header />
                {children}
            </main>
        </div>
    );
}