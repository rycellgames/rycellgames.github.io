import Link from "next/link";
import { game } from "@/lib/global";
import { FavoriteStar } from "../personalized/buttons/favoriteStar";

export function GridCard({ name, id, ...props }: { name: string, id: string } & React.HTMLAttributes<HTMLHyperlinkElementUtils>) {
    return (
        <div className={`group w-full flex flex-col-reverse relative justify-between items-center not-md:w-full aspect-square rounded-2xl cursor-pointer hover:shadow-[inset_0px_0px_50px_20px_#111] transition-all duration-300 ease-in-out ${props.className ?? ''}`}>
            <Link href={`/games/${id}`} data-id={id} className={"z-2 w-full h-full absolute group-hover:shadow-[inset_0px_0px_50px_20px_#111] transition-all duration-300 ease-in-out"}

                {...props}
            >
                
            </Link>
            <img loading="lazy" className="z-1 w-full absolute h-full object-cover rounded-2xl" src={`/static/images/games/${id}.webp`} alt={`${name}`}></img>
            <p className="pb-2 z-20">{name}</p>

            <div className="z-3 w-full flex-row items-start p-3">
                <FavoriteStar game={{ name: name, id: id }} />
            </div>

        </div>
    )
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
                <FavoriteStar game={game} />
            </div>

        </Link>
    )
}
