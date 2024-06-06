import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Импорт Link из react-router-dom
import { api } from '@/api/api.config';

interface Room {
    name: string;
}

const RoomListPage: React.FC = () => {
    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        api.getRooms().then((rooms: Room[]) => setRooms(rooms));
    }, []);

    return (
        <div>
            <h1>Список комнат</h1>
            <ul>
                {rooms.map(room => (
                    <li key={room.name}>
                        <Link to={`/thread/${room.name}`}>{room.name}</Link> {/* Использование Link */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RoomListPage;
