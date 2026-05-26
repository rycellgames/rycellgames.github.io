import Link from "next/link";
import { game } from "@/lib/global";
import { FavoriteStar } from "../personalized/buttons/favoriteStar";

export function GridCard({ name, id, ...props }: { name: string, id: string } & React.HTMLAttributes<HTMLHyperlinkElementUtils>) {
    return (
        <Link href={`/games/${id}`}
            data-id={id}
            className={`w-full flex flex-col-reverse items-center p-2 not-md:w-full aspect-square rounded-2xl bg-no-repeat bg-center bg-cover cursor-pointer hover:shadow-[inset_0px_0px_50px_20px_#111] transition-all duration-300 ease-in-out ${props.className ?? ''}`}
            style={{ backgroundImage: `url(/static/images/games/${id}.webp)`, ...props.style }}
        {...props}>
            <p>{name}</p>
        </Link>
    )
}

export function LargeCard({ name, id, ...props }: { name: string, id: string } & React.HTMLAttributes<HTMLHyperlinkElementUtils>) {
    return (
        <Link href={`/games/${id}`}
            className={`w-full flex flex-col-reverse items-center p-2 not-md:w-full aspect-square rounded-2xl bg-no-repeat bg-center bg-cover cursor-pointer hover:shadow-[inset_0px_0px_50px_20px_#111] transition-all duration-300 ease-in-out ${props.className ?? ''}`}
            style={{ backgroundImage: `url(/static/images/games/${id}.webp)`, ...props.style }}
            {...props}
        >
            <p>{name}</p>
        </Link>
    );
}

export function FavoriteCard({ game, ...props }: { game: game } & React.HTMLAttributes<HTMLHyperlinkElementUtils>) {
    return (
        <Link href={`/games/${game.id}`}
            data-id={game.id}
            className={`w-full
                 flex justify-between flex-col-reverse items-center p-2 not-md:w-full aspect-square rounded-2xl bg-no-repeat bg-center bg-cover cursor-pointer hover:shadow-[inset_0px_0px_50px_20px_#111] transition-all duration-300 ease-in-out ${props.className ?? ''}`}
            style={{ backgroundImage: `url(/static/images/games/${game.id}.webp)`, ...props.style }}
            {...props}>
            <p>{game.name}</p>
            <div className="w-full flex flex-row items-end z-10" onClick={(e) => e.stopPropagation()}>
                <FavoriteStar game={ game } />
            </div>
            
        </Link>
    )
}
