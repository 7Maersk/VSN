import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { useEffect, useState } from 'react';
import { Ticket } from '@/types';
import { api } from '@/api/api.config';
import useAuth from '@/store/auth.store';

const TicketsPage = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [text, setText] = useState('');
    const { user } = useAuth();
    const [vinylId, setVinylId] = useState<number>(0);

    useEffect(() => {
        loadTickets();
    }, []);

    const loadTickets = () => {
        api.getTickets()
            .then((tickets: Ticket[]) => {
                setTickets(tickets);
            })
            .catch((error) => console.error('Failed to load tickets:', error));
    };

    const handleAddVinylRecord = () => {
        if (!vinylId) return;
        api.addVinylRecord(vinylId)
            .then(() => {
                console.log('Vinyl record added successfully');
            })
            .catch((error) => {
                console.error('Failed to add vinyl record:', error);
            });
    };



    const handleAddTicket = () => {
        if (!text.trim()) return;
        api.addTicket({ user_id: user?.id || 0, text })
            .then(() => {
                setText('');
                loadTickets();
            })
            .catch((error) => console.error('Failed to add ticket:', error));
    };

    const handleDeleteTicket = (id: number) => {
        api.deleteTicket(id)
            .then(() => loadTickets())
            .catch((error) => console.error('Failed to delete ticket:', error));
    };


    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="mb-4 flex">
                <Input
                    className="w-3/4 mr-2"
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter ticket text"
                />
                <Button className="bg-blue-500 text-white px-4 py-2" onClick={handleAddTicket}>Add Ticket</Button>
            </div>
            <div className="space-y-4">
                {tickets.map(ticket => (
                    <div key={ticket.id} className="flex justify-between items-center p-4 border rounded-lg bg-white shadow-sm">
                        <span>{ticket.text}</span>
                        <Button className="bg-red-500 text-white px-4 py-2 ml-2" onClick={() => handleDeleteTicket(ticket.id)}>Delete</Button>
                    </div>
                    // в случае успешного добавления нужно написать, в случае не успешного тоже
                    // еще нужно разграничить доступ, то есть у админов есть кнопка удалить тикет и добавить пластинку, а обычные пользователи могут только отправить тикет и не видят списка тикетов
                ))}
            </div>
            <div>
                <Input
                    className="w-3/4 mr-2"
                    type="number"
                    value={vinylId}
                    onChange={(e) => setVinylId(Number(e.target.value))}
                    placeholder="Enter vinyl record ID"
                />
                <Button className="bg-blue-500 text-white px-4 py-2 ml-2" onClick={handleAddVinylRecord}>Add Vinyl Record</Button>
            </div>
        </div>
    );
};

export default TicketsPage;
