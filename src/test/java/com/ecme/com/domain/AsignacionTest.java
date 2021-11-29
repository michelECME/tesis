package com.ecme.com.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.ecme.com.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class AsignacionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Asignacion.class);
        Asignacion asignacion1 = new Asignacion();
        asignacion1.setId(1L);
        Asignacion asignacion2 = new Asignacion();
        asignacion2.setId(asignacion1.getId());
        assertThat(asignacion1).isEqualTo(asignacion2);
        asignacion2.setId(2L);
        assertThat(asignacion1).isNotEqualTo(asignacion2);
        asignacion1.setId(null);
        assertThat(asignacion1).isNotEqualTo(asignacion2);
    }
}
