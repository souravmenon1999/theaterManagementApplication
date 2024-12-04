import React, { useState, useEffect } from 'react';
import Seat from './seat';
import { SketchPicker } from 'react-color';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '@/library/hooks';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from '@mui/material';
import { addScreen } from '@/library/features/dashBoard/screenSlice';

interface Section {
  name: string;
  number: number;
  color: string;
}

type SeatMatrixProps = {
  open: boolean;
  id: string;
  handleClose: () => void;
};

const SeatMatrix = ({ open, handleClose, id }: SeatMatrixProps) => {

  const dispatch = useAppDispatch();



  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(5);
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [seatMatrix, setSeatMatrix] = useState<(string | null)[][]>(
    Array.from({ length: 5 }, () => Array(5).fill(null))
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSection, setNewSection] = useState({ name: '', color: '#ffffff' });
  const [currentColor, setCurrentColor] = useState('#ffffff');
  const [screenName, setScreenName] = useState('');

  const closeBox = () =>{
    setRows(5);
    setCols(5);
    setScreenName('')
    setSections([]);
    setSelectedSection(null);
    handleClose();
  }  


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    const packedData = {
      id,
      screenName,
      sections,
      seatMatrix,
    };
    console.log(packedData);
    closeBox(); // Close the modal after form submission

    try {
      // Dispatch the addScreen thunk
      await dispatch(addScreen(packedData)).unwrap();
      console.log('Screen successfully added');
    } catch (error) {
      console.error('Failed to add screen:', error);
    }
  };

  // Adjust seatMatrix dynamically when rows or columns change
  useEffect(() => {
    const newSeatMatrix = Array.from({ length: rows }, (_, rowIndex) => {
      if (rowIndex < seatMatrix.length) {
        return Array.from({ length: cols }, (_, colIndex) =>
          colIndex < seatMatrix[rowIndex].length ? seatMatrix[rowIndex][colIndex] : null
        );
      }
      return Array(cols).fill(null);
    });
    setSeatMatrix(newSeatMatrix);
  }, [rows, cols]);

  const getLabeledSeatMatrix = () => {
    return seatMatrix.map((row, rowIndex) => {
      return row.map((seatValue, colIndex) => {
        if (seatValue === null) {
          return null;
        }
        const section = sections.find((s) => s.number === Number(seatValue.split('')[0])); // Get the section number from seatValue
        const sectionNumber = section ? section.number : 0;
        const seatLabel = `${sectionNumber}${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`;
        return seatLabel;
      });
    });
  };

  const labeledSeatMatrix = getLabeledSeatMatrix();

  const handleSeatClick = (row: number, col: number) => {
    // Check if selectedSection is defined and within bounds
    if (selectedSection == null || selectedSection < 1 || selectedSection > sections.length) {
      console.warn('Invalid selected section:', selectedSection);
      return;
    }
  
    const sectionIndex = selectedSection - 1;
    const section = sections[sectionIndex];
  
    // Check if the section at the sectionIndex is defined
    if (!section) {
      console.error(`Section at index ${sectionIndex} not found`);
      return;
    }
  
    // Create seat label based on the selected section and seat position
    const label = `${section.number}${String.fromCharCode(65 + row)}${col + 1}`;
  
    // Update the seatMatrix with the new label or toggle back to null if it matches
    const updatedMatrix = seatMatrix.map((r, rowIndex) =>
      rowIndex === row
        ? r.map((seat, colIndex) => (colIndex === col ? (seat === label ? null : label) : seat))
        : r
    );
  
    setSeatMatrix(updatedMatrix);
  };
  

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setNewSection({ name: '', color: '#ffffff' });
    setCurrentColor('#ffffff');
  };

  const handleAddSection = () => {
    const number = sections.length + 1;
    if (newSection.name) {
      const section = { ...newSection, number };
      setSections([...sections, section]);
      closeModal();
    } else {
      alert('Please enter a section name.');
    }
  };

  const handleColorChange = (color: any) => {
    setCurrentColor(color.hex);
    setNewSection({ ...newSection, color: color.hex });
  };

  const handleDeleteSection = (sectionNumber: number) => {
    const updatedSections = sections.filter((section) => section.number !== sectionNumber);
    setSections(updatedSections);

    const updatedMatrix = seatMatrix.map((row) =>
      row.map((seatValue) => (seatValue?.startsWith(sectionNumber.toString()) ? null : seatValue)) // Check if the seat value starts with the section number
    );
    setSeatMatrix(updatedMatrix);
  };

  return (
    <Dialog
    open={open}
    onClose={closeBox}
    PaperProps={{
      component: 'form',
      onSubmit: handleSubmit,
    }}
  >

<DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>

    <div>

    <TextField
  label="Screen Name"
  value={screenName}
  onChange={(e) => setScreenName(e.target.value)}
  fullWidth
  style={{ marginBottom: '20px' }}
/>


      <div style={{ marginBottom: '20px' }}>
        <label>
          Rows:
          <input type="number" value={rows} onChange={(e) => setRows(parseInt(e.target.value))} min="1" />
        </label>
        <label>
          Columns:
          <input type="number" value={cols} onChange={(e) => setCols(parseInt(e.target.value))} min="1" />
        </label>
      </div>

      <button type='button' onClick={openModal}>Add Section</button>

      <div style={{ margin: '20px 0' }}>
        <h3>Select a section to assign to seats:</h3>
        {sections.map((section) => (
          <div key={section.number} style={{ display: 'inline-block', marginRight: '10px' }}>
            <button type='button'
              onClick={() => setSelectedSection(section.number)}
              style={{
                backgroundColor: section.color,
                color: '#fff',
                padding: '10px',
                border: selectedSection === section.number ? '2px solid black' : 'none',
              }}
            >
              {section.name}
            </button>
            <button
              onClick={() => handleDeleteSection(section.number)}
              style={{ marginLeft: '5px', backgroundColor: 'red', color: '#fff', padding: '5px', border: 'none' }}
            >
              X
            </button>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '10px' }}>
        {labeledSeatMatrix.map((row, rowIndex) =>
          row.map((seatLabel, colIndex) => {
            const section = sections.find((s) => s.number === Number(seatMatrix[rowIndex][colIndex]?.split('')[0])); // Convert seatValue to number
            return (
              <Seat
                key={`${rowIndex}-${colIndex}`}
                label={seatLabel}
                section={section}
                onClick={() => handleSeatClick(rowIndex, colIndex)}
              />
            );
          })
        )}
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>Seat Matrix Data:</h2>
        <pre>{JSON.stringify(seatMatrix, null, 2)}</pre>
        <pre>{JSON.stringify(sections)}</pre>
      </div>

      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', width: '300px' }}>
            <h3>Add a New Section</h3>
            <label>
              Section Name:
              <input
                type="text"
                value={newSection.name}
                onChange={(e) => setNewSection({ ...newSection, name: e.target.value })}
              />
            </label>
            <SketchPicker color={currentColor} onChange={handleColorChange} />
            <button type="button" onClick={handleAddSection}>Add Section</button>
            <button type="button" onClick={closeModal} style={{ marginLeft: '10px' }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>

    </DialogContent>
      <DialogActions>
        <Button onClick={closeBox}>Cancel</Button>
        <Button type="submit">Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SeatMatrix;
