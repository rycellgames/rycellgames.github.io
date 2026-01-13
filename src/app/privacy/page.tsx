export default function privacy() {
    return (<div className="p-20 not-md:p-5 w-full flex flex-col items-center justify-center">
        <title>Privacy | Rycell Games</title>
        <div className="max-w-200 flex flex-col gap-5">
            <h1 id="our-privacy-policy" className="text-5xl">Our Privacy Policy</h1>
            <p><strong>Effective Date:</strong> 13/01/26</p>
            <span id="effective-date" data-iso="2026-01-13" aria-hidden="true"></span>
            <script dangerouslySetInnerHTML={{
                __html: `
                    (function(){
                        const span = document.getElementById('effective-date');
                        if(!span) return;
                        const iso = span.getAttribute('data-iso') || '2026-01-13';
                        const date = new Date(iso + 'T00:00:00');
                        const opts = { year: '2-digit', month: '2-digit', day: '2-digit' };
                        const locale = (navigator && (navigator.language || navigator.userLanguage)) || 'en-US';
                        const formatted = date.toLocaleDateString(locale, opts);
                        const prev = span.previousSibling;
                        if(prev && prev.nodeType === Node.TEXT_NODE){
                            // replace the hardcoded date text node if present
                            prev.textContent = prev.textContent.replace(/\\d{1,2}[\\/\\-]\\d{1,2}[\\/\\-]\\d{2,4}/, formatted).trim();
                        } else {
                            span.textContent = formatted;
                        }
                    })();
                `
            }} />
            <p>By accessing or using Rycell Games (accessible at <a href="http://rycellgames.github.io">rycellgames.github.io</a>), <strong>you agree to the practices
                described in this Privacy Policy</strong>. If you do not agree with our policies, please do not use
                this site.</p>

            <h3 id="information-we-collect" className="text-3xl">1. Information We Collect</h3>
            <p>We do not collect personally identifiable information directly. However, we use third-party services that
                collect technical data, including:</p>
            <h4 id="a.-google-analytics" className="text-xl font-semibold">
                a. Google Analytics
            </h4>

            <p>
                We use Google Analytics (GA4) to understand how users interact with our website.
                Google Analytics automatically collects certain information, including:
            </p>

            <ul>
                <li>
                    <p>
                        <strong>IP-related location data</strong> (used to estimate approximate
                        geographic location; IP addresses are not stored or shown to us)
                    </p>
                </li>
                <li>
                    <p>
                        <strong>Device and browser information</strong>, including browser type,
                        version, operating system, and language
                    </p>
                </li>
                <li>
                    <p>
                        <strong>Usage data</strong>, such as pages viewed, time spent on pages,
                        scroll activity, and referring websites
                    </p>
                </li>
                <li>
                    <p>
                        <strong>Cookies or similar technologies</strong> to distinguish returning
                        visitors and analyze usage patterns anonymously
                    </p>
                </li>
            </ul>

            <h4 id="b.-cloudflare-web-analytics" className="text-xl">b. Cloudflare Web Analytics</h4>
            <p>Cloudflare collects non-personally identifiable technical data such as:</p>
            <ul>
                <li>
                    <p>Page views</p>
                </li>
                <li>
                    <p>Browser/device types</p>
                </li>
                <li>
                    <p>Referring URLs<br></br>
                        Cloudflare does <strong>not</strong> use cookies or track individual users.</p>
                </li>
            </ul>
            <h4 id="c.-google-adsense" className="text-xl">c. Google AdSense</h4>
            <p>We use AdSense to serve ads. Google may use:</p>
            <ul>
                <li>
                    <p><strong>Cookies</strong> and tracking technologies</p>
                </li>
                <li>
                    <p><strong>User data</strong> (e.g., device info, IP, browsing behavior)<br></br>
                        This may include personalized ads based on your activity. You can manage your preferences or opt
                        out at <a href="https://adssettings.google.com/">Google Ads Settings</a>.</p>
                </li>
            </ul>

            <h3 id="third-party-games-and-content" className="text-3xl">2. Third-Party Games and Content</h3>
            <p>Some games or features may come from third-party providers. We cannot guarantee that these providers
                follow our privacy standards. Interacting with their content may subject you to their own data
                practices.</p>

            <h3 id="cookies" className="text-3xl">3. Cookies</h3>
            <ul>
                <li>
                    <p>Umami uses a cookie for anonymous analytics.</p>
                </li>
                <li>
                    <p>AdSense uses cookies for ad personalization.<br></br>
                        You can block or clear cookies through your browser settings.</p>
                </li>
            </ul>

            <h3 id="data-security" className="text-3xl">4. Data Security</h3>
            <p>Some data on this site is collected by third-party services (like analytics providers, ad networks, and
                external game hosts). While we aim to work with trusted services, <strong>we don’t control how these
                    third parties handle or secure your data</strong>. By using the site, you understand that
                <strong>any data shared with third-party tools is subject to their own policies and security
                    practices</strong>, not ours.</p>

            <h3 id="children’s-privacy" className="text-3xl">5. Children’s Privacy</h3>
            <p>Our site is not intended for users under 13. We do not knowingly collect personal information from
                children. If you believe this has occurred, contact us.</p>

            <h3 id="user-consent" className="text-3xl">6. User Consent</h3>
            <p>By continuing to use this site, you <strong>consent to the use of cookies, analytics, and advertising
                tools as described</strong> in this Privacy Policy.</p>
            <h3 id="changes-to-this-policy">7. <strong>Changes to This Policy</strong></h3>
            <p>We may update this Privacy Policy periodically. Any changes will be posted on this page with a new
                effective date.</p>

            <h3 id="contact" className="text-3xl">8. Contact</h3>
            <p>For questions or concerns, email us at <a href="mailto:itsprobablyjackson@proton.me">itsprobablyjackson@proton.me</a></p>
        </div>
    </div>)
}