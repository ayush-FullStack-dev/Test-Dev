"use client"

import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { twMerge } from 'tailwind-merge'
import { PRODUCTS, Product } from "@/lib/data"

type SearchBoxProps = {
    activeCategory: string;
    setFilteredProducts: (products: Product[]) => void;
    className?: string
}

const SearchBox = ({ activeCategory, setFilteredProducts, className }: SearchBoxProps) => {
    const [searchText, setSearchText] = useState("");

    if (searchText) {
        const categoryFilter = activeCategory === "All"
            ? PRODUCTS
            : PRODUCTS.filter((p) => p.category === activeCategory)

        const searchFilter = categoryFilter.filter((product) =>
            product.name.toLowerCase().includes(searchText.toLowerCase())
        );

        setFilteredProducts(searchFilter)
    }
    return (
        <div
            className={twMerge("w-full h-12 flex items-center gap-5 px-5 py-1 rounded-xl bg-[#141414] border border-[#494948]", className)}
        >
            <CiSearch
                size={25}
                className="text-[#5b5b5a]"
            />

            <form className="w-full h-full" onSubmit={(e) => (e.preventDefault())}>
                <input
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search product, brands, and collections"
                    className="w-full h-full border-0 outline-0 bg-transparent text-white placeholder:text-[#5D6369]"
                />
            </form>

            {
                searchText && <>
                    <span className="h-full w-px bg-[#2B2A2B]"></span>
                    <RxCross2 className="cursor-pointer" size={28} onClick={() => (setSearchText(""))} />
                </>
            }
        </div>
    )
}

export default SearchBox