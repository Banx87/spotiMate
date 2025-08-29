import { useRef, useState, type ChangeEvent } from "react";
import { axiosInstance } from "../../../lib/axios";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

import { PlusIcon, UploadIcon } from "lucide-react";

import toast from "react-hot-toast";

interface NewAlbum {
	title: string;
	artist: string;
	releaseYear: number;
}

const AddAlbumDialog = () => {
	// const { albums } = useMusicStore();
	const [albumDialogOpen, setIsAlbumDialogOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const [newAlbum, setNewAlbum] = useState<NewAlbum>({
		title: "",
		artist: "",
		releaseYear: new Date().getFullYear(),
	});

	const [imageFile, setImageFile] = useState<File | null>(null);

	const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImageFile(file);
		}
	};

	const handleNewAlbumSubmission = async () => {
		setIsLoading(true);

		try {
			if (!imageFile) {
				return toast.error("Please upload an image");
			}

			const formData = new FormData();
			formData.append("title", newAlbum.title);
			formData.append("artist", newAlbum.artist);
			formData.append("releaseYear", newAlbum.releaseYear.toString());
			formData.append("imageFile", imageFile);

			await axiosInstance
				.post("/admin/albums", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				})
				.then((response) => {
					console.log(response.headers);
				});

			setNewAlbum({
				title: "",
				artist: "",
				releaseYear: new Date().getFullYear(),
			});
			setImageFile(null);
			setIsAlbumDialogOpen(false);

			toast.success("Album added successfully");
		} catch (error: any) {
			toast.error("Failed to create album: " + error.response.data.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={albumDialogOpen} onOpenChange={setIsAlbumDialogOpen}>
			<DialogTrigger asChild className="w-full">
				<Button className="bg-violet-500 size-8 cursor-pointer text-white w-fit hover:bg-violet-600">
					<PlusIcon className="size-4" />
					Add Album
				</Button>
			</DialogTrigger>
			<DialogContent className="bg-zinc-900 border-zinc-700 max-h-[80vh] overflow-auto">
				<DialogHeader className="text-white">
					<DialogTitle>Add New Album</DialogTitle>
					<DialogDescription>
						Fill in the details to add a new album to your collection.
					</DialogDescription>
				</DialogHeader>
				<div className="space-y-4 py-4">
					{/* HIDDEN IMAGE INPUT */}
					<input
						type="file"
						accept="image/*"
						ref={fileInputRef}
						hidden
						onChange={handleImageSelect}
					/>

					{/* Image upload area */}
					<div
						className="flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer"
						onClick={() => fileInputRef.current?.click()}
					>
						<div className="text-center">
							<div className="p-3 bg-zinc-800 rounded-full inline-block mb-2">
								<UploadIcon className="size-6 text-zinc-400" />
							</div>
							<div className="text-sm text-zinc-400 mb-2">
								{imageFile ? imageFile.name : "Upload album artwork"}
							</div>
							<Button
								variant="outline"
								size="sm"
								className="text-xs text-white cursor-pointer"
							>
								Choose File
							</Button>
						</div>
					</div>

					{/* Other Input Fields */}
					<div className="space-y-2">
						<label htmlFor="title" className="text-sm font-medium text-white">
							Album Title
						</label>
						<div className="flex items-center gap-2 my-2">
							<Input
								value={newAlbum.title}
								onChange={(e) =>
									setNewAlbum({ ...newAlbum, title: e.target.value })
								}
								className="bg-zinc border-zinc-700 text-white"
								placeholder="Enter album title"
							/>
						</div>
					</div>
					<div className="space-y-2">
						<label htmlFor="artist" className="text-sm font-medium text-white">
							Artist
						</label>
						<div className="flex items-center gap-2 my-2">
							<Input
								value={newAlbum.artist}
								onChange={(e) =>
									setNewAlbum({ ...newAlbum, artist: e.target.value })
								}
								className="bg-zinc border-zinc-700 text-white"
								placeholder="Enter artist name"
							/>
						</div>
					</div>
					<div className="space-y-2">
						<label
							htmlFor="releaseYear"
							className="text-sm font-medium text-white"
						>
							Release Year
						</label>
					</div>
					<Input
						type="number"
						value={newAlbum.releaseYear}
						onChange={(e) =>
							setNewAlbum({
								...newAlbum,
								releaseYear: parseInt(e.target.value),
							})
						}
						className="bg-zinc-800 border-zinc-700 text-white"
						placeholder="Enter release year"
						min={1900}
						max={new Date().getFullYear()}
					/>
				</div>
				<DialogFooter>
					<Button
						onClick={() => setIsAlbumDialogOpen(false)}
						disabled={isLoading}
						className=" bg-red-500/75 hover:bg-red-600 text-white cursor-pointer mr-2"
					>
						Cancel
					</Button>
					<Button
						onClick={handleNewAlbumSubmission}
						disabled={
							isLoading || !imageFile || !newAlbum.title || !newAlbum.artist
						}
						className="bg-violet-500 hover:bg-violet-600 text-white cursor-pointer "
					>
						{isLoading ? "Creating..." : "Add Album"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default AddAlbumDialog;
