import React from 'react';

// Declare Section type here
interface Section {
  name: string;
  number: number;
  color: string;
}

interface SeatProps {
  label: string | null; // Added label prop
  section: Section | undefined; // The section assigned to the seat (undefined if unselected)
  onClick: () => void;
}

const Seat = ({ label, section, onClick }: SeatProps) => {
  return (
    <div
      onClick={onClick}
      style={{
        padding: '2px',
        backgroundColor: section ? section.color : '#fff',
        color: section ? '#000' : '#000',
        cursor: 'pointer',
        textAlign: 'center',
      }}
    >
      {label ? label : 'Unselected'} {/* Show seat label or 'Unselected' */}
    </div>
  );
  
};

export default Seat;
