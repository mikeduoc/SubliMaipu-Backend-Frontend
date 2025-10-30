package com.backend.sublimaipu.sublimaipu.sublimaipu.services;
import java.util.List;
import java.util.Optional;
import com.backend.sublimaipu.sublimaipu.sublimaipu.entities.Usuario;


public interface UsuarioService {
    List<Usuario> findByAll();
    Optional<Usuario> findById(Long id); 
    Usuario save(Usuario unUsuario);
    Optional<Usuario> delete (Usuario unUsuario);
}
