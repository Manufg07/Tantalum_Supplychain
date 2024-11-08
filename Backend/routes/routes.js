const express = require("express");
const router = express.Router();
const { clientApplication } = require("./client");

// **Mining Stage Routes**
router.post("/registerTantalumOre", async (req, res) => {
  try {
    const { oreId, origin, weight, minedDate } = req.body;
    const miningClient = new clientApplication();
    const result = await miningClient.submitTxn(
        "miningcompany", // Organization
        "tantalumchannel", // Channel name
        "Tantalum", // Chaincode name
        "TantalumSupplyChain",
        "registerOre",
        "",
        "registerTantalumOre",
        oreId,
        origin,
        weight,
        minedDate
    );
    res
      .status(201)
      .json({
        success: true,
        message: "Tantalum ore registered successfully!",
        data: JSON.parse(result),
      });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Successfully registered tantalum ore.",
        error: error.message || "Unknown error",
      });
  }
});

// Backend route for adding private ore details
router.post("/addPrivateOreDetails", async (req, res) => {
  try {
    const { oreId, privateDetails } = req.body;
    const miningClient = new clientApplication();

    // Add transient data for private details
const transientData = {
  privateDetails: Buffer.from(JSON.stringify(privateDetails))
};
    const result = await miningClient.submitTxn(
      "miningcompany",
      "tantalumchannel",
      "Tantalum",
      "TantalumSupplyChain",
      "privateTxn",
      transientData,
      "addPrivateOreDetails",
      oreId
    );

    res.status(200).json({
      success: true,
      message: "Private ore details added successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding private ore details.",
      error: error.message || "Unknown error",
    });
  }
});

//PDC
// router.get("/getPrivateOreDetails", async (req, res) => {
  router.get("/getPrivateOreDetails", async (req, res) => {
  const { oreId } = req.query;

  if (!oreId) {
    return res.status(400).json({
      success: false,
      message: "Ore ID is required.",
    });
  }

  try {
    const miningClient = new clientApplication();
    const result = await miningClient.evaluateTxn(
      "miningcompany",
      "tantalumchannel",
      "Tantalum",
      "TantalumSupplyChain",
      "queryPvtTxn",
      "",
      "getPrivateOreDetails",
      oreId
    );
 res.status(200).json({
      success: true,
      data: JSON.parse(result),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve private ore details.",
      error: error.message || "Unknown error",
    });
  }
  });
  
// **Route to Update Ore Compliance Status**
router.post("/updateComplianceStatus", async (req, res) => {
  try {
    // Extract necessary fields from the request body
    const { oreId, complianceStatus, certifier, certificationDate } = req.body;

    // Validate required fields
    if (!oreId || !complianceStatus || !certifier || !certificationDate) {
      return res.status(400).json({
        success: false,
        message: "All fields (oreId, complianceStatus, certifier, certificationDate) are required.",
      });
    }

    // Create a new instance of the client application for Certification Authority
    const certificationClient = new clientApplication();

    // Execute the blockchain transaction to update compliance status
    const result = await certificationClient.submitTxn(
      "certificationauthority", // Organization
      "tantalumchannel",        // Channel name
      "Tantalum",               // Chaincode name
      "TantalumSupplyChain",    // Contract name
      "updateOre",
      "",
      "updateComplianceStatus", // Chaincode function name
      oreId,                    // Ore ID
      complianceStatus,         // Compliance status
      certifier,                // Certifier name
      certificationDate         // Certification date
    );

    // Parse the binary response into JSON format
    const updatedOre = JSON.parse(new TextDecoder().decode(result));

    // Send the updated ore data as JSON response
    res.status(200).json({
      success: true,
      message: "Compliance status updated successfully!",
      data: updatedOre,
    });

  } catch (error) {
    // Handle any errors during the process
    res.status(500).json({
      success: false,
      message: "An error occurred while updating compliance status.",
      error: error.message || "Unknown error",
    });
  }
});

