

const Barrel = require("../mongoSchemas/barrel"); // Import the Barrel model

//////
const submitBarrelData1 = async ({ 
  userId, 
  username, 
  barrel1, 
  barrel1A, 
  barrel2, 
  barrel3, 
  barrel4, 
  description, 
  partNumbers, 
  angleA, 
  angleB, 
  length, 
  distA, 
  distB, 
  designer, 
  date, 
  applicable 
}) => {
  // Create the new barrel document with the received data
  const newBarrel = new Barrel({
    barrel1,
    barrel1A,
    barrel2,
    barrel3,
    barrel4,
    serialNumber: "000",  // Default value, will be updated in the controller
    finalOutput: "",      // Default value, will be updated in the controller
    submittedBy: username,
    submittedAt: new Date(),
    description,
    partNumbers,         // Add part numbers array
    angleA,              // Add angle A
    angleB,              // Add angle B
    length,              // Add length
    distA,               // Add Dist A
    distB,               // Add Dist B
    designer,            // Add designer
    date,                // Add date
    applicable           // Add applicable (string)
  });

  // Save the new barrel data to the database
  const savedBarrel = await newBarrel.save();

  // Return the saved barrel data (controller will handle final output and serial number)
  return { finalOutput: savedBarrel.finalOutput, submittedBy: username };
};


const getAllBarrelsForUser = async (finalOutputPrefix) => {
  try {
    const barrels = await Barrel.find({ finalOutput: { $regex: `^${finalOutputPrefix}-`, $options: "i" } });
    // console.log('barrels:',barrels);
    return barrels;
  } catch (error) {
    throw new Error("Unable to fetch barrel data.");
  }
};
const getBarrelByFinalOutputt = async (finalOutput) => {
  try {
    const barrel = await Barrel.findOne({ finalOutput: finalOutput });
    if (!barrel) {
      throw new Error("Barrel not found.");
    }
    return barrel;
  } catch (error) {
    throw new Error("Unable to fetch barrel data.");
  }
};
const deleteBarrelByFinalOutputt = async (finalOutput) => {
  try {
    const result = await Barrel.deleteOne({ finalOutput });
    if (result.deletedCount === 0) {
      throw new Error('No barrel found with this final output.');
    }
    return result;
  } catch (error) {
    throw new Error(`Error deleting barrel: ${error.message}`);
  }
};
const deleteAllBarrelsService = async () => {
  try {
    // Delete all barrels using deleteMany() method
    const result = await Barrel.deleteMany({});  // Deletes all barrels in the collection
    return result;
  } catch (error) {
    throw new Error(`Error deleting all barrels: ${error.message}`);
  }
};





module.exports = { submitBarrelData1,getAllBarrelsForUser ,getBarrelByFinalOutputt,deleteBarrelByFinalOutputt,deleteAllBarrelsService};




