import { Skeleton } from "../ui/skeleton";

// SHADCN
const ReusableSectionGridSkeleton = ({ count }: { count: number }) => {
	return (
		<>
			<div className="mb-8">
				<div className="h-8 w-48 bg-zinc-800 rounded mb-4 animate-pulse" />
				<div className="grid grid-cols-1 sm:grid-cols-2 lg-grid-cols-4 gap-4">
					{[...Array(count)].map((_, i) => (
						<div
							key={i}
							className="bg-zinc-800/40 rounded-md p-4 animate-pulse"
						>
							<Skeleton className="aspect-square rounded-md bg-zinc-700 mb-4" />
							<Skeleton className="h-4 bg-zinc-700 rounded w-3/4 mb-2" />
							<Skeleton className="h-4 bg-zinc-700 rounded w1/2" />
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default ReusableSectionGridSkeleton;
