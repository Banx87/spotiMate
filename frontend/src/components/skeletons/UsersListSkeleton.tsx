import { Skeleton } from "../ui/skeleton";

const UsersListSkeleton = ({ count }: { count: number }) => {
	return (
		<>
			{/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"> */}
			{[...Array(count)].map((_, i) => (
				<div
					key={i}
					className="flex items-center justify-center lg:justify-start rounded-lg gap-3 p-3 animate-pulse"
				>
					<Skeleton className="size-12 rounded-full bg-zinc-800" />
					<div className="flex-1 lg:block hidden">
						<Skeleton className="h-4 w-24 bg-zinc-800 rounded mb-2" />
						<Skeleton className="h-4 w-32 bg-zinc-700 rounded mb-2" />
					</div>
				</div>
			))}
			{/* </div> */}
		</>
	);
};

export default UsersListSkeleton;
