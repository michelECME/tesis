package com.ecme.com.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.ecme.com.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class LUBRICANTEXUEBTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LUBRICANTEXUEB.class);
        LUBRICANTEXUEB lUBRICANTEXUEB1 = new LUBRICANTEXUEB();
        lUBRICANTEXUEB1.setId(1L);
        LUBRICANTEXUEB lUBRICANTEXUEB2 = new LUBRICANTEXUEB();
        lUBRICANTEXUEB2.setId(lUBRICANTEXUEB1.getId());
        assertThat(lUBRICANTEXUEB1).isEqualTo(lUBRICANTEXUEB2);
        lUBRICANTEXUEB2.setId(2L);
        assertThat(lUBRICANTEXUEB1).isNotEqualTo(lUBRICANTEXUEB2);
        lUBRICANTEXUEB1.setId(null);
        assertThat(lUBRICANTEXUEB1).isNotEqualTo(lUBRICANTEXUEB2);
    }
}
