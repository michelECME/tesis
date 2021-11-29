package com.ecme.com.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.ecme.com.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CantidadXModeloTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CantidadXModelo.class);
        CantidadXModelo cantidadXModelo1 = new CantidadXModelo();
        cantidadXModelo1.setId(1L);
        CantidadXModelo cantidadXModelo2 = new CantidadXModelo();
        cantidadXModelo2.setId(cantidadXModelo1.getId());
        assertThat(cantidadXModelo1).isEqualTo(cantidadXModelo2);
        cantidadXModelo2.setId(2L);
        assertThat(cantidadXModelo1).isNotEqualTo(cantidadXModelo2);
        cantidadXModelo1.setId(null);
        assertThat(cantidadXModelo1).isNotEqualTo(cantidadXModelo2);
    }
}
