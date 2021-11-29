package com.ecme.com.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.ecme.com.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class COMBUSTIBLEXUEBTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(COMBUSTIBLEXUEB.class);
        COMBUSTIBLEXUEB cOMBUSTIBLEXUEB1 = new COMBUSTIBLEXUEB();
        cOMBUSTIBLEXUEB1.setId(1L);
        COMBUSTIBLEXUEB cOMBUSTIBLEXUEB2 = new COMBUSTIBLEXUEB();
        cOMBUSTIBLEXUEB2.setId(cOMBUSTIBLEXUEB1.getId());
        assertThat(cOMBUSTIBLEXUEB1).isEqualTo(cOMBUSTIBLEXUEB2);
        cOMBUSTIBLEXUEB2.setId(2L);
        assertThat(cOMBUSTIBLEXUEB1).isNotEqualTo(cOMBUSTIBLEXUEB2);
        cOMBUSTIBLEXUEB1.setId(null);
        assertThat(cOMBUSTIBLEXUEB1).isNotEqualTo(cOMBUSTIBLEXUEB2);
    }
}
