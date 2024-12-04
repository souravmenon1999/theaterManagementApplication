import { ReactNode, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useAppDispatch, useAppSelector } from '@/library/hooks';
import { addTheater } from '@/library/features/dashBoard/dashBoardSlice';



interface TheaterModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
  children?: ReactNode; // Optional, if you want to use children
}

function AddTheaterModal({ show, setShow, children }: TheaterModalProps) {

  const dispatch = useAppDispatch();
  
  const dashBoardData = useAppSelector(state => state.theaterDetails);

  

  const handleClose = () => setShow(false);

  const [theaterName, setTheaterName] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (!theaterName || !address) {
      alert("Please fill in all required fields.");
      return;
    }

    

    console.log({theaterName, address});

    dispatch(addTheater({theaterName, address}))

    // Add your submission logic here (e.g., sending data to the server)

    handleClose(); // Close the modal after submission
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Theater</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formTheaterName">
            <Form.Label>Theater Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter theater name"
              autoFocus
              value={theaterName}
              onChange={(e) => setTheaterName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTheaterAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          {children && <div>{children}</div>} {/* Optional children rendering */}
          <div className='flex justify-end'>

          <Button variant="secondary" onClick={handleClose} className='mx-2'>
          Close
        </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
       

          </div>
          </Form>
         
      </Modal.Body>
      
    </Modal>
  );
}

export default AddTheaterModal;
