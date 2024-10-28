import React from "react";

const SideBarCompo = () => {
    return(
        <div className="grid grid-cols-1 text-white px-10">
            <div>
                <p>Home  Products</p>
            </div>
            <div className="border-b-2 text-lg border-white my-3 py-3">
                <h1>Browse by</h1>
            </div>
            <div className="flex flex-col">
                <p>All products</p>
                <p>Backpacks</p>
                <p>Duffle bags</p>
                <p>New Arrivals</p>
                <p>Travel Packs</p>
            </div>
            <div className="border-b-2 text-lg border-white py-3">
                <h1>Filter by</h1>
            </div>
            <div className="border-b-2 border-white  py-3">
                <h1>Price</h1>
            </div>
            <div className="border-b-2 border-white  py-3">
                <h1>Color</h1>
            </div>
        </div>
    );
};

export default SideBarCompo;