import { useEffect, useRef, useState } from "react";
import { usePlayerStore } from "../../stores/usePlayerStore";
import { Button } from "../../components/ui/button";
import {
	Laptop2Icon,
	ListMusicIcon,
	Mic2Icon,
	PauseIcon,
	PlayIcon,
	RepeatIcon,
	ShuffleIcon,
	SkipBackIcon,
	SkipForwardIcon,
	Volume1Icon,
} from "lucide-react";
import { Slider } from "../../components/ui/slider";

const formatTime = (seconds: number) => {
	const minutes = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);
	return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

const PlaybackControls = () => {
	const { isPlaying, togglePlay, currentSong, playNext, playPrevious } =
		usePlayerStore();

	const [volume, setVolume] = useState(75);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		audioRef.current = document.querySelector("audio");

		const audio = audioRef.current;
		if (!audio) return;

		const updateTime = () => setCurrentTime(audio.currentTime);
		const updateDuration = () => setDuration(audio.duration);

		audio.addEventListener("timeupdate", updateTime);
		audio.addEventListener("loadedmetadata", updateDuration);

		const handleEnded = () => {
			usePlayerStore.setState({ isPlaying: false });
		};

		audio.addEventListener("ended", handleEnded);

		return () => {
			audio.removeEventListener("timeupdate", updateTime);
			audio.removeEventListener("loadedmetadata", updateDuration);
			audio.removeEventListener("ended", handleEnded);
		};
	}, [currentSong]);

	const handleSeek = (value: number[]) => {
		if (audioRef.current) {
			audioRef.current.currentTime = value[0];
		}
	};

	return (
		<footer className="h-20 sm:h-24 bg-zinc-900 border-t border-zinc-800 px-4">
			<div className="flex justify-between items-center h-full max-w-[1800px] mx-auto">
				{/* Currently playing song */}
				<div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%] ">
					{currentSong && (
						<>
							<img
								src={currentSong.imageUrl}
								alt={currentSong.title}
								className="size-14 object-cover rounded-md"
							/>
							<div className="flex-1 min-w-0">
								<div className="font-medium truncate hover:underline cursor-pointer">
									{currentSong.title}
								</div>
								<div className="text-sm text-zinc-400 truncate hover:underline cursor-pointer">
									{currentSong.artist}
								</div>
							</div>
						</>
					)}
				</div>
				{/* ***************************** */}

				{/* Audio Player Controls */}
				<div className="flex flex-col items-center gap-2 flex-1 max-w-full sm_max-w-[45%] ">
					<div className="flex items-center gap-4 sm:gap-6                ">
						{/* Shuffle */}
						<Button
							size="icon"
							variant="ghost"
							className="hidden sm:inline-flex hover:text-white text-zinc-400"
						>
							<ShuffleIcon className="size-4" />
						</Button>

						{/* Previous */}
						<Button
							size="icon"
							variant="ghost"
							className="hover:text-white text-zinc-400"
							onClick={playPrevious}
							disabled={!currentSong}
						>
							<SkipBackIcon className="size-4" />
						</Button>

						{/* Play/Pause */}
						<Button
							size="icon"
							className="bg-white hover:bg-white/80 text-black rounded-full size-8"
							onClick={togglePlay}
							disabled={!currentSong}
						>
							{isPlaying ? (
								<PauseIcon className="size-5" />
							) : (
								<PlayIcon className="size-5" />
							)}
						</Button>

						{/* Next */}
						<Button
							size="icon"
							variant="ghost"
							className="hover:text-white text-zinc-400"
							onClick={playNext}
							disabled={!currentSong}
						>
							<SkipForwardIcon className="size-4" />
						</Button>

						{/* Repeat */}
						<Button
							size="icon"
							variant="ghost"
							className="hidden sm:inline-flex hover:text-white text-zinc-400"
							onClick={playNext}
							disabled={!currentSong}
						>
							<>
								<RepeatIcon className="size-4" />
							</>
						</Button>
					</div>

					{/* Slider */}
					<div className="hidden sm:flex items-center gap-2 w-full">
						<div className="text-xs text-zinc-400">{formatTime(0)}</div>
						<Slider
							value={[currentTime]}
							max={duration || 100}
							step={1}
							className="w-full hover:cursor-grab active:cursor-grabbing"
							onValueChange={handleSeek}
						/>
						<div className="text-xs text-zinc-400">
							{formatTime(currentTime)}
						</div>
					</div>
				</div>

				{/* Volume Controls */}
				<div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%] justify-end">
					<Button
						size="icon"
						variant="ghost"
						className="hover:text-white text-zinc-400"
					>
						<Mic2Icon className="size-4" />
					</Button>
					<Button
						size="icon"
						variant="ghost"
						className="hover:text-white text-zinc-400"
					>
						<ListMusicIcon className="size-4" />
					</Button>
					<Button
						size="icon"
						variant="ghost"
						className="hover:text-white text-zinc-400"
					>
						<Laptop2Icon className="size-4" />
					</Button>

					<div className="flex items-center gap-2">
						<Button
							size="icon"
							variant="ghost"
							className="hover:text-white text-zinc-400"
						>
							<Volume1Icon className="size-4" />
						</Button>
						<Slider
							value={[volume]}
							max={100}
							step={1}
							className="w-24 hover:cursor-grab active:cursor-grabbing"
							onValueChange={(value) => {
								setVolume(value[0]);
								if (audioRef.current) {
									audioRef.current.volume = value[0] / 100;
								}
							}}
						/>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default PlaybackControls;
