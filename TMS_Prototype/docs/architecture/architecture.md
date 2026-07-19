# Architecture Repository

This directory contains the architecture diagrams for the Task Management Service (TMS) prototype, following the Harness Engineering Methodology.

## Diagram Formats

All diagrams are in Mermaid syntax (`.mmd` files). You can view them using:

1. **Mermaid Live Editor**: https://mermaid.live/edit
   - Copy the contents of any `.mmd` file and paste into the editor.

2. **Mermaid CLI (mmdc)**:
   ```bash
   # Install (requires Node.js)
   npm install -g @mermaid-js/mermaid-cli

   # Generate PNG/SVG
   mmdc -i input.mmd -o output.png
   mmdc -i input.mmd -o output.svg
   ```

3. **VS Code Extension**: Install "Markdown Preview Mermaid Support" or similar.

## Diagram Index

### High-Level Architecture

| Diagram | Description |
|---------|-------------|
| [00_System_Context.mmd](00_System_Context.mmd) | System context showing Human Engineer, AI Agent, and Engineering Operating System interactions |
| [01_HLD.mmd](01_HLD.mmd) | High-Level Design: API Layer → Service Layer → Storage Layer ↔ Knowledge Store |
| [02_Engineering_Kernel.mmd](02_Engineering_Kernel.mmd) | Engineering Kernel: Intent Manager → Assumption Collector → Evidence Evaluator → Reasoning Engine → Decision Maker → Knowledge Updater |
| [03_ERA.mmd](03_ERA.mmd) | Engineering Reasoning Architecture: Universal Harness Loop (Intent → Understand Context → Identify Assumptions → Collect Evidence → Reason → Design → Implement → Verify → Observe → Capture Knowledge → Improve Future Harnesses) |
| [04_Knowledge_Flow.mmd](04_Knowledge_Flow.mmd) | Knowledge flow from execution to future planning |
| [05_Failure_Intelligence.mmd](05_Failure_Intelligence.mmd) | Failure intelligence cycle (Detection → Classification → Root Cause → Hidden Assumptions → Knowledge Update → Improvement) |
| [06_Unknown_Discovery.mmd](06_Unknown_Discovery.mmd) | Unknown knowledge framework (Known Knowns, Known Unknowns, Unknown Knowns, Unknown Unknowns) with transformation arrows |
| [07_Regression_Intelligence.mmd](07_Regression_Intelligence.mmd) | Regression intelligence: failures → recorded → analyzed → test cases added to test suite → CI/CD protection |
| [08_Organizational_Memory.mmd](08_Organizational_Memory.mmd) | Knowledge repository feeding future planning and decisions |
| [09_Harness_Interaction.mmd](09_Harness_Interaction.mmd) | Typical harness interaction: Intent → Kernel → API Harness → Service Harness → Storage Harness ↔ Knowledge Harness |

### Low-Level Design Examples

| Diagram | Description |
|---------|-------------|
| [lld/Spec_Harness.mmd](lld/Spec_Harness.mmd) | Sample LLD for a specification harness (Input → Processing Engine → Output) |
| [lld/Research_Harness.mmd](lld/Research_Harness.mmd) | Sample LLD for a research harness (Research Questions → Analysis & Synthesis → Insights & Recommendations) |
| [lld/Architecture_Harness.mmd](lld/Architecture_Harness.mmd) | Sample LLD for an architecture harness (Requirements, Constraints → Design Synthesis → Architecture Blueprint) |

### Architecture Index

| Diagram | Description |
|---------|-------------|
| [repo_structure.mmd](repo_structure.mmd) | Overview of the architecture repository structure |

## How to Use

1. **Viewing**: Use any of the methods above to view the diagrams.
2. **Editing**: Modify the `.mmd` files directly to update diagrams.
3. **Version Control**: All diagrams are stored in Git, allowing you to track changes over time.
4. **Integration**: These diagrams are intended to be referenced in documentation (e.g., `docs/architecture.md`) and used during design reviews.

## Notes

- The diagrams follow the Mermaid syntax. For more information, see: https://mermaid.js.org/syntax/
- The architecture is designed to be technology-agnostic, composable, explainable, learning-centric, failure-resilient, and future-proof as per the Harness Engineering Methodology.
- Each diagram represents a specific aspect of the Engineering Operating System and should be reviewed in the context of the overall system.