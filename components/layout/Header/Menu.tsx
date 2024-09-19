"use client";

import React, { useState } from "react";
import { useKeyPress } from "@/hooks/useKeyPress";
import Image from "next/image";
import Link from "next/link";
import {
	Dialog,
} from "@/components/ui/dialog";
import { signOut } from "next-auth/react";

function Menu() {
	useKeyPress("a", () => {
		if (!dialogOpen) {
			setDialogOpen(true);
		}
	});
	const menuItems = [
		{
			icon: "/icons/svg/home.svg",
			text: "Home",
			url: "/",
			disabled: false,
		},
		{
			icon: "/icons/svg/edit.svg",
			text: "Edit",
			url: "/dashboard/edit",
			disabled: false,
		},
		{
			icon: "/icons/svg/docs.svg",
			text: "Docs",
			url: "/docs",
			disabled: false,
		},
	];

	const [dialogOpen, setDialogOpen] = useState(false);

	return (
		<div>
			{/* Desktop Menu */}
			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<div className="hidden lg:flex fixed h-screen w-full p-4 items-center top-0 left-0 pointer-events-none z-[39]">
					<div className="pointer-events-auto text-neutral-700 dark:text-neutral-300 group flex w-14 text-foreground-menu text-[15px] font-medium flex-col items-start gap-6 overflow-hidden rounded-[28px] dark:bg-[#120c43] bg-neutral-100 px-3 py-4 duration-200 hover:w-40 z-[99999]">

						{menuItems.map((item) => (
							<Link
								href={item.url}
								key={item.url}
								className="flex w-full items-center gap-3 px-1 duration-200 hover:scale-105 active:scale-90 justify-start text-white brightness-75 hover:brightness-125 cursor-pointer"
							>
								<Image
									src={item.icon as string}
									alt={`${item.text} icon`}
									width={24}
									height={24}
									className="hover:brightness-125 duration-200"
								/>
								<p className="opacity-0 duration-200 group-hover:opacity-100">
									{item.text}
								</p>
							</Link>
						))}
						<div className="pt-2 w-full">
							<div className="flex w-full text-white brightness-75 hover:brightness-125 focus:brightness-125  cursor-pointer items-center gap-3 px-1 duration-200 justify-start">
								<Image
									src={'/icons/svg/signout.svg'}
									alt="Signout Logo"
									onClick={() => signOut()}
									width={24}
									height={24}
									className="hover:brightness-125 focus:brightness-125 duration-200 text-white"
								/>
								<p className="opacity-0 duration-200 group-hover:opacity-100">
									Signout
								</p>
							</div>
						</div>
						<div className="pb-2 w-full">
						</div>
					</div>
				</div>

				{/* Mobile Menu */}
				<div className="lg:hidden fixed bottom-0 left-0 w-full p-4 dark:bg-[#050315] bg-neutral-100 z-50 text-neutral-700 dark:text-neutral-300">
					<div className="flex justify-around items-center">

						{menuItems.map((item) => (
							<Link
								aria-disabled={item.disabled}
								href={item.disabled ? "#" : item.url}
								key={item.url}
								className={`flex flex-col items-center ${item.disabled
									? "opacity-50 cursor-not-allowed"
									: "cursor-pointer"
									}`}
								onClick={(e) => item.disabled && e.preventDefault()}
							>
								<Image
									src={item.icon as string}
									alt={`${item.text} icon`}
									width={24}
									height={24}
									className="text-white brightness-100" // Ensure icon is visible
								/>
								<p className="text-xs text-foreground-menu mt-2 text-white">{item.text}</p>
							</Link>
						))}
						<Link
							href={"/"}
							className={`flex flex-col items-center text-white ${"cursor-pointer"}`}
						>
							<Image
								src={'/icons/svg/signout.svg'}
								alt="Signout icon"
								width={24}
								height={24}
							/>
							<p className="text-xs text-foreground-menu mt-2">Signout</p>
						</Link>
					</div>
				</div>
			</Dialog>
		</div>
	);
}

export default Menu;
