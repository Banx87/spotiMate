import { useMusicStore } from "../../../stores/useMusicStore";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";

import { Calendar1Icon, Music4Icon, Trash2Icon } from "lucide-react";

const AlbumsTable = () => {
	const { albums, isAlbumsLoading, error, deleteAlbum } = useMusicStore();
	if (isAlbumsLoading) {
		return (
			<div className="flex items-center justify-center py-8">
				<div className="text-zinc-400">Loading Albums...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-center justify-center py-8">
				<div className="text-red-400">{error}</div>
			</div>
		);
	}
	return (
		<Table>
			<TableHeader>
				<TableRow className="hover:bg-zinc-500/50">
					<TableHead className="w-[50px]"></TableHead>
					<TableHead>Title</TableHead>
					<TableHead>Artist</TableHead>
					<TableHead>Release Year</TableHead>
					<TableHead>Songs</TableHead>
					<TableHead className="text-right">Actions</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody>
				{albums.map((album) => (
					<TableRow key={album._id} className="hover:bg-zinc-800/50">
						<TableCell>
							<img
								src={album.imageUrl}
								alt={album.title}
								className="size-10 rounded object-cover"
							/>
						</TableCell>
						<TableCell>{album.title}</TableCell>
						<TableCell>{album.artist}</TableCell>
						<TableCell>
							<span className="inline-flex items-center gap-1 text-zinc-400">
								<Calendar1Icon className="size-4" />{" "}
								{album.createdAt.split("-")[0]}
							</span>
						</TableCell>
						<TableCell className="text-zinc-400">
							<div className="flex gap-2">
								<Music4Icon className="size-4  mt-1 " />
								{album.songs.length} Songs
							</div>
						</TableCell>

						<TableCell className="text-right">
							<div className="flex gap-2 justify-end">
								<Button
									variant="ghost"
									size="sm"
									className="text-red-400 hover:text-red-300 hover:bg-red-400/10 hover:cursor-pointer"
									onClick={() => deleteAlbum(album._id)}
								>
									<Trash2Icon className="size-4" />
								</Button>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default AlbumsTable;
