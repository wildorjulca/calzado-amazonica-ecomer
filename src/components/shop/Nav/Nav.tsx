
import { Suspense } from "react";
import { SearchBar } from "../SearchBar";
import { NavLinks } from "./NavLinks";
import { CartNavItem } from "../CartNavItem";
import { MobileMenu } from "../MobileMenu";
import { UserMenuContainer } from "../UserMenu/UserMenuContainer";
import { CartDrawer } from "../drawer/cart-drawer";
import { Heart } from "lucide-react";
import Link from "next/link";
import { FiltersDrawerMobile } from "../header/FiltersDrawerMobile";

export const Nav = ({ channel }: { channel: string }) => {

	return (
		<nav className="flex w-full gap-4 lg:gap-6" aria-label="Main navigation">
			<ul className="hidden gap-4 overflow-x-auto whitespace-nowrap md:flex lg:gap-8 lg:px-0">
				<NavLinks channel={channel} />
			</ul>
			<div className="ml-auto flex items-center justify-center gap-4 whitespace-nowrap lg:gap-8">
				<div className="hidden lg:flex">
					<SearchBar channel={channel} />
				</div>
				<Suspense fallback={<div className="w-8" />}>
					<UserMenuContainer />
				</Suspense>
			</div>
			<div className="hidden md:flex items-center">
				<Link href={"/listFavorites"}>
					<Heart strokeWidth={1} className="hover:cursor-pointer h-7 w-7 shrink-0" aria-hidden="true" />
				</Link>
			</div>
			<div className="flex items-center">

				<Suspense fallback={<div className="w-6" />}>
					<CartDrawer />
					{/* <CartNavItem channel={channel} /> */}
				</Suspense>
			</div>
			<div className="block  md:hidden">
				<Suspense>
					<FiltersDrawerMobile />
					{/* <MobileMenu>
					<SearchBar channel={channel} />
					<NavLinks channel={channel} />
				</MobileMenu> */}
				</Suspense>
			</div>


		</nav>

	);
};
