import FeaturedGridSkeleton from "../../../components/skeletons/FeaturedGridSkeleton";
import { useMusicStore } from "../../../stores/useMusicStore";
import PlayButton from "./PlayButton";

const FeaturedSection = () => {
	const { isLoading, featuredSongs, error } = useMusicStore();

	if (isLoading) return <FeaturedGridSkeleton count={6} />;
	if (error) return <p className="text-red-500 mb-4 text-lg">{error}</p>;

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 ">
			{featuredSongs.map((song) => (
				<div key={song._id} className="flex items-center bg-zinc-800/50 group">
					<img
						src={song.imageUrl}
						alt={song.title}
						className="w-16 sm:w-20 h-16 sm:h-20 bg-zinc-700 flex-shrink-0"
					/>
					<div className="ml-4 w-full items-center relative">
						<h3 className="text-lg font-semibold">{song.title}</h3>
						<p className="text-sm text-zinc-400">{song.artist}</p>
						<PlayButton song={song} />
					</div>
				</div>
			))}
		</div>
	);
};

export default FeaturedSection;
