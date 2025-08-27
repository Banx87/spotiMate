import { useEffect } from "react";
import { useChatStore } from "../../stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import Topbar from "../../components/Topbar";
import UsersList from "./components/UsersList";
import Chat from "./components/chat";

const ChatPage = () => {
	const { user } = useUser();
	const { messages, selectedUser, fetchUsers, fetchMessages } = useChatStore();

	useEffect(() => {
		if (user) fetchUsers();
	}, [fetchUsers, user]);

	useEffect(() => {
		if (selectedUser) fetchMessages(selectedUser.clerkId);
	}, [selectedUser, fetchMessages]);

	return (
		<main className="h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden">
			<Topbar />
			<div className="grid lg:grid-cols-[300px_1fr] grid-cols.-[80px_1fr] h-[clac(100vh-180px)]">
				<UsersList />
				<Chat />
			</div>
		</main>
	);
};

export default ChatPage;
