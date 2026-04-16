import Home from "@/src/component/Home";
import {
    githubProfile,
    linkedInProfile,
    url,
    workFallbackImage,
} from "@/lib/constant";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "SIU CHUN KIT | Full-stack Developer Portfolio",
    description:
        "我是 SIU CHUN KIT，一名熱衷於打造極致使用者體驗的 Full-stack 開發者。專注於 React, Next.js 同現代化網頁開發。",
    keywords: [
        "SIU CHUN KIT",
        "Full-stack Developer",
        "Next.js Portfolio",
        "React Developer",
        "香港開發者",
    ],
    authors: [{ name: "SIU CHUN KIT" }],
    openGraph: {
        title: "SIU CHUN KIT | Full-stack Developer",
        description: "探索 SIU CHUN KIT 的作品集，了解我的技術棧與項目經驗。",
        url: url,
        siteName: "SIU CHUN KIT Portfolio",
        images: [
            {
                url: workFallbackImage,
                width: 1200,
                height: 630,
                alt: "SIU CHUN KIT Portfolio Hero Image",
            },
        ],
        locale: "zh_HK",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "SIU CHUN KIT | Full-stack Developer",
        description: "熱衷於打造極致使用者體驗的 Full-stack 開發者。",
        images: [workFallbackImage],
    },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "SIU CHUN KIT",
        alternateName: "Siu Chun Kit",
        url: url,
        image: workFallbackImage,
        jobTitle: "Full-stack Developer",
        description:
            "熱衷於打造極致使用者體驗的 Full-stack 開發者，專注於 Next.js 應用開發。",
        sameAs: [githubProfile, linkedInProfile],
        knowsAbout: [
            "Web Development",
            "React",
            "Next.js",
            "TypeScript",
            "Full-stack Development",
        ],
    };

    return (
        <main className="h-full w-full overflow-hidden bg-slate-950">
            <script type="application/ld+json" id="person-jsonld">
                {JSON.stringify(jsonLd)}
            </script>
            <Home />
        </main>
    );
}
