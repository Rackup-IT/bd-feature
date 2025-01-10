import NewsletterConfirmedScreen from "@/screens/newsletter-confrimed-screen/newsletter_confirmed_screen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank you so much for subscribing our weekly newsletter",
};

const SubsciptionConfirmedPage = ({
  params,
}: {
  params: { locale: string };
}) => {
  return <NewsletterConfirmedScreen locale={params.locale} />;
};

export default SubsciptionConfirmedPage;
