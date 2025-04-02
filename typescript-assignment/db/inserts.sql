-- Create locations
INSERT INTO locations (id, name, code, maxWarehouseCapacity, maxWarehouses, createdAt, updatedAt) 
VALUES 
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Amsterdam', 'AMS-001', 10000, 3, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440000', 'Rotterdam', 'RTM-001', 8000, 2, NOW(), NOW()),
('6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'Utrecht', 'UTR-001', 5000, 2, NOW(), NOW());

-- Create products
INSERT INTO products (id, sku, name, description, price, isActive, createdAt, updatedAt) 
VALUES 
('123e4567-e89b-12d3-a456-426614174000', 'BILLY-001', 'BILLY Bookcase', 'Bookcase, white, 80x28x202 cm', 49.99, true, NOW(), NOW()),
('987fcdeb-51a2-43d7-9b56-626614174001', 'MALM-001', 'MALM Bed frame', 'Bed frame, high, white, 160x200 cm', 199.99, true, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440001', 'POANG-001', 'POÄNG Armchair', 'Armchair, birch veneer, Skiftebo dark gray', 129.99, true, NOW(), NOW());

-- Create stores
INSERT INTO stores (id, name, address, locationId, capacity, isActive, createdAt, updatedAt) 
VALUES 
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Amsterdam City Center', 'Dam Square 1, 1012 JL Amsterdam', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 1000, true, NOW(), NOW()),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Rotterdam Zuid', 'Zuidplein 10, 3083 CW Rotterdam', '550e8400-e29b-41d4-a716-446655440000', 800, true, NOW(), NOW());

-- Create warehouses
INSERT INTO warehouses (id, businessUnitCode, name, address, locationId, capacity, stock, isArchived, createdAt, updatedAt) 
VALUES 
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'AMS-WH-001', 'Amsterdam Central Warehouse', 'Havenkade 1, 1019 BR Amsterdam', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 5000, 2000, false, NOW(), NOW()),
('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'RTM-WH-001', 'Rotterdam Port Warehouse', 'Waalhaven 100, 3089 JH Rotterdam', '550e8400-e29b-41d4-a716-446655440000', 4000, 1500, false, NOW(), NOW());

-- Create warehouse_product_store relationships
INSERT INTO warehouse_product_store (id, warehouseId, productId, storeId, quantity, createdAt, updatedAt) 
VALUES 
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', '123e4567-e89b-12d3-a456-426614174000', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 100, NOW(), NOW()),
('f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', '987fcdeb-51a2-43d7-9b56-626614174001', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 50, NOW(), NOW()),
('g0eebc99-9c0b-4ef8-bb6d-6bb9bd380a17', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', '550e8400-e29b-41d4-a716-446655440001', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 75, NOW(), NOW());
