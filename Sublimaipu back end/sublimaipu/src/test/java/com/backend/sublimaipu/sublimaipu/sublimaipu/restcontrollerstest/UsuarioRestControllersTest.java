package com.backend.sublimaipu.sublimaipu.sublimaipu.restcontrollerstest;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.Mockito.when;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import com.backend.sublimaipu.sublimaipu.sublimaipu.entities.Usuario;
import com.backend.sublimaipu.sublimaipu.sublimaipu.services.UsuarioServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.mockito.ArgumentMatchers.any;
import org.springframework.security.test.context.support.WithMockUser;


@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser(authorities = "administrador")
public class UsuarioRestControllersTest {
    @Autowired
    private MockMvc mockmvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private UsuarioServiceImpl usuarioserviceimpl;
    private List<Usuario> usuariosLista;

    @Test
    @WithMockUser(authorities = "administrador")
    public void verUsuariosTest() throws Exception {
        when(usuarioserviceimpl.findByAll()).thenReturn(usuariosLista);
        mockmvc.perform(get("/api/usuarios")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(authorities = "administrador")
    public void verunUsuarioTest() {
        Usuario unUsuario = new Usuario(1L, "alan", "alan.brito@duocuc.cl", "Brito123", "cliente", "activo",
                LocalDate.of(2025, 6, 9));
        try {
            when(usuarioserviceimpl.findById(1L)).thenReturn(Optional.of(unUsuario));
            mockmvc.perform(get("/api/usuarios/1")
                    .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk());
        } catch (Exception ex) {
            fail("El testing lanzo un error" + ex.getMessage());
        }
    }

    @Test
    @WithMockUser(authorities = "administrador")
    public void usuarioNoExisteTest() throws Exception {
        when(usuarioserviceimpl.findById(10L)).thenReturn(Optional.empty());
        mockmvc.perform(get("/api/usuarios/10")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(authorities = "administrador")
    public void crearUsuarioTest() throws Exception {
        Usuario unUsuario = new Usuario(2L, "bin", "bin.laden@gmail.cl", "boom0911", "super-admin", "activo",
                LocalDate.of(2025, 6, 9));
        Usuario otroUsuario = new Usuario(3L, "aquiles", "aquiles.baeza@gmail.cl", "hola78", "vendedor", "inactivo",
                LocalDate.of(2025, 6, 9));
        when(usuarioserviceimpl.save(any(Usuario.class))).thenReturn(otroUsuario);
        mockmvc.perform(post("/api/usuarios")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(unUsuario)))
                .andExpect(status().isCreated());
    }
}
