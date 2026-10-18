import { Metadata } from "next";
import ArticleDetailView from "../../components/ArticleDetailView";
import { fetchChhatarpurNewsById, getMediaUrl } from "../../../lib/api";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const news = await fetchChhatarpurNewsById(id);

  if (!news) {
    return {
      title: "छतरपुर न्यूज़ | स्टार न्यूज़ नेटवर्क",
      description: "छतरपुर एवं बुंदेलखंड की ताज़ा खबरें",
    };
  }

  const imageUrl = getMediaUrl(news.featuredImage || (news.images && news.images[0]));
  const articleUrl = `https://starnewsnetworks.com/chhatarpur/${id}`;

  return {
    title: `${news.title} - छतरपुर न्यूज़ | स्टार न्यूज़`,
    description: news.description || "छतरपुर की ताज़ा खबरें",
    openGraph: {
      title: news.title,
      description: news.description || "छतरपुर की ताज़ा खबरें",
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

export default async function ChhatarpurArticlePage({ params }: PageProps) {
  const { id } = await params;
  const news = await fetchChhatarpurNewsById(id);

  return (
    <ArticleDetailView
      initialNews={news}
      newsId={id}
      categoryType="chhatarpur"
      categoryLabel="छतरपुर न्यूज़"
      categoryLink="/chhatarpur"
    />
  );
}