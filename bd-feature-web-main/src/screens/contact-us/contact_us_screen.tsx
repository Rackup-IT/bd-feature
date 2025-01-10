"use client";

import Link from "next/link";

interface ContactUsScreenProps {}

const ContactUsScreen: React.FC<ContactUsScreenProps> = (props) => {
  return (
    <div className="mt-16 px-2 flex flex-col">
      <section className="flex flex-col mt-4">
        <h1 className="text-xl font-ralway font-bold relative pb-2 after:content-[''] after:w-full after:h-[1px] after:bg-gray-300 after:absolute after:bottom-0 after:left-0">
          Contact Us
        </h1>
        <p className="font-serif mt-5 text-sm">
          All articles in the global edition of The Conversation are edited by
          our regional and national editorial teams. If you have an editorial
          concern or correction, please contact the appropriate region: Africa /
          Australia / Brazil / Canada / Canada (français) / España / France /
          Indonesia / New Zealand / United Kingdom / United States. If you are
          an academic who would like to write for The Conversation, please
          contact the closest region or appropriate language: Africa / Australia
          / Brazil / Canada / Canada (français) / España / France / Indonesia /
          New Zealand / United Kingdom / United States.
        </p>
      </section>
      <div className="h-10" />
      <section className="flex flex-col relative pb-8 mb-4 after:content-[''] after:w-full after:h-[1px] after:bg-gray-300 after:absolute after:bottom-0 after:left-0">
        <p className="font-serif mt-5 text-sm">
          Editorial questions or concerns
        </p>
        <Link href={""} className="mt-3 text-sm font-medium text-blue-500">
          editional@bdfeature.com
        </Link>
      </section>
      <section className="flex flex-col relative mb-4 pb-8 after:content-[''] after:w-full after:h-[1px] after:bg-gray-300 after:absolute after:bottom-0 after:left-0">
        <p className="font-serif mt-5 text-sm">
          Editorial questions or concerns
        </p>
        <Link href={""} className="mt-3 text-sm font-medium text-blue-500">
          editional@bdfeature.com
        </Link>
      </section>
      <div className="h-10" />
      <section className="flex flex-col">
        <h1 className="text-xl font-ralway font-bold relative pb-2 after:content-[''] after:w-full after:h-[1px] after:bg-gray-300 after:absolute after:bottom-0 after:left-0">
          Postal Address
        </h1>
        <p className="font-serif text-sm mt-8">
          The Conversation Media Group Ltd <br />
          Po Box 5290, Waterloo Quay,
          <br /> Wellington 6140
        </p>
      </section>
      <div className="h-10" />
    </div>
  );
};

export default ContactUsScreen;
