const { profile } = require("./profile");

const { promises: fs } = require("fs");

const path = require("path");

const crypto = require("crypto");

const grpc = require("@grpc/grpc-js");

const { connect, signers } = require("@hyperledger/fabric-gateway");

class clientApplication {
  async submitTxn(
    organization,
    channelName,
    chaincodeName,
    contractName,
    txnType,
    transientData,
    txnName,
    ...args
  ) {
    let orgProfile = profile[organization];

    const client = await newGrpcConnection(
      orgProfile["tlsCertPath"],
      orgProfile["peerEndpoint"],
      orgProfile["peerHostAlias"]
    );

    const gateway = connect({
      client,

      identity: await newIdentity(orgProfile["certPath"], orgProfile["mspId"]),

      signer: await newSigner(orgProfile["keyDirectoryPath"]),
    });

    try {
      let network = await gateway.getNetwork(channelName);

      let contract = await network.getContract(chaincodeName, contractName);

      let resultBytes;

      if (txnType == "registerOre") {
        resultBytes = await contract.submitTransaction(txnName, ...args);
      } else if (txnType == "updateOre") {
        resultBytes = await contract.submitTransaction(txnName, ...args);
      } else if (txnType == "processTantalumOre") {
        resultBytes = await contract.submitTransaction(txnName, ...args);
      } else if (txnType == "manufactureOre") {
        resultBytes = await contract.submitTransaction(txnName, ...args);
      } else if (txnType == "certifyOre") {
        resultBytes = await contract.submitTransaction(txnName, ...args);
      } else if (txnType == "RefineOre") {
        resultBytes = await contract.submitTransaction(txnName, ...args);
      } else if (txnType == "getOre") {
        resultBytes = await contract.evaluateTransaction(txnName, ...args);
      } else if (txnType == "getCertOre") {
        resultBytes = await contract.evaluateTransaction(txnName, ...args);
      } else if (txnType == "getProcessOre") {
        resultBytes = await contract.evaluateTransaction(txnName, ...args);
      } else if (txnType == "getManufacturer") {
        resultBytes = await contract.evaluateTransaction(txnName, ...args);
      } else if (txnType == "getCertify") {
        resultBytes = await contract.evaluateTransaction(txnName, ...args);
      } else if (txnType == "Certified") {
        resultBytes = await contract.evaluateTransaction(txnName, ...args);
      } else if (txnType == "History") {
        resultBytes = await contract.evaluateTransaction(txnName, ...args);
      } else if (txnType == "privateTxn") {
        resultBytes = await contract.submit(txnName, {
          arguments: [...args],
          transientData: transientData,
          endorsingOrganizations: [
            "MiningCompanyMSP",
            "CertificationAuthorityMSP",
            "RefiningCompany",
          ],
        });
      } else if (txnType == "queryPvtTxn") {
        try {
          const resultBytes = await contract.queryPrivateData(
            "collectionMiningCertificationDetails", // The private collection name
            txnName, // The chaincode function name (e.g., "getPrivateOreDetails")
            ...args // Arguments to pass to the function
          );

          console.log("*** Private Data Query Result:", resultBytes.toString());
          return Promise.resolve(resultBytes.toString());
        } catch (error) {
          console.log("Error occurred while querying private data", error);
          return Promise.reject(error);
        }
      } else {
        console.log("Invalid txnType", txnType);
      }

      console.log("*** Result:", resultBytes);

      return Promise.resolve(resultBytes);
    } catch (error) {
      console.log("Error occured", error);

      return Promise.reject(error);
    } finally {
      gateway.close();

      client.close();
    }
  }
}

async function newGrpcConnection(tlsCertPath, peerEndpoint, peerHostAlias) {
  const tlsRootCert = await fs.readFile(tlsCertPath);

  const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);

  return new grpc.Client(peerEndpoint, tlsCredentials, {
    "grpc.ssl_target_name_override": peerHostAlias,
  });
}

async function newIdentity(certPath, mspId) {
  const credentials = await fs.readFile(certPath);

  return { mspId, credentials };
}

async function newSigner(keyDirectoryPath) {
  const files = await fs.readdir(keyDirectoryPath);

  const keyPath = path.resolve(keyDirectoryPath, files[0]);

  const privateKeyPem = await fs.readFile(keyPath);

  const privateKey = crypto.createPrivateKey(privateKeyPem);

  return signers.newPrivateKeySigner(privateKey);
}

module.exports = {
  clientApplication,
};
