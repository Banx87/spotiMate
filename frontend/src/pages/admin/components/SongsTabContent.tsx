import { Button } from "../../../components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../../components/ui/card";
import { MusicIcon } from "lucide-react";
import SongsTable from "./SongsTable";

const SongsTabContent = () => {
	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<div>
						<CardTitle className="flex items-center gap-2">
							<MusicIcon className="size-5 text-emerald-500" />
							Songs Library
						</CardTitle>
						<CardDescription>Manage your music tracks</CardDescription>
					</div>
					<Button className="hover:bg-lime-400 size-8 cursor-pointer bg-white">
						<span className="text-xl items-center flex justify-center">+</span>
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				<SongsTable />
			</CardContent>
		</Card>
	);
};

export default SongsTabContent;
