import { NavigationItemProps } from "@/interfaces/navigation_item";
import { SectionDataToView } from "@/screens/admin-panel/home/interfaces/interfaces";
import LandingScreen from "@/screens/landing-screen/landing_screen";

interface OtherPageProps {
  params: {
    locale: string;
    navId: string;
  };
}

const getLandingPagePosts = async (
  edition: string,
  navId: string
): Promise<SectionDataToView[]> => {
  const res = await fetch(process.env.DOMAIN_URL + "/api/posts", {
    method: "POST",
    body: JSON.stringify({ navId: navId, edition: edition }),
    next: { tags: ["sections"] },
  });

  if (!res.ok) {
    throw new Error(
      JSON.stringify({
        gl: "Failed to fetch data from server",
        bd: "ডাটা সার্ভার থেকে পাওয়া যায়নি",
      })
    );
  }
  return res.json();
};

const getNavigationItems = async (
  edition: string
): Promise<NavigationItemProps[]> => {
  const res = await fetch(
    process.env.DOMAIN_URL + "/api/admin/navigation?edition=" + edition,
    {
      method: "GET",
      next: { tags: ["navigations"] },
      cache: "force-cache",
    }
  );

  if (!res.ok) {
    throw new Error(
      JSON.stringify({
        gl: "Failed to fetch data from server",
        bd: "ডাটা সার্ভার থেকে পাওয়া যায়নি",
      })
    );
  }

  return res.json();
};

const OtherPage: React.FC<OtherPageProps> = async ({ params }) => {
  const detailPage: SectionDataToView[] = await getLandingPagePosts(
    params.locale,
    params.navId
  );
  const navigationData: NavigationItemProps[] = await getNavigationItems(
    params.locale
  );
  return (
    <LandingScreen sectionLists={detailPage} navigationData={navigationData} />
  );
};

export default OtherPage;
