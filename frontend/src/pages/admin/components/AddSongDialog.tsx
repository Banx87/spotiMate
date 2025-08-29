import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../../../components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../../components/ui/select";
import { Button } from "../../../components/ui/button";
import { useMusicStore } from "../../../stores/useMusicStore";
import { useRef, useState } from "react";
import { PlusIcon, UploadIcon } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { DialogFooter } from "../../../components/ui/dialog";
import toast from "react-hot-toast";
import { axiosInstance } from "../../../lib/axios";

interface NewSong {
	title: string;
	artist: string;
	album: string;
	duration: number;
}

const AddSongDialog = () => {
	const { albums } = useMusicStore();
	const [songDialogOpen, setIsSongDialogOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [newSong, setNewSong] = useState<NewSong>({
		title: "",
		artist: "",
		album: "",
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

	const handleNewSongSubmission = async () => {
		setIsLoading(true);

		try {
			if (!files.audio || !files.image) {
				return toast.error("Please select both audio and image files");
			}

			const formData = new FormData();
			formData.append("title", newSong.title);
			formData.append("artist", newSong.artist);
			formData.append("album", newSong.album);
			if (newSong.album && newSong.album !== "none") {
				formData.append("albumId", newSong.album);
			}
			formData.append("duration", newSong.duration.toString());
			formData.append("audioFile", files.audio);
			formData.append("imageFile", files.image);

			await axiosInstance
				.post("/admin/songs", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				})
				.then((response) => {
					console.log(response.headers);
				});

			setIsSongDialogOpen(false);

			setNewSong({
				title: "",
				artist: "",
				album: "",
				duration: 0,
			});

			setFiles({
				audio: null,
				image: null,
			});
			toast.success("Song added successfully");
		} catch (error: any) {
			toast.error("Error adding song: " + error.response.data.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={songDialogOpen} onOpenChange={setIsSongDialogOpen}>
			<DialogTrigger asChild className="w-full">
				<Button className="bg-emerald-500 size-8 cursor-pointer text-white w-fit hover:bg-emerald-600">
					<PlusIcon className="size-4" />
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
					{/* HIDDEN IMAGE INPUT */}
					<input
						type="file"
						accept="audio/*"
						ref={audioInputRef}
						hidden
						onChange={(e) =>
							setFiles((prev) => ({ ...prev, audio: e.target.files![0] }))
						}
					/>
					{/* HIDDEN AUDIO INPUT */}
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

					{/* Other Input Fields */}
					<div className="space-y-2">
						<label htmlFor="title" className="text-sm font-medium text-white">
							Title
						</label>
						<div className="flex items-center gap-2 my-2">
							<Input
								value={newSong.title}
								onChange={(e) =>
									setNewSong({ ...newSong, title: e.target.value })
								}
								className="bg-zinc border-zinc-700 text-white"
							/>
						</div>
					</div>
					<div className="space-y-2">
						<label htmlFor="artist" className="text-sm font-medium text-white">
							Artist
						</label>
						<div className="flex items-center gap-2 my-2">
							<Input
								value={newSong.artist}
								onChange={(e) =>
									setNewSong({ ...newSong, artist: e.target.value })
								}
								className="bg-zinc border-zinc-700 text-white"
							/>
						</div>
					</div>
					<div className="space-y-2">
						<label
							htmlFor="duration"
							className="text-sm font-medium text-white"
						>
							Duration
						</label>
						<div className="flex items-center gap-2 my-2">
							<Input
								type="number"
								min="0"
								value={newSong.duration}
								onChange={(e) =>
									setNewSong({
										...newSong,
										duration: parseInt(e.target.value) || 0,
									})
								}
								className="bg-zinc border-zinc-700 text-white"
							/>
						</div>
					</div>

					<div className="space-y-2">
						<label htmlFor="album" className="text-sm font-medium text-white">
							Album (Optional)
						</label>
						<Select
							value={newSong.album}
							onValueChange={(value: string) =>
								setNewSong({ ...newSong, album: value })
							}
						>
							<SelectTrigger className="bg-zinc-400 border-zinc-700 w-full my-1 text-white ">
								<SelectValue placeholder="Select Album" />
							</SelectTrigger>
							<SelectContent className="bg-zinc-800 border-zinc-700  cursor-pointer">
								<SelectItem value="none" className="cursor-pointer">
									No album (Single)
								</SelectItem>
								{albums.map((album) => (
									<SelectItem
										key={album._id}
										value={album._id}
										className="cursor-pointer"
									>
										{album.title}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
				<DialogFooter>
					<Button
						onClick={() => setIsSongDialogOpen(false)}
						disabled={isLoading}
						className=" bg-red-500/75 hover:bg-red-600 text-white cursor-pointer mr-2"
					>
						Cancel
					</Button>
					<Button
						onClick={handleNewSongSubmission}
						disabled={isLoading}
						className="bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer"
					>
						{isLoading ? "Uploading..." : "Add Song"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default AddSongDialog;
