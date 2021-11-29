package com.ecme.com.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.ecme.com.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CantidadXMarcaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CantidadXMarca.class);
        CantidadXMarca cantidadXMarca1 = new CantidadXMarca();
        cantidadXMarca1.setId(1L);
        CantidadXMarca cantidadXMarca2 = new CantidadXMarca();
        cantidadXMarca2.setId(cantidadXMarca1.getId());
        assertThat(cantidadXMarca1).isEqualTo(cantidadXMarca2);
        cantidadXMarca2.setId(2L);
        assertThat(cantidadXMarca1).isNotEqualTo(cantidadXMarca2);
        cantidadXMarca1.setId(null);
        assertThat(cantidadXMarca1).isNotEqualTo(cantidadXMarca2);
    }
}
