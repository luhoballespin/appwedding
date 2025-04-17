import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import api from '../services/api';

const localizer = momentLocalizer(moment);

const Calendar = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get('/events'); // Ajusta la ruta según tu API
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    const handleSelectEvent = (event) => {
        // Lógica para manejar la selección de un evento
        console.log('Selected event:', event);
    };

    const handleSelectSlot = (slotInfo) => {
        // Lógica para manejar la selección de un slot en el calendario
        console.log('Selected slot:', slotInfo);
    };

    return (
        <div>
            <h2>Calendario de Eventos</h2>
            <BigCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500, margin: '50px' }}
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleSelectSlot}
                selectable
            />
        </div>
    );
};

export default Calendar;