# 🪨 Tantalum Supply Chain Project

![Tantalum Supply Chain](./assets/tantalum-logo.png)

A blockchain-based supply chain solution using **Hyperledger Fabric** to securely track and manage the supply of tantalum from mining to refinement and certification.

---

## 📑 Table of Contents
- [📜 Project Overview](#project-overview)
- [✨ Features](#features)
- [🏛 Architecture](#architecture)
- [⚙️ Setup & Installation](#setup--installation)
- [💻 Smart Contracts](#smart-contracts)
- [🔐 Private Data Collections (PDC)](#private-data-collections-pdc)
- [📝 Usage](#usage)
- [🌐 Endpoints](#endpoints)
- [🤝 Contributing](#contributing)
- [📄 License](#license)

---

## 📜 Project Overview

The **Tantalum Supply Chain Project** aims to bring transparency and traceability to the tantalum supply chain by leveraging **Hyperledger Fabric** capabilities like private data collections (PDCs) and custom chaincode.

### 🎯 Key Objectives
- 🔍 Track tantalum ore from mining through refining, including ore compliance verification.
- 🔒 Ensure secure data sharing using private data collections.
- 🏷 Implement compliance status tracking directly in ore assets.

---

## ✨ Features

- **🔗 Blockchain-Backed Traceability**: Immutable records for ore tracking and compliance.
- **🔐 Private Data Collections**: Secure data sharing between specific parties.
- **✔️ Compliance Management**: Update compliance status fields within ore assets.

---
## 💻 Smart Contracts

The `Tantalum` chaincode consists of several smart contracts, each responsible for managing a stage in the supply chain process. The main stages include mining, certification, refinement, manufacturing, and query/history.

### 📜 Chaincode Structure

1. **Mining Stage**
   - **registerTantalumOre**: Registers ore details such as `oreId`, `origin`, `weight`, and `minedDate`.
   - **addPrivateOreDetails**: Adds private details specific to the ore (e.g., ore composition and location) and stores them securely in the private data collection.
   - **getPrivateOreDetails**: Retrieves private ore details, accessible only by authorized organizations with appropriate permissions.

2. **Certification Stage**
   - **requestCertification**: Updates the `complianceStatus` of the ore asset to "Requested", indicating the ore is pending compliance review.
   - **updateComplianceStatus**: Allows the certification authority to update the ore’s `complianceStatus` field, which can include statuses such as "under review", "certified", or "rejected".

3. **Refinement Stage**
   - **registerRefinedOre**: Registers a refined ore asset that links back to the original mined ore using the `oreId`, assigning a unique `refinedId` to the refined product.
   - **getRefinedOreDetails**: Retrieves details of refined ore by `refinedId`, ensuring traceability from mined ore to refined product.

4. **Manufacturing Stage**
   - **createComponent**: Creates a manufacturing component from the refined ore, using the `oreId` to track the source of the tantalum.
   - **getComponentDetails**: Retrieves details of components manufactured from specific refined ores, enabling full traceability from raw material to manufactured product.

5. **Query and History Stage**
   - **queryOre**: Retrieves details of registered ores based on given search criteria, useful for verifying registered ore assets.
   - **queryRefinedOre**: Retrieves refined ore details, allowing stakeholders to verify refined product data.
   - **getOreHistory**: Fetches the historical transactions associated with a particular ore, providing a comprehensive audit trail of all updates and changes.

Each contract function includes logic to ensure data integrity, user authentication, and privacy, making the Tantalum Supply Chain solution secure and transparent from mining through manufacturing.

## 🏛 Architecture

### 🖧 Network Structure
- **Organizations**: `MiningCompany`, `RefiningCompany`, `CertificationAuthority`, `ManufacturingCompany`
- **Private Data Collections**: Configured between `MiningCompany` and `CertificationAuthority` for secure ore data sharing.

### 📜 Chaincode Structure
The `Tantalum` chaincode includes core functionalities such as:
  - 🪨 Ore registration
  - ✅ Compliance status updates
  - 🔒 Private ore details management

---

## ⚙️ Setup & Installation

### 📋 Prerequisites
- 🐳 **Docker & Docker Compose**
- 🖥 **Node.js & NPM**
- 🛠 **Hyperledger Fabric CLI Tools**

### 🚀 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/manufg07/Tantalum_Supplychain.git
