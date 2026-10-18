import { Metadata } from "next";
import ArticleDetailView from "../../components/ArticleDetailView";
import { fetchSatnaNewsById, getMediaUrl } from "../../../lib/api";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const news = await fetchSatnaNewsById(id);

  if (!news) {
    return {
      title: "सतना न्यूज़ | स्टार न्यूज़ नेटवर्क",
      description: "सतना एवं विंध्य क्षेत्र की ताज़ा खबरें",
    };
  }

  const imageUrl = getMediaUrl(news.featuredImage || (news.images && news.images[0]));
  const articleUrl = `https://starnewsnetworks.com/satna/${id}`;

  return {
    title: `${news.title} - सतना न्यूज़ | स्टार न्यूज़`,
    description: news.description || "सतना की ताज़ा खबरें",
    openGraph: {
      title: news.title,
      description: news.description || "सतना की ताज़ा खबरें",
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

export default async function SatnaArticlePage({ params }: PageProps) {
  const { id } = await params;
  const news = await fetchSatnaNewsById(id);

  return (
    <ArticleDetailView
      initialNews={news}
      newsId={id}
      categoryType="satna"
      categoryLabel="सतना न्यूज़"
      categoryLink="/satna"
    />
  );
}