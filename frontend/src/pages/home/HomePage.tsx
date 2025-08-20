import { useEffect } from "react";
import Topbar from "../../components/Topbar";
import { useMusicStore } from "../../stores/useMusicStore";
import SectionGrid from "./components/SectionGrid";
import { ScrollArea } from "../../components/ui/scroll-area";
import ReusableSectionGrid from "./components/ReusableSectionGrid";

function HomePage() {
	const {
		fetchFeaturedSongs,
		fetchMadeForYouSongs,
		fetchTrendingSongs,
		isLoading,
		madeForYouSongs,
		featuredSongs,
		trendingSongs,
	} = useMusicStore();

	useEffect(() => {
		fetchFeaturedSongs();
		fetchMadeForYouSongs();
		fetchTrendingSongs();
	}, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

	return (
		<div className="rounded-md overflow-hidden">
			<Topbar />
			<ScrollArea className="h-[calc(100vh-180px)]">
				<main className="p-4 rounded-md mt-2 overflow-hidden h-full bg-gradient-to-b from-lime-300/85 to-zinc-900">
					<SectionGrid />
					<ReusableSectionGrid
						title="Made For You"
						songs={madeForYouSongs}
						isLoading={isLoading}
					/>
					<ReusableSectionGrid
						title="Trending"
						songs={trendingSongs}
						isLoading={isLoading}
					/>
				</main>
			</ScrollArea>
		</div>
	);
}

export default HomePage;
