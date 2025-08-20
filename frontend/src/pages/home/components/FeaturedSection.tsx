import FeaturedGridSkeleton from "../../../components/skeletons/FeaturedGridSkeleton";
import { useMusicStore } from "../../../stores/useMusicStore";

const FeaturedSection = () => {
	const { isLoading, featuredSongs, error } = useMusicStore();

	if (isLoading) return <FeaturedGridSkeleton count={6} />;
	if (error) return <p className="text-red-500 mb-4 text-lg">{error}</p>;

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
			{featuredSongs.map((song) => (
				<div key={song._id} className="flex items-center bg-zinc-800/50">
					<img
						src={song.imageUrl}
						alt={song.title}
						className="w-16 sm:w-20 h-16 sm:h-20 bg-zinc-700 flex-shrink-0"
					/>
					<div className="ml-4">
						<h3 className="text-lg font-semibold">{song.title}</h3>
						<p className="text-sm text-zinc-400">{song.artist}</p>
					</div>
				</div>
				//TODO: Add Play Button
			))}
		</div>
	);
};

export default FeaturedSection;
