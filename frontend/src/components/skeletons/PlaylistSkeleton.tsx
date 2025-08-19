import { Skeleton } from "../ui/skeleton";

// SHADCN
const PlaylistSkeleton = ({ count }: { count: number }) => {
	return (
		<>
			{[...Array(count)].map((_, i) => (
				<div className="p-2 gap-3 flex space-y-3 w-full" key={i}>
					<Skeleton className="bg-zinc-800 h-12 w-12 rounded-sm" />
					<div className="space-y-2">
						<Skeleton className="bg-zinc-800 h-4 w-[250px]" />
						<Skeleton className="bg-zinc-800 h-4 w-[200px]" />
					</div>
				</div>
			))}
		</>
	);
};

// MANUAL APPROACH
// const PlaylistSkeleton = () => {
// 	return Array.from({ length: 7 }).map((_, index) => (
// 		<div key={index} className="p-2 rounded-md flex items-center gap-3">
// 			<div className="w-12 h-12 bg-zinc-800 rounded-md flex-shrink-0 animate-pulse" />
// 			<div className="flex-1 min-w-0 hidden md:block space-y-2">
// 				<div className="h-4 bg-zinc-800 rounded animate-pulse w-3/4" />
// 				<div className="h-4 bg-zinc-800 rounded animate-pulse w-1/2" />
// 			</div>
// 		</div>
// 	));
// };

export default PlaylistSkeleton;
