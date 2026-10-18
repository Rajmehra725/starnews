import { Metadata } from "next";
import ArticleDetailView from "../../components/ArticleDetailView";
import { fetchNewsById, getMediaUrl } from "../../../lib/api";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const news = await fetchNewsById(id);

  if (!news) {
    return {
      title: "स्टार न्यूज़ नेटवर्क | Star News Network",
      description: "सच्ची और निष्पक्ष पत्रकारिता का विश्वसनीय मंच",
    };
  }

  const imageUrl = getMediaUrl(news.featuredImage || (news.images && news.images[0]));
  const articleUrl = `https://starnewsnetworks.com/news/${id}`;

  return {
    title: `${news.title} | स्टार न्यूज़ नेटवर्क`,
    description: news.description || "ताज़ा हिंदी समाचार पढ़ें स्टार न्यूज़ नेटवर्क पर।",
    openGraph: {
      title: news.title,
      description: news.description || "ताज़ा हिंदी समाचार पढ़ें स्टार न्यूज़ नेटवर्क पर।",
      url: articleUrl,
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: news.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: news.title,
      description: news.description || "ताज़ा हिंदी समाचार",
      images: [imageUrl],
    },
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { id } = await params;
  const news = await fetchNewsById(id);

  return (
    <ArticleDetailView
      initialNews={news}
      newsId={id}
      categoryType="news"
      categoryLabel="ताज़ा समाचार"
      categoryLink="/news"
    />
  );
}
