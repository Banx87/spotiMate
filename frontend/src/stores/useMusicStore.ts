import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import type { Album, Song, Stats } from "../types";
import toast from "react-hot-toast";

interface MusicStore {
	albums: Album[];
	currentAlbum: Album | null;
	isLoading: boolean;
	isAlbumsLoading: boolean;
	isSongsLoading: boolean;
	isStatsLoading: boolean;
	error: string | null;
	songs: Song[];
	featuredSongs: Song[];
	madeForYouSongs: Song[];
	trendingSongs: Song[];
	stats: Stats;

	fetchAlbums: () => Promise<void>;
	fetchAlbumById: (id: string) => Promise<Album>;
	fetchFeaturedSongs: () => Promise<void>;
	fetchMadeForYouSongs: () => Promise<void>;
	fetchTrendingSongs: () => Promise<void>;
	fetchStats: () => Promise<void>;
	fetchSongs: () => Promise<void>;
	deleteSong: (id: string) => Promise<void>;
	deleteAlbum: (id: string) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set, get) => ({
	albums: [],
	songs: [],
	isLoading: false,
	isAlbumsLoading: false,
	isSongsLoading: false,
	isStatsLoading: false,
	error: null,
	currentAlbum: null,
	featuredSongs: [],
	madeForYouSongs: [],
	trendingSongs: [],
	stats: {
		totalSongs: 0,
		totalAlbums: 0,
		totalArtists: 0,
		totalUsers: 0,
	},

	deleteSong: async (id: string) => {
		set({ isLoading: true, error: null });

		try {
			await axiosInstance.delete(`/admin/songs/${id}`);

			set((state) => ({
				songs: state.songs.filter((song) => song._id !== id),
			}));
			toast.success("Song deleted successfully");
		} catch (error: any) {
			toast.error("Error deleting song: " + error.response.data.message);
		} finally {
			set({ isLoading: false });
		}
	},
	deleteAlbum: async (id: string) => {
		set({ isLoading: true, error: null });

		try {
			await axiosInstance.delete(`/admin/albums/${id}`);

			set((state) => ({
				albums: state.albums.filter((album) => album._id !== id),
				songs: state.songs.map((song) =>
					song.albumId === state.albums.find((album) => album._id === id)?.title
						? { ...song, album: null }
						: song
				),
			}));
			toast.success("Song deleted successfully");
		} catch (error: any) {
			toast.error("Error deleting song: " + error.response.data.message);
		} finally {
			set({ isLoading: false });
		}
	},
	fetchSongs: async () => {
		set({ isSongsLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/songs");
			set({ songs: response.data });
		} catch (error: any) {
			set({ error: error.response.data.message, isSongsLoading: false });
		} finally {
			set({ isSongsLoading: false });
		}
	},

	fetchAlbums: async () => {
		set({ isAlbumsLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/albums");
			set({ albums: response.data });
		} catch (error: any) {
			set({ error: error.response.data.message, isAlbumsLoading: false });
		} finally {
			set({ isAlbumsLoading: false });
		}
	},

	fetchAlbumById: async (id: string) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get(`/albums/${id}`);
			set({ currentAlbum: response.data });
			return response.data;
		} catch (error: any) {
			set({ error: error.response.data.message, isLoading: false });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchFeaturedSongs: async () => {
		set({ isLoading: true, error: null });

		try {
			const response = await axiosInstance.get("/songs/featured");
			set({ featuredSongs: response.data });
		} catch (error: any) {
			set({ error: error.response.data.message, isLoading: false });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchMadeForYouSongs: async () => {
		set({ isLoading: true, error: null });

		try {
			const response = await axiosInstance.get("/songs/made-for-you");
			set({ madeForYouSongs: response.data });
		} catch (error: any) {
			set({ error: error.response.data.message, isLoading: false });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchTrendingSongs: async () => {
		set({ isLoading: true, error: null });

		try {
			const response = await axiosInstance.get("/songs/trending");
			set({ trendingSongs: response.data });
		} catch (error: any) {
			set({ error: error.response.data.message, isLoading: false });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchStats: async () => {
		set({ isStatsLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/statistics");
			set({ stats: response.data });
		} catch (error: any) {
			set({ error: error.response.data.message, isStatsLoading: false });
		} finally {
			set({ isStatsLoading: false });
		}
	},
}));
