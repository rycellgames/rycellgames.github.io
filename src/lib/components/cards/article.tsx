import Image from "next/image"

import { Montserrat } from "next/font/google"

const fontFamily = Montserrat({
    weight: "500",
    subsets: ["latin"]
})

const lightFontFamily = Montserrat({
    weight: "300",
    subsets: ["latin"]
})
interface props {
    name: string, shortDescription: string, href: string, thumbnail: string, identifier: string,
}

export default {
    largeCard: function ({ name, shortDescription, href, thumbnail, identifier }: props) {
        return (
            <a className="w-full min-h-full rounded-lg flex flex-col" key={identifier} href={href}>
                <Image src={thumbnail} alt={name} className="w-full h-7/8 not-md:max-h-6/8 object-cover rounded-2xl" width={940} height={550} />
                <div className="py-2">
                    <p className={`text-xl font-bold text-ellipsis ${fontFamily.className}`}>{name}</p>
                    <p className={`text-sm text-ellipsis text-zinc-300 h-full ${fontFamily.className}`}>{shortDescription}</p>
                </div>
            </a>
        )

    },
    gridCard: function ({ name, shortDescription, href, thumbnail, identifier }: props) {
        return (
            <a className="w-[100%] h-full box-border rounded-lg" key={identifier} href={href}>
                <Image src={thumbnail} alt={name} className="w-full max-h-6/8 object-cover rounded-2xl" width={425} height={185} />
                <div className="p-2">
                    <p className={`text-lg font-bold ${fontFamily.className}`}>{name}</p>
                    <p className={`text-sm ${lightFontFamily.className} text-zinc-300`}>{shortDescription}</p>
                </div>
            </a>
        )
    },
    secondaryGridCard: function ({ name, shortDescription, href, thumbnail, identifier }: props) {
        return (
            <a className="w-[100%] box-border rounded-lg" key={identifier} href={href}>
                <Image src={thumbnail} alt={name} className="w-full max-h-6/8 object-cover rounded-2xl" width={425} height={185} />
                <div className="py-2">
                    <p className={`text-xl font-bold ${fontFamily.className}`}>{name}</p>
                    <p className={`text-sm ${lightFontFamily.className} text-zinc-300`}>{shortDescription}</p>
                </div>
            </a>
        )
    },

    articleCard: function ({ name, shortDescription, href, thumbnail, identifier }: props) {
        return (
            <a className="w-full rounded-lg flex flex-col" key={identifier} href={href}>
                <div className={`w-full bg-center bg-cover bg-no-repeat rounded-2xl aspect-video`} style={{backgroundImage: `url(${thumbnail})`}}></div>
                <div className="pt-2">
                    <p className="text-xl font-bold text-ellipsis">{name}</p>
                    <p className="text-sm text-zinc-300 text-ellipsis h-full">{shortDescription}</p>
                </div>
            </a>
        )
    }
}