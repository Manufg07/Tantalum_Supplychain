let profile = {
  miningcompany: {
    cryptoPath:
      "../../Tantalum-network/organizations/peerOrganizations/miningcompany.tantalum.com",
    keyDirectoryPath:
      "../../Tantalum-network/organizations/peerOrganizations/miningcompany.tantalum.com/users/User1@miningcompany.tantalum.com/msp/keystore",
    certPath:
      "../../Tantalum-network/organizations/peerOrganizations/miningcompany.tantalum.com/users/User1@miningcompany.tantalum.com/msp/signcerts/cert.pem",
    tlsCertPath:
      "../../Tantalum-network/organizations/peerOrganizations/miningcompany.tantalum.com/peers/peer0.miningcompany.tantalum.com/tls/ca.crt",
    peerEndpoint: "localhost:7051",
    peerHostAlias: "peer0.miningcompany.tantalum.com",
    mspId: "MiningCompanyMSP",
  },
  refiningcompany: {
    cryptoPath:
      "../../Tantalum-network/organizations/peerOrganizations/refiningcompany.tantalum.com",
    keyDirectoryPath:
      "../../Tantalum-network/organizations/peerOrganizations/refiningcompany.tantalum.com/users/User1@refiningcompany.tantalum.com/msp/keystore/",
    certPath:
      "../../Tantalum-network/organizations/peerOrganizations/refiningcompany.tantalum.com/users/User1@refiningcompany.tantalum.com/msp/signcerts/cert.pem",
    tlsCertPath:
      "../../Tantalum-network/organizations/peerOrganizations/refiningcompany.tantalum.com/peers/peer0.refiningcompany.tantalum.com/tls/ca.crt",
    peerEndpoint: "localhost:9051",
    peerHostAlias: "peer0.refiningcompany.tantalum.com",
    mspId: "RefiningCompanyMSP",
  },
  manufacturingcompany: {
    cryptoPath:
      "../../Tantalum-network/organizations/peerOrganizations/manufacturingcompany.tantalum.com",
    keyDirectoryPath:
      "../../Tantalum-network/organizations/peerOrganizations/manufacturingcompany.tantalum.com/users/User1@manufacturingcompany.tantalum.com/msp/keystore/",
    certPath:
      "../../Tantalum-network/organizations/peerOrganizations/manufacturingcompany.tantalum.com/users/User1@manufacturingcompany.tantalum.com/msp/signcerts/cert.pem",
    tlsCertPath:
      "../../Tantalum-network/organizations/peerOrganizations/manufacturingcompany.tantalum.com/peers/peer0.manufacturingcompany.tantalum.com/tls/ca.crt",
    peerEndpoint: "localhost:11051",
    peerHostAlias: "peer0.manufacturingcompany.tantalum.com",
    mspId: "ManufacturingCompanyMSP",
  },
  certificationauthority: {
    cryptoPath:
      "../../Tantalum-network/organizations/peerOrganizations/certificationauthority.tantalum.com",
    keyDirectoryPath:
      "../../Tantalum-network/organizations/peerOrganizations/certificationauthority.tantalum.com/users/User1@certificationauthority.tantalum.com/msp/keystore/",
    certPath:
      "../../Tantalum-network/organizations/peerOrganizations/certificationauthority.tantalum.com/users/User1@certificationauthority.tantalum.com/msp/signcerts/cert.pem",
    tlsCertPath:
      "../../Tantalum-network/organizations/peerOrganizations/certificationauthority.tantalum.com/peers/peer0.certificationauthority.tantalum.com/tls/ca.crt",
    peerEndpoint: "localhost:12051",
    peerHostAlias: "peer0.certificationauthority.tantalum.com",
    mspId: "CertificationAuthorityMSP",
  },
};
module.exports = { profile };
