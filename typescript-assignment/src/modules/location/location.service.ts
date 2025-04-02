import { Op } from "sequelize";
import Location from "./location.model";

export class LocationService {
  /**
   * Find all locations
   */
  async findAll(): Promise<Location[]> {
    return Location.findAll();
  }

  /**
   * Find a location by its ID
   */
  async findById(id: string): Promise<Location | null> {
    return Location.findByPk(id);
  }

  /**
   * Create a new location
   */
  async create(locationData: any): Promise<Location> {
    return Location.create(locationData);
  }

  /**
   * Update a location
   */
  async update(id: string, locationData: any): Promise<Location | null> {
    const location = await Location.findByPk(id);

    if (!location) {
      return null;
    }

    return location.update(locationData);
  }

  /**
   * Delete a location
   */
  async delete(id: string): Promise<boolean> {
    const location = await Location.findByPk(id);

    if (!location) {
      return false;
    }

    await location.destroy();
    return true;
  }

  /**
   * Resolve a location by its identifier (id or code)
   */
  async resolveByIdentifier(identifier: string): Promise<Location | null> {
    return Location.findOne({
      where: {
        [Op.or]: [
          { id: identifier },
          { code: identifier },
        ],
      },
    });
  }
}

export default new LocationService();
