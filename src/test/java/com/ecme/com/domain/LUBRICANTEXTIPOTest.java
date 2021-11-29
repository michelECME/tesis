package com.ecme.com.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.ecme.com.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class LUBRICANTEXTIPOTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LUBRICANTEXTIPO.class);
        LUBRICANTEXTIPO lUBRICANTEXTIPO1 = new LUBRICANTEXTIPO();
        lUBRICANTEXTIPO1.setId(1L);
        LUBRICANTEXTIPO lUBRICANTEXTIPO2 = new LUBRICANTEXTIPO();
        lUBRICANTEXTIPO2.setId(lUBRICANTEXTIPO1.getId());
        assertThat(lUBRICANTEXTIPO1).isEqualTo(lUBRICANTEXTIPO2);
        lUBRICANTEXTIPO2.setId(2L);
        assertThat(lUBRICANTEXTIPO1).isNotEqualTo(lUBRICANTEXTIPO2);
        lUBRICANTEXTIPO1.setId(null);
        assertThat(lUBRICANTEXTIPO1).isNotEqualTo(lUBRICANTEXTIPO2);
    }
}
