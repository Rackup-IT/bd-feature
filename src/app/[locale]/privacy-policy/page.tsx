import PrivacyPolicyScreen from "@/screens/privacy-policy/privacy_policy";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | BD-Feature",
};

const PrivacyPolicy = () => {
  return <PrivacyPolicyScreen />;
};

export default PrivacyPolicy;
