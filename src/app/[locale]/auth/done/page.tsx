import DoneScreen from "@/screens/done-screen/done_screen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Mail sended to you mail, please check you mail. You can subscripbe our newsletter as well to get updated",
};

const DonePage = ({ params }: { params: { locale: string } }) => {
  return <DoneScreen locale={params.locale} />;
};

export default DonePage;
