import sequelize from "../../database/config";
import Warehouse from "./warehouse.model";
import locationService from "../location/location.service";
import warehouseValidator from "./warehouse.validator";

export class WarehouseService {
  /**
   * Find all warehouses
   */
  async findAll(): Promise<Warehouse[]> {
    return Warehouse.findAll();
  }

  /**
   * Find a warehouse by its ID
   */
  async findById(id: string): Promise<Warehouse | null> {
    return Warehouse.findByPk(id);
  }

  /**
   * Create a new warehouse
   */
  async create(warehouseData: any): Promise<Warehouse> {
    await warehouseValidator.verifyBusinessUnitCode(warehouseData.businessUnitCode);
    await warehouseValidator.validateWarehouseConstraints(warehouseData);
    return Warehouse.create(warehouseData);
  }

  /**
   * Update an existing warehouse
   */
  async update(id: string, warehouseData: any): Promise<Warehouse | null> {
    const warehouse = await this.findById(id);

    if (!warehouse) {
      return null;
    }

    await warehouseValidator.verifyBusinessUnitCode(warehouseData.businessUnitCode);
    await warehouseValidator.validateWarehouseConstraints(warehouseData);
    return warehouse.update(warehouseData);
  }

  /**
   * Delete (archive) a warehouse.
   */
  async delete(id: string): Promise<boolean> {
    const warehouse = await this.findById(id);

    if (!warehouse) {
      return false;
    }

    if (warehouse.isArchived) {
      throw new Error(`Warehouse ${id} is already archived`);
    }

    warehouse.isArchived = true;
    warehouse.archivedAt = new Date();
    await warehouse.save();
    
    // await warehouse.destroy();
    return true;
  }

  /**
   * Replace an exisiting warehouse with a new one.
   * The new warehouse must be in the same location as the old one, and the business unit code should be re-used.
   */
  async replace(id: string, warehouseData: any): Promise<Warehouse | null> {
    try {

      // Use a transaction because we want both archive + creation operations to succeed, or none at all.
      return await sequelize.transaction(async t => {

        const warehouse = await Warehouse.findByPk(id, { transaction: t });
        if (!warehouse) {
          return null;
        }
    
        // validate warehouse is not archived.
        if (warehouse.isArchived) {
          throw new Error(`Warehouse ${id} is already archived`);
        }
    
        // validate warehouse stays in the same location
        if (warehouse.locationId !== warehouseData.locationId) {
          throw new Error(`Replacement Warehouse should use the same location`);
        }
    
        // validate old vs. new stock are the same.
        if (warehouse.stock !== warehouseData.stock) {
          throw new Error(`Replacement Warehouse should have the same stock`);
        }
    
        // validate warehouse capacity can hold the current stock.
        if (warehouse.stock > warehouseData.capacity) {
          throw new Error(`Replacement warehouse should be able to hold the current stock: stock=${warehouse.stock} capacity=${warehouseData.capacity}`);
        }

        // archive the old warehouse.
        warehouse.isArchived = true;
        warehouse.archivedAt = new Date();
        await warehouse.save({ transaction: t });

        // Validate inside the transaction, where the "old" warehouse is already archived.
        // This way the remaining validation will work as expected.
        await warehouseValidator.validateWarehouseConstraints(warehouseData, t);

        // create the new warehouse.
        return Warehouse.create(warehouseData, { transaction: t });
      });

    } catch (error) {
      console.error("Error replacing warehouse:", error);
      throw(error);
    }
  }
}

const warehouseService = new WarehouseService();
export default warehouseService;
