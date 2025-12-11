import { LeftSidebar } from "@/components/home/left-sidebar";
import { Preview } from "@/components/home/preview";
import { RightSidebar } from "@/components/home/right-sidebar";
import { Export } from "@/components/export";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-svh p-2 gap-2 overflow-hidden">
      <LeftSidebar />
      <div className="fixed top-2 left-1/2 transform -translate-x-1/2 z-50">
        <Export />
      </div>
      <Preview />
      <RightSidebar />
    </div>
  );
}
