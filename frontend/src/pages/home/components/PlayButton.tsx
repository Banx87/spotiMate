import type React from "react";
import { usePlayerStore } from "../../../stores/usePlayerStore";
import type { Song } from "../../../types";
import { PauseCircleIcon, PlayCircleIcon } from "lucide-react";
const PlayButton = ({
	className,
	playIcon,
	pauseIcon,
	song,
}: {
	className?: string;
	playIcon?: React.ReactNode;
	pauseIcon?: React.ReactNode;
	song: Song;
}) => {
	const { currentSong, isPlaying, setCurrentSong, togglePlay } =
		usePlayerStore();
	const isCurrentSong = currentSong?._id === song._id;

	const handlePlay = () => {
		if (isCurrentSong) togglePlay();
		else setCurrentSong(song);
	};
	return (
		<div
			onClick={handlePlay}
			className={`absolute -bottom-2 right-3 rounded-full bg-zinc-700 hover:bg-blue-300 hover:scale-120 transition-all opacity-0 translate-y-2 group-hover:translate-y-0 cursor-pointer  ${
				isCurrentSong
					? "opacity-100 bottom-0 group-hover:translate-y-2"
					: "opacity-0 group-hover:opacity-100"
			} ${className}`}
		>
			{isPlaying && isCurrentSong ? (
				<PauseCircleIcon
					className={`size-9 text-blue-500 hover:text-zinc-700 -bottom-2 group-hover:translate-y-0 ${
						isPlaying
							? "fill-lime-300 bg-lime-300 rounded-full text-zinc-800"
							: ""
					} ${pauseIcon}`}
				/>
			) : (
				<PlayCircleIcon
					className={`size-9 text-blue-500 hover:text-zinc-700 -bottom-2 group-hover:translate-y-0
					} ${playIcon}`}
				/>
			)}
		</div>
	);
};

export default PlayButton;
