import { Sidebar } from "@/components/Sidebar";

export const metadata = {
  title: "Eigengram",
  description:
    "EigenGram, the leading healthcare platform for all your medical health data and analytics.",
};

export default function RootLayout({ children }) {
  return (
    <div className="flex min-h-screen gap-1">
      <Sidebar />
      <div className="w-full pl-4 pr-2 pt-4">{children}</div>
    </div>
  );
}
