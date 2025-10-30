package com.backend.sublimaipu.sublimaipu.sublimaipu.services;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import java.util.List;
import java.time.LocalDate;
import java.util.ArrayList;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import com.backend.sublimaipu.sublimaipu.sublimaipu.entities.Usuario;
import com.backend.sublimaipu.sublimaipu.sublimaipu.repository.UsuarioRepository;


public class UsuarioServiceImplTest {
    @InjectMocks
    private UsuarioServiceImpl usuarioservice;

    @Mock
    private UsuarioRepository usuariorepository;

    List<Usuario> list = new ArrayList<Usuario>();

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);
        this.chargeUsuario();
    }

    @Test
    public void findByAllTest() {
        when(usuariorepository.findAll()).thenReturn(list);
        List<Usuario> response = usuarioservice.findByAll();
        assertEquals(3, response.size());
        verify(usuariorepository, times(1)).findAll();
    }

    public void chargeUsuario() {
        Usuario usu1 = new Usuario(Long.valueOf(1), "alan", "alan.brito@duocuc.cl", "Brito123", "cliente", "activo",
                LocalDate.of(2025, 6, 9));
        Usuario usu2 = new Usuario(Long.valueOf(2), "bin", "bin.laden@gmail.cl", "boom0911", "super-admin", "activo",
                LocalDate.of(2025, 6, 9));
        Usuario usu3 = new Usuario(Long.valueOf(3), "aquiles", "aquiles.baeza@gmail.cl", "hola78", "vendedor",
                "inactivo", LocalDate.of(2025, 6, 9));
        list.add(usu1);
        list.add(usu2);
        list.add(usu3);
    }
}
