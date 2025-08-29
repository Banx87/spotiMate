import { useUser } from "@clerk/clerk-react";
import { useChatStore } from "../../../stores/useChatStore";
import { Avatar, AvatarImage } from "../../../components/ui/avatar";
import { useEffect } from "react";

const formatTime = (date: string) => {
	return new Date(date).toLocaleTimeString("fi-Fi", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	});
};

const Chat = () => {
	const { user } = useUser();
	const { messages, selectedUser, fetchMessages } = useChatStore();

	useEffect(() => {
		if (selectedUser) fetchMessages(selectedUser.clerkId);
	}, [selectedUser, fetchMessages]);
	return (
		<div className="p-4 space-y-4">
			{messages
				.slice()
				.sort(
					(a, b) =>
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				)
				.map((message) => (
					<div
						key={message._id}
						className={`flex items-start gap-3 ${
							message.senderId === user?.id ? "flex-row-reverse" : ""
						}`}
					>
						<Avatar className="size-8">
							<AvatarImage
								src={
									message.senderId === user?.id
										? user.imageUrl
										: selectedUser?.imageUrl
								}
							/>
						</Avatar>

						<div
							className={`rounded-lg p-3 max-w-[70%]  ${
								message.senderId === user?.id
									? "bg-lime-300/85 text-zinc-800"
									: "bg-zinc-700 "
							}`}
						>
							<p className="text-sm">{message.content}</p>
							<span
								className={`text-xs text-zinc-300 mt-1 block ${
									message.senderId === user?.id
										? "text-right text-zinc-500"
										: ""
								}`}
							>
								{formatTime(message.createdAt)}
							</span>
						</div>
					</div>
				))}
		</div>
	);
};

export default Chat;
