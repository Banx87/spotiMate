import { useEffect, useRef } from "react";
import { usePlayerStore } from "../../stores/usePlayerStore";

const AudioPlayer = () => {
	const audioRef = useRef<HTMLAudioElement>(null);
	const prevSongRef = useRef<string | null>(null);

	const { currentSong, isPlaying, playNext } = usePlayerStore();

	// Handle song ends
	useEffect(() => {
		const audio = audioRef.current;

		const handleEnded = () => {
			playNext();
		};
		audio?.addEventListener("ended", handleEnded);
		return () => audio?.removeEventListener("ended", handleEnded);
	}, [playNext]);

	// Handle song changes / Pausing/Resuming Songs
	useEffect(() => {
		if (!audioRef.current || !currentSong) return;

		const audio = audioRef.current;

		// Check if this song is a new song
		const isSongChange = prevSongRef.current !== currentSong?.audioUrl;
		if (isSongChange) {
			audio.src = currentSong?.audioUrl;
			audio.currentTime = 0;
			prevSongRef.current = currentSong?.audioUrl;

			const playIfReady = () => {
				if (isPlaying) {
					audio.play().catch((error) => {
						console.error("Error starting playback:", error);
					});
				}
				audio.removeEventListener("canplay", playIfReady);
			};
			audio.addEventListener("canplay", playIfReady);
		} else {
			// Song was already selected and playing or Paused
			if (!isPlaying) {
				audio.pause();
			} else {
				audio.play().catch((error) => {
					console.error("Error resuming playback:", error);
				});
			}
		}
	}, [currentSong, isPlaying]);

	return <audio ref={audioRef} />;
};

export default AudioPlayer;

/**
 * ORIGINAL PLAY/PAUSE LOGIC
 * Handled play and pause logic for the audio element based on the `isPlaying` state.
 *
 * This effect was originally responsible for starting and pausing playback when the `isPlaying` state changed.
 * However, it was commented out and its logic was moved to the main effect that also handles song changes.
 *
 * The reason for this change is to centralize all audio control logic (play, pause, and song switching)
 * in a single effect. This prevents race conditions and ensures that playback state is always in sync
 * with both the current song and the play/pause state, especially when switching songs rapidly.
 *
 * By consolidating the logic, we avoid duplicate calls to `audio.play()` or `audio.pause()`, and ensure
 * that the audio element always reflects the latest state of the player.
 *
 * Previously, having separate effects sometimes caused the browser to throw a
 * "The play() request was interrupted by a call to pause()" error in the console,
 * due to overlapping play and pause calls when switching songs or toggling playback quickly.
 */
// Handle Play/Pause logic
// useEffect(() => {
// if (!audioRef.current || !currentSong) return;
// if (isPlaying) {
// 	audioRef.current.play().catch((error) => {
// 		console.error("Error starting playback:", error);
// 	});
// } else {
// 	audioRef.current.pause();
// }
// }, [isPlaying]);
