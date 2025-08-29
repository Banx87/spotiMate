import { useNavigate } from "react-router-dom";
import { HomeIcon, Music2Icon } from "lucide-react";
import { Button } from "../../components/ui/button";

export default function NotFoundPage() {
	const navigate = useNavigate();

	return (
		<div className="h-screen bg-neutral-900 flex items-center justify-center">
			<div className="text-center space-y-8 px-4">
				{/* Large animated Musical note */}
				<div className="flex justify-center animate-bounce">
					<Music2Icon className="size-24 text-lime-300/85" />
				</div>

				{/* Error message */}
				<div className="space-y-4">
					<h1 className="text-7xl font-bold text-white">404</h1>
					<h2 className="text-2xl font-semibold text-white">Page not found</h2>
					<p className="text-neutral-400 max-w-md mx-auto">
						Looks like this track got lost in the shuffle. Let's get you back to
						the music
					</p>
				</div>

				{/* Action buttons */}
				<div className="flex flex-col sm_flex-row gap-4 justify-center items-center mt-8">
					<Button
						className="bg-neutral-800 hover:bg-neutral-700 text-white border-neutral-700 w-full sm:w-auto cursor-pointer"
						variant="outline"
						onClick={() => navigate(-1)}
					>
						Go Back
					</Button>
					<Button
						className=" bg-lime-300/85 hover:bg-emerald-600 text-zinc-700 sm:w-auto cursor-pointer"
						onClick={() => navigate("/")}
					>
						<HomeIcon className="size-4" />
						Back to home
					</Button>
				</div>
			</div>
		</div>
	);
}
