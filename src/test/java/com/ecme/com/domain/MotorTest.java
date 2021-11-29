package com.ecme.com.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.ecme.com.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class MotorTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Motor.class);
        Motor motor1 = new Motor();
        motor1.setId(1L);
        Motor motor2 = new Motor();
        motor2.setId(motor1.getId());
        assertThat(motor1).isEqualTo(motor2);
        motor2.setId(2L);
        assertThat(motor1).isNotEqualTo(motor2);
        motor1.setId(null);
        assertThat(motor1).isNotEqualTo(motor2);
    }
}
