import FeaturedGridSkeleton from "../../../components/skeletons/FeaturedGridSkeleton";
import { useMusicStore } from "../../../stores/useMusicStore";
import FeaturedSection from "./FeaturedSection";

const SectionGrid = () => {
	const { isLoading } = useMusicStore();
	return (
		<>
			<h1 className="text-2xl sm:text-3xl font-bold mb-4">Good Afternoon</h1>
			{isLoading && <FeaturedGridSkeleton count={10} />}
			{!isLoading && <FeaturedSection />}
		</>
	);
};

export default SectionGrid;
