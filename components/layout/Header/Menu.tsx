"use client";

import React, { useState } from "react";
import { useKeyPress } from "@/hooks/useKeyPress";
import Image from "next/image";
import Link from "next/link";
import { Dialog } from "@/components/ui/dialog";
import { signOut } from "next-auth/react";
import { ModeToggle } from "@/components/ui/ThemeToggle";

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
		{
			icon: "/icons/svg/key.svg",
			text: "Apikey",
			url: "/dashboard/apikey",
			disabled: false
		}
	];

	const [dialogOpen, setDialogOpen] = useState(false);

	return (
		<div>
			{/* Desktop Menu */}
			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<div className="hidden lg:flex fixed h-screen w-full p-4 items-center top-0 left-0 pointer-events-none z-[39]">
					<div className="pointer-events-auto text-neutral-700 dark:text-neutral-300 group flex w-14 text-[15px] font-medium flex-col items-start gap-6 overflow-hidden rounded-[28px] dark:bg-[#120c43] bg-neutral-100 px-3 py-4 duration-200 hover:w-40 z-[99999] dark:hover:bg-[#20114d] hover:bg-neutral-200">
						{menuItems.map((item) => (
							<Link
								href={item.url}
								key={item.url}
								className="flex w-full items-center gap-3 px-1 duration-200 hover:scale-105 active:scale-90 justify-start text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
							>
								<Image
									src={item.icon as string}
									alt={`${item.text} icon`}
									width={24}
									height={24}
									className="duration-200 hover:brightness-125"
								/>
								<p className="opacity-0 duration-200 group-hover:opacity-100">
									{item.text}
								</p>
							</Link>
						))}

						{/* Signout */}
						<div className="pt-2 w-full">
							<div
								className="flex w-full text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white cursor-pointer items-center gap-3 px-1 duration-200"
								onClick={() => signOut()}
							>
								<Image
									src={"/icons/svg/signout.svg"}
									alt="Signout Logo"
									width={24}
									height={24}
									className="duration-200 hover:brightness-125"
								/>
								<p className="opacity-0 duration-200 group-hover:opacity-100">
									Signout
								</p>
							</div>
						</div>

						{/* Theme Toggle */}
						<div className="pt-2 w-full">
							<div className="flex w-full cursor-pointer items-center gap-3 px-1 duration-200 justify-start">
								<ModeToggle />
								<p className="opacity-0 duration-200 group-hover:opacity-100">
									Theme
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Mobile Menu */}
				<div className="lg:hidden fixed bottom-0 left-0 w-full p-4 bg-neutral-100 dark:bg-[#050315] text-neutral-700 dark:text-neutral-300 z-50">
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
									className="brightness-100"
								/>
								<p className="text-xs mt-2">{item.text}</p>
							</Link>
						))}

						{/* Signout */}
						<Link
							href="/"
							className="flex flex-col items-center cursor-pointer"
							onClick={() => signOut()}
						>
							<Image
								src={"/icons/svg/signout.svg"}
								alt="Signout icon"
								width={24}
								height={24}
							/>
							<p className="text-xs mt-2">Signout</p>
						</Link>

						{/* Theme Toggle */}
						<div className="flex flex-col items-center cursor-pointer">
							<ModeToggle />
							<p className="text-xs mt-2">Theme</p>
						</div>
					</div>
				</div>
			</Dialog>
		</div>
	);
}

export default Menu;
