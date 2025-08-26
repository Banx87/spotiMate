import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { v2 as cloudinary } from "cloudinary";
import { unlink } from "fs";

// Helper function for cloudinary uploads
const uploadToCloudinary = async (file) => {
	try {
		let folder = "images";
		if (file.mimetype === "audio/mpeg") {
			folder = "audio";
		}

		const result = await cloudinary.uploader.upload(file.tempFilePath, {
			use_filename: true,
			unique_filename: true,
			folder: folder,
			resource_type: "auto",
		});
		return result.secure_url;
	} catch (error) {
		console.log("Error uploading Image to Cloudinary:", error);
		throw new Error("Cloudinary upload failed");
	} finally {
		// Delete the temporary file
		unlink(file.tempFilePath, (err) => {
			console.log(err);
		});
	}
};

export const createSong = async (req, res, next) => {
	try {
		if (!req.files || !req.files.audioFile || !req.files.imageFile) {
			return res.status(400).send("All files are required");
		}
		const { title, artist, albumId, duration } = req.body;

		const audioFile = req.files.audioFile;
		const imageFile = req.files.imageFile;

		const imageUrl = await uploadToCloudinary(imageFile);
		const audioUrl = await uploadToCloudinary(audioFile);

		const song = new Song({
			title,
			artist,
			audioUrl,
			imageUrl,
			duration,
			albumId: albumId || null,
		});

		await song.save();

		// If song belongs to an album, Update the albums songs array
		if (albumId) {
			await Album.findByIdAndUpdate(albumId, {
				$push: { songs: song._id },
			});
		}
		res.status(201).json(song);
	} catch (error) {
		console.log("Error creating song:", error);
		next(error);
	}
};

export const deleteSong = async (req, res, next) => {
	try {
		const { id } = req.params;

		const song = await Song.findById(id);

		// If song belongs to an album, update the album's songs array.
		if (song.albumId) {
			await Album.findByIdAndUpdate(song.albumId, {
				$pull: { songs: song._id },
			});

			await Song.findByIdAndDelete(id);

			res.status(200).json({ message: "Song Deleted successfully" });
		}
	} catch (error) {
		console.log("Error in DeleteSong:", error);
		next(error);
	}
};

export const createAlbum = async (req, res, next) => {
	try {
		const { title, artist, releaseYear } = req.body;
		const { imageFile } = req.files;

		const imageUrl = await uploadToCloudinary(imageFile);

		const album = new Album({
			title,
			artist,
			imageUrl,
			releaseYear,
		});

		await album.save();
		res.status(201).json(album);
	} catch (error) {
		console.log("Error creating album:", error);
		next(error);
	}
};

export const deleteAlbum = async (req, res, next) => {
	try {
		const { id, albumId } = req.params;

		await Song.deleteMany({ albumId, id });
		await Album.findByIdAndDelete(id);

		res.status(200).json({ message: "Album deleted successfully" });
	} catch (error) {
		console.log("Error deleting album:", error);
		next(error);
	}
};

export const checkAdmin = async (req, res, next) => {
	res.status(200).json({ admin: true });
};
