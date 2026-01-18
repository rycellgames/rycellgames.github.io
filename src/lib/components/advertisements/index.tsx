"use client";

export function BannerAd() {
    return (
        <div className="bg-main-700 w-full min-h-10 rounded-lg p-5 max-w-[1000px]">
            <p>Advertisement</p>
            <div className="flex flex-col items-center justify-center">
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9758035810696915"
                crossOrigin="anonymous"></script>
            
            <ins className="adsbygoogle"
                style={{display: "block", height: "100%", width: "100%"}}
                data-ad-client="ca-pub-9758035810696915"
                data-ad-slot="5423220557"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
            <script>
                (adsbygoogle = window.adsbygoogle || []).push({ });
        </script>
        </div>    
        </div>
    )
}