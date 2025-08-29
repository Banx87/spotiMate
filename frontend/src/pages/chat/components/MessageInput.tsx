import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useChatStore } from "../../../stores/useChatStore";
import { Button } from "../../../components/ui/button";
import { SendIcon } from "lucide-react";

const MessageInput = () => {
	const [newMessage, setNewMessage] = useState("");
	const { user } = useUser();
	const { selectedUser, sendMessage } = useChatStore();

	const handleSendMessage = () => {
		if (!selectedUser || !user || !newMessage) return;
		sendMessage(selectedUser.clerkId, user.id, newMessage);
		setNewMessage("");
	};

	return (
		<div className="flex p-4 border-t border-zinc-800">
			<div className="flex w-full gap-2">
				<input
					className="flex-1 mr-3 rounded-lg bg-zinc-900 px-4 py-2 text-sm placeholder:text-zinc-500"
					placeholder="Type a message"
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
				/>
			</div>
			<Button
				size="icon"
				onClick={handleSendMessage}
				disabled={!newMessage.trim()}
				className="bg-lime-500 hover:bg-lime-600"
			>
				<SendIcon />
			</Button>
		</div>
	);
};

export default MessageInput;
