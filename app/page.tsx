import { LeftSidebar } from "@/components/home/left-sidebar";
import { Preview } from "@/components/home/preview";
import { RightSidebar } from "@/components/home/right-sidebar";

export default function Home() {
  return (
    <div className="flex h-svh p-2 gap-2">
      <LeftSidebar />
      <Preview />
      <RightSidebar />
    </div>
  );
}
