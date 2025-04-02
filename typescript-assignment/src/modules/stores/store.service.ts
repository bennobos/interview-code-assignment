import { StoreLegacyIntegrator } from "./store.legacy";

import sequelize from "../../database/config";
import Store from "./store.model";

export class StoreService {
  /**
   * Find all stores
   */
  async findAll(): Promise<Store[]> {
    return Store.findAll();
  }

  /**
   * Find a store by its ID
   */
  async findById(id: string): Promise<Store | null> {
    return Store.findByPk(id);
  }

  /**
   * Create a new store
   */
  async create(storeData: any): Promise<Store> {

    // Task 2 implementation notes.
    // Since the creation of a "store" involves a single table, it is not necessary to use a transaction.
    // By using "await" the remaining code is only executed after a succesfull insertion, which either passes or fails.
    // However, a real-world scenario probably uses >1 query, so for this purpose transaction logic is added.

    try {
      const createdStore = await sequelize.transaction(async t => {
        return await Store.create(storeData, { transaction: t });
      });

      // send to legacy system
      const legacyIntegrator = new StoreLegacyIntegrator();
      legacyIntegrator.sendToLegacySystem(createdStore);

      return createdStore;
    } catch (error) {
      console.error("Error creating store:", error);
      throw(error);
    }
  }

  /**
   * Update an existing store
   */
  async update(id: string, storeData: any): Promise<Store | null> {
    const store = await this.findById(id);

    if (!store) {
      return null;
    }

    return store.update(storeData);
  }

  /**
   * Delete a store
   */
  async delete(id: string): Promise<boolean> {
    const store = await this.findById(id);

    if (!store) {
      return false;
    }

    await store.destroy();
    return true;
  }
}

const storeService = new StoreService();
export default storeService;
