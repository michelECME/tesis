package com.ecme.com.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.ecme.com.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ENTREGAXTIPOTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ENTREGAXTIPO.class);
        ENTREGAXTIPO eNTREGAXTIPO1 = new ENTREGAXTIPO();
        eNTREGAXTIPO1.setId(1L);
        ENTREGAXTIPO eNTREGAXTIPO2 = new ENTREGAXTIPO();
        eNTREGAXTIPO2.setId(eNTREGAXTIPO1.getId());
        assertThat(eNTREGAXTIPO1).isEqualTo(eNTREGAXTIPO2);
        eNTREGAXTIPO2.setId(2L);
        assertThat(eNTREGAXTIPO1).isNotEqualTo(eNTREGAXTIPO2);
        eNTREGAXTIPO1.setId(null);
        assertThat(eNTREGAXTIPO1).isNotEqualTo(eNTREGAXTIPO2);
    }
}
