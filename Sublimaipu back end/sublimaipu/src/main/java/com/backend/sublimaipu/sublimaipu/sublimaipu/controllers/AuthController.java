package com.backend.sublimaipu.sublimaipu.sublimaipu.controllers;
import com.backend.sublimaipu.sublimaipu.sublimaipu.dto.AuthResponse;
import com.backend.sublimaipu.sublimaipu.sublimaipu.dto.LoginRequest;
import com.backend.sublimaipu.sublimaipu.sublimaipu.entities.Usuario;
import com.backend.sublimaipu.sublimaipu.sublimaipu.repository.UsuarioRepository;
import com.backend.sublimaipu.sublimaipu.sublimaipu.jwt.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User; 
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "http://localhost:5173") 
@RestController
@RequestMapping("/api/auth") 
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UsuarioRepository usuarioRepository; 

    @Autowired
    private JwtService jwtService; 

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(),
                loginRequest.getPassword() 
            )
        );

        User userDetails = (User) authentication.getPrincipal();
        Usuario usuario = usuarioRepository.findByEmail(userDetails.getUsername())
            .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado despues de la autenticacion."));
        String token = jwtService.generateToken(usuario);
        
        AuthResponse authResponse = new AuthResponse(
            token,
            usuario.getEmail(),
            usuario.getNombre(),
            usuario.getRol()
        );
        return ResponseEntity.ok(authResponse);
    }
}