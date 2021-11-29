package com.ecme.com.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.ecme.com.IntegrationTest;
import com.ecme.com.domain.CANTIDADXTIPO;
import com.ecme.com.repository.CANTIDADXTIPORepository;
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
 * Integration tests for the {@link CANTIDADXTIPOResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CANTIDADXTIPOResourceIT {

    private static final Integer DEFAULT_CANTIDAD_TIPO = 1;
    private static final Integer UPDATED_CANTIDAD_TIPO = 2;

    private static final String DEFAULT_TIPO = "AAAAAAAAAA";
    private static final String UPDATED_TIPO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/cantidadxtipos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CANTIDADXTIPORepository cANTIDADXTIPORepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCANTIDADXTIPOMockMvc;

    private CANTIDADXTIPO cANTIDADXTIPO;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CANTIDADXTIPO createEntity(EntityManager em) {
        CANTIDADXTIPO cANTIDADXTIPO = new CANTIDADXTIPO().cantidadTipo(DEFAULT_CANTIDAD_TIPO).tipo(DEFAULT_TIPO);
        return cANTIDADXTIPO;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CANTIDADXTIPO createUpdatedEntity(EntityManager em) {
        CANTIDADXTIPO cANTIDADXTIPO = new CANTIDADXTIPO().cantidadTipo(UPDATED_CANTIDAD_TIPO).tipo(UPDATED_TIPO);
        return cANTIDADXTIPO;
    }

    @BeforeEach
    public void initTest() {
        cANTIDADXTIPO = createEntity(em);
    }

    @Test
    @Transactional
    void createCANTIDADXTIPO() throws Exception {
        int databaseSizeBeforeCreate = cANTIDADXTIPORepository.findAll().size();
        // Create the CANTIDADXTIPO
        restCANTIDADXTIPOMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cANTIDADXTIPO)))
            .andExpect(status().isCreated());

        // Validate the CANTIDADXTIPO in the database
        List<CANTIDADXTIPO> cANTIDADXTIPOList = cANTIDADXTIPORepository.findAll();
        assertThat(cANTIDADXTIPOList).hasSize(databaseSizeBeforeCreate + 1);
        CANTIDADXTIPO testCANTIDADXTIPO = cANTIDADXTIPOList.get(cANTIDADXTIPOList.size() - 1);
        assertThat(testCANTIDADXTIPO.getCantidadTipo()).isEqualTo(DEFAULT_CANTIDAD_TIPO);
        assertThat(testCANTIDADXTIPO.getTipo()).isEqualTo(DEFAULT_TIPO);
    }

    @Test
    @Transactional
    void createCANTIDADXTIPOWithExistingId() throws Exception {
        // Create the CANTIDADXTIPO with an existing ID
        cANTIDADXTIPO.setId(1L);

        int databaseSizeBeforeCreate = cANTIDADXTIPORepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCANTIDADXTIPOMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cANTIDADXTIPO)))
            .andExpect(status().isBadRequest());

        // Validate the CANTIDADXTIPO in the database
        List<CANTIDADXTIPO> cANTIDADXTIPOList = cANTIDADXTIPORepository.findAll();
        assertThat(cANTIDADXTIPOList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllCANTIDADXTIPOS() throws Exception {
        // Initialize the database
        cANTIDADXTIPORepository.saveAndFlush(cANTIDADXTIPO);

        // Get all the cANTIDADXTIPOList
        restCANTIDADXTIPOMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cANTIDADXTIPO.getId().intValue())))
            .andExpect(jsonPath("$.[*].cantidadTipo").value(hasItem(DEFAULT_CANTIDAD_TIPO)))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO)));
    }

    @Test
    @Transactional
    void getCANTIDADXTIPO() throws Exception {
        // Initialize the database
        cANTIDADXTIPORepository.saveAndFlush(cANTIDADXTIPO);

        // Get the cANTIDADXTIPO
        restCANTIDADXTIPOMockMvc
            .perform(get(ENTITY_API_URL_ID, cANTIDADXTIPO.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cANTIDADXTIPO.getId().intValue()))
            .andExpect(jsonPath("$.cantidadTipo").value(DEFAULT_CANTIDAD_TIPO))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO));
    }

    @Test
    @Transactional
    void getNonExistingCANTIDADXTIPO() throws Exception {
        // Get the cANTIDADXTIPO
        restCANTIDADXTIPOMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCANTIDADXTIPO() throws Exception {
        // Initialize the database
        cANTIDADXTIPORepository.saveAndFlush(cANTIDADXTIPO);

        int databaseSizeBeforeUpdate = cANTIDADXTIPORepository.findAll().size();

        // Update the cANTIDADXTIPO
        CANTIDADXTIPO updatedCANTIDADXTIPO = cANTIDADXTIPORepository.findById(cANTIDADXTIPO.getId()).get();
        // Disconnect from session so that the updates on updatedCANTIDADXTIPO are not directly saved in db
        em.detach(updatedCANTIDADXTIPO);
        updatedCANTIDADXTIPO.cantidadTipo(UPDATED_CANTIDAD_TIPO).tipo(UPDATED_TIPO);

        restCANTIDADXTIPOMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCANTIDADXTIPO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCANTIDADXTIPO))
            )
            .andExpect(status().isOk());

        // Validate the CANTIDADXTIPO in the database
        List<CANTIDADXTIPO> cANTIDADXTIPOList = cANTIDADXTIPORepository.findAll();
        assertThat(cANTIDADXTIPOList).hasSize(databaseSizeBeforeUpdate);
        CANTIDADXTIPO testCANTIDADXTIPO = cANTIDADXTIPOList.get(cANTIDADXTIPOList.size() - 1);
        assertThat(testCANTIDADXTIPO.getCantidadTipo()).isEqualTo(UPDATED_CANTIDAD_TIPO);
        assertThat(testCANTIDADXTIPO.getTipo()).isEqualTo(UPDATED_TIPO);
    }

    @Test
    @Transactional
    void putNonExistingCANTIDADXTIPO() throws Exception {
        int databaseSizeBeforeUpdate = cANTIDADXTIPORepository.findAll().size();
        cANTIDADXTIPO.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCANTIDADXTIPOMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cANTIDADXTIPO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cANTIDADXTIPO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CANTIDADXTIPO in the database
        List<CANTIDADXTIPO> cANTIDADXTIPOList = cANTIDADXTIPORepository.findAll();
        assertThat(cANTIDADXTIPOList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCANTIDADXTIPO() throws Exception {
        int databaseSizeBeforeUpdate = cANTIDADXTIPORepository.findAll().size();
        cANTIDADXTIPO.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCANTIDADXTIPOMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cANTIDADXTIPO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CANTIDADXTIPO in the database
        List<CANTIDADXTIPO> cANTIDADXTIPOList = cANTIDADXTIPORepository.findAll();
        assertThat(cANTIDADXTIPOList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCANTIDADXTIPO() throws Exception {
        int databaseSizeBeforeUpdate = cANTIDADXTIPORepository.findAll().size();
        cANTIDADXTIPO.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCANTIDADXTIPOMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cANTIDADXTIPO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CANTIDADXTIPO in the database
        List<CANTIDADXTIPO> cANTIDADXTIPOList = cANTIDADXTIPORepository.findAll();
        assertThat(cANTIDADXTIPOList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCANTIDADXTIPOWithPatch() throws Exception {
        // Initialize the database
        cANTIDADXTIPORepository.saveAndFlush(cANTIDADXTIPO);

        int databaseSizeBeforeUpdate = cANTIDADXTIPORepository.findAll().size();

        // Update the cANTIDADXTIPO using partial update
        CANTIDADXTIPO partialUpdatedCANTIDADXTIPO = new CANTIDADXTIPO();
        partialUpdatedCANTIDADXTIPO.setId(cANTIDADXTIPO.getId());

        restCANTIDADXTIPOMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCANTIDADXTIPO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCANTIDADXTIPO))
            )
            .andExpect(status().isOk());

        // Validate the CANTIDADXTIPO in the database
        List<CANTIDADXTIPO> cANTIDADXTIPOList = cANTIDADXTIPORepository.findAll();
        assertThat(cANTIDADXTIPOList).hasSize(databaseSizeBeforeUpdate);
        CANTIDADXTIPO testCANTIDADXTIPO = cANTIDADXTIPOList.get(cANTIDADXTIPOList.size() - 1);
        assertThat(testCANTIDADXTIPO.getCantidadTipo()).isEqualTo(DEFAULT_CANTIDAD_TIPO);
        assertThat(testCANTIDADXTIPO.getTipo()).isEqualTo(DEFAULT_TIPO);
    }

    @Test
    @Transactional
    void fullUpdateCANTIDADXTIPOWithPatch() throws Exception {
        // Initialize the database
        cANTIDADXTIPORepository.saveAndFlush(cANTIDADXTIPO);

        int databaseSizeBeforeUpdate = cANTIDADXTIPORepository.findAll().size();

        // Update the cANTIDADXTIPO using partial update
        CANTIDADXTIPO partialUpdatedCANTIDADXTIPO = new CANTIDADXTIPO();
        partialUpdatedCANTIDADXTIPO.setId(cANTIDADXTIPO.getId());

        partialUpdatedCANTIDADXTIPO.cantidadTipo(UPDATED_CANTIDAD_TIPO).tipo(UPDATED_TIPO);

        restCANTIDADXTIPOMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCANTIDADXTIPO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCANTIDADXTIPO))
            )
            .andExpect(status().isOk());

        // Validate the CANTIDADXTIPO in the database
        List<CANTIDADXTIPO> cANTIDADXTIPOList = cANTIDADXTIPORepository.findAll();
        assertThat(cANTIDADXTIPOList).hasSize(databaseSizeBeforeUpdate);
        CANTIDADXTIPO testCANTIDADXTIPO = cANTIDADXTIPOList.get(cANTIDADXTIPOList.size() - 1);
        assertThat(testCANTIDADXTIPO.getCantidadTipo()).isEqualTo(UPDATED_CANTIDAD_TIPO);
        assertThat(testCANTIDADXTIPO.getTipo()).isEqualTo(UPDATED_TIPO);
    }

    @Test
    @Transactional
    void patchNonExistingCANTIDADXTIPO() throws Exception {
        int databaseSizeBeforeUpdate = cANTIDADXTIPORepository.findAll().size();
        cANTIDADXTIPO.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCANTIDADXTIPOMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cANTIDADXTIPO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cANTIDADXTIPO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CANTIDADXTIPO in the database
        List<CANTIDADXTIPO> cANTIDADXTIPOList = cANTIDADXTIPORepository.findAll();
        assertThat(cANTIDADXTIPOList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCANTIDADXTIPO() throws Exception {
        int databaseSizeBeforeUpdate = cANTIDADXTIPORepository.findAll().size();
        cANTIDADXTIPO.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCANTIDADXTIPOMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cANTIDADXTIPO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CANTIDADXTIPO in the database
        List<CANTIDADXTIPO> cANTIDADXTIPOList = cANTIDADXTIPORepository.findAll();
        assertThat(cANTIDADXTIPOList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCANTIDADXTIPO() throws Exception {
        int databaseSizeBeforeUpdate = cANTIDADXTIPORepository.findAll().size();
        cANTIDADXTIPO.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCANTIDADXTIPOMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(cANTIDADXTIPO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CANTIDADXTIPO in the database
        List<CANTIDADXTIPO> cANTIDADXTIPOList = cANTIDADXTIPORepository.findAll();
        assertThat(cANTIDADXTIPOList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCANTIDADXTIPO() throws Exception {
        // Initialize the database
        cANTIDADXTIPORepository.saveAndFlush(cANTIDADXTIPO);

        int databaseSizeBeforeDelete = cANTIDADXTIPORepository.findAll().size();

        // Delete the cANTIDADXTIPO
        restCANTIDADXTIPOMockMvc
            .perform(delete(ENTITY_API_URL_ID, cANTIDADXTIPO.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CANTIDADXTIPO> cANTIDADXTIPOList = cANTIDADXTIPORepository.findAll();
        assertThat(cANTIDADXTIPOList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