// **Route to Update Ore Compliance Status**
router.post("/updateRefine", async (req, res) => {
  try {
    // Extract necessary fields from the request body
    const { oreId, refinedId, purity, processingDate } = req.body;

    // Validate required fields
    if (!oreId || !refinedId || !purity || !processingDate) {
      return res.status(400).json({
        success: false,
        message:
          "All fields (oreId, refinedId, purity, processingDate) are required.",
      });
    }

    // Create a new instance of the client application for Certification Authority
    const certificationClient = new clientApplication();

    // Execute the blockchain transaction to update compliance status
    const result = await certificationClient.submitTxn(
      "refiningcompany", // Organization
      "tantalumchannel", // Channel name
      "Tantalum", // Chaincode name
      "TantalumSupplyChain", // Contract name
      "RefineOre",
      "",
      "updateRefinementDetails", // Chaincode function name
      oreId, // Ore ID
      refinedId, // Compliance status
      purity, // Certifier name
      processingDate // Certification date
    );

    // Parse the binary response into JSON format
    const updatedOre = JSON.parse(new TextDecoder().decode(result));

    // Send the updated ore data as JSON response
    res.status(200).json({
      success: true,
      message: "Refined status updated successfully!",
      data: updatedOre,
    });

  } catch (error) {
    // Handle any errors during the process
    res.status(500).json({
      success: false,
      message: "An error occurred while updating Refine status.",
      error: error.message || "Unknown error",
    });
  }
});

// **Refining Stage Routes**
router.post("/processOre", async (req, res) => {
  try {
    const { oreId, refinedId, purity, processingDate } = req.body;
    const refiningClient = new clientApplication();
    const result = await refiningClient.submitTxn(
      "refiningcompany", // Organization
      "tantalumchannel", // Channel name
      "Tantalum", // Chaincode name
      "TantalumSupplyChain",
      "processTantalumOre",
      "",
      "processOre",
      oreId,
      refinedId,
      purity,
      processingDate
    );
    res
      .status(200)
      .json({
        success: true,
        message: "Ore processed successfully!",
        data: JSON.parse(result),
      });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error processing ore.",
        error: error.message || "Unknown error",
      });
  }
});

// **Manufacturing Stage Routes**
router.post("/createComponent", async (req, res) => {
  try {
    const { componentId, oreId, manufacturer, manufactureDate } = req.body;
    const manufacturingClient = new clientApplication();
    const result = await manufacturingClient.submitTxn(
      "manufacturingcompany",
      "tantalumchannel",
      "Tantalum",
      "TantalumSupplyChain",
      "manufactureOre",
      "",
      "createComponent",
      componentId,
      oreId,
      manufacturer,
      manufactureDate
    );
    res.status(200).json({
      success: true,
      message: "Component created successfully!",
      data: JSON.parse(result),
    });
  } catch (error) {
    console.error("Error details:", error); // Log full error details
    res.status(500).json({
      success: false,
      message: "Error creating component.",
      error: error.message || "Unknown error",
    });
  }
});

// Update component routes
router.put("/updateComponent", async (req, res) => {
  try {
    const { componentId, newManufacturer, newManufactureDate } = req.body;
    const manufacturingClient = new clientApplication();
    const result = await manufacturingClient.submitTxn(
      "ManufacturingCompanyMSP",
      "tantalumSupplyChain",
      "TantalumSupplyChain",
      "updateComponent",
      componentId,
      newManufacturer,
      newManufactureDate
    );
    res
      .status(200)
      .json({
        success: true,
        message: "Component updated successfully!",
        data: JSON.parse(result),
      });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error updating component.",
        error: error.message || "Unknown error",
      });
  }
});

