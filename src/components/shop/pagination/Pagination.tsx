'use client'

import { generatePaginationNumbers } from '@/src/utils/generatePaginationNumbers';
import clsx from 'clsx';
import Link from 'next/link'
import { redirect, usePathname, useSearchParams } from 'next/navigation';


interface Props {
    pagination: {
        currentPage: number;
        totalPages: number;
    }

}

const Pagination = ({ pagination }: Props) => {

    const { totalPages } = pagination;

    const pathname = usePathname();
    const searchParams = useSearchParams();

    const pageString = searchParams.get('page') ?? 1;
    const currentPage = isNaN(+pageString) ? 1 : +pageString;

    if (currentPage < 1 || isNaN(+pageString)) {
        redirect(pathname);
    }

    const allPages = generatePaginationNumbers(currentPage, totalPages);


    const createPageUrl = (pageNumber: number | string) => {

        const params = new URLSearchParams(searchParams);

        if (pageNumber === '...') {
            return `${pathname}?${params.toString()}`
        }
        if (+pageNumber <= 0) {
            return `${pathname}`; //   href="/kid";
        }

        if (+pageNumber > totalPages) { // Next > 
            return `${pathname}?${params.toString()}`;
        }

        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    }


    return (
        <div className="flex justify-center mt-15">
            <div className="bg-white shadow-card rounded-md p-2">
                <ul className="flex items-center gap-2">
                    <li>
                        <button
                            id="paginationLeft"
                            aria-label="button for pagination left"
                            type="button"
                            disabled
                            className="flex items-center justify-center size-8 transition-colors duration-200 rounded-sm disabled:text-gray-400"
                        >
                            <svg
                                className="fill-current"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12.1782 16.1156C12.0095 16.1156 11.8407 16.0594 11.7282 15.9187L5.37197 9.45C5.11885 9.19687 5.11885 8.80312 5.37197 8.55L11.7282 2.08125C11.9813 1.82812 12.3751 1.82812 12.6282 2.08125C12.8813 2.33437 12.8813 2.72812 12.6282 2.98125L6.72197 9L12.6563 15.0187C12.9095 15.2719 12.9095 15.6656 12.6563 15.9187C12.4876 16.0312 12.347 16.1156 12.1782 16.1156Z"
                                    fill=""
                                />
                            </svg>
                        </button>
                    </li>
                    {allPages.map((page) => (
                        <li key={page}>
                            <Link
                                href={createPageUrl(page)}
                                className={clsx(
                                    "flex py-1.5 px-3.5 transition-colors duration-200 rounded-sm bg-gray-100 text-gray-800 hover:bg-gray-200",
                                    {
                                        // ' text-white bg-sky-700 ': currentPage === page,
                                        ' text-white bg-slate-800 hover:bg-slate-900 ': currentPage === page,
                                        // 'bg-white text-gray-700 hover:bg-gray-100': currentPage !== page,
                                        // 'cursor-not-allowed': page === '...'
                                    }
                                )}
                            >
                                {page}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <button
                            id="paginationRight"
                            aria-label="button for pagination right"
                            type="button"
                            className="flex items-center justify-center size-8 transition-colors duration-200 rounded-sm text-gray-700 hover:text-black hover:bg-gray-100 disabled:text-gray-400"
                        >
                            <svg
                                className="fill-current"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5.82197 16.1156C5.65322 16.1156 5.5126 16.0594 5.37197 15.9469C5.11885 15.6937 5.11885 15.3 5.37197 15.0469L11.2782 9L5.37197 2.98125C5.11885 2.72812 5.11885 2.33437 5.37197 2.08125C5.6251 1.82812 6.01885 1.82812 6.27197 2.08125L12.6282 8.55C12.8813 8.80312 12.8813 9.19687 12.6282 9.45L6.27197 15.9187C6.15947 16.0312 5.99072 16.1156 5.82197 16.1156Z"
                                    fill=""
                                />
                            </svg>
                        </button>
                    </li>
                </ul>
            </div>
        </div >
    )
}

export default Pagination