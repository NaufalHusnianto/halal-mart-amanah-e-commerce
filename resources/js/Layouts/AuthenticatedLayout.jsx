import { useEffect, useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import { Avatar, Badge, Button } from "@nextui-org/react";
import TextInput from "@/Components/TextInput";

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const [cartItemCount, setCartItemCount] = useState(0);

    const [isInvisible, setIsInvisible] = useState(false);

    useEffect(() => {
        if (user) {
            setIsInvisible(false);
        } else {
            setIsInvisible(true);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            axios
                .get(route("cart.itemCount"))
                .then((response) => {
                    setCartItemCount(response.data.itemCount);
                })
                .catch((error) => {
                    console.error("Error fetching cart item count:", error);
                });
        }
    }, [user]);

    return (
        <div className="min-h-screen">
            <nav className="bg-background fixed z-50 w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center gap-5">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-foreground" />
                                </Link>
                                <h1 className="font-bold text-xl">
                                    Halal Mart Amanah
                                </h1>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6 gap-4">
                            <Link
                                href="/chat"
                                className="flex justify-center hover:opacity-50 transition-opacity ease-in-out"
                            >
                                <Badge
                                    content="1"
                                    color="primary"
                                    isInvisible={isInvisible}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                                        />
                                    </svg>
                                </Badge>
                            </Link>
                            <Link
                                href="/cart"
                                className="flex justify-center hover:opacity-50 transition-opacity ease-in-out"
                            >
                                <Badge
                                    content={cartItemCount}
                                    color="primary"
                                    isInvisible={!user || cartItemCount === 0}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-6"
                                    >
                                        <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                    </svg>
                                </Badge>
                            </Link>
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            {user ? (
                                                <button
                                                    type="button"
                                                    className="inline-flex gap-2 items-center px-3 py-2 text-sm leading-4 font-medium rounded-md text-primary-foreground hover:opacity-50 transition-opacity outline-none ease-in-out duration-150"
                                                >
                                                    {user.name}
                                                    {user.profile_photo ? (
                                                        <Avatar
                                                            src={
                                                                "/storage/" +
                                                                user.profile_photo
                                                            }
                                                        />
                                                    ) : (
                                                        <Avatar
                                                            showFallback
                                                            src="https://images.unsplash.com/broken"
                                                        />
                                                    )}
                                                </button>
                                            ) : (
                                                <Link href="/login">
                                                    <Button
                                                        className="bg-primary"
                                                        size="sm"
                                                    >
                                                        Sign In
                                                    </Button>
                                                </Link>
                                            )}
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link href="/admin">
                                            Jual Produk
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        {user ? (
                            <div className="px-4">
                                <div className="font-medium text-base text-gray-800">
                                    {user.name}
                                </div>
                                <div className="font-medium text-sm text-gray-500">
                                    {user.email}
                                </div>
                            </div>
                        ) : (
                            <p className="px-4">Guest User</p>
                        )}

                        <div className="mt-3 space-y-1">
                            {user ? (
                                <>
                                    <ResponsiveNavLink
                                        href={route("profile.edit")}
                                    >
                                        Profile
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink
                                        method="post"
                                        href={route("logout")}
                                        as="button"
                                    >
                                        Log Out
                                    </ResponsiveNavLink>
                                </>
                            ) : (
                                <ResponsiveNavLink href={route("login")}>
                                    Sign In
                                </ResponsiveNavLink>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-content1 shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
