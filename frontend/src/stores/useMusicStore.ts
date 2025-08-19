import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import type { Album, Song } from "../types";

interface MusicStore {
	albums: Album[];
	songs: Song[];
	isLoading: boolean;
	error: string | null;
	currentAlbum: null;

	fetchAlbums: () => Promise<void>;
	fetchAlbumById: (id: string) => Promise<Album>;
}

export const useMusicStore = create<MusicStore>((set, get) => ({
	albums: [],
	songs: [],
	isLoading: false,
	error: null,
	currentAlbum: null,

	fetchAlbums: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/albums");
			set({ albums: response.data });
		} catch (error: any) {
			set({ error: error.response.data.message, isLoading: false });
		} finally {
			set({ isLoading: false });
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
}));
