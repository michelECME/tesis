package com.ecme.com.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.ecme.com.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CANTIDADXTIPOTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CANTIDADXTIPO.class);
        CANTIDADXTIPO cANTIDADXTIPO1 = new CANTIDADXTIPO();
        cANTIDADXTIPO1.setId(1L);
        CANTIDADXTIPO cANTIDADXTIPO2 = new CANTIDADXTIPO();
        cANTIDADXTIPO2.setId(cANTIDADXTIPO1.getId());
        assertThat(cANTIDADXTIPO1).isEqualTo(cANTIDADXTIPO2);
        cANTIDADXTIPO2.setId(2L);
        assertThat(cANTIDADXTIPO1).isNotEqualTo(cANTIDADXTIPO2);
        cANTIDADXTIPO1.setId(null);
        assertThat(cANTIDADXTIPO1).isNotEqualTo(cANTIDADXTIPO2);
    }
}
