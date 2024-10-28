import React, { children } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SignInLayout = ({ children }) => {

    const user = useSelector((State) =>  State.user.user);                 
    return (
        <div className="grid grid-cols-1">
            <div>
                <nav className="bg-black opacity-70  w-full py-3 mb-5">
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className=" flex h-16 items-center justify-between">
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                <h1 className="text-white text-4xl font- ">
                                    <span className="text-gray-400">THE</span>NORTHPOLE
                                </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <div>{children}</div>
        </div>
    )
}

export default SignInLayout;