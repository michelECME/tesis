package com.ecme.com.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.ecme.com.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class AgregadoXChoferTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AgregadoXChofer.class);
        AgregadoXChofer agregadoXChofer1 = new AgregadoXChofer();
        agregadoXChofer1.setId(1L);
        AgregadoXChofer agregadoXChofer2 = new AgregadoXChofer();
        agregadoXChofer2.setId(agregadoXChofer1.getId());
        assertThat(agregadoXChofer1).isEqualTo(agregadoXChofer2);
        agregadoXChofer2.setId(2L);
        assertThat(agregadoXChofer1).isNotEqualTo(agregadoXChofer2);
        agregadoXChofer1.setId(null);
        assertThat(agregadoXChofer1).isNotEqualTo(agregadoXChofer2);
    }
}
