package com.ecme.com.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.ecme.com.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CantidadXUEBTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CantidadXUEB.class);
        CantidadXUEB cantidadXUEB1 = new CantidadXUEB();
        cantidadXUEB1.setId(1L);
        CantidadXUEB cantidadXUEB2 = new CantidadXUEB();
        cantidadXUEB2.setId(cantidadXUEB1.getId());
        assertThat(cantidadXUEB1).isEqualTo(cantidadXUEB2);
        cantidadXUEB2.setId(2L);
        assertThat(cantidadXUEB1).isNotEqualTo(cantidadXUEB2);
        cantidadXUEB1.setId(null);
        assertThat(cantidadXUEB1).isNotEqualTo(cantidadXUEB2);
    }
}
