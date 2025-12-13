import "@/app/globals.css"
import Articles from "@/lib/articles"
import { Montserrat, Roboto } from "next/font/google";
import Header from "@/lib/navigation/header"
import Footer from "@/lib/navigation/footer"
import Link from 'next/link'

type articleData = {
    found: boolean,
    title: string,
    tags: string[],
    slug: string,
    image: string,
    content: string,
    imgAlt: string,
    author: string,
    readTime: string,
    fileName: string,
    description: string
}


const fontFamily = Montserrat({
    weight: "500",
    subsets: ["latin"]
})

const lightFontFamily = Montserrat({
    weight: "300",
    subsets: ["latin"]
})

type article = {
    found: boolean,
    title: string,
    path: string,
    tags: string[],
    slug: string,
    image: string,
    content: string,
    imgAlt: string,
    author: string,
    readTime: string,
}

type articleClient = {
    article: article
    extraHtml: {
        sideArticles: articleData[]
    }
}

interface context {
    params: {
        slug?: string
    }
}

export default function Page({ article, extraHtml }: articleClient) {
    return (
        <>
            <Header />

            <div className="ml-16 min-h-[100vh] flex flex-col justify-between">
                <div className="grow flex flex-row gap-6 justify-between relative px-4 py-6 max-w-[1200px] w-full mx-auto">
                    <main className={`grow max-w-[780px] flex flex-col gap-5 box-border p-2`}>
                        <div className="rounded-2xl relative bg-center w-full aspect-video bg-cover inset-shadow flex flex-col-reverse box-border p-4" style={{ backgroundImage: `url(${article.image})` }}>

                        </div>
                        <h1 className={`text-white font-bold text-2xl ${fontFamily.className}`}>{article.title}</h1>
                        <p className={`text-white text-sm`}>{article.readTime} read - Published 13/12/25 AEST by {article.author}</p>
                        <article dangerouslySetInnerHTML={{ __html: article.content }} className={`flex flex-col gap-5 ${lightFontFamily.className}`}></article>
                    </main>

                    <aside className="w-[320px] hidden not-sm:block">
                        <div className="bg-surface-100 rounded-lg p-4 sticky top-24">
                            <h3 className="font-bold mb-3">More Articles</h3>
                            <ul className="flex flex-col gap-3">
                                {extraHtml?.sideArticles?.map((a, idx) => (
                                    <li key={a.slug + idx} className="flex gap-3 items-center">
                                        <Link href={`/articles/${a.slug}`} className="flex items-center gap-3 w-full">
                                            <img src={a.image} alt={a.imgAlt || a.title} className="w-16 h-12 object-cover rounded" />
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium">{a.title}</span>
                                                <span className="text-xs text-muted">{a.readTime} read</span>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </div>

                <Footer />
            </div>
        </>
    )

}

export async function getStaticPaths() {
    const allArticles = Articles.list() as articleData[];
    const paths = allArticles.map(article => ({
        params: { slug: article.slug }
    }));

    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps(context: context) {
    const slug = context.params.slug || '';
    const articleData = await Articles.getBySlug(slug) as article;

    if (!articleData.found) return { notFound: true };

    let articleList: articleData[] = [];
    Articles.list().map((article, num) => {
        const data = article as articleData;
        articleList.push(data);
    });

    return {
        props: {
            article: {
                ...articleData
            },
            extraHtml: {
                sideArticles: articleList
            }
        }
    };
}