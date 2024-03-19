"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";

// Normal Imports
import ThemeDropdown from "./ThemeDropdown/ThemeDropdown";
import SearchDialog from "./SearchDialog/SearchDialog";
import { useGlobalContext } from "../context/globalContext";

// Shadcn Component Imports
import { Button } from "@/components/ui/button";

// Lucide React Icon Imports
import { github } from "../utils/Icons";

const Navbar: FC = () => {
  const router = useRouter();

  return (
    <>
      <div className="w-full py-4 flex items-center justify-between">
        <div className="left"></div>

        <div className="search-container flex shrink-0 w-full gap-3 sm:w-fit">
          <SearchDialog />

          <div className="btn-group flex items-center gap-2">
            <ThemeDropdown />

            <Button
              className="source-code-btn flex items-center gap-2"
              onClick={() => {
                router.push("https://github.com/Jeevanreddy66/weather-app");
              }}
            >
              {github}Source Code
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
