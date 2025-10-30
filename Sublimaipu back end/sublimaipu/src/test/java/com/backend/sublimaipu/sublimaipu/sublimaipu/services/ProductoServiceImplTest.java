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
import com.backend.sublimaipu.sublimaipu.sublimaipu.entities.Producto;
import com.backend.sublimaipu.sublimaipu.sublimaipu.repository.ProductoRepository;


public class ProductoServiceImplTest {
    @InjectMocks
    private ProductoServiceImpl productoservice;

    @Mock
    private ProductoRepository productorepository;
    List<Producto> list = new ArrayList<Producto>();

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);

        this.chargeProducto();
    }

    @Test
    public void findByAllTest() {
        when(productorepository.findAll()).thenReturn(list);
        List<Producto> response = productoservice.findByAll();
        assertEquals(3, response.size());
        verify(productorepository, times(1)).findAll();
    }

    public void chargeProducto() {
        Producto pro1 = new Producto(Long.valueOf(1), "roca fotografica 1", "roca con una foto", 12000, 15,
                "roca fotograficas", "www.sublimaipu.cl", "activo", LocalDate.of(2025, 6, 9));
        Producto pro2 = new Producto(Long.valueOf(2), "llavero acrilico", "hermoso llavero cromado", 4000, 30,
                "llaveros", "www.sublimaipu.cl", "activo", LocalDate.of(2025, 6, 9));
        Producto pro3 = new Producto(Long.valueOf(3), "tazon magico", "ideal para regalar", 8000, 5, "tazones",
                "www.sublimaipu.cl", "activo", LocalDate.of(2025, 6, 9));
        list.add(pro1);
        list.add(pro2);
        list.add(pro3);
    }
}
