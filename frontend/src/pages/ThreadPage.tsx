import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { api } from '@/api/api.config';
import useAuth from '@/store/auth.store';

const socket = io('http://localhost:3001', {
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": "abcd"
    }
});

interface Message {
    id: number;
    text: string;
    img: string;
    room_id: number;
    user_id: number;
    nickname: string;
    datetime: string;
}

const ThreadPage = () => {
    const auth = useAuth()
    const { room } = useParams<{ room: string }>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState<string>('');
    const user_id = auth.user?.id


    // Добавляем user_id текущего пользователя

    useEffect(() => {
        if (room) {

            socket.emit('joinRoom', room);

            socket.on('initialMessages', (messages: Message[]) => {
                setMessages(messages);
            });

            socket.on('receiveMessage', (newMessage: Message) => {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });
        }

        return () => {
            socket.off('initialMessages');
            socket.off('receiveMessage');
        };
    }, [room]);

    const sendMessage = () => {
        if (message.trim() && room) {
            socket.emit('sendMessage', { room, message, user_id });
            setMessage('');
        }
    };


    return (
        <div>
            <h2>Chat Room: {room}</h2>
            <div>
                {messages.map((msg) => (
                    <div key={msg.id}>
                        <strong>{msg.nickname}:</strong> {msg.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ThreadPage;
