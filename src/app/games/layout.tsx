import Link from "next/link";

function GameLayout({children}:{children:React.ReactNode}) {
    return ( <section><div className="flex gap-4">Home &bull; <Link href="/games">Games</Link></div>{children}</section> );
}

export default GameLayout;