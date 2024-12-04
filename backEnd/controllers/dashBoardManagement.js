import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import TheaterOwnerListModel from '../models/theaterOwner.js';
import theaterList from '../models/theaterList.js';
import SeatMatrix from '../models/screenDB.js';
import TheaterList from '../models/theaterList.js';

// function to add the theater

export const addTheater = asyncHandler(async (req, res) => {
    const { theaterName, address } = req.body;

    // Validate request data
    if (!theaterName || !address) {
        return res.status(400).json({ message: "Theater name and address are required" });
    }


    // Find the theater owner by ID
    const owner = await TheaterOwnerListModel.findById(req.user.id);
    if (!owner) {
        return res.status(404).json({ message: "Theater owner not found" });
    }


    // Create the theater data
    const theaterData = {
        ownerID: owner._id,
        theaterName,
        address
    };

    // Save the theater to the database
    const newTheater = await theaterList.create(theaterData);

    // Respond with the created theater details
    res.status(201).json({
        theaterDetails: newTheater
    });
    console.log(newTheater);
});



// Function to get the entire theater list

export const getAllTheater = asyncHandler(async (req, res) => {
    const id = req.user;  // Assuming req.user contains the authenticated user's ID
    const ObjectId = mongoose.Types.ObjectId;
    const userIdObjectId = new ObjectId(id);

    const theaters = await theaterList.find({ ownerID: userIdObjectId });

    return res.status(201).json({
        theaterDetails: theaters
    });
});


// function to add a New screen

export const addScreen = asyncHandler(async(req, res) =>{
    
  const { id, screenName,  sections, seatMatrix } = req.body;


 

  if (!id || !screenName || !seatMatrix || !sections) {
      return res.status(400).json({ message: 'Theater ID, screen name, seat matrix, and sections are required' });
    }

    const theaterObjectId = new mongoose.Types.ObjectId(id);


    if (!Array.isArray(seatMatrix) || !Array.isArray(sections)) {
      return res.status(400).json({ message: 'Seat matrix must be a 2D array, and sections must be an array' });
    }

    const screenData = {
      screenName,
      seatMatrix,
      sections,
    };

    console.log(screenData);
    console.log('okay');

    try {
      // Save the screen data to the SeatMatrix collection
      const newScreen = await SeatMatrix.create(screenData);
      console.log('sample');
      console.log(newScreen._id);
    
      // Update the theater by pushing the new screen ID into the screens array
      const updatedTheater = await TheaterList.findByIdAndUpdate(
          theaterObjectId,
        { $push: { screenIDs: newScreen._id } }, // Append new screen ID to the screens array
        { new: true } // Return the updated theater document
      );
    
      // Check if the theater was found and updated
      if (!updatedTheater) {
        return res.status(404).json({ message: 'Theater not found' });
      }
    
      // Respond with the new screen details and the updated theater information
      res.status(201).json({
        screenDetails: newScreen,
        theaterDetails: updatedTheater,
      });
      console.log('Screen successfully created and Theater updated:', {
        screenDetails: newScreen,
        theaterDetails: updatedTheater,
      });
    } catch (error) {
      // Log the error for debugging
      console.error('Error while creating screen and updating theater:', error);
    
      // Respond with a 500 status and the error message
      res.status(500).json({ message: 'An error occurred while saving the screen. Please try again later.' });
    }
})


// function get screens corresponding to that screen

export const getScreens = asyncHandler(async (req, res) => {
  const { theaterId } = req.body;

 
  const objectId = new mongoose.Types.ObjectId(theaterId);

  // Fetch the theater and its associated screen IDs
  const theater = await TheaterList.findById(objectId).select('screenIDs');
  if (!theater) {
    return res.status(404).json({ message: 'Theater not found' });
  }

  // Fetch screens based on the list of screen IDs stored in the theater
  const screens = await SeatMatrix.find({ _id: { $in: theater.screenIDs } });

  console.log(screens)
  
  // Send response with the fetched screens
  res.status(200).json({ screenDetails: screens });
});