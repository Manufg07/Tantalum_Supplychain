"use strict";

const { Contract } = require("fabric-contract-api");

class TantalumSupplyChain extends Contract {
  // **Mining Stage**
  async registerTantalumOre(ctx, oreId, origin, weight, minedDate) {
    const mspID = ctx.clientIdentity.getMSPID();
    if (mspID !== "MiningCompanyMSP") {
      throw new Error("Only Mining Company can register tantalum ore");
    }

    const ore = {
      docType: "tantalumOre",
      assetType: "ore",
      oreId,
      origin,
      weight,
      minedDate,
      status: "mined",
      complianceStatus: "Requested", // Initialize compliance status
    };

    await ctx.stub.putState(oreId, Buffer.from(JSON.stringify(ore)));

    // Emit event for registering a new ore
    const eventPayload = {
      oreId: oreId,
      origin: origin,
      weight: weight,
      minedDate: minedDate,
      status: "mined",
    };
    ctx.stub.setEvent(
      "RegisterTantalumOre",
      Buffer.from(JSON.stringify(eventPayload))
    );

    return JSON.stringify(ore);
  }

  async addPrivateOreDetails(ctx, oreId, privateDetailsKey) {
    const mspID = ctx.clientIdentity.getMSPID();
    if (mspID !== "MiningCompanyMSP" && mspID !== "CertificationAuthorityMSP") {
      throw new Error("Unauthorized access to add private details.");
    }

    // Fetch the ore state to ensure it exists
    const oreAsBytes = await ctx.stub.getState(oreId);
    if (!oreAsBytes || oreAsBytes.length === 0) {
      throw new Error(`Ore with ID ${oreId} does not exist.`);
    }

    // Get the transient data
    const transientData = ctx.stub.getTransient();
    if (!transientData.has(privateDetailsKey)) {
      throw new Error("Private details not found in transient data.");
    }

    // Store the private data in the specified collection
    await ctx.stub.putPrivateData(
      "collectionMiningCertificationDetails",
      oreId,
      transientData.get(privateDetailsKey)
    );

    return `Private data added for Ore ID ${oreId}.`;
  }

  // **Update Ore Certification Status**
  async updateComplianceStatus(
    ctx,
    oreId,
    complianceStatus,
    certifier,
    certificationDate
  ) {
    const mspID = ctx.clientIdentity.getMSPID();
    if (mspID !== "CertificationAuthorityMSP") {
      throw new Error(
        "Only Certification Authority can update compliance status."
      );
    }

    const oreAsBytes = await ctx.stub.getState(oreId);
    if (!oreAsBytes || oreAsBytes.length === 0) {
      throw new Error(`Ore with ID ${oreId} does not exist.`);
    }

    const ore = JSON.parse(oreAsBytes.toString());

    // Update compliance status and certification details
    ore.complianceStatus = complianceStatus;
    ore.certifier = certifier;
    ore.certificationDate = certificationDate;

    await ctx.stub.putState(oreId, Buffer.from(JSON.stringify(ore)));

    return JSON.stringify(ore);
  }

  // **Update Ore Refinement Details**
  async updateRefinementDetails(ctx, oreId, refinedId, purity, processingDate) {
    const mspID = ctx.clientIdentity.getMSPID();
    if (mspID !== "RefiningCompanyMSP") {
      throw new Error(
        "Only the Refining Company can update refinement details."
      );
    }

    const oreAsBytes = await ctx.stub.getState(oreId);
    if (!oreAsBytes || oreAsBytes.length === 0) {
      throw new Error(`Ore with ID ${oreId} does not exist.`);
    }

    const ore = JSON.parse(oreAsBytes.toString());

    // Update refinement details
    ore.refinedId = refinedId;
    ore.purity = purity;
    ore.processingDate = processingDate;

    await ctx.stub.putState(oreId, Buffer.from(JSON.stringify(ore)));

    return JSON.stringify(ore);
  }