router.delete("/deleteComponent", async (req, res) => {
  try {
    const { componentId } = req.body;
    const manufacturingClient = new clientApplication();
    const result = await manufacturingClient.submitTxn(
      "ManufacturingCompanyMSP",
      "tantalumSupplyChain",
      "TantalumSupplyChain",
      "deleteComponent",
      componentId
    );
    res
      .status(200)
      .json({
        success: true,
        message: "Component deleted successfully!",
        data: result,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error deleting component.",
        error: error.message || "Unknown error",
      });
  }
});

// **Certification Routes**
router.post("/certifyEthicalSource", async (req, res) => {
  try {
    const {
      certificationId,
      oreId,
      certifier,
      complianceStatus,
      certifiedDate,
    } = req.body;
    const certificationClient = new clientApplication();
    const result = await certificationClient.submitTxn(
      "certificationauthority", // Organization
      "tantalumchannel", // Channel name
      "Tantalum", // Chaincode name
      "TantalumSupplyChain",
      "certifyOre",
      "",
      "certifyEthicalSource",
      certificationId,
      oreId,
      certifier,
      complianceStatus,
      certifiedDate
    );
    res
      .status(200)
      .json({
        success: true,
        message: "Ethical source certified successfully!",
        data: JSON.parse(result),
      });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error certifying ethical source.",
        error: error.message || "Unknown error",
      });
  }
});

// **Getters**
router.get("/getRegisteredTantalumOre", async (req, res) => {
  try {
    const { oreId } = req.query; // Extract oreId from query parameters

    if (!oreId) {
      return res.status(400).json({
        success: false,
        message: "oreId is required",
      });
    }

    let miningClient = new clientApplication();
    // Assuming the clientApplication is able to submit the transaction for fetching the ore
    let oreData = await miningClient.submitTxn(
      "miningcompany", // Organization
      "tantalumchannel", // Channel name
      "Tantalum", // Chaincode name
      "TantalumSupplyChain", // Contract name
      "getOre", // Chaincode function name
      "", // Optional key (empty here)
      "getRegisteredTantalumOre", // Function call
      oreId // Pass the oreId as a parameter
    );

    const decodedData = new TextDecoder().decode(oreData); // Decode the binary data
    const parsedData = JSON.parse(decodedData); // Parse it as JSON

    res.status(200).json({
      success: true,
      message: "Tantalum ore retrieved successfully!",
      data: parsedData, // Send back the parsed data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the registered tantalum ore.",
      error: error.message || "Unknown error",
    });
  }
});

// Route to fetch mined ores for certification
router.get("/getMinedOresForCertification", async (req, res) => {
  try {
    // Create a new instance of the client application to interact with the blockchain
    const client = new clientApplication();

    // Execute transaction to get mined ores for certification from the blockchain
    const result = await client.submitTxn(
      "certificationauthority",     // Organization name
      "tantalumchannel",            // Channel name
      "Tantalum",                   // Chaincode name
      "TantalumSupplyChain",        // Contract name
      "getCertOre",
      "",
      "getMinedOresForCertification" // Chaincode function name
    );

    // Parse the binary response into JSON format
    const parsedData = JSON.parse(new TextDecoder().decode(result));

    // Send parsed data as JSON response
    res.status(200).json({
      success: true,
      message: "Mined ores for certification retrieved successfully.",
      data: parsedData,
    });

  } catch (error) {
    // Handle any errors during the process
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching mined ores for certification.",
      error: error.message || "Unknown error",
    });
  }
});

