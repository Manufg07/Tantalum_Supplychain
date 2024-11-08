# Tantalum Supply Chain Project

![Tantalum Supply Chain](./assets/tantalum-logo.png)

A blockchain-based supply chain solution using Hyperledger Fabric to securely track and manage the supply of tantalum from mining to refinement and certification.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Architecture](#architecture)
- [Setup & Installation](#setup--installation)
- [Smart Contracts](#smart-contracts)
- [Private Data Collections (PDC)](#private-data-collections-pdc)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

The **Tantalum Supply Chain Project** aims to create transparency and traceability in the tantalum supply chain by leveraging Hyperledger Fabric’s capabilities, such as private data collections (PDCs) and custom chaincode.

### Key Objectives
- Track tantalum ore from mining through refining, including ore compliance verification.
- Ensure secure data sharing with private data collections.
- Implement compliance status tracking directly in ore assets.

---

## Features

- **Blockchain-Backed Traceability**: Immutable record of ore tracking and compliance.
- **Private Data Collections**: Secure data sharing between specific parties.
- **Compliance Management**: Update compliance status fields within ore assets.

---

## Architecture

### Network Structure
- **Organizations**: MiningCompany, RefiningCompany, CertificationAuthority.
- **Private Data Collections**: Configured between `MiningCompany` and `RefiningCompany` for secure ore data sharing.

### Chaincode Structure
- `Tantalum` Chaincode with primary functionalities:
  - Ore registration
  - Compliance status updates
  - Private ore details management

---

## Setup & Installation

### Prerequisites
- **Docker & Docker Compose**
- **Node.js & NPM**
- **Hyperledger Fabric CLI Tools**

### Installation

Clone the repository:
```bash
git clone https://github.com/Manufg07/Tantalum_Supplychain.git

