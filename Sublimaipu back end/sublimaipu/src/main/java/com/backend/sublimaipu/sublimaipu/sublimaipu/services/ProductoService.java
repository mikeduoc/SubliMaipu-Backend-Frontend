package com.backend.sublimaipu.sublimaipu.sublimaipu.services;
import java.util.List;
import java.util.Optional;
import com.backend.sublimaipu.sublimaipu.sublimaipu.entities.Producto;


public interface ProductoService {
    List<Producto> findByAll();
    Optional<Producto> findById(Long id); 
    Producto save(Producto unProducto);
    Optional<Producto> delete (Producto unProducto);
}
