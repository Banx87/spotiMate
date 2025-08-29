import { useEffect } from "react";
import { useChatStore } from "../../stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import Topbar from "../../components/Topbar";
import UsersList from "./components/UsersList";
import ChatHeader from "./components/ChatHeader";
import Chat from "./components/Chat";
import MessageInput from "./components/MessageInput";
import { ScrollArea } from "../../components/ui/scroll-area";

const ChatPage = () => {
	const { user } = useUser();
	const { selectedUser, fetchUsers } = useChatStore();

	useEffect(() => {
		if (user) fetchUsers();
	}, [fetchUsers, user]);

	return (
		<main className="h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden">
			<Topbar />
			<div className="grid lg:grid-cols-[300px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]">
				<UsersList />
				<div className="flex flex-col h-full">
					{selectedUser ? (
						<>
							<ChatHeader />
							<MessageInput />

							<ScrollArea className="h-[calc(100vh-340px)]">
								<Chat />
							</ScrollArea>
						</>
					) : (
						<NoConversationPlaceHolder />
					)}
				</div>
			</div>
		</main>
	);
};

export default ChatPage;

const NoConversationPlaceHolder = () => (
	<div className="flex flex-col items-center justify-center h-full space-y-6 relative ">
		<div className="flex items-center relative justify-center bg-lime-300 w-[80%] h-[200px] rounded-3xl p-4 m-2">
			<img
				src="/SpotiMate_logo.png"
				alt="SpotiMate"
				className="absolute h-32 top-2 animate-bounce"
			/>
			<div className="absolute text-center top-28 ">
				<h3 className="text-zinc-800 text-lg font-medium">
					No conversation selected
				</h3>
				<p className="text-zinc-500 text-sm">
					Choose a friend to start chatting
				</p>
			</div>
		</div>
	</div>
);
