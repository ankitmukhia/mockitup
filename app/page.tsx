import { LeftSidebar } from "@/components/home/left-sidebar";
import { Preview } from "@/components/home/preview";
import { RightSidebar } from "@/components/home/right-sidebar";
import { Export } from "@/components/export";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-svh p-2 gap-2 overflow-hidden">
      <LeftSidebar />
      <div className="fixed top-2 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center gap-1.5">
          <Export />
          <Button asChild>
            <Link
              href="https://github.com/ankitmukhia/mockitup"
              target="_blank"
            >
              <GitHubLogoIcon />
              <span className="lg:inline p-1">Star on GitHub</span>
            </Link>
          </Button>

          <ModeToggle />
        </div>
      </div>
      <Preview />
      <RightSidebar />
    </div>
  );
}
