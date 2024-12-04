import React from 'react';
import { useAppSelector,useAppDispatch } from '@/library/hooks';
import { Theater } from '@/library/types';
import { getScreens } from '@/library/features/dashBoard/screenSlice';

interface TheaterListProps {
  onSelectTheater: (id: string) => void;
}

const TheaterList = ({ onSelectTheater }: TheaterListProps) => {

  const dispatch = useAppDispatch();

  const selectTheater = (Id: string) =>{
    onSelectTheater(Id);
    dispatch(getScreens({ theaterId: Id }));
  }

  const dashBoardData = useAppSelector((state) => state.theaterDetails);
  const theaterList = dashBoardData.theaters;
  return (
    <div>
      {theaterList.map((theater: Theater) => (
        <div key={theater._id}>
          <h3 onClick={() => selectTheater(theater._id)} style={{ cursor: 'pointer' }}>
            {theater.theaterName}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default TheaterList;
