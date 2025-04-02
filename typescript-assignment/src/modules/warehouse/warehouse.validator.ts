import { Transaction } from "sequelize";

import Warehouse from "./warehouse.model";
import Location from "../location/location.model";

export class WarehouseValidator {

  /**
   * Verify business unit code already exists.
   */
  async verifyBusinessUnitCode(businessUnitCode: string): Promise<void> {
    const count = await Warehouse.count({
      where: {
        businessUnitCode,
      },
    });
    if (count > 0) {
      throw new Error(`Business unit code ${businessUnitCode} already exists`);
    }
  }

  /**
   * Validate warehouse constraints.
   * Optionally use a transaction, when replacing a warehouse.
   */
  async validateWarehouseConstraints(warehouseData: any, transaction?: Transaction): Promise<void> {

    const { locationId, capacity } = warehouseData;

    const location = await Location.findByPk(locationId, { transaction });
    if (!location) {
      throw new Error(`Location with ID ${locationId} does not exist`);
    }

    const warehouseCount = await Warehouse.count({
      where: {
        locationId,
        isArchived: false,
      },
      transaction,
    });
    if (warehouseCount >= location.maxWarehouses) {
      throw new Error(`Location ${locationId} has reached its maximum warehouse count`);
    }

    const totalCapacity = await Warehouse.sum("capacity", {
      where: {
        locationId,
        isArchived: false,
      },
      transaction,
    });
    if (totalCapacity + capacity > location.maxWarehouseCapacity) {
      throw new Error(`Location ${locationId} has reached its maximum warehouse capacity`);
    }
  }
}

const warehouseValidator = new WarehouseValidator();
export default warehouseValidator;
