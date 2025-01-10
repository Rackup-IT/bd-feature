import NewsletterSubscribeScreen from "@/screens/newsletter-subscribe/newsletter_subscribe";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscribe to our free newsletter",
};

const NewsletterSubscribePage = ({
  params,
}: {
  params: { locale: string };
}) => {
  return <NewsletterSubscribeScreen locale={params.locale} />;
};

export default NewsletterSubscribePage;
