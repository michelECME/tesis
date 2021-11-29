package com.ecme.com.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.ecme.com.IntegrationTest;
import com.ecme.com.domain.COMBUSTIBLEXUEB;
import com.ecme.com.repository.COMBUSTIBLEXUEBRepository;
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
 * Integration tests for the {@link COMBUSTIBLEXUEBResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class COMBUSTIBLEXUEBResourceIT {

    private static final Integer DEFAULT_CANTIDAD_COMBUSTIBLE_UEB = 1;
    private static final Integer UPDATED_CANTIDAD_COMBUSTIBLE_UEB = 2;

    private static final String DEFAULT_UEB = "AAAAAAAAAA";
    private static final String UPDATED_UEB = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/combustiblexuebs";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private COMBUSTIBLEXUEBRepository cOMBUSTIBLEXUEBRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCOMBUSTIBLEXUEBMockMvc;

    private COMBUSTIBLEXUEB cOMBUSTIBLEXUEB;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static COMBUSTIBLEXUEB createEntity(EntityManager em) {
        COMBUSTIBLEXUEB cOMBUSTIBLEXUEB = new COMBUSTIBLEXUEB().cantidadCombustibleUEB(DEFAULT_CANTIDAD_COMBUSTIBLE_UEB).ueb(DEFAULT_UEB);
        return cOMBUSTIBLEXUEB;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static COMBUSTIBLEXUEB createUpdatedEntity(EntityManager em) {
        COMBUSTIBLEXUEB cOMBUSTIBLEXUEB = new COMBUSTIBLEXUEB().cantidadCombustibleUEB(UPDATED_CANTIDAD_COMBUSTIBLE_UEB).ueb(UPDATED_UEB);
        return cOMBUSTIBLEXUEB;
    }

    @BeforeEach
    public void initTest() {
        cOMBUSTIBLEXUEB = createEntity(em);
    }

    @Test
    @Transactional
    void createCOMBUSTIBLEXUEB() throws Exception {
        int databaseSizeBeforeCreate = cOMBUSTIBLEXUEBRepository.findAll().size();
        // Create the COMBUSTIBLEXUEB
        restCOMBUSTIBLEXUEBMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cOMBUSTIBLEXUEB))
            )
            .andExpect(status().isCreated());

        // Validate the COMBUSTIBLEXUEB in the database
        List<COMBUSTIBLEXUEB> cOMBUSTIBLEXUEBList = cOMBUSTIBLEXUEBRepository.findAll();
        assertThat(cOMBUSTIBLEXUEBList).hasSize(databaseSizeBeforeCreate + 1);
        COMBUSTIBLEXUEB testCOMBUSTIBLEXUEB = cOMBUSTIBLEXUEBList.get(cOMBUSTIBLEXUEBList.size() - 1);
        assertThat(testCOMBUSTIBLEXUEB.getCantidadCombustibleUEB()).isEqualTo(DEFAULT_CANTIDAD_COMBUSTIBLE_UEB);
        assertThat(testCOMBUSTIBLEXUEB.getUeb()).isEqualTo(DEFAULT_UEB);
    }

    @Test
    @Transactional
    void createCOMBUSTIBLEXUEBWithExistingId() throws Exception {
        // Create the COMBUSTIBLEXUEB with an existing ID
        cOMBUSTIBLEXUEB.setId(1L);

        int databaseSizeBeforeCreate = cOMBUSTIBLEXUEBRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCOMBUSTIBLEXUEBMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cOMBUSTIBLEXUEB))
            )
            .andExpect(status().isBadRequest());

        // Validate the COMBUSTIBLEXUEB in the database
        List<COMBUSTIBLEXUEB> cOMBUSTIBLEXUEBList = cOMBUSTIBLEXUEBRepository.findAll();
        assertThat(cOMBUSTIBLEXUEBList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllCOMBUSTIBLEXUEBS() throws Exception {
        // Initialize the database
        cOMBUSTIBLEXUEBRepository.saveAndFlush(cOMBUSTIBLEXUEB);

        // Get all the cOMBUSTIBLEXUEBList
        restCOMBUSTIBLEXUEBMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cOMBUSTIBLEXUEB.getId().intValue())))
            .andExpect(jsonPath("$.[*].cantidadCombustibleUEB").value(hasItem(DEFAULT_CANTIDAD_COMBUSTIBLE_UEB)))
            .andExpect(jsonPath("$.[*].ueb").value(hasItem(DEFAULT_UEB)));
    }

    @Test
    @Transactional
    void getCOMBUSTIBLEXUEB() throws Exception {
        // Initialize the database
        cOMBUSTIBLEXUEBRepository.saveAndFlush(cOMBUSTIBLEXUEB);

        // Get the cOMBUSTIBLEXUEB
        restCOMBUSTIBLEXUEBMockMvc
            .perform(get(ENTITY_API_URL_ID, cOMBUSTIBLEXUEB.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cOMBUSTIBLEXUEB.getId().intValue()))
            .andExpect(jsonPath("$.cantidadCombustibleUEB").value(DEFAULT_CANTIDAD_COMBUSTIBLE_UEB))
            .andExpect(jsonPath("$.ueb").value(DEFAULT_UEB));
    }

    @Test
    @Transactional
    void getNonExistingCOMBUSTIBLEXUEB() throws Exception {
        // Get the cOMBUSTIBLEXUEB
        restCOMBUSTIBLEXUEBMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCOMBUSTIBLEXUEB() throws Exception {
        // Initialize the database
        cOMBUSTIBLEXUEBRepository.saveAndFlush(cOMBUSTIBLEXUEB);

        int databaseSizeBeforeUpdate = cOMBUSTIBLEXUEBRepository.findAll().size();

        // Update the cOMBUSTIBLEXUEB
        COMBUSTIBLEXUEB updatedCOMBUSTIBLEXUEB = cOMBUSTIBLEXUEBRepository.findById(cOMBUSTIBLEXUEB.getId()).get();
        // Disconnect from session so that the updates on updatedCOMBUSTIBLEXUEB are not directly saved in db
        em.detach(updatedCOMBUSTIBLEXUEB);
        updatedCOMBUSTIBLEXUEB.cantidadCombustibleUEB(UPDATED_CANTIDAD_COMBUSTIBLE_UEB).ueb(UPDATED_UEB);

        restCOMBUSTIBLEXUEBMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCOMBUSTIBLEXUEB.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCOMBUSTIBLEXUEB))
            )
            .andExpect(status().isOk());

        // Validate the COMBUSTIBLEXUEB in the database
        List<COMBUSTIBLEXUEB> cOMBUSTIBLEXUEBList = cOMBUSTIBLEXUEBRepository.findAll();
        assertThat(cOMBUSTIBLEXUEBList).hasSize(databaseSizeBeforeUpdate);
        COMBUSTIBLEXUEB testCOMBUSTIBLEXUEB = cOMBUSTIBLEXUEBList.get(cOMBUSTIBLEXUEBList.size() - 1);
        assertThat(testCOMBUSTIBLEXUEB.getCantidadCombustibleUEB()).isEqualTo(UPDATED_CANTIDAD_COMBUSTIBLE_UEB);
        assertThat(testCOMBUSTIBLEXUEB.getUeb()).isEqualTo(UPDATED_UEB);
    }

    @Test
    @Transactional
    void putNonExistingCOMBUSTIBLEXUEB() throws Exception {
        int databaseSizeBeforeUpdate = cOMBUSTIBLEXUEBRepository.findAll().size();
        cOMBUSTIBLEXUEB.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCOMBUSTIBLEXUEBMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cOMBUSTIBLEXUEB.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cOMBUSTIBLEXUEB))
            )
            .andExpect(status().isBadRequest());

        // Validate the COMBUSTIBLEXUEB in the database
        List<COMBUSTIBLEXUEB> cOMBUSTIBLEXUEBList = cOMBUSTIBLEXUEBRepository.findAll();
        assertThat(cOMBUSTIBLEXUEBList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCOMBUSTIBLEXUEB() throws Exception {
        int databaseSizeBeforeUpdate = cOMBUSTIBLEXUEBRepository.findAll().size();
        cOMBUSTIBLEXUEB.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCOMBUSTIBLEXUEBMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cOMBUSTIBLEXUEB))
            )
            .andExpect(status().isBadRequest());

        // Validate the COMBUSTIBLEXUEB in the database
        List<COMBUSTIBLEXUEB> cOMBUSTIBLEXUEBList = cOMBUSTIBLEXUEBRepository.findAll();
        assertThat(cOMBUSTIBLEXUEBList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCOMBUSTIBLEXUEB() throws Exception {
        int databaseSizeBeforeUpdate = cOMBUSTIBLEXUEBRepository.findAll().size();
        cOMBUSTIBLEXUEB.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCOMBUSTIBLEXUEBMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cOMBUSTIBLEXUEB))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the COMBUSTIBLEXUEB in the database
        List<COMBUSTIBLEXUEB> cOMBUSTIBLEXUEBList = cOMBUSTIBLEXUEBRepository.findAll();
        assertThat(cOMBUSTIBLEXUEBList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCOMBUSTIBLEXUEBWithPatch() throws Exception {
        // Initialize the database
        cOMBUSTIBLEXUEBRepository.saveAndFlush(cOMBUSTIBLEXUEB);

        int databaseSizeBeforeUpdate = cOMBUSTIBLEXUEBRepository.findAll().size();

        // Update the cOMBUSTIBLEXUEB using partial update
        COMBUSTIBLEXUEB partialUpdatedCOMBUSTIBLEXUEB = new COMBUSTIBLEXUEB();
        partialUpdatedCOMBUSTIBLEXUEB.setId(cOMBUSTIBLEXUEB.getId());

        partialUpdatedCOMBUSTIBLEXUEB.ueb(UPDATED_UEB);

        restCOMBUSTIBLEXUEBMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCOMBUSTIBLEXUEB.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCOMBUSTIBLEXUEB))
            )
            .andExpect(status().isOk());

        // Validate the COMBUSTIBLEXUEB in the database
        List<COMBUSTIBLEXUEB> cOMBUSTIBLEXUEBList = cOMBUSTIBLEXUEBRepository.findAll();
        assertThat(cOMBUSTIBLEXUEBList).hasSize(databaseSizeBeforeUpdate);
        COMBUSTIBLEXUEB testCOMBUSTIBLEXUEB = cOMBUSTIBLEXUEBList.get(cOMBUSTIBLEXUEBList.size() - 1);
        assertThat(testCOMBUSTIBLEXUEB.getCantidadCombustibleUEB()).isEqualTo(DEFAULT_CANTIDAD_COMBUSTIBLE_UEB);
        assertThat(testCOMBUSTIBLEXUEB.getUeb()).isEqualTo(UPDATED_UEB);
    }

    @Test
    @Transactional
    void fullUpdateCOMBUSTIBLEXUEBWithPatch() throws Exception {
        // Initialize the database
        cOMBUSTIBLEXUEBRepository.saveAndFlush(cOMBUSTIBLEXUEB);

        int databaseSizeBeforeUpdate = cOMBUSTIBLEXUEBRepository.findAll().size();

        // Update the cOMBUSTIBLEXUEB using partial update
        COMBUSTIBLEXUEB partialUpdatedCOMBUSTIBLEXUEB = new COMBUSTIBLEXUEB();
        partialUpdatedCOMBUSTIBLEXUEB.setId(cOMBUSTIBLEXUEB.getId());

        partialUpdatedCOMBUSTIBLEXUEB.cantidadCombustibleUEB(UPDATED_CANTIDAD_COMBUSTIBLE_UEB).ueb(UPDATED_UEB);

        restCOMBUSTIBLEXUEBMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCOMBUSTIBLEXUEB.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCOMBUSTIBLEXUEB))
            )
            .andExpect(status().isOk());

        // Validate the COMBUSTIBLEXUEB in the database
        List<COMBUSTIBLEXUEB> cOMBUSTIBLEXUEBList = cOMBUSTIBLEXUEBRepository.findAll();
        assertThat(cOMBUSTIBLEXUEBList).hasSize(databaseSizeBeforeUpdate);
        COMBUSTIBLEXUEB testCOMBUSTIBLEXUEB = cOMBUSTIBLEXUEBList.get(cOMBUSTIBLEXUEBList.size() - 1);
        assertThat(testCOMBUSTIBLEXUEB.getCantidadCombustibleUEB()).isEqualTo(UPDATED_CANTIDAD_COMBUSTIBLE_UEB);
        assertThat(testCOMBUSTIBLEXUEB.getUeb()).isEqualTo(UPDATED_UEB);
    }

    @Test
    @Transactional
    void patchNonExistingCOMBUSTIBLEXUEB() throws Exception {
        int databaseSizeBeforeUpdate = cOMBUSTIBLEXUEBRepository.findAll().size();
        cOMBUSTIBLEXUEB.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCOMBUSTIBLEXUEBMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cOMBUSTIBLEXUEB.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cOMBUSTIBLEXUEB))
            )
            .andExpect(status().isBadRequest());

        // Validate the COMBUSTIBLEXUEB in the database
        List<COMBUSTIBLEXUEB> cOMBUSTIBLEXUEBList = cOMBUSTIBLEXUEBRepository.findAll();
        assertThat(cOMBUSTIBLEXUEBList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCOMBUSTIBLEXUEB() throws Exception {
        int databaseSizeBeforeUpdate = cOMBUSTIBLEXUEBRepository.findAll().size();
        cOMBUSTIBLEXUEB.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCOMBUSTIBLEXUEBMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cOMBUSTIBLEXUEB))
            )
            .andExpect(status().isBadRequest());

        // Validate the COMBUSTIBLEXUEB in the database
        List<COMBUSTIBLEXUEB> cOMBUSTIBLEXUEBList = cOMBUSTIBLEXUEBRepository.findAll();
        assertThat(cOMBUSTIBLEXUEBList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCOMBUSTIBLEXUEB() throws Exception {
        int databaseSizeBeforeUpdate = cOMBUSTIBLEXUEBRepository.findAll().size();
        cOMBUSTIBLEXUEB.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCOMBUSTIBLEXUEBMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cOMBUSTIBLEXUEB))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the COMBUSTIBLEXUEB in the database
        List<COMBUSTIBLEXUEB> cOMBUSTIBLEXUEBList = cOMBUSTIBLEXUEBRepository.findAll();
        assertThat(cOMBUSTIBLEXUEBList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCOMBUSTIBLEXUEB() throws Exception {
        // Initialize the database
        cOMBUSTIBLEXUEBRepository.saveAndFlush(cOMBUSTIBLEXUEB);

        int databaseSizeBeforeDelete = cOMBUSTIBLEXUEBRepository.findAll().size();

        // Delete the cOMBUSTIBLEXUEB
        restCOMBUSTIBLEXUEBMockMvc
            .perform(delete(ENTITY_API_URL_ID, cOMBUSTIBLEXUEB.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<COMBUSTIBLEXUEB> cOMBUSTIBLEXUEBList = cOMBUSTIBLEXUEBRepository.findAll();
        assertThat(cOMBUSTIBLEXUEBList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
