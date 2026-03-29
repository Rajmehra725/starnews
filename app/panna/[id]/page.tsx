import { Metadata } from "next";
import NewsDetailClient from "./NewsDetailClient"; // ✅ direct import

type Props = {
  params: { id: string };
};

async function getNews(id: string) {
  try {
    const res = await fetch(
      "https://starnewsbackend.onrender.com/api/news",
      { cache: "no-store" }
    );

    const data = await res.json();
    return data.find((n: any) => n._id === id);
  } catch {
    return null;
  }
}

// ✅ OG META TAGS
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const news = await getNews(params.id);

  if (!news) {
    return {
      title: "Star News",
      description: "Latest news",
    };
  }

  const url = `https://yourdomain.com/panna/${params.id}`;
  const image = news.featuredImage || news.images?.[0];

  return {
    title: news.title,
    description: news.description,

    openGraph: {
      title: news.title,
      description: news.description,
      url: url,
      type: "article",
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
            },
          ]
        : [],
    },

    twitter: {
      card: "summary_large_image",
      title: news.title,
      description: news.description,
      images: image ? [image] : [],
    },
  };
}

// ✅ DIRECT USE
export default function Page() {
  return <NewsDetailClient />;
}