"use client";

import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import { PRODUCTS, Product } from "@/lib/data";

type SearchBoxProps = {
    activeCategory: string;
    setFilteredProducts: (products: Product[]) => void;
    className?: string;
};

const SearchBox = ({
    activeCategory,
    setFilteredProducts,
    className,
}: SearchBoxProps) => {
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const query = searchText.trim().toLowerCase();
        const filtered = PRODUCTS.filter((product) => {
            const matchesCategory =
                activeCategory === "All" || product.category === activeCategory;

            const matchesSearch = product.name
                .toLowerCase()
                .includes(query);

            return matchesCategory && matchesSearch;
        });

        setFilteredProducts(filtered);
    }, [searchText, activeCategory, setFilteredProducts]);

    const clearSearch = () => {
        setSearchText("");
    };

    return (
        <div
            className={twMerge(
                "flex h-12 w-full items-center gap-4 rounded-xl border border-[#494948] bg-[#141414] px-5 py-1",
                className
            )}
        >
            <CiSearch size={25} className="shrink-0 text-[#5b5b5a]" />

            <form
                className="h-full min-w-0 flex-1"
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search products, brands, and collections"
                    className="h-full w-full border-0 bg-transparent text-white outline-none placeholder:text-[#5D6369]"
                />
            </form>

            {searchText && (
                <>
                    <span className="h-6 w-px shrink-0 bg-[#2B2A2B]" />

                    <button
                        type="button"
                        onClick={clearSearch}
                        aria-label="Clear search"
                        className="shrink-0 text-white/70 transition-colors hover:text-white"
                    >
                        <RxCross2 size={24} />
                    </button>
                </>
            )}
        </div>
    );
};

export default SearchBox;
