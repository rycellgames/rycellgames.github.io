'use client'
import { useEffect } from "react"

type props = { className?: string }

import { usePathname } from "next/navigation";
import { useState } from "react";

const BannerAd = ({ className = "" }) => {
    const pathname = usePathname();
    const [adKey, setAdKey] = useState(0);

    useEffect(() => {
        setAdKey(k => k + 1);
    }, [pathname]);

    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error(e);
        }
    }, [adKey]);

    return (
        <div className={"bg-zinc-900 w-full h-10 rounded-lg " + className}>
            <ins
                key={adKey}
                className="adsbygoogle"
                style={{ display: "block", width: "100%", height: "100%" }}
                data-ad-client="ca-pub-9758035810696915"
                data-ad-slot="3103664696"
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        </div>
    );
};


const SplitBannerAds = ({ className = "" }: props) => {
    // two advertisements split on the front screen
    if (typeof window === 'undefined') return null;

    const pathname = usePathname();
    const [adKey, setAdKey] = useState(0);
    const [adKey2, setAdKey2] = useState(1)

    useEffect(() => {
        setAdKey(k => k + 1);
        setAdKey2(adKey2 => adKey2 + 1)
    }, [pathname]);


    useEffect(() => {
        try {
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        } catch (err) {
            console.error(err)
        }
    }, [])

    return (
        <div className={"w-full max-h-200 rounded-lg flex flex-row gap-5 justify-between items-center " + className}>
            <ins className="adsbygoogle bg-zinc-900"
                style={{ display: 'block', height: '100%', width: '100%' }}
                data-ad-client="ca-pub-9758035810696915"
                data-ad-slot="3103664696"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
            <ins className="adsbygoogle bg-zinc-900 not-md:hidden"
                style={{ display: 'block', height: '100%', width: '100%' }}
                data-ad-client="ca-pub-9758035810696915"
                data-ad-slot="2746910158"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        </div>
    )
}

export { BannerAd, SplitBannerAds }