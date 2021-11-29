package com.ecme.com.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.ecme.com.IntegrationTest;
import com.ecme.com.domain.LUBRICANTEXTIPO;
import com.ecme.com.repository.LUBRICANTEXTIPORepository;
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
 * Integration tests for the {@link LUBRICANTEXTIPOResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class LUBRICANTEXTIPOResourceIT {

    private static final Integer DEFAULT_CANTIDAD_LUBRICANTE = 1;
    private static final Integer UPDATED_CANTIDAD_LUBRICANTE = 2;

    private static final String DEFAULT_LUBRICANTE = "AAAAAAAAAA";
    private static final String UPDATED_LUBRICANTE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/lubricantextipos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private LUBRICANTEXTIPORepository lUBRICANTEXTIPORepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLUBRICANTEXTIPOMockMvc;

    private LUBRICANTEXTIPO lUBRICANTEXTIPO;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LUBRICANTEXTIPO createEntity(EntityManager em) {
        LUBRICANTEXTIPO lUBRICANTEXTIPO = new LUBRICANTEXTIPO()
            .cantidadLubricante(DEFAULT_CANTIDAD_LUBRICANTE)
            .lubricante(DEFAULT_LUBRICANTE);
        return lUBRICANTEXTIPO;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LUBRICANTEXTIPO createUpdatedEntity(EntityManager em) {
        LUBRICANTEXTIPO lUBRICANTEXTIPO = new LUBRICANTEXTIPO()
            .cantidadLubricante(UPDATED_CANTIDAD_LUBRICANTE)
            .lubricante(UPDATED_LUBRICANTE);
        return lUBRICANTEXTIPO;
    }

    @BeforeEach
    public void initTest() {
        lUBRICANTEXTIPO = createEntity(em);
    }

    @Test
    @Transactional
    void createLUBRICANTEXTIPO() throws Exception {
        int databaseSizeBeforeCreate = lUBRICANTEXTIPORepository.findAll().size();
        // Create the LUBRICANTEXTIPO
        restLUBRICANTEXTIPOMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(lUBRICANTEXTIPO))
            )
            .andExpect(status().isCreated());

        // Validate the LUBRICANTEXTIPO in the database
        List<LUBRICANTEXTIPO> lUBRICANTEXTIPOList = lUBRICANTEXTIPORepository.findAll();
        assertThat(lUBRICANTEXTIPOList).hasSize(databaseSizeBeforeCreate + 1);
        LUBRICANTEXTIPO testLUBRICANTEXTIPO = lUBRICANTEXTIPOList.get(lUBRICANTEXTIPOList.size() - 1);
        assertThat(testLUBRICANTEXTIPO.getCantidadLubricante()).isEqualTo(DEFAULT_CANTIDAD_LUBRICANTE);
        assertThat(testLUBRICANTEXTIPO.getLubricante()).isEqualTo(DEFAULT_LUBRICANTE);
    }

    @Test
    @Transactional
    void createLUBRICANTEXTIPOWithExistingId() throws Exception {
        // Create the LUBRICANTEXTIPO with an existing ID
        lUBRICANTEXTIPO.setId(1L);

        int databaseSizeBeforeCreate = lUBRICANTEXTIPORepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restLUBRICANTEXTIPOMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(lUBRICANTEXTIPO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LUBRICANTEXTIPO in the database
        List<LUBRICANTEXTIPO> lUBRICANTEXTIPOList = lUBRICANTEXTIPORepository.findAll();
        assertThat(lUBRICANTEXTIPOList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllLUBRICANTEXTIPOS() throws Exception {
        // Initialize the database
        lUBRICANTEXTIPORepository.saveAndFlush(lUBRICANTEXTIPO);

        // Get all the lUBRICANTEXTIPOList
        restLUBRICANTEXTIPOMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lUBRICANTEXTIPO.getId().intValue())))
            .andExpect(jsonPath("$.[*].cantidadLubricante").value(hasItem(DEFAULT_CANTIDAD_LUBRICANTE)))
            .andExpect(jsonPath("$.[*].lubricante").value(hasItem(DEFAULT_LUBRICANTE)));
    }

    @Test
    @Transactional
    void getLUBRICANTEXTIPO() throws Exception {
        // Initialize the database
        lUBRICANTEXTIPORepository.saveAndFlush(lUBRICANTEXTIPO);

        // Get the lUBRICANTEXTIPO
        restLUBRICANTEXTIPOMockMvc
            .perform(get(ENTITY_API_URL_ID, lUBRICANTEXTIPO.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(lUBRICANTEXTIPO.getId().intValue()))
            .andExpect(jsonPath("$.cantidadLubricante").value(DEFAULT_CANTIDAD_LUBRICANTE))
            .andExpect(jsonPath("$.lubricante").value(DEFAULT_LUBRICANTE));
    }

    @Test
    @Transactional
    void getNonExistingLUBRICANTEXTIPO() throws Exception {
        // Get the lUBRICANTEXTIPO
        restLUBRICANTEXTIPOMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewLUBRICANTEXTIPO() throws Exception {
        // Initialize the database
        lUBRICANTEXTIPORepository.saveAndFlush(lUBRICANTEXTIPO);

        int databaseSizeBeforeUpdate = lUBRICANTEXTIPORepository.findAll().size();

        // Update the lUBRICANTEXTIPO
        LUBRICANTEXTIPO updatedLUBRICANTEXTIPO = lUBRICANTEXTIPORepository.findById(lUBRICANTEXTIPO.getId()).get();
        // Disconnect from session so that the updates on updatedLUBRICANTEXTIPO are not directly saved in db
        em.detach(updatedLUBRICANTEXTIPO);
        updatedLUBRICANTEXTIPO.cantidadLubricante(UPDATED_CANTIDAD_LUBRICANTE).lubricante(UPDATED_LUBRICANTE);

        restLUBRICANTEXTIPOMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedLUBRICANTEXTIPO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedLUBRICANTEXTIPO))
            )
            .andExpect(status().isOk());

        // Validate the LUBRICANTEXTIPO in the database
        List<LUBRICANTEXTIPO> lUBRICANTEXTIPOList = lUBRICANTEXTIPORepository.findAll();
        assertThat(lUBRICANTEXTIPOList).hasSize(databaseSizeBeforeUpdate);
        LUBRICANTEXTIPO testLUBRICANTEXTIPO = lUBRICANTEXTIPOList.get(lUBRICANTEXTIPOList.size() - 1);
        assertThat(testLUBRICANTEXTIPO.getCantidadLubricante()).isEqualTo(UPDATED_CANTIDAD_LUBRICANTE);
        assertThat(testLUBRICANTEXTIPO.getLubricante()).isEqualTo(UPDATED_LUBRICANTE);
    }

    @Test
    @Transactional
    void putNonExistingLUBRICANTEXTIPO() throws Exception {
        int databaseSizeBeforeUpdate = lUBRICANTEXTIPORepository.findAll().size();
        lUBRICANTEXTIPO.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLUBRICANTEXTIPOMockMvc
            .perform(
                put(ENTITY_API_URL_ID, lUBRICANTEXTIPO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(lUBRICANTEXTIPO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LUBRICANTEXTIPO in the database
        List<LUBRICANTEXTIPO> lUBRICANTEXTIPOList = lUBRICANTEXTIPORepository.findAll();
        assertThat(lUBRICANTEXTIPOList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchLUBRICANTEXTIPO() throws Exception {
        int databaseSizeBeforeUpdate = lUBRICANTEXTIPORepository.findAll().size();
        lUBRICANTEXTIPO.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLUBRICANTEXTIPOMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(lUBRICANTEXTIPO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LUBRICANTEXTIPO in the database
        List<LUBRICANTEXTIPO> lUBRICANTEXTIPOList = lUBRICANTEXTIPORepository.findAll();
        assertThat(lUBRICANTEXTIPOList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamLUBRICANTEXTIPO() throws Exception {
        int databaseSizeBeforeUpdate = lUBRICANTEXTIPORepository.findAll().size();
        lUBRICANTEXTIPO.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLUBRICANTEXTIPOMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(lUBRICANTEXTIPO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the LUBRICANTEXTIPO in the database
        List<LUBRICANTEXTIPO> lUBRICANTEXTIPOList = lUBRICANTEXTIPORepository.findAll();
        assertThat(lUBRICANTEXTIPOList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateLUBRICANTEXTIPOWithPatch() throws Exception {
        // Initialize the database
        lUBRICANTEXTIPORepository.saveAndFlush(lUBRICANTEXTIPO);

        int databaseSizeBeforeUpdate = lUBRICANTEXTIPORepository.findAll().size();

        // Update the lUBRICANTEXTIPO using partial update
        LUBRICANTEXTIPO partialUpdatedLUBRICANTEXTIPO = new LUBRICANTEXTIPO();
        partialUpdatedLUBRICANTEXTIPO.setId(lUBRICANTEXTIPO.getId());

        restLUBRICANTEXTIPOMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLUBRICANTEXTIPO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedLUBRICANTEXTIPO))
            )
            .andExpect(status().isOk());

        // Validate the LUBRICANTEXTIPO in the database
        List<LUBRICANTEXTIPO> lUBRICANTEXTIPOList = lUBRICANTEXTIPORepository.findAll();
        assertThat(lUBRICANTEXTIPOList).hasSize(databaseSizeBeforeUpdate);
        LUBRICANTEXTIPO testLUBRICANTEXTIPO = lUBRICANTEXTIPOList.get(lUBRICANTEXTIPOList.size() - 1);
        assertThat(testLUBRICANTEXTIPO.getCantidadLubricante()).isEqualTo(DEFAULT_CANTIDAD_LUBRICANTE);
        assertThat(testLUBRICANTEXTIPO.getLubricante()).isEqualTo(DEFAULT_LUBRICANTE);
    }

    @Test
    @Transactional
    void fullUpdateLUBRICANTEXTIPOWithPatch() throws Exception {
        // Initialize the database
        lUBRICANTEXTIPORepository.saveAndFlush(lUBRICANTEXTIPO);

        int databaseSizeBeforeUpdate = lUBRICANTEXTIPORepository.findAll().size();

        // Update the lUBRICANTEXTIPO using partial update
        LUBRICANTEXTIPO partialUpdatedLUBRICANTEXTIPO = new LUBRICANTEXTIPO();
        partialUpdatedLUBRICANTEXTIPO.setId(lUBRICANTEXTIPO.getId());

        partialUpdatedLUBRICANTEXTIPO.cantidadLubricante(UPDATED_CANTIDAD_LUBRICANTE).lubricante(UPDATED_LUBRICANTE);

        restLUBRICANTEXTIPOMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLUBRICANTEXTIPO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedLUBRICANTEXTIPO))
            )
            .andExpect(status().isOk());

        // Validate the LUBRICANTEXTIPO in the database
        List<LUBRICANTEXTIPO> lUBRICANTEXTIPOList = lUBRICANTEXTIPORepository.findAll();
        assertThat(lUBRICANTEXTIPOList).hasSize(databaseSizeBeforeUpdate);
        LUBRICANTEXTIPO testLUBRICANTEXTIPO = lUBRICANTEXTIPOList.get(lUBRICANTEXTIPOList.size() - 1);
        assertThat(testLUBRICANTEXTIPO.getCantidadLubricante()).isEqualTo(UPDATED_CANTIDAD_LUBRICANTE);
        assertThat(testLUBRICANTEXTIPO.getLubricante()).isEqualTo(UPDATED_LUBRICANTE);
    }

    @Test
    @Transactional
    void patchNonExistingLUBRICANTEXTIPO() throws Exception {
        int databaseSizeBeforeUpdate = lUBRICANTEXTIPORepository.findAll().size();
        lUBRICANTEXTIPO.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLUBRICANTEXTIPOMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, lUBRICANTEXTIPO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(lUBRICANTEXTIPO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LUBRICANTEXTIPO in the database
        List<LUBRICANTEXTIPO> lUBRICANTEXTIPOList = lUBRICANTEXTIPORepository.findAll();
        assertThat(lUBRICANTEXTIPOList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchLUBRICANTEXTIPO() throws Exception {
        int databaseSizeBeforeUpdate = lUBRICANTEXTIPORepository.findAll().size();
        lUBRICANTEXTIPO.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLUBRICANTEXTIPOMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(lUBRICANTEXTIPO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LUBRICANTEXTIPO in the database
        List<LUBRICANTEXTIPO> lUBRICANTEXTIPOList = lUBRICANTEXTIPORepository.findAll();
        assertThat(lUBRICANTEXTIPOList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamLUBRICANTEXTIPO() throws Exception {
        int databaseSizeBeforeUpdate = lUBRICANTEXTIPORepository.findAll().size();
        lUBRICANTEXTIPO.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLUBRICANTEXTIPOMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(lUBRICANTEXTIPO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the LUBRICANTEXTIPO in the database
        List<LUBRICANTEXTIPO> lUBRICANTEXTIPOList = lUBRICANTEXTIPORepository.findAll();
        assertThat(lUBRICANTEXTIPOList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteLUBRICANTEXTIPO() throws Exception {
        // Initialize the database
        lUBRICANTEXTIPORepository.saveAndFlush(lUBRICANTEXTIPO);

        int databaseSizeBeforeDelete = lUBRICANTEXTIPORepository.findAll().size();

        // Delete the lUBRICANTEXTIPO
        restLUBRICANTEXTIPOMockMvc
            .perform(delete(ENTITY_API_URL_ID, lUBRICANTEXTIPO.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LUBRICANTEXTIPO> lUBRICANTEXTIPOList = lUBRICANTEXTIPORepository.findAll();
        assertThat(lUBRICANTEXTIPOList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
