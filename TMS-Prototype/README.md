# Task Management Service (TMS) Prototype

This is a prototype of a Task Management Service built using the Harness Engineering Methodology.

## Intent

Create a Harness Engineering Operating System (HEOS) prototype for a simple Task Management Service (TMS). The prototype will demonstrate how the HEOS layers (Intent → Engineering Kernel → HLD/ERA/LLD) orchestrate humans, AI agents, and organizational knowledge to produce a verified, traceable implementation.

The TMS will have:
- A REST-style API for CRUD tasks
- In-memory storage for prototype
- OpenAPI spec
- Basic unit tests

## Overview

This repository contains the source code, documentation, and artifacts for the TMS prototype, following the Harness Engineering Skill and the System Design Harness Engineering Problem Statement.

## Structure

- `docs/` - Intent, assumptions, evidence, invariants, architecture diagrams, verification plans, ADRs, etc.
- `src/` - Source code for the Engineering Kernel and Harnesses (API, Storage, Knowledge)
- `tests/` - Unit tests
- `scripts/` - Helper scripts for running tests, verification, etc.

## Getting Started

See the documentation in `docs/` for detailed instructions on how to run and verify the prototype.

## License

MIT License - see the `LICENSE` file for details.
