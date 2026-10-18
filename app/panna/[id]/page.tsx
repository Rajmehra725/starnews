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
      title: "पन्ना न्यूज़ | स्टार न्यूज़ नेटवर्क",
      description: "पन्ना एवं विंध्य की ताज़ा खबरें",
    };
  }

  const imageUrl = getMediaUrl(news.featuredImage || (news.images && news.images[0]));
  const articleUrl = `https://starnewsnetworks.com/panna/${id}`;

  return {
    title: `${news.title} - पन्ना न्यूज़ | स्टार न्यूज़`,
    description: news.description || "पन्ना की ताज़ा खबरें",
    openGraph: {
      title: news.title,
      description: news.description || "पन्ना की ताज़ा खबरें",
      url: articleUrl,
      type: "article",
      images: [{ url: imageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: news.title,
      description: news.description,
      images: [imageUrl],
    },
  };
}

export default async function PannaArticlePage({ params }: PageProps) {
  const { id } = await params;
  const news = await fetchNewsById(id);

  return (
    <ArticleDetailView
      initialNews={news}
      newsId={id}
      categoryType="news"
      categoryLabel="पन्ना न्यूज़"
      categoryLink="/panna"
    />
  );
}