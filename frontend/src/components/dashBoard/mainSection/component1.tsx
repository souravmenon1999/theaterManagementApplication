import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import AddTheaterModal from './addTheaterModal';
import { useAppDispatch, useAppSelector } from '@/library/hooks';
import { getTheaters } from '@/library/features/dashBoard/dashBoardSlice';
import TheaterList from './theaterList';
import TheaterDetails from './theaterDetails';
import SeatMatrix from '@/components/seating/layout';

function Component1() {
  const [modalShow, setModalShow] = useState(false);

  const dispatch = useAppDispatch();
  const dashBoardData = useAppSelector(state => state.theaterDetails);


  const [selectedTheaterId, setSelectedTheaterId] = useState<string | null>(null);

  const handleSelectTheater = (id: string) => {
    setSelectedTheaterId(id);
  };


  useEffect(() => {
  dispatch(getTheaters());
  console.log(dashBoardData);
  },[]);

  useEffect(() => {
    // Log after data is fetched
    console.log(dashBoardData.theaters);
  }, [dashBoardData]);


  return (
    <>
      {/* Button to trigger the modal */}
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Add Theater
      </Button>

      {/* Modal Component */}
      <AddTheaterModal show={modalShow} setShow={setModalShow}>
        {/* You can pass additional content here if needed */}
        
      </AddTheaterModal>

      <div className='flex'>
      <div className='flex flex-col overflow-x-scroll'>
      <TheaterList onSelectTheater={handleSelectTheater} />
      </div>


      <div style={{ flex: 1 }}>
        <h2>Theater Details</h2>
        {selectedTheaterId ? (
          
            <TheaterDetails theaterId={selectedTheaterId} />
            
        
         
        ) : (
          <div>Select a theater to see the details
             
          </div>
        )}
      </div>
      </div>

     
     
    </>
  );
}

export default Component1;
