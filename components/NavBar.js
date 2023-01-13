import Link from "next/link"

export default function NavBar({handleHomeOnClick, children}){
    return (
        <nav className="bg-slate-50 px-2 sm:px-4 py-2.5  fixed w-full z-20 top-0 left-0 border-b border-gray-200">
            <div className="container flex flex-wrap items-center justify-center md:justify-between mx-auto">
                <Link href="/" className="flex items-center py-3 md:py-0" onClick={handleHomeOnClick}>
                    <svg className="h-6 mr-3 md:h-9" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                    </svg>
                    <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">MMSR Project - Team B</span>
                </Link>
                {children}


                
            </div>
        </nav>
    )
}