// Route to fetch mined ores for certification
router.get("/getCertifiedOresForRefine", async (req, res) => {
  try {
    const client = new clientApplication();
    const result = await client.submitTxn(
      "refiningcompany", // Organization name
      "tantalumchannel", // Channel name
      "Tantalum", // Chaincode name
      "TantalumSupplyChain", // Contract name
      "Certified",
      "",
      "getCertifiedOres", // Function name in chaincode
    );

    const parsedData = JSON.parse(new TextDecoder().decode(result));
    res.status(200).json({
      success: true,
      message: "Certified ores for refining retrieved successfully.",
      data: parsedData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching certified ores for refining.",
      error: error.message || "Unknown error",
    });
  }
});
// Route to fetch processed ore data
router.get("/getProcessedOre", async (req, res) => {
  try {
    const { refinedId } = req.query; // Extract refinedId from query parameters

    if (!refinedId) {
      // Check if refinedId is provided
      return res.status(400).json({
        success: false,
        message: "refinedId is required",
      });
    }

    // Create a new instance of the client application to interact with the blockchain
    const client = new clientApplication();

    // Execute transaction to get processed ore details from blockchain
    const result = await client.submitTxn(
      "refiningcompany",          // Organization
      "tantalumchannel",          // Channel name
      "Tantalum",                 // Chaincode name
      "TantalumSupplyChain",      // Contract name
      "getProcessOre",            // Chaincode function
      "",                         // Optional key (empty if not needed)
      "getProcessedOre",          // Function call within chaincode
      refinedId                   // Refined ID parameter
    );

    // Parse the binary response into JSON format
    const parsedData = JSON.parse(new TextDecoder().decode(result));

    // Send parsed data as JSON response
    res.status(200).json({
      success: true,
      message: "Processed ore details retrieved successfully.",
      data: parsedData,
    });

  } catch (error) {
    // Handle any errors during the process
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching processed ore details.",
      error: error.message || "Unknown error",
    });
  }
});


router.get("/getComponent", async (req, res) => {
  try {
    const { componentId } = req.query; // Extract componentId from query parameters

    if (!componentId) {
      return res.status(400).json({
        success: false,
        message: "componentId is required",
      });
    }

    // Create a new instance of the client application to interact with the blockchain
    const client = new clientApplication();

    // Execute transaction to get component details from blockchain
    const result = await client.submitTxn(
      "manufacturingcompany", // Organization
      "tantalumchannel", // Channel name
      "Tantalum", // Chaincode name
      "TantalumSupplyChain", // Contract name
      "getManufacturer", // Function call within chaincode
      "",
      "getComponent",
      componentId // Component ID parameter
    );

    // Parse the binary response into JSON format
    const parsedData = JSON.parse(new TextDecoder().decode(result));

    // Send parsed data as JSON response
    res.status(200).json({
      success: true,
      message: "Component details retrieved successfully.",
      data: parsedData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching component details.",
      error: error.message || "Unknown error",
    });
  }
});

router.get("/getOreHistory/:oreId", async (req, res) => {
  try {
    const { oreId } = req.params;
    const client = new clientApplication();
    const result = await client.submitTxn(
      "miningcompany",
      "tantalumchannel",
      "Tantalum",
      "History", // Specify transaction type
      "getOreHistory", // Transaction name
      oreId // Arguments
    );

    res.status(200).json({
      success: true,
      message: "Ore history retrieved successfully",
      data: JSON.parse(result),
    });
  } catch (error) {
    console.error("Error retrieving ore history:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving ore history",
      error: error.message || "Unknown error",
    });
  }
});


router.get("/getCertifiedEthicalSource", async (req, res) => {
  try {
    const { certificationId } = req.query;

    if (!componentId) {
      return res.status(400).json({
        success: false,
        message: "componentId is required",
      });
    }

    const client = new clientApplication();

    const result = await client.submitTxn(
      "certificationauthority", // Organization
      "tantalumchannel", // Channel name
      "Tantalum", // Chaincode name
      "TantalumSupplyChain", // Contract name
      "getCertify", // Function call within chaincode
      "",
      "getCertifiedEthicalSource",
      certificationId
    );
    // Parse the binary response into JSON format
    const parsedData = JSON.parse(new TextDecoder().decode(result));

    // Send parsed data as JSON response
    res.status(200).json({
      success: true,
      message: "Component details retrieved successfully.",
      data: parsedData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching component details.",
      error: error.message || "Unknown error",
    });
  }
});

module.exports = router;
