package com.ecme.com.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.ecme.com.IntegrationTest;
import com.ecme.com.domain.Motor;
import com.ecme.com.domain.enumeration.Estado;
import com.ecme.com.repository.MotorRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link MotorResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class MotorResourceIT {

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final Estado DEFAULT_ESTADO = Estado.BUENO;
    private static final Estado UPDATED_ESTADO = Estado.REGULAR;

    private static final String DEFAULT_MARCA = "AAAAAAAAAA";
    private static final String UPDATED_MARCA = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/motors";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private MotorRepository motorRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMotorMockMvc;

    private Motor motor;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Motor createEntity(EntityManager em) {
        Motor motor = new Motor().codigo(DEFAULT_CODIGO).estado(DEFAULT_ESTADO).marca(DEFAULT_MARCA);
        return motor;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Motor createUpdatedEntity(EntityManager em) {
        Motor motor = new Motor().codigo(UPDATED_CODIGO).estado(UPDATED_ESTADO).marca(UPDATED_MARCA);
        return motor;
    }

    @BeforeEach
    public void initTest() {
        motor = createEntity(em);
    }

    @Test
    @Transactional
    void createMotor() throws Exception {
        int databaseSizeBeforeCreate = motorRepository.findAll().size();
        // Create the Motor
        restMotorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(motor)))
            .andExpect(status().isCreated());

        // Validate the Motor in the database
        List<Motor> motorList = motorRepository.findAll();
        assertThat(motorList).hasSize(databaseSizeBeforeCreate + 1);
        Motor testMotor = motorList.get(motorList.size() - 1);
        assertThat(testMotor.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testMotor.getEstado()).isEqualTo(DEFAULT_ESTADO);
        assertThat(testMotor.getMarca()).isEqualTo(DEFAULT_MARCA);
    }

    @Test
    @Transactional
    void createMotorWithExistingId() throws Exception {
        // Create the Motor with an existing ID
        motor.setId(1L);

        int databaseSizeBeforeCreate = motorRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restMotorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(motor)))
            .andExpect(status().isBadRequest());

        // Validate the Motor in the database
        List<Motor> motorList = motorRepository.findAll();
        assertThat(motorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllMotors() throws Exception {
        // Initialize the database
        motorRepository.saveAndFlush(motor);

        // Get all the motorList
        restMotorMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(motor.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO)))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO.toString())))
            .andExpect(jsonPath("$.[*].marca").value(hasItem(DEFAULT_MARCA)));
    }

    @Test
    @Transactional
    void getMotor() throws Exception {
        // Initialize the database
        motorRepository.saveAndFlush(motor);

        // Get the motor
        restMotorMockMvc
            .perform(get(ENTITY_API_URL_ID, motor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(motor.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO.toString()))
            .andExpect(jsonPath("$.marca").value(DEFAULT_MARCA));
    }

    @Test
    @Transactional
    void getNonExistingMotor() throws Exception {
        // Get the motor
        restMotorMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewMotor() throws Exception {
        // Initialize the database
        motorRepository.saveAndFlush(motor);

        int databaseSizeBeforeUpdate = motorRepository.findAll().size();

        // Update the motor
        Motor updatedMotor = motorRepository.findById(motor.getId()).get();
        // Disconnect from session so that the updates on updatedMotor are not directly saved in db
        em.detach(updatedMotor);
        updatedMotor.codigo(UPDATED_CODIGO).estado(UPDATED_ESTADO).marca(UPDATED_MARCA);

        restMotorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedMotor.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedMotor))
            )
            .andExpect(status().isOk());

        // Validate the Motor in the database
        List<Motor> motorList = motorRepository.findAll();
        assertThat(motorList).hasSize(databaseSizeBeforeUpdate);
        Motor testMotor = motorList.get(motorList.size() - 1);
        assertThat(testMotor.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testMotor.getEstado()).isEqualTo(UPDATED_ESTADO);
        assertThat(testMotor.getMarca()).isEqualTo(UPDATED_MARCA);
    }

    @Test
    @Transactional
    void putNonExistingMotor() throws Exception {
        int databaseSizeBeforeUpdate = motorRepository.findAll().size();
        motor.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMotorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, motor.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(motor))
            )
            .andExpect(status().isBadRequest());

        // Validate the Motor in the database
        List<Motor> motorList = motorRepository.findAll();
        assertThat(motorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchMotor() throws Exception {
        int databaseSizeBeforeUpdate = motorRepository.findAll().size();
        motor.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMotorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(motor))
            )
            .andExpect(status().isBadRequest());

        // Validate the Motor in the database
        List<Motor> motorList = motorRepository.findAll();
        assertThat(motorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamMotor() throws Exception {
        int databaseSizeBeforeUpdate = motorRepository.findAll().size();
        motor.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMotorMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(motor)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Motor in the database
        List<Motor> motorList = motorRepository.findAll();
        assertThat(motorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateMotorWithPatch() throws Exception {
        // Initialize the database
        motorRepository.saveAndFlush(motor);

        int databaseSizeBeforeUpdate = motorRepository.findAll().size();

        // Update the motor using partial update
        Motor partialUpdatedMotor = new Motor();
        partialUpdatedMotor.setId(motor.getId());

        partialUpdatedMotor.codigo(UPDATED_CODIGO);

        restMotorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMotor.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMotor))
            )
            .andExpect(status().isOk());

        // Validate the Motor in the database
        List<Motor> motorList = motorRepository.findAll();
        assertThat(motorList).hasSize(databaseSizeBeforeUpdate);
        Motor testMotor = motorList.get(motorList.size() - 1);
        assertThat(testMotor.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testMotor.getEstado()).isEqualTo(DEFAULT_ESTADO);
        assertThat(testMotor.getMarca()).isEqualTo(DEFAULT_MARCA);
    }

    @Test
    @Transactional
    void fullUpdateMotorWithPatch() throws Exception {
        // Initialize the database
        motorRepository.saveAndFlush(motor);

        int databaseSizeBeforeUpdate = motorRepository.findAll().size();

        // Update the motor using partial update
        Motor partialUpdatedMotor = new Motor();
        partialUpdatedMotor.setId(motor.getId());

        partialUpdatedMotor.codigo(UPDATED_CODIGO).estado(UPDATED_ESTADO).marca(UPDATED_MARCA);

        restMotorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMotor.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMotor))
            )
            .andExpect(status().isOk());

        // Validate the Motor in the database
        List<Motor> motorList = motorRepository.findAll();
        assertThat(motorList).hasSize(databaseSizeBeforeUpdate);
        Motor testMotor = motorList.get(motorList.size() - 1);
        assertThat(testMotor.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testMotor.getEstado()).isEqualTo(UPDATED_ESTADO);
        assertThat(testMotor.getMarca()).isEqualTo(UPDATED_MARCA);
    }

    @Test
    @Transactional
    void patchNonExistingMotor() throws Exception {
        int databaseSizeBeforeUpdate = motorRepository.findAll().size();
        motor.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMotorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, motor.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(motor))
            )
            .andExpect(status().isBadRequest());

        // Validate the Motor in the database
        List<Motor> motorList = motorRepository.findAll();
        assertThat(motorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchMotor() throws Exception {
        int databaseSizeBeforeUpdate = motorRepository.findAll().size();
        motor.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMotorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(motor))
            )
            .andExpect(status().isBadRequest());

        // Validate the Motor in the database
        List<Motor> motorList = motorRepository.findAll();
        assertThat(motorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamMotor() throws Exception {
        int databaseSizeBeforeUpdate = motorRepository.findAll().size();
        motor.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMotorMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(motor)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Motor in the database
        List<Motor> motorList = motorRepository.findAll();
        assertThat(motorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteMotor() throws Exception {
        // Initialize the database
        motorRepository.saveAndFlush(motor);

        int databaseSizeBeforeDelete = motorRepository.findAll().size();

        // Delete the motor
        restMotorMockMvc
            .perform(delete(ENTITY_API_URL_ID, motor.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Motor> motorList = motorRepository.findAll();
        assertThat(motorList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
