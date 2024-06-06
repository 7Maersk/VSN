import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Импорт Link из react-router-dom
import { api } from '@/api/api.config';
import { useTranslation } from 'react-i18next';

interface Room {
    name: string;
}

const RoomListPage = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [t] = useTranslation('global')


    useEffect(() => {
        api.getRooms().then((rooms: Room[]) => setRooms(rooms));
    }, []);

    return (
        <div>
            <h1>{t('translation.threads')}</h1>
            <ul>
                {rooms.map(room => (
                    <li key={room.name}>
                        <Link to={`/thread/${room.name}`}>{room.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RoomListPage;
