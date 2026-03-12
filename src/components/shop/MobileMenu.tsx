"use client";

import { type ReactNode } from "react";
import { Dialog } from "@headlessui/react";
import { useMobileMenu } from "@/src/hooks/useMobileMenu";
import { OpenButton } from "./OpenButton";
import { CloseButton } from "./CloseButton";
import Logo from "./header/Logo";

type Props = {
  children: ReactNode;
};

export const MobileMenu = ({ children }: Props) => {
  const { closeMenu, openMenu, isOpen } = useMobileMenu();

  return (
    <>
      <OpenButton onClick={openMenu} aria-controls="mobile-menu" />

      <Dialog open={isOpen} onClose={closeMenu} className="relative z-20">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <Dialog.Panel className="fixed inset-0 flex h-dvh w-screen flex-col overflow-y-scroll bg-white">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between bg-white px-3 sm:px-8">
            <Logo />
            <CloseButton onClick={closeMenu} aria-controls="mobile-menu" />
          </header>

          <ul
            id="mobile-menu"
            className="flex h-full flex-col whitespace-nowrap p-3 sm:p-8
              [&>*:nth-child(n+3)]:border-t
              [&>*:nth-child(n+3)]:border-neutral-200
              [&>li]:py-3"
          >
            {children}
          </ul>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};
