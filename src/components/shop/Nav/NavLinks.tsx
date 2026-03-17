'use client'

import Link from "next/link";
import { NavLink } from "./NavLink";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type MenuItem = {
	id: string;
	category: {
		slug: string;
		name: string;
	};
};

export const NavLinks = ({ channel }: { channel: string }) => {

	const pathName = usePathname()

	const categories: MenuItem[] = [
		{ id: "1", category: { slug: "zapatillas", name: "Zapatillas" } },
		{ id: "2", category: { slug: "zapatos", name: "Zapatos" } },
		{ id: "3", category: { slug: "botines-botas", name: "Botines y Botas" } },
		{ id: "4", category: { slug: "sandalias", name: "Sandalias" } },
		{ id: "5", category: { slug: "calzado-deportivo", name: "Deportivo" } },
		{ id: "6", category: { slug: "calzado-infantil", name: "Infantil" } },
		{ id: "7", category: { slug: "tacos-tacones", name: "Tacones" } },
	];

	const visibleCategories = categories.slice(0, 4);

	return (
		<div className="flex items-center gap-6">
			{/* <NavLink href="/products">Todos</NavLink> */}

			{visibleCategories.map((item) => {
				const isActive = pathName === `/category/${item.category.slug}`

				return (
					<Link
						key={item.id}
						href={`/category/${item.category.slug}`}
						className={clsx(
							"relative text-sm font-medium transition-colors duration-200",
							{
								"text-black": isActive,
								"text-neutral-600 hover:text-black": !isActive,
							}
						)}
					>
						{item.category.name}

						{/* Línea inferior activa */}
						<span
							className={clsx(
								"absolute -bottom-1 left-0 h-[2px] w-full transition-all duration-300",
								{
									"bg-black opacity-100": isActive,
									"opacity-0": !isActive,
								}
							)}
						/>
					</Link>
				);
			})}

			{/* <NavLink href="/categories">Ver más</NavLink> */}
		</div>
	);
};