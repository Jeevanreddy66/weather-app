"use client";

import { FC, useState } from "react";

// Normal Imports
import {
  useGlobalContext,
  useGlobalContextUpdate,
} from "@/app/context/globalContext";

// Shadcn Component Imports
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Command, CommandInput, CommandList } from "@/components/ui/command";

// Lucide React Icon Imports
import { commandIcon } from "@/app/utils/Icons";

const SearchDialog: FC = () => {
  const { geoCodedList, inputValue, handleInput } = useGlobalContext();
  const { setActiveCityCoords } = useGlobalContextUpdate();

  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  const [isOpened, setIsOpened] = useState<boolean>(false);

  const getClickedCoords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);
  };

  return (
    <>
      <div className="search-btn">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="border inline-flex items-center justify-center text-sm font-medium hover:dark:bg-[#131313] hover:bg-slate-100 ease-in-out duration-200"
            >
              <p className="text-sm text-muted-foreground">Search Here...</p>
              <div className="command dark:bg-[#262626] bg-slate-200 py-[2px] pl-[5px] pr-[7px] rounded-sm ml-[10rem] flex items-center gap-2">
                {commandIcon} <span className="text-[11px]">F</span>
              </div>
            </Button>
          </DialogTrigger>

          <DialogContent className="p-0">
            <Command className="rounded-lg border shadow-md">
              <CommandList>
                <CommandInput
                  placeholder="Type a Command or Search..."
                  value={inputValue}
                  onChangeCapture={handleInput}
                />
              </CommandList>

              <ul className="px-3 pb-2">
                <p className="p-2 text-sm text-muted-foreground">Suggestions</p>

                {geoCodedList.length === 0 && <p>No Results!</p>}

                {geoCodedList.map(
                  (
                    item: {
                      name: string;
                      country: string;
                      state: string;
                      lat: number;
                      lon: number;
                    },
                    index: number
                  ) => {
                    const { country, state, name } = item;
                    return (
                      <li
                        key={index}
                        className={`py-3 px-2 text-sm cursor-default ${
                          hoveredIndex === index ? "bg-accent" : ""
                        }`}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onClick={() => {
                          getClickedCoords(item.lat, item.lon);
                          // setIsOpened(!isOpened);
                        }}
                      >
                        <p className="text">
                          {name}, {state && state}, {country}
                        </p>
                      </li>
                    );
                  }
                )}
              </ul>
            </Command>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default SearchDialog;
