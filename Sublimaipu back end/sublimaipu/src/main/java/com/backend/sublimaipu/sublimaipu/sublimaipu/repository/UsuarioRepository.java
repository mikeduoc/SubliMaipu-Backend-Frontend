package com.backend.sublimaipu.sublimaipu.sublimaipu.repository;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.sublimaipu.sublimaipu.sublimaipu.entities.Usuario;


public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
}
