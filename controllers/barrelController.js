

const Barrel = require("../mongoSchemas/barrel"); // Import the Barrel model
const { submitBarrelData1,getAllBarrelsForUser ,getBarrelByFinalOutputt,deleteBarrelByFinalOutputt,deleteAllBarrelsService} = require('../services/barrelService'); // Import the service function

// Handle barrel data submission



//   const getBarrelsForUser = async (req, res) => {
//     // const { username } = req.user.username; // Assuming `userId` is available in the `req.user` object
//   console.log('user:',req.user);
//   console.log('User Data:',req.body);
//   const username = req.user.username || 'checkcount3@yopmail.com'; // Get username directly
//   const usreName=username;
//   // const username = 'checkcount4@yopmail.com';
// console.log("username:",username);
//     try {
//       // Call the service to fetch all barrels for the user
//       // const barrels = await getAllBarrelsForUser(userId);
//       const barrels = await getAllBarrelsForUser(usreName);
//   console.log('barrels::',barrels)
//       if (!barrels || barrels.length === 0) {
//         return res.status(404).json({ message: "No barrel data found for this user." });
//       }
  
//       res.status(200).json({ barrels }); // Return the list of barrels
//     } catch (error) {
//       console.error("Error fetching barrel data:", error);
//       res.status(500).json({ message: "Unable to fetch barrel data.", error: error.message });
//     }
//   };
  
