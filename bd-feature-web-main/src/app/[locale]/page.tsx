import { NavigationItemProps } from "@/interfaces/navigation_item";
import { SectionDataToView } from "@/screens/admin-panel/home/interfaces/interfaces";
import LandingScreen from "@/screens/landing-screen/landing_screen";

const getLandingPagePosts = async (
  edition: string
): Promise<SectionDataToView[]> => {
  const res = await fetch(process.env.DOMAIN_URL + "/api/posts", {
    method: "POST",
    body: JSON.stringify({ navId: "landing-page", edition: edition }),
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

const LandingPage = async ({ params }: { params: { locale: string } }) => {
  const data: SectionDataToView[] = await getLandingPagePosts(params.locale);
  const navData: NavigationItemProps[] = await getNavigationItems(
    params.locale
  );
  console.log(data);
  return <LandingScreen sectionLists={data} navigationData={navData} />;
};

export default LandingPage;
