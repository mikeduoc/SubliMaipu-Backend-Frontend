DELETE FROM producto;

INSERT INTO producto (nombre, descripcion, precio, stock, categoria, imagen, estado, fecha_creacion) VALUES
('Tazón Mágico', 'Tazón mágico que cambia con el calor.', 8000, 15, 'tazones', '/images/tazones1.jpg', 'activo', CURDATE()),
('Tazón Clásico', 'Tazón clásico blanco para sublimar.', 8000, 20, 'tazones', '/images/tazones2.jpg', 'activo', CURDATE()),
('Tazón con Asa', 'Tazón con asa e interior de color.', 8000, 10, 'tazones', '/images/tazones3.jpg', 'activo', CURDATE()),
('Llavero de Acrílico', 'Llavero de acrílico transparente.', 4000, 30, 'llaveros', '/images/llaveros1.jpg', 'activo', CURDATE()),
('Llavero Metálico', 'Llavero metálico con forma de casa.', 4000, 25, 'llaveros', '/images/llaveros2.jpg', 'activo', CURDATE()),
('Llavero Polímero', 'Llavero de polímero resistente.', 4000, 0, 'llaveros', '/images/llaveros3.jpg', 'inactivo', CURDATE()),
('Roca Fotográfica 1', 'Roca fotográfica rectangular.', 12000, 8, 'rocas', '/images/rocafoto1.jpg', 'activo', CURDATE()),
('Roca Fotográfica 2', 'Roca fotográfica con borde biselado.', 12000, 7, 'rocas', '/images/rocafoto2.jpg', 'activo', CURDATE()),
('Roca Fotográfica 3', 'Roca fotográfica con forma de corazón.', 12000, 5, 'rocas', '/images/rocafoto3.jpg', 'activo', CURDATE());

DELETE FROM usuario;
INSERT INTO usuario (nombre, email, password, rol, estado, fecha_creacion) VALUES
('Admin', 'admin@sublimaipu.cl', 'admin', 'administrador', 'activo', CURDATE());
INSERT INTO usuario (nombre, email, password, rol, estado, fecha_creacion) VALUES
('Cliente', 'cliente@gmail.com', 'cliente', 'cliente', 'activo', CURDATE());
INSERT INTO usuario (nombre, email, password, rol, estado, fecha_creacion) VALUES
('Vendedor', 'vendedor@sublimaipu.cl', 'vendedor', 'vendedor', 'inactivo', CURDATE());