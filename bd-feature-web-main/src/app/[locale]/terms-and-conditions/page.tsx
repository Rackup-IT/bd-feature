import TermsAndConditionsScreen from "@/screens/terms-and-conditions/terms_and_conditions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | BD-Feature",
};

const TermsAndConditionsPage = () => {
  return <TermsAndConditionsScreen />;
};

export default TermsAndConditionsPage;
