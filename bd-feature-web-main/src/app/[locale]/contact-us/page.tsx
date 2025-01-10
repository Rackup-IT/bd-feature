import ContactUsScreen from "@/screens/contact-us/contact_us_screen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - BD-Feature",
  description: "Contact Us - BD-Feature",
};

const ContactUsPage = () => {
  return <ContactUsScreen />;
};

export default ContactUsPage;
