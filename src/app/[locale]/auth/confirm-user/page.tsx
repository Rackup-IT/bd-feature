import ConfirmUserScreen from "@/screens/confirm-user-screen/confirm_user_screen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Congratulations! Your account has been created",
};

const ConfirmUserPage = ({ params }: { params: { locale: string } }) => {
  return <ConfirmUserScreen locale={params.locale} />;
};

export default ConfirmUserPage;
