import { Metadata } from "next";
import AuthScreen from "../../../../screens/auth-screen/auth_screen";

export const metadata: Metadata = {
  title:
    "Welcome to Authentication of BD-Feature, Sign up or Log In to continue",
};

const AuthUserPage = ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  return <AuthScreen locale={locale} />;
};

export default AuthUserPage;
