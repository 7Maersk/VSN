import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { useEffect, useState } from 'react'
import { Ticket } from '@/types'
import { api } from '@/api/api.config'

const TicketsPage = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);

    const [text, setText] = useState('');

    useEffect(() => {
        loadTickets();
    }, []);

    const loadTickets = () => {
        api.getTickets()
            .then((tickets: Ticket[]) => setTickets(tickets))
            .catch((error) => console.error(error));
    };

    const handleAddTicket = () => {
        api.addTicket({ text })
            .then(() => {
                setText('');
                loadTickets();
            })
            .catch((error) => console.error(error));
    };

    const handleDeleteTicket = (id: number) => {
        api.deleteTicket(id)
            .then(() => loadTickets())
            .catch((error) => console.error(error));
    };

    return (
        <div>
            <div>
                <Input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter ticket text"
                />
                <Button onClick={handleAddTicket}>Add Ticket</Button>
            </div>

        </div>
    );
};

export default TicketsPage;
