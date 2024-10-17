import React from 'react';
import Ticket from './Ticket';
import '../styles/Column.css';

const Column = ({ title, tickets, users, priorityMap }) => {
  return (
    <div className="column">
      <div className="column-header">
        <div className="header-left">
          <span className="column-icon">○</span>
          <h3>{title}</h3>
          <span className="ticket-count">{tickets.length}</span>
        </div>
        <div className="header-right">
          <button className="icon-button">+</button>
          <button className="icon-button">⋮</button>
        </div>
      </div>
      <div className="tickets-container">
        {tickets.map(ticket => (
          <Ticket
            key={ticket.id}
            ticket={ticket}
            user={users.find(u => u.id === ticket.userId)}
            priorityMap={priorityMap}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;