const getBarrelsForUser = async (req, res) => {
  // console.log('user:',req.user._id);
    // console.log('User Data:',req.body);
    // const username = req.user.username || 'checkcount3@yopmail.com'; // Get username directly
    
    
  const finalOutputPrefix  = req.user._id; // Extract the prefix from request parameters

  // console.log("Fetching barrels with finalOutput prefix:", finalOutputPrefix);

  try {
    const barrels = await getAllBarrelsForUser(finalOutputPrefix);

    if (!barrels || barrels.length === 0) {
      return res.status(404).json({ message: "No barrel data found for this prefix." });
    }

    res.status(200).json({ barrels });
  } catch (error) {
    console.error("Error fetching barrel data:", error);
    res.status(500).json({ message: "Unable to fetch barrel data.", error: error.message });
  }
};

  const getBarrelByFinalOutput = async (req, res) => {
    const { finalOutput } = req.params; // Access finalOutput from request parameters
    
    try {
      // Call the service to fetch the barrel by finalOutput
      const barrel = await getBarrelByFinalOutputt(finalOutput); // Assuming the function getBarrelByFinalOutput is defined in your service
      
      if (!barrel) {
        return res.status(404).json({ message: "No barrel data found for this finalOutput." });
      }
  
      res.status(200).json(barrel); // Return the barrel data
    } catch (error) {
      console.error("Error fetching barrel data by finalOutput:", error);
      res.status(500).json({ message: "Unable to fetch barrel data.", error: error.message });
    }
  };
  const deleteBarrelByFinalOutput = async (req, res) => {
    const { finalOutput } = req.params; // finalOutput is passed in the route 
    if (!finalOutput) {
      return res.status(400).json({ message: 'Final output parameter is missing.' });
    }
  
    try {
      // Call the service to delete the barrel by finalOutput
      const result = await deleteBarrelByFinalOutputt(finalOutput);
      
      res.status(200).json({
        message: 'Barrel data deleted successfully.',
        deletedCount: result.deletedCount
      });
      // console.log('Finaloutput Deleted successfully');
    } catch (error) {
      console.error(`Error deleting barrel with finalOutput "${finalOutput}":`, error.message);
      res.status(500).json({ message: `Failed to delete barrel: ${error.message}` });
    }
  };
  const deleteAllBarrels = async (req, res) => {
    try {
      // Call the service to delete all barrels
      const result = await deleteAllBarrelsService();  // Use the correct service function
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'No barrels found to delete.' });
      }
  
      res.status(200).json({
        message: 'All barrel data deleted successfully.',
        deletedCount: result.deletedCount
      });
      // console.log('All barrels deleted successfully');
    } catch (error) {
      console.error('Error deleting all barrels:', error.message);
      res.status(500).json({ message: `Failed to delete barrels: ${error.message}` });
    }
  };
  
  
  ////
  const submitBarrelData = async (req, res) => {
    // console.log('Received user:', req.user); // Check user from the token
    // console.log('Received data:', req.body); // Check the submitted data
    // console.log('req.user._id:', req.user._id); // Log the user ID
  
    const username = req.user?.username || "unknown_user"; // Get the username from the request, default to "unknown_user" if not available
    // console.log('Username:', username);
  
    // Destructure the required fields from the request body
    const { 
      barrel1, barrel1A, barrel2, barrel3, barrel4, 
      description, partNumbers, descriptions,       
      angleA, angleB, length, distA, distB, 
      designer, date, applicable 
    } = req.body;
  
    // Validate input values
    if (
      barrel1.length !== 2 ||
      barrel1A.length !== 2 ||
      barrel2.length !== 2 ||
      barrel3.length !== 2 ||
      barrel4.length !== 1
    ) {
      return res.status(400).json({
        message: "Error: One or more barrels do not meet the required digit constraints.",
      });
    }
  
    try {
      // Construct the base part number (excluding the serial number for now)
      const basePartNumber = `${barrel1}${barrel1A}${barrel2}${barrel3}${barrel4}`;
      // console.log('Base Part Number:', basePartNumber);
  
      // Generate the base output with a serial number starting from 000
      let serialSuffix = "000"; // Start with the first serial number "000"
      let finalOutput = `${req.user._id}-${basePartNumber}${serialSuffix}`;
      
      // Check if the finalOutput with serial number already exists in the database
      let duplicateCheck = await Barrel.findOne({ finalOutput });
  
      if (duplicateCheck) {
        let counter = 1;
        // Loop through the serial numbers until we find an available one
        while (duplicateCheck) {
          serialSuffix = counter.toString().padStart(3, '0'); // Ensure 3 digits (e.g., 001, 002)
          finalOutput = `${req.user._id}-${basePartNumber}${serialSuffix}`;
          duplicateCheck = await Barrel.findOne({ finalOutput });
          counter++;
  
          // If counter exceeds 999, break the loop to prevent infinite checks
          if (counter > 999) {
            throw new Error("Unable to generate a unique serial number. Please try again later.");
          }
        }
      }
  
      // Create the barrel entry with the final generated output and additional data
      const newBarrel = new Barrel({
        barrel1,
        barrel1A,
        barrel2,
        barrel3,
        barrel4,
        serialNumber: serialSuffix,
        finalOutput,
        submittedBy: username,
        submittedAt: new Date(),
        description,
        partNumbers,    // Store part numbers as an array
        descriptions,   // Store descriptions as an array  
        angleA,         // Store angle A
        angleB,         // Store angle B
        length,         // Store length
        distA,          // Store Dist A
        distB,          // Store Dist B
        designer,       // Store designer
        date,           // Store date
        applicable      // Store applicable (string)
      });
  
      // Save the new barrel data to the database
      const savedBarrel = await newBarrel.save();
  
      // Return only the final output (with 3-digit serial number) for display purposes
      const finalOutputForDisplay = savedBarrel.finalOutput.slice(-12); // Extract the final part of the serial output
  
      // console.log('Final Output for Display:', finalOutputForDisplay);
  
      // Send success response with final output and submitted by details
      res.status(200).json({
        message: "Data saved successfully!",
        finalOutput: finalOutputForDisplay, // Send only the final serial number part
        submittedBy: username,
      });
  
    } catch (error) {
      console.error("Error saving data:", error);
      res.status(500).json({ message: "Error: Unable to save data." });
    }
  };
  
  
  
  
  module.exports = {  getBarrelsForUser,getBarrelByFinalOutput,submitBarrelData ,deleteBarrelByFinalOutput,deleteAllBarrels};
