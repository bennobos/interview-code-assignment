# Case Study Scenarios to discuss

## Scenario 1: Cost Allocation and Tracking
**Situation**: The company needs to track and allocate costs accurately across different Warehouses and Stores. The costs include labor, inventory, transportation, and overhead expenses.

**Task**: Discuss the challenges in accurately tracking and allocating costs in a fulfillment environment. How would you design a system to ensure accurate cost allocation and tracking?

**Questions to Address:**

- You want to have a single source of truth to accuretely track different costs. The ERP domain is very specialized and I would recommend using existing software.
- The ERP suite needs to provide data-integration points, to collect data from different source systems.
- Business rules should be in place, how to assign shared cost for transport, labor, overhead.
- Minimize manual data input (that is easy to have errors) by using automated data collection for tracking.
- Provide real-time cost monitoring.
- Implement review & audits to verify cost allocation.
- The goal is to be able to track cost back to a warehouse, store and product. This way the company can make better decisions on costs.
- For the system design you want to use an event-sourcing pattern to be able to track changes over time. This makes it possible to supply relevant data for audits for example.

## Scenario 2: Cost Optimization Strategies
**Situation**: The company wants to identify and implement cost optimization strategies for its fulfillment operations. The goal is to reduce overall costs without compromising service quality.

**Task**: Discuss potential cost optimization strategies for fulfillment operations. How would you prioritize and implement these strategies?

**Questions to Address:**
- Forecast product-demand based on historical data and trends.
- Optimize transportation costs by calculating optimal routes for transportation.
- Address quick-wins (hight-cost, low complexity/easy solution) first, if business/service allows this.
- Define KPI's to monitor performance in time.

## Scenario 3: Integration with Financial Systems
**Situation**: The Cost Control Tool needs to integrate with existing financial systems to ensure accurate and timely cost data. The integration should support real-time data synchronization and reporting.

**Task**: Discuss the importance of integrating the Cost Control Tool with financial systems. How would you ensure seamless integration and data synchronization?

**Questions to Address:**
- You want to be able to cross-check different systems, to be able to find possible mismatches.
- To de-coupule high-volume data events/streams you can utilize a pub/sub solution.
- Pub/sub consumers must be indempotent to ensure correctness is the system.

## Scenario 4: Budgeting and Forecasting
**Situation**: The company needs to develop budgeting and forecasting capabilities for its fulfillment operations. The goal is to predict future costs and allocate resources effectively.

**Task**: Discuss the importance of budgeting and forecasting in fulfillment operations. How would you design a system to support accurate budgeting and forecasting?

**Questions to Address:**

- Forecasting is very important in fufillment operations; you want to be able to have enough stock to be able to serve customers. However, too much stock is not cost-effective.
- Should be data-driven, using historical cost and operational data.
- Should be done at the correct level, per product, cost center, warehouse, time period.

## Scenario 5: Cost Control in Warehouse Replacement
**Situation**: The company is planning to replace an existing Warehouse with a new one. The new Warehouse will reuse the Business Unit Code of the old Warehouse. The old Warehouse will be archived, but its cost history must be preserved.

**Task**: Discuss the cost control aspects of replacing a Warehouse. How would you ensure that the cost history is preserved and that the new Warehouse operates within budget?

**Questions to Address:**

- Make sure that operational costs for the NEW warehouse, are linked to the NEW warehouse. You could use a combination of the BUC + time to be able to differentiate OLD + NEW warehouse costs. That way you will be able to compare costs between the OLD + NEW warehouses.
- Store warehouse records as a combination of Business Unit Code, validFrom, validTo. This way it's possible to find which instance of a warehouse is operational at what time. The Business Unit Code can be the same for multiple warehouses, but there can only be one active for a certain time.
- New cost categories should be created, forecasting data should be reset for the NEW warehouse; operations can be very different between old/new warehouses.

## Instructions for Candidates
Before starting the case study, read the [BRIEFING.md](BRIEFING.md) to quickly understand the domain, entities, business rules, and other relevant details.
**Analyze the Scenarios**: Carefully analyze each scenario and consider the questions provided.
**Hypothesis**: Discuss your ideas and approaches to address the problems presented in each scenario. Be sure to consider validations, constraints, potential challenges and possible solutions.