  // **Smelting Stage**
  async processOre(ctx, oreId, refinedId, purity, processingDate) {
    // const mspID = ctx.clientIdentity.getMSPID();
    // if (mspID !== "RefiningCompanyMSP") {
    //   throw new Error("Only Refining Company can process tantalum ore");
    // }

    const ore = await ctx.stub.getState(oreId);
    if (!ore || ore.length === 0) {
      throw new Error(`Tantalum ore with ID ${oreId} does not exist`);
    }

    const refinedTantalum = {
      docType: "refinedTantalum",
      assetType: "refined",
      refinedId,
      oreId,
      purity,
      processingDate,
      status: "processed",
    };

    await ctx.stub.putState(
      refinedId,
      Buffer.from(JSON.stringify(refinedTantalum))
    );

    return JSON.stringify(refinedTantalum);
  }

  // **Manufacturing Stage**
  async createComponent(
    ctx,
    componentId,
    oreId,
    manufacturer,
    manufactureDate
  ) {
    const mspID = ctx.clientIdentity.getMSPID();
    if (mspID !== "ManufacturingCompanyMSP") {
      throw new Error("Only Manufacturing Company can create components");
    }

    const refinedTantalum = await ctx.stub.getState(oreId);
    if (!refinedTantalum || refinedTantalum.length === 0) {
      throw new Error(`Refined Tantalum with ID ${oreId} does not exist`);
    }

    const component = {
      docType: "tantalumComponent",
      assetType: "component",
      componentId,
      oreId,
      manufacturer,
      manufactureDate,
      status: "manufactured",
    };

    await ctx.stub.putState(
      componentId,
      Buffer.from(JSON.stringify(component))
    );

    return JSON.stringify(component);
  }

  // **Update Component**
  async updateComponent(ctx, componentId, newManufacturer, newManufactureDate) {
    const mspID = ctx.clientIdentity.getMSPID();
    if (mspID !== "ManufacturingCompanyMSP") {
      throw new Error("Only Manufacturing Company can update components");
    }

    const componentAsBytes = await ctx.stub.getState(componentId);
    if (!componentAsBytes || componentAsBytes.length === 0) {
      throw new Error(`Component with ID ${componentId} does not exist`);
    }

    const component = JSON.parse(componentAsBytes.toString());

    // Update only modifiable fields
    component.manufacturer = newManufacturer;
    component.manufactureDate = newManufactureDate;

    await ctx.stub.putState(
      componentId,
      Buffer.from(JSON.stringify(component))
    );

    return JSON.stringify(component);
  }

  // **Delete Component**
  async deleteComponent(ctx, componentId) {
    const mspID = ctx.clientIdentity.getMSPID();
    if (mspID !== "ManufacturingCompanyMSP") {
      throw new Error("Only Manufacturing Company can delete components");
    }

    const componentAsBytes = await ctx.stub.getState(componentId);
    if (!componentAsBytes || componentAsBytes.length === 0) {
      throw new Error(`Component with ID ${componentId} does not exist`);
    }

    await ctx.stub.deleteState(componentId);

    return `Component with ID ${componentId} has been deleted.`;
  }

  // **Certification and Compliance**
  async certifyEthicalSource(
    ctx,
    certificationId,
    oreId,
    certifier,
    complianceStatus,
    certifiedDate
  ) {
    const mspID = ctx.clientIdentity.getMSPID();
    if (mspID !== "CertificationAuthorityMSP") {
      throw new Error(
        "Only Certification Authority can certify ethical sourcing"
      );
    }

    // Set complianceStatus to "Under Review" if not provided
    if (!complianceStatus) {
      complianceStatus = "Under Review";
    }

    const certification = {
      docType: "certification",
      assetType: "certification",
      certificationId,
      oreId,
      certifier,
      complianceStatus,
      certifiedDate,
      status: "certified",
    };

    await ctx.stub.putState(
      certificationId,
      Buffer.from(JSON.stringify(certification))
    );
    return JSON.stringify(certification);
  }
  // **Get Registered Tantalum Ore**
  async getRegisteredTantalumOre(ctx, oreId) {
    const oreAsBytes = await ctx.stub.getState(oreId);
    if (!oreAsBytes || oreAsBytes.length === 0) {
      throw new Error(`Tantalum ore with ID ${oreId} does not exist`);
    }
    return oreAsBytes.toString();
  }

