package com.backend.sublimaipu.sublimaipu.sublimaipu.services;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.backend.sublimaipu.sublimaipu.sublimaipu.entities.Usuario;
import com.backend.sublimaipu.sublimaipu.sublimaipu.repository.UsuarioRepository;


@Service
public class UsuarioServiceImpl implements UsuarioService, UserDetailsService {
    @Autowired
    private UsuarioRepository usuariorepository; 
    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario usuario = usuariorepository.findByEmail(email)
                .orElseThrow(() -> 
                    new UsernameNotFoundException("Usuario no encontrado con email: " + email)
                );

        List<GrantedAuthority> authorities = Collections.singletonList(
            new SimpleGrantedAuthority(usuario.getRol())
        );

        return new User(
                usuario.getEmail(),
                usuario.getPassword(), 
                authorities
        );
    }

    @Override
    @Transactional(readOnly = true)
    public List<Usuario> findByAll(){
        return (List<Usuario>) usuariorepository.findAll();
    }

    @Override
    @Transactional
    public Optional<Usuario> delete(Usuario unUsuario){
        Optional<Usuario> usuOptional = usuariorepository.findById(unUsuario.getId());
        usuOptional.ifPresent(usuarioDb ->{
            usuariorepository.delete(unUsuario);
        });
        return usuOptional;
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Usuario> findById(Long id){
        return usuariorepository.findById(id);
    }
    
    @Override
    @Transactional
    public Usuario save(Usuario unUsuario){
        return usuariorepository.save(unUsuario);
    }
}