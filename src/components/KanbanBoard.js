import React, { useState, useEffect } from 'react';
import DisplayMenu from './DisplayMenu';
import Column from './Column';
import { getLocalStorage, setLocalStorage } from '../utils/storage';
import '../styles/KanbanBoard.css';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [displaySettings, setDisplaySettings] = useState(
    getLocalStorage('displaySettings') || {
      groupBy: 'status',
      orderBy: 'priority'
    }
  );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setLocalStorage('displaySettings', displaySettings);
  }, [displaySettings]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      const data = await response.json();
      setTickets(data.tickets);
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const priorityMap = {
    0: { name: 'No priority', icon: '⚫' },
    1: { name: 'Low', icon: '⚪' },
    2: { name: 'Medium', icon: '🟢' },
    3: { name: 'High', icon: '🟡' },
    4: { name: 'Urgent', icon: '🔴' },
    5: { name: 'Critical', icon: '🔵' }  // Added level 5
  };

  const groupAndSortTickets = () => {
    let grouped = {};
    const { groupBy, orderBy } = displaySettings;

    // Group tickets
    if (groupBy === 'status') {
      grouped = tickets.reduce((acc, ticket) => {
        acc[ticket.status] = [...(acc[ticket.status] || []), ticket];
        return acc;
      }, {});
    } else if (groupBy === 'user') {
      grouped = tickets.reduce((acc, ticket) => {
        const user = users.find(u => u.id === ticket.userId);
        const userName = user ? user.name : 'Unassigned';
        acc[userName] = [...(acc[userName] || []), ticket];
        return acc;
      }, {});
    } else if (groupBy === 'priority') {
      grouped = tickets.reduce((acc, ticket) => {
        const priority = priorityMap[ticket.priority].name;
        acc[priority] = [...(acc[priority] || []), ticket];
        return acc;
      }, {});
    }

 
    Object.keys(grouped).forEach(key => {
      grouped[key].sort((a, b) => {
        if (orderBy === 'priority') {
          return a.priority - b.priority;
        } else {
          return a.title.localeCompare(b.title);
        }
      });
    });


    if (groupBy === 'priority') {
      const orderedGroups = {};
      Object.keys(priorityMap)
        .sort((a, b) => a - b) 
        .forEach(priorityKey => {
          const priorityName = priorityMap[priorityKey].name;
          if (grouped[priorityName]) {
            orderedGroups[priorityName] = grouped[priorityName];
          }
        });
      return orderedGroups;
    }

    return grouped;
  };

  const groupedTickets = groupAndSortTickets();

  return (
    <div className="kanban-board">
      <DisplayMenu 
        settings={displaySettings}
        onSettingsChange={setDisplaySettings}
      />
      <div className="board-columns">
        {Object.entries(groupedTickets).map(([groupName, tickets]) => (
          <Column
            key={groupName}
            title={groupName}
            tickets={tickets}
            users={users}
            priorityMap={priorityMap}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
