package com.ecme.com.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.ecme.com.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CANTIDADXTIPOUEBTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CANTIDADXTIPOUEB.class);
        CANTIDADXTIPOUEB cANTIDADXTIPOUEB1 = new CANTIDADXTIPOUEB();
        cANTIDADXTIPOUEB1.setId(1L);
        CANTIDADXTIPOUEB cANTIDADXTIPOUEB2 = new CANTIDADXTIPOUEB();
        cANTIDADXTIPOUEB2.setId(cANTIDADXTIPOUEB1.getId());
        assertThat(cANTIDADXTIPOUEB1).isEqualTo(cANTIDADXTIPOUEB2);
        cANTIDADXTIPOUEB2.setId(2L);
        assertThat(cANTIDADXTIPOUEB1).isNotEqualTo(cANTIDADXTIPOUEB2);
        cANTIDADXTIPOUEB1.setId(null);
        assertThat(cANTIDADXTIPOUEB1).isNotEqualTo(cANTIDADXTIPOUEB2);
    }
}
