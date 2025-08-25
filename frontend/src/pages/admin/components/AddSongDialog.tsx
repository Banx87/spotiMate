import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { useMusicStore } from "../../../stores/useMusicStore";
import { useRef, useState } from "react";
import { PlusIcon, UploadIcon } from "lucide-react";

const AddSongDialog = () => {
	const { albums } = useMusicStore();
	const [songDialogOpen, setIsSongDialogOpen] = useState(false);
	const [isloading, setIsLoading] = useState(false);

	const [newSong, setNewSong] = useState({
		title: "",
		artist: "",
		album: undefined,
		duration: 0,
	});

	const [files, setFiles] = useState<{
		audio: File | null;
		image: File | null;
	}>({
		audio: null,
		image: null,
	});

	const audioInputRef = useRef<HTMLInputElement | null>(null);
	const imageInputRef = useRef<HTMLInputElement | null>(null);

	const handleSubmit = async () => {};

	return (
		<Dialog open={songDialogOpen} onOpenChange={setIsSongDialogOpen}>
			<DialogTrigger asChild>
				<Button className="bg-emerald-500 size-8 cursor-pointer text-black">
					<PlusIcon className="size-4 mr-2" />
					Add Song
				</Button>
			</DialogTrigger>
			<DialogContent className="bg-zinc-900 border-zinc-700 max-h-[80vh] overflow-auto">
				<DialogHeader className="text-white">
					<DialogTitle>Add New Song</DialogTitle>
					<DialogDescription>
						Fill in the details to add a new song to your library.
					</DialogDescription>
				</DialogHeader>
				<div className="space-y-4 py-4">
					<input
						type="file"
						accept="audio/*"
						ref={audioInputRef}
						hidden
						onChange={(e) =>
							setFiles((prev) => ({ ...prev, audio: e.target.files![0] }))
						}
					/>
					<input
						type="file"
						accept="image/*"
						ref={imageInputRef}
						hidden
						onChange={(e) =>
							setFiles((prev) => ({ ...prev, image: e.target.files![0] }))
						}
					/>

					{/* Image upload area */}
					<div
						className="flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer"
						onClick={() => imageInputRef.current?.click()}
					>
						<div className="text-center">
							{files.image ? (
								<div className="space-y-2">
									<div className="text-sm text-emerald-500">
										Image selected:
									</div>
									<div className="text-xs text-zinc-400">
										{files.image?.name.slice(0, 20)}
									</div>
								</div>
							) : (
								<>
									<div className="p-3 bg-zinc-800 rounded-full inline-block mb-2">
										<UploadIcon className="size-6 text-zinc-400" />
									</div>
									<div className="text-sm text-zinc-400 mb-2">
										Upload artwork
									</div>
									<Button
										variant="outline"
										size="sm"
										className="text-xs text-white cursor-pointer"
									>
										Choose File
									</Button>
								</>
							)}
						</div>
					</div>

					{/* Audio upload area */}
					<div className="space-y-2 text-white">
						<label className="text-sm font-medium">Audio File</label>
						<div className="flex items-center gap-2 my-2">
							<Button
								variant="outline"
								onClick={() => audioInputRef.current?.click()}
								className="w-full cursor-pointer"
							>
								{files.audio
									? files.audio.name.slice(0, 20)
									: "Choose Audio File"}
							</Button>
						</div>
					</div>

                    <Input

				</div>
			</DialogContent>
		</Dialog>
	);
};

export default AddSongDialog;
