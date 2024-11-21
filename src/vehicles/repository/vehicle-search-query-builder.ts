import { SelectQueryBuilder } from 'typeorm';
import { vehicle } from '../entities/vehicle.entity';
import { SearchVehicleDto } from '../dto/search-vehicle.dto';

export class VehicleSearchQueryBuilder {
  buildSearchQuery(
    query: SelectQueryBuilder<vehicle>,
    filters: SearchVehicleDto,
  ): SelectQueryBuilder<vehicle> {
    const conditions = [
      {
        key: 'status',
        condition: 'vehicle.status = :status',
        value: filters.status,
      },
      {
        key: 'model',
        condition: 'vehicle.model ILIKE :model',
        value: filters.model ? `%${filters.model}%` : undefined,
      },
      { key: 'year', condition: 'vehicle.year = :year', value: filters.year },
      {
        key: 'brand',
        condition: 'vehicle.brand ILIKE :brand',
        value: filters.brand ? `%${filters.brand}%` : undefined,
      },
      {
        key: 'minPrice',
        condition: 'vehicle.price >= :minPrice',
        value: filters.minPrice,
      },
      {
        key: 'maxPrice',
        condition: 'vehicle.price <= :maxPrice',
        value: filters.maxPrice,
      },
    ];

    conditions.forEach(({ condition, value, key }) => {
      if (value !== undefined) {
        query.andWhere(condition, { [key]: value });
      }
    });

    return query;
  }
}