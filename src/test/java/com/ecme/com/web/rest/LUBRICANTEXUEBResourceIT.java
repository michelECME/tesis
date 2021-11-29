package com.ecme.com.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.ecme.com.IntegrationTest;
import com.ecme.com.domain.LUBRICANTEXUEB;
import com.ecme.com.repository.LUBRICANTEXUEBRepository;
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
 * Integration tests for the {@link LUBRICANTEXUEBResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class LUBRICANTEXUEBResourceIT {

    private static final Integer DEFAULT_CANTIDAD_LUBRICANTE_UEB = 1;
    private static final Integer UPDATED_CANTIDAD_LUBRICANTE_UEB = 2;

    private static final String DEFAULT_UEB = "AAAAAAAAAA";
    private static final String UPDATED_UEB = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/lubricantexuebs";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private LUBRICANTEXUEBRepository lUBRICANTEXUEBRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLUBRICANTEXUEBMockMvc;

    private LUBRICANTEXUEB lUBRICANTEXUEB;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LUBRICANTEXUEB createEntity(EntityManager em) {
        LUBRICANTEXUEB lUBRICANTEXUEB = new LUBRICANTEXUEB().cantidadLubricanteUEB(DEFAULT_CANTIDAD_LUBRICANTE_UEB).ueb(DEFAULT_UEB);
        return lUBRICANTEXUEB;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LUBRICANTEXUEB createUpdatedEntity(EntityManager em) {
        LUBRICANTEXUEB lUBRICANTEXUEB = new LUBRICANTEXUEB().cantidadLubricanteUEB(UPDATED_CANTIDAD_LUBRICANTE_UEB).ueb(UPDATED_UEB);
        return lUBRICANTEXUEB;
    }

    @BeforeEach
    public void initTest() {
        lUBRICANTEXUEB = createEntity(em);
    }

    @Test
    @Transactional
    void createLUBRICANTEXUEB() throws Exception {
        int databaseSizeBeforeCreate = lUBRICANTEXUEBRepository.findAll().size();
        // Create the LUBRICANTEXUEB
        restLUBRICANTEXUEBMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(lUBRICANTEXUEB))
            )
            .andExpect(status().isCreated());

        // Validate the LUBRICANTEXUEB in the database
        List<LUBRICANTEXUEB> lUBRICANTEXUEBList = lUBRICANTEXUEBRepository.findAll();
        assertThat(lUBRICANTEXUEBList).hasSize(databaseSizeBeforeCreate + 1);
        LUBRICANTEXUEB testLUBRICANTEXUEB = lUBRICANTEXUEBList.get(lUBRICANTEXUEBList.size() - 1);
        assertThat(testLUBRICANTEXUEB.getCantidadLubricanteUEB()).isEqualTo(DEFAULT_CANTIDAD_LUBRICANTE_UEB);
        assertThat(testLUBRICANTEXUEB.getUeb()).isEqualTo(DEFAULT_UEB);
    }

    @Test
    @Transactional
    void createLUBRICANTEXUEBWithExistingId() throws Exception {
        // Create the LUBRICANTEXUEB with an existing ID
        lUBRICANTEXUEB.setId(1L);

        int databaseSizeBeforeCreate = lUBRICANTEXUEBRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restLUBRICANTEXUEBMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(lUBRICANTEXUEB))
            )
            .andExpect(status().isBadRequest());

        // Validate the LUBRICANTEXUEB in the database
        List<LUBRICANTEXUEB> lUBRICANTEXUEBList = lUBRICANTEXUEBRepository.findAll();
        assertThat(lUBRICANTEXUEBList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllLUBRICANTEXUEBS() throws Exception {
        // Initialize the database
        lUBRICANTEXUEBRepository.saveAndFlush(lUBRICANTEXUEB);

        // Get all the lUBRICANTEXUEBList
        restLUBRICANTEXUEBMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lUBRICANTEXUEB.getId().intValue())))
            .andExpect(jsonPath("$.[*].cantidadLubricanteUEB").value(hasItem(DEFAULT_CANTIDAD_LUBRICANTE_UEB)))
            .andExpect(jsonPath("$.[*].ueb").value(hasItem(DEFAULT_UEB)));
    }

    @Test
    @Transactional
    void getLUBRICANTEXUEB() throws Exception {
        // Initialize the database
        lUBRICANTEXUEBRepository.saveAndFlush(lUBRICANTEXUEB);

        // Get the lUBRICANTEXUEB
        restLUBRICANTEXUEBMockMvc
            .perform(get(ENTITY_API_URL_ID, lUBRICANTEXUEB.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(lUBRICANTEXUEB.getId().intValue()))
            .andExpect(jsonPath("$.cantidadLubricanteUEB").value(DEFAULT_CANTIDAD_LUBRICANTE_UEB))
            .andExpect(jsonPath("$.ueb").value(DEFAULT_UEB));
    }

    @Test
    @Transactional
    void getNonExistingLUBRICANTEXUEB() throws Exception {
        // Get the lUBRICANTEXUEB
        restLUBRICANTEXUEBMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewLUBRICANTEXUEB() throws Exception {
        // Initialize the database
        lUBRICANTEXUEBRepository.saveAndFlush(lUBRICANTEXUEB);

        int databaseSizeBeforeUpdate = lUBRICANTEXUEBRepository.findAll().size();

        // Update the lUBRICANTEXUEB
        LUBRICANTEXUEB updatedLUBRICANTEXUEB = lUBRICANTEXUEBRepository.findById(lUBRICANTEXUEB.getId()).get();
        // Disconnect from session so that the updates on updatedLUBRICANTEXUEB are not directly saved in db
        em.detach(updatedLUBRICANTEXUEB);
        updatedLUBRICANTEXUEB.cantidadLubricanteUEB(UPDATED_CANTIDAD_LUBRICANTE_UEB).ueb(UPDATED_UEB);

        restLUBRICANTEXUEBMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedLUBRICANTEXUEB.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedLUBRICANTEXUEB))
            )
            .andExpect(status().isOk());

        // Validate the LUBRICANTEXUEB in the database
        List<LUBRICANTEXUEB> lUBRICANTEXUEBList = lUBRICANTEXUEBRepository.findAll();
        assertThat(lUBRICANTEXUEBList).hasSize(databaseSizeBeforeUpdate);
        LUBRICANTEXUEB testLUBRICANTEXUEB = lUBRICANTEXUEBList.get(lUBRICANTEXUEBList.size() - 1);
        assertThat(testLUBRICANTEXUEB.getCantidadLubricanteUEB()).isEqualTo(UPDATED_CANTIDAD_LUBRICANTE_UEB);
        assertThat(testLUBRICANTEXUEB.getUeb()).isEqualTo(UPDATED_UEB);
    }

    @Test
    @Transactional
    void putNonExistingLUBRICANTEXUEB() throws Exception {
        int databaseSizeBeforeUpdate = lUBRICANTEXUEBRepository.findAll().size();
        lUBRICANTEXUEB.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLUBRICANTEXUEBMockMvc
            .perform(
                put(ENTITY_API_URL_ID, lUBRICANTEXUEB.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(lUBRICANTEXUEB))
            )
            .andExpect(status().isBadRequest());

        // Validate the LUBRICANTEXUEB in the database
        List<LUBRICANTEXUEB> lUBRICANTEXUEBList = lUBRICANTEXUEBRepository.findAll();
        assertThat(lUBRICANTEXUEBList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchLUBRICANTEXUEB() throws Exception {
        int databaseSizeBeforeUpdate = lUBRICANTEXUEBRepository.findAll().size();
        lUBRICANTEXUEB.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLUBRICANTEXUEBMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(lUBRICANTEXUEB))
            )
            .andExpect(status().isBadRequest());

        // Validate the LUBRICANTEXUEB in the database
        List<LUBRICANTEXUEB> lUBRICANTEXUEBList = lUBRICANTEXUEBRepository.findAll();
        assertThat(lUBRICANTEXUEBList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamLUBRICANTEXUEB() throws Exception {
        int databaseSizeBeforeUpdate = lUBRICANTEXUEBRepository.findAll().size();
        lUBRICANTEXUEB.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLUBRICANTEXUEBMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(lUBRICANTEXUEB)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the LUBRICANTEXUEB in the database
        List<LUBRICANTEXUEB> lUBRICANTEXUEBList = lUBRICANTEXUEBRepository.findAll();
        assertThat(lUBRICANTEXUEBList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateLUBRICANTEXUEBWithPatch() throws Exception {
        // Initialize the database
        lUBRICANTEXUEBRepository.saveAndFlush(lUBRICANTEXUEB);

        int databaseSizeBeforeUpdate = lUBRICANTEXUEBRepository.findAll().size();

        // Update the lUBRICANTEXUEB using partial update
        LUBRICANTEXUEB partialUpdatedLUBRICANTEXUEB = new LUBRICANTEXUEB();
        partialUpdatedLUBRICANTEXUEB.setId(lUBRICANTEXUEB.getId());

        restLUBRICANTEXUEBMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLUBRICANTEXUEB.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedLUBRICANTEXUEB))
            )
            .andExpect(status().isOk());

        // Validate the LUBRICANTEXUEB in the database
        List<LUBRICANTEXUEB> lUBRICANTEXUEBList = lUBRICANTEXUEBRepository.findAll();
        assertThat(lUBRICANTEXUEBList).hasSize(databaseSizeBeforeUpdate);
        LUBRICANTEXUEB testLUBRICANTEXUEB = lUBRICANTEXUEBList.get(lUBRICANTEXUEBList.size() - 1);
        assertThat(testLUBRICANTEXUEB.getCantidadLubricanteUEB()).isEqualTo(DEFAULT_CANTIDAD_LUBRICANTE_UEB);
        assertThat(testLUBRICANTEXUEB.getUeb()).isEqualTo(DEFAULT_UEB);
    }

    @Test
    @Transactional
    void fullUpdateLUBRICANTEXUEBWithPatch() throws Exception {
        // Initialize the database
        lUBRICANTEXUEBRepository.saveAndFlush(lUBRICANTEXUEB);

        int databaseSizeBeforeUpdate = lUBRICANTEXUEBRepository.findAll().size();

        // Update the lUBRICANTEXUEB using partial update
        LUBRICANTEXUEB partialUpdatedLUBRICANTEXUEB = new LUBRICANTEXUEB();
        partialUpdatedLUBRICANTEXUEB.setId(lUBRICANTEXUEB.getId());

        partialUpdatedLUBRICANTEXUEB.cantidadLubricanteUEB(UPDATED_CANTIDAD_LUBRICANTE_UEB).ueb(UPDATED_UEB);

        restLUBRICANTEXUEBMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLUBRICANTEXUEB.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedLUBRICANTEXUEB))
            )
            .andExpect(status().isOk());

        // Validate the LUBRICANTEXUEB in the database
        List<LUBRICANTEXUEB> lUBRICANTEXUEBList = lUBRICANTEXUEBRepository.findAll();
        assertThat(lUBRICANTEXUEBList).hasSize(databaseSizeBeforeUpdate);
        LUBRICANTEXUEB testLUBRICANTEXUEB = lUBRICANTEXUEBList.get(lUBRICANTEXUEBList.size() - 1);
        assertThat(testLUBRICANTEXUEB.getCantidadLubricanteUEB()).isEqualTo(UPDATED_CANTIDAD_LUBRICANTE_UEB);
        assertThat(testLUBRICANTEXUEB.getUeb()).isEqualTo(UPDATED_UEB);
    }

    @Test
    @Transactional
    void patchNonExistingLUBRICANTEXUEB() throws Exception {
        int databaseSizeBeforeUpdate = lUBRICANTEXUEBRepository.findAll().size();
        lUBRICANTEXUEB.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLUBRICANTEXUEBMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, lUBRICANTEXUEB.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(lUBRICANTEXUEB))
            )
            .andExpect(status().isBadRequest());

        // Validate the LUBRICANTEXUEB in the database
        List<LUBRICANTEXUEB> lUBRICANTEXUEBList = lUBRICANTEXUEBRepository.findAll();
        assertThat(lUBRICANTEXUEBList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchLUBRICANTEXUEB() throws Exception {
        int databaseSizeBeforeUpdate = lUBRICANTEXUEBRepository.findAll().size();
        lUBRICANTEXUEB.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLUBRICANTEXUEBMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(lUBRICANTEXUEB))
            )
            .andExpect(status().isBadRequest());

        // Validate the LUBRICANTEXUEB in the database
        List<LUBRICANTEXUEB> lUBRICANTEXUEBList = lUBRICANTEXUEBRepository.findAll();
        assertThat(lUBRICANTEXUEBList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamLUBRICANTEXUEB() throws Exception {
        int databaseSizeBeforeUpdate = lUBRICANTEXUEBRepository.findAll().size();
        lUBRICANTEXUEB.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLUBRICANTEXUEBMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(lUBRICANTEXUEB))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the LUBRICANTEXUEB in the database
        List<LUBRICANTEXUEB> lUBRICANTEXUEBList = lUBRICANTEXUEBRepository.findAll();
        assertThat(lUBRICANTEXUEBList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteLUBRICANTEXUEB() throws Exception {
        // Initialize the database
        lUBRICANTEXUEBRepository.saveAndFlush(lUBRICANTEXUEB);

        int databaseSizeBeforeDelete = lUBRICANTEXUEBRepository.findAll().size();

        // Delete the lUBRICANTEXUEB
        restLUBRICANTEXUEBMockMvc
            .perform(delete(ENTITY_API_URL_ID, lUBRICANTEXUEB.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LUBRICANTEXUEB> lUBRICANTEXUEBList = lUBRICANTEXUEBRepository.findAll();
        assertThat(lUBRICANTEXUEBList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