  // **Get Processed Ore**
  async getProcessedOre(ctx, refinedId) {
    const refinedOreAsBytes = await ctx.stub.getState(refinedId);
    if (!refinedOreAsBytes || refinedOreAsBytes.length === 0) {
      throw new Error(`Processed ore with ID ${refinedId} does not exist`);
    }
    return refinedOreAsBytes.toString();
  }

  // **Get Created Component**
  async getComponent(ctx, componentId) {
    const componentAsBytes = await ctx.stub.getState(componentId);
    if (!componentAsBytes || componentAsBytes.length === 0) {
      throw new Error(`Component with ID ${componentId} does not exist`);
    }
    return componentAsBytes.toString();
  }

  // **Get Certified Ethical Source**
  async getCertifiedEthicalSource(ctx, certificationId) {
    const certificationAsBytes = await ctx.stub.getState(certificationId);
    if (!certificationAsBytes || certificationAsBytes.length === 0) {
      throw new Error(
        `Certification with ID ${certificationId} does not exist`
      );
    }
    return certificationAsBytes.toString();
  }

  // **Query Functions (Accessible by All Organizations)**
  async queryByStatus(ctx, status) {
    const queryString = {
      selector: {
        status: status,
      },
    };

    const iterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
    return await this._getAllResults(iterator);
  }

  async queryByOrigin(ctx, origin) {
    const queryString = {
      selector: {
        origin: origin,
      },
    };

    const iterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
    return await this._getAllResults(iterator);
  }

  // **Retrieve Private Ore Details**
  async getPrivateOreDetails(ctx, oreId) {
    const mspID = ctx.clientIdentity.getMSPID();
    if (mspID !== "MiningCompanyMSP" && mspID !== "CertificationAuthorityMSP") {
      throw new Error("Unauthorized access to get private details.");
    }

    const privateData = await ctx.stub.getPrivateData(
      "collectionMiningCertificationDetails",
      oreId
    );
    if (!privateData || privateData.length === 0) {
      throw new Error(`No private details found for Ore ID ${oreId}`);
    }
    return privateData.toString();
  }

  async getMinedOresForCertification(ctx) {
    const mspID = ctx.clientIdentity.getMSPID();
    if (mspID !== "CertificationAuthorityMSP") {
      throw new Error(
        "Only Certification Authority can access mined ores for certification."
      );
    }

    const queryString = {
      selector: {
        docType: "tantalumOre",
        status: "mined",
      },
    };

    const iterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
    return await this._getAllResults(iterator);
  }

  //Certified
  async getCertifiedOres(ctx) {
    const mspID = ctx.clientIdentity.getMSPID();
    if (mspID !== "RefiningCompanyMSP") {
      throw new Error("Only RefiningCompanyMSP can access certified ores.");
    }

    const queryString = {
      selector: {
        docType: "tantalumOre",
        complianceStatus: "certified",
      },
    };

    const iterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
    return await this._getAllResults(iterator);
  }

  // **History Tracking**
  async getOreHistory(ctx, oreId) {
    const historyIterator = await ctx.stub.getHistoryForKey(oreId);
    const history = [];

    while (true) {
      const res = await historyIterator.next();
      if (res.value) {
        const record = {
          txId: res.value.txId,
          timestamp: res.value.timestamp,
          isDelete: res.value.isDelete,
        };

        if (!res.value.isDelete) {
          record.data = JSON.parse(res.value.value.toString("utf8"));
        } else {
          record.data = "Deleted";
        }

        history.push(record);
      }
      if (res.done) {
        await historyIterator.close();
        break;
      }
    }

    return JSON.stringify(history);
  }

  // **Helper Function to Get Results from Iterator**
  async _getAllResults(iterator) {
    const results = [];
    while (true) {
      const res = await iterator.next();
      if (res.value) {
        results.push(JSON.parse(res.value.value.toString("utf8")));
      }
      if (res.done) {
        await iterator.close();
        break;
      }
    }
    return JSON.stringify(results);
  }
}

module.exports = TantalumSupplyChain;
