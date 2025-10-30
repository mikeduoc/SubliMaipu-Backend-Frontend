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
import com.backend.sublimaipu.sublimaipu.sublimaipu.entities.Usuario;
import com.backend.sublimaipu.sublimaipu.sublimaipu.services.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;


@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Usuarios", description = "Operaciones relacionadas con usuarios")
@RestController
@RequestMapping("api/usuarios")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioservice;

    @Operation(summary = "Obtener lista de usuarios", description = "Devuelve todos los usuarios disponibles")
    @ApiResponse(responseCode = "200", description = "Lista de usuarios retornada correctamente", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Usuario.class)))

    @GetMapping
    public List<Usuario> verUsuarios() {
        return usuarioservice.findByAll();
    }

    @Operation(summary = "Obtener usuario por id", description = "Obtener el detalle de un usuario especifico")
    @ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "Usuario encontrado", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Usuario.class))),
    @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })

    @GetMapping("/{id}")
    public ResponseEntity<?> verDetalle(@PathVariable Long id) {
        Optional<Usuario> usuarioOptional = usuarioservice.findById(id);
        if (usuarioOptional.isPresent()) {
            return ResponseEntity.ok(usuarioOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }

    @Operation(summary = "Crear un nuevo usuario", description = "Crea un usuario con los datos proporcionados")
    @ApiResponse(responseCode = "201", description = "Usuario creado correctamente", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Usuario.class)))

    @PostMapping
    public ResponseEntity<Usuario> crearUsuario(@RequestBody Usuario unUsuario) {
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioservice.save(unUsuario));
    }

    @Operation(summary = "Modifica un usuario", description = "Modifica un usuario con la id proporcionada")
    @ApiResponse(responseCode = "201", description = "Usuario modificado correctamente", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Usuario.class)))

    @PutMapping("/{id}")
    public ResponseEntity<?> modificarUsuario(@PathVariable Long id, @RequestBody Usuario unUsuario) {
        Optional<Usuario> usuaOptional = usuarioservice.findById(id);
        if (usuaOptional.isPresent()) {
            Usuario usuarioexistente = usuaOptional.get();
            usuarioexistente.setNombre(unUsuario.getNombre());
            usuarioexistente.setEmail(unUsuario.getEmail());
            usuarioexistente.setPassword(unUsuario.getPassword());
            usuarioexistente.setRol(unUsuario.getRol());
            usuarioexistente.setEstado(unUsuario.getEstado());
            usuarioexistente.setFechaCreacion(unUsuario.getFechaCreacion());
            Usuario usuariomodificado = usuarioservice.save(usuarioexistente);
            return ResponseEntity.ok(usuariomodificado);
        }
        return ResponseEntity.notFound().build();
    }

    @Operation(summary = "Elimina un usuario", description = "Elimina un usuario con la id proporcionada")
    @ApiResponse(responseCode = "201", description = "Usuario eliminado correctamente", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Usuario.class)))

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUsuario(@PathVariable Long id) {
        Usuario unUsuario = new Usuario();
        unUsuario.setId(id);
        Optional<Usuario> usuarioOptional = usuarioservice.delete(unUsuario);
        if (usuarioOptional.isPresent()) {
            return ResponseEntity.ok(usuarioOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }

}
