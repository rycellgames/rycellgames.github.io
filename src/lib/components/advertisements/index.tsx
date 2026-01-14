export function BannerAd() {
    return (
        <div className="w-full min-h-30 p-3 rounded-2xl bg-main-700">
            <p>Advertisement</p>
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9758035810696915"
                crossOrigin="anonymous"></script>
            
            <ins className="adsbygoogle"
                style={{display: "block"}}
                data-ad-client="ca-pub-9758035810696915"
                data-ad-slot="5423220557"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
            <script>
                (adsbygoogle = window.adsbygoogle || []).push({ });
            </script>
        </div>
    )
}