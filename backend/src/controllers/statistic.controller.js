import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";
import { Album } from "../models/album.model.js";

export const getStatistics = async (req, res, next) => {
	try {
		const [totalSongs, totalAlbums, totalUsers, totalArtists] =
			await Promise.all([
				Song.countDocuments(),
				Album.countDocuments(),
				User.countDocuments(),
				Song.distinct("artist").countDocuments(),
			]);

		res.status(200).json({
			totalSongs,
			totalAlbums,
			totalUsers,
			totalArtists,
		});
	} catch (error) {
		next(error);
	}
};
