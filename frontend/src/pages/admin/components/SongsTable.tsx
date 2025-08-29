import { Calendar1Icon, Trash2Icon } from "lucide-react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../../components/ui/table";
import { useMusicStore } from "../../../stores/useMusicStore";
import { Button } from "../../../components/ui/button";

const SongsTable = () => {
	const { songs, isSongsLoading, error, deleteSong } = useMusicStore();
	if (isSongsLoading) {
		return (
			<div className="flex items-center justify-center py-8">
				<div className="text-zinc-400">Loading Songs...</div>
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
					{/* <TableHead>Album</TableHead> */}
					<TableHead>Release Date</TableHead>
					<TableHead className="text-right">Actions</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody>
				{songs.map((song) => (
					<TableRow key={song._id} className="hover:bg-zinc-800/50">
						<TableCell>
							<img
								src={song.imageUrl}
								alt={song.title}
								className="size-10 rounded object-cover"
							/>
						</TableCell>
						<TableCell>{song.title}</TableCell>
						<TableCell>{song.artist}</TableCell>
						{/* <TableCell>{song.albumId}</TableCell> */}
						<TableCell>
							<span className="inline-flex items-center gap-1 text-zinc-400">
								<Calendar1Icon className="size-4" />{" "}
								{song.createdAt.split("T")[0]}
							</span>
						</TableCell>
						<TableCell className="text-right">
							<div className="flex gap-2 justify-end">
								<Button
									variant="ghost"
									size="sm"
									className="text-red-400 hover:text-red-300 hover:bg-red-400/10 hover:cursor-pointer"
									onClick={() => deleteSong(song._id)}
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

export default SongsTable;
