import React from 'react';
import '../styles/Ticket.css';

const Ticket = ({ ticket, user, priorityMap }) => {
  return (
    <div className="ticket">
      <div className="ticket-header">
        <span className="ticket-id">{ticket.id}</span>
        {user && (
          <div className="user-avatar" title={user.name}>
            {user.name[0]}
          </div>
        )}
      </div>
      <div className="ticket-title">
        {ticket.title}
      </div>
      <div className="ticket-tags">
        <div className="tag priority">
          {priorityMap[ticket.priority].icon}
        </div>
        {ticket.tag && (
          <div className="tag feature">
            {ticket.tag}
          </div>
        )}
      </div>
    </div>
  );
};

export default Ticket;