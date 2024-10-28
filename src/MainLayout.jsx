import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const MainLayout = ({ children }) => {
    const user = useSelector((state) => state.user.user);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!isAuthenticated) {
            const token = localStorage.getItem("authToken");
            if (token) {
                dispatch(isAuthenticated(true));
            }
        }
    }, [isAuthenticated]);

    const handleClick1 = () => { 
        navigate('/dashboard')
        setTimeout(() => {
            handleScroll("about"); 
        }, 10)        
    }
    
    const handleClick2 = () => {
        navigate('/dashboard')
        setTimeout(() => {
            handleScroll("contact"); 
        }, 10)        
    }

    const handleScroll = (sectionId) => {
        const section = document.getElementById(sectionId);
        section.scrollIntoView({ behavior: "smooth" });
    };

    function toggleDropdown() {
        const dropdownMenu = document.getElementById("dropdownMenu");
        dropdownMenu.classList.toggle("hidden");
    }

    const handleSignInClick = () => {
        if (!isAuthenticated) {
            navigate("/login");
        } else {
            navigate("/userDetails");
        }
    };

    return (
        <div className="grid grid-cols-1">
            <div>
                <nav className="bg-black opacity-70 absolute w-full py-3">
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <h1 className="text-white text-4xl font-">
                                        <span className="text-gray-400">THE</span>NORTHPOLE
                                    </h1>
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        <Link
                                            to="/dashboard"
                                            className={`rounded-md px-3 py-2 text-sm font-medium ${location.pathname === "/dashboard"
                                                ? "bg-gray-900 text-white"
                                                : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                                }`}
                                            aria-current="page"
                                        >
                                            Dashboard
                                        </Link>
                                        <Link
                                            to="/shop"
                                            className={`rounded-md px-3 py-2 text-sm font-medium ${location.pathname === "/shop"
                                                ? "bg-gray-900 text-white"
                                                : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                                }`}
                                        >
                                            SHOP
                                        </Link>
                                        <p
                                            
                                            onClick={handleClick1}
                                            className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                        >
                                            ABOUT
                                        </p>
                                        <p
                                            
                                            onClick={handleClick2}
                                            className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                        >
                                            CONTACT
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button
                                    type="button"
                                    className="relative mr-2 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    onClick={() => navigate('/cart')}
                                >
                                    <span className="absolute -inset-1.5"></span>
                                    <span className="sr-only">View cart</span>
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 3h18l-2.34 12.04A4.5 4.5 0 0114.3 18H8.7a4.5 4.5 0 01-4.37-2.96L3 3zm7.5 16.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
                                        />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <span className="absolute -inset-1.5"></span>
                                    <span className="sr-only">View notifications</span>
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                                        />
                                    </svg>
                                </button>

                                {/* Profile dropdown */}
                                <div className="relative ml-3">
                                    <div>
                                        <button
                                            type="button"
                                            onClick={toggleDropdown}
                                            className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                            id="user-menu-button"
                                            aria-expanded="false"
                                            aria-haspopup="true"
                                        >
                                            <span className="absolute -inset-1.5"></span>
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                alt=""
                                            />
                                        </button>
                                    </div>
                                    <div
                                        id="dropdownMenu"
                                        className="hidden absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="user-menu-button"
                                        tabIndex="-1"
                                    >
                                        <button
                                            onClick={handleSignInClick}
                                            className="block px-4 py-2 text-sm text-gray-700"
                                            role="menuitem"
                                            tabIndex="-1"
                                            id="user-menu-item-0"
                                        >
                                            <span className="block text-sm text-gray-700">
                                                {isAuthenticated ? user?.firstName || 'Profile' : "Sign In"}
                                            </span>
                                        </button>
                                        {isAuthenticated && (
                                            <>
                                                <Link
                                                    to="#"
                                                    className="block px-4 py-2 text-sm text-gray-700"
                                                    role="menuitem"
                                                    tabIndex="-1"
                                                    id="user-menu-item-1"
                                                >
                                                    Settings
                                                </Link>
                                                <Link
                                                    to="/login"
                                                    className="block px-4 py-2 text-sm text-gray-700"
                                                    role="menuitem"
                                                    tabIndex="-1"
                                                    id="user-menu-item-2"
                                                >
                                                    Log Out
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <div>{children}</div>
        </div>
    );
};

export default MainLayout;
