import React from 'react';
import './agentsPage.scss';

const agents = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Senior Agent',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    bio: 'Expert in luxury properties with over 10 years of experience in the urban market.',
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Relocation Specialist',
    image: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=600',
    bio: 'Dedicated to helping families find their perfect neighborhood and smooth transition.',
  },
  {
    id: 3,
    name: 'Robert Brown',
    role: 'Commercial Specialist',
    image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600',
    bio: 'Focuses on office spaces and retail locations across the metropolitan area.',
  },
  {
    id: 4,
    name: 'Emily Davis',
    role: 'Residential Agent',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600',
    bio: 'Passionate about matching buyers with homes that reflect their unique personality.',
  },
];

function AgentsPage() {
  return (
    <div className='agentsPage'>
      <h1 className='title'>Our Expert Agents</h1>
      <p>Meet the dedicated professionals who work tirelessly to find you the best properties.</p>
      
      <div className="agentsList">
        {agents.map(agent => (
          <div key={agent.id} className="agentCard">
            <div className="imgContainer">
              <img src={agent.image} alt={agent.name} />
            </div>
            <div className="info">
              <h2>{agent.name}</h2>
              <span>{agent.role}</span>
              <p>{agent.bio}</p>
              <div className="contact">
                <button>Contact Agent</button>
                <button style={{backgroundColor: 'white', color: '#1E90FF', border: '1px solid #1E90FF'}}>View Profile</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AgentsPage;
