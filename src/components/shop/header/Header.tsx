// 'use client';

// import { Logo } from "./Logo";
// import { Nav } from "./nav/Nav";

import { Nav } from "../Nav/Nav";
import Logo from "./Logo";

export function Header({ channel }: { channel: string }) {
	return (
		<header className="sticky top-0 z-20 bg-neutral-100/50 backdrop-blur-md">
			{/* <div className="mx-auto max-w-7xl px-3 sm:px-8"> */}
			<div className="container m-auto px-4 md:p-0">
				<div className="flex items-center  h-16  gap-4 md:gap-8">
					<Logo />
					<Nav channel={channel} />
				</div>
			</div>
		</header>
	);
}
