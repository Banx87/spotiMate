import { SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { useAuthStore } from "../stores/useAuthStore";
import { buttonVariants } from "./ui/button";
import { cn } from "../lib/utils";

const Topbar = () => {
	const isAdmin = useAuthStore();
	return (
		<div className="flex items-center justify-between p-4 pl-0 sticky top-0 max-h-[88px] bg-lime-300/85  backdrop-blur-md z-10">
			<div className="flex gap-2 items-center">
				<img src="/SpotiMate_logo.png" className=" h-[125px]" />
			</div>
			<div className="flex items-center gap-4 mr-2 ">
				{isAdmin && (
					<Link
						to="/admin"
						className={cn(
							buttonVariants({
								variant: "black",
							})
						)}
					>
						<LayoutDashboardIcon className=" size-4 mr-2" />
						Admin Dashboard
					</Link>
				)}

				<div className="max-w-[200px]">
					<SignedOut>
						<SignInOAuthButtons />
					</SignedOut>
				</div>

				<UserButton />
			</div>
		</div>
	);
};

export default Topbar;
