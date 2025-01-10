import SearchResultScreen from "@/screens/search-result/search_result_screen";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { searchId: string };
}): Promise<Metadata> {
  return {
    title: `Result For ${params.searchId}`,
  };
}

const SearchResultPage = ({
  params,
}: {
  params: { searchId: string; locale: string };
}) => {
  return (
    <SearchResultScreen
      searchText={params.searchId || ""}
      edition={params.locale}
    />
  );
};

export default SearchResultPage;
