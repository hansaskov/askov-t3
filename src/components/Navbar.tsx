import { signIn, signOut, useSession } from "next-auth/react";
import { ArrowRightOnRectangleIcon, Cog8ToothIcon, GiftIcon } from "@heroicons/react/20/solid";

import Link from "next/link";

export const Navbar = () => {

    return (
        <div className="navbar bg-base-200  top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <li><Link href={"/wishlist"}>Ønskeliste</Link></li>
                    <li><Link href={"/event"}>Begivenheder</Link></li>
                    </ul>
                </div>
                <Link href={"/"} className="btn btn-ghost normal-case text-xl">Askov</Link>
            </div>
            <div className="navbar-center hidden md:flex">
                <ul className="menu menu-horizontal hover-bordered px-1">
                    <li><Link href={"/wishlist"}>Ønskeliste</Link></li>
                    <li><Link href={"/event"}>Begivenheder</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                <Avatar />
            </div>
        </div>
    );
};

const Avatar = () => {  
    const { data: sessionData } = useSession();
    const username = sessionData?.user?.name ?? ""
    const myWishlist = "/wishlist/" + username;
    return (
        <div >
            {sessionData?.user ? (
                <div className="dropdown dropdown-end dropdown-hover">
                    <div tabIndex={0} className="avatar btn btn-circle btn-ghost w-12 h-12">
                        <div className="w-10 rounded-full hover">
                            <img
                                src={sessionData?.user?.image ?? ""}
                                alt={sessionData?.user?.name ?? ""}
                            />

                        </div>
                    </div>
                    <div className="dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-box w-52">
                        <li><Link href={myWishlist} >
                            <GiftIcon className=" h-4 w-4" />
                            Min Ønskeliste
                        </Link></li>
                        <li><a>
                            <Cog8ToothIcon className=" h-4 w-4" />
                            Settings
                        </a></li>
                        <li><a onClick={() => void signOut()}>
                            <ArrowRightOnRectangleIcon className="h-4 w-4" />
                            Sign out
                        </a></li>
                    </div>
                </div>
            ) : (
                <button
                    className="btn-ghost rounded-btn btn"
                    onClick={() => void signIn()}
                >
                    Sign In
                </button>
            )}
        </div>
    )
}