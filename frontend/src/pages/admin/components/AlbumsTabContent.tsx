import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../../components/ui/card";
import AlbumsTable from "./AlbumsTable";
import AddAlbumDialog from "./AddAlbumDialog";
import { MusicIcon } from "lucide-react";

const AlbumsTabContent = () => {
	return (
		<Card className="bg-zinc-800/50 border-zinc-700/50">
			<CardHeader>
				<div className="flex items-center justify-between">
					<div>
						<CardTitle className="flex items-center gap-2">
							<MusicIcon className="size-5 text-violet-500" />
							Albums Library
						</CardTitle>
						<CardDescription>Manage your album collection</CardDescription>
					</div>

					<AddAlbumDialog />
				</div>
			</CardHeader>
			<CardContent>
				<AlbumsTable />
			</CardContent>
		</Card>
	);
};

export default AlbumsTabContent;
