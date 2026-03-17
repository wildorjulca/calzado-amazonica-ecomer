"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { logout } from "@/src/actions/auth/logout"

type Props = {
	user: any
}

const links = [
	{ label: "Perfil", href: "/my-account" },
	{ label: "Mis órdenes", href: "/my-account/orders" },
	{ label: "Favoritos", href: "/my-account/favoritos" },
	{ label: "Experiencias", href: "/my-account/experiencias" },
	{ label: "Configuración de la cuenta", href: "/my-account/configuracion" },
]

export function UserMenu({ user }: Props) {
	const [open, setOpen] = useState(false)

	return (
		<div className="flex items-center gap-2">
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<button className="flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-black">
						<span>Hola, {user.name}</span>

						{/* <UserAvatar user={user} /> */}

						<ChevronDown
							size={16}
							className={`transition-transform ${open ? "rotate-180" : "rotate-0"
								}`}
						/>
					</button>
				</PopoverTrigger>

				<PopoverContent align="end" className="w-56 p-2 relative top-3 rounded-none">
					<div className="flex flex-col text-sm">
						{links.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className="rounded px-3 py-2 hover:bg-neutral-100"
							>
								{link.label}
							</Link>
						))}

						<div className="my-1 border-t" />

						<button
							className="rounded px-3 py-2 text-left text-red-600 hover:bg-red-50"
							onClick={async () => {
								// aquí va el signOut()
								await logout()
							}}
						>
							Cerrar sesión
						</button>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	)
}