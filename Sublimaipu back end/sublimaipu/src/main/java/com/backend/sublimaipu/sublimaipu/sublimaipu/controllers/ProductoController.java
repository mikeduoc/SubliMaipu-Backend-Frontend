package com.backend.sublimaipu.sublimaipu.sublimaipu.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;
import java.util.Optional;
import com.backend.sublimaipu.sublimaipu.sublimaipu.entities.Producto;
import com.backend.sublimaipu.sublimaipu.sublimaipu.services.ProductoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;


@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Productos", description = "Operaciones relacionadas con productos")
@RestController
@RequestMapping("api/productos")
public class ProductoController {
    @Autowired
    private ProductoService productoservice;

    @Operation(summary = "Obtener lista de productos", description = "Devuelve todos los productos disponibles")
    @ApiResponse(responseCode = "200", description = "Lista de productos retornada correctamente", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Producto.class)))

    @GetMapping
    public List<Producto> verProductos() {
        return productoservice.findByAll();
    }

    @Operation(summary = "Obtener producto por id", description = "Obtener el detalle de un producto especifico")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Producto encontrado", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Producto.class))),
            @ApiResponse(responseCode = "404", description = "Producto no encontrado")
    })

    @GetMapping("/{id}")
    public ResponseEntity<?> verDetalle(@PathVariable Long id) {
        Optional<Producto> productoOptional = productoservice.findById(id);
        if (productoOptional.isPresent()) {
            return ResponseEntity.ok(productoOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }

    @Operation(summary = "Crear un nuevo producto", description = "Crea un producto con los datos proporcionados")
    @ApiResponse(responseCode = "201", description = "Producto creado correctamente", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Producto.class)))

    @PostMapping
    public ResponseEntity<Producto> crearProducto(@RequestBody Producto unProducto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productoservice.save(unProducto));
    }

    @Operation(summary = "Modifica un producto", description = "Modifica un producto con la id proporcionada")
    @ApiResponse(responseCode = "201", description = "Producto modificado correctamente", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Producto.class)))

    @PutMapping("/{id}")
    public ResponseEntity<?> modificarProducto(@PathVariable Long id, @RequestBody Producto unProducto) {
        Optional<Producto> prodOptional = productoservice.findById(id);
        if (prodOptional.isPresent()) {
            Producto productoexistente = prodOptional.get();
            productoexistente.setNombre(unProducto.getNombre());
            productoexistente.setDescripcion(unProducto.getDescripcion());
            productoexistente.setPrecio(unProducto.getPrecio());
            productoexistente.setStock(unProducto.getStock());
            productoexistente.setCategoria(unProducto.getCategoria());
            productoexistente.setImagen(unProducto.getImagen());
            productoexistente.setEstado(unProducto.getEstado());
            productoexistente.setFechaCreacion(unProducto.getFechaCreacion());
            Producto productomodificado = productoservice.save(productoexistente);
            return ResponseEntity.ok(productomodificado);
        }
        return ResponseEntity.notFound().build();
    }

    @Operation(summary = "Elimina un producto", description = "Elimina un producto con la id proporcionada")
    @ApiResponse(responseCode = "201", description = "Producto eliminado correctamente", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Producto.class)))

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarProducto(@PathVariable Long id) {
        Producto unProducto = new Producto();
        unProducto.setId(id);
        Optional<Producto> productoOptional = productoservice.delete(unProducto);
        if (productoOptional.isPresent()) {
            return ResponseEntity.ok(productoOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }

}
