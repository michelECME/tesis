package com.ecme.com.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.ecme.com.IntegrationTest;
import com.ecme.com.domain.CantidadXUEB;
import com.ecme.com.repository.CantidadXUEBRepository;
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
 * Integration tests for the {@link CantidadXUEBResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CantidadXUEBResourceIT {

    private static final Integer DEFAULT_CANTIDAD_MODELO = 1;
    private static final Integer UPDATED_CANTIDAD_MODELO = 2;

    private static final String DEFAULT_UEB = "AAAAAAAAAA";
    private static final String UPDATED_UEB = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/cantidad-xuebs";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CantidadXUEBRepository cantidadXUEBRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCantidadXUEBMockMvc;

    private CantidadXUEB cantidadXUEB;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CantidadXUEB createEntity(EntityManager em) {
        CantidadXUEB cantidadXUEB = new CantidadXUEB().cantidadModelo(DEFAULT_CANTIDAD_MODELO).ueb(DEFAULT_UEB);
        return cantidadXUEB;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CantidadXUEB createUpdatedEntity(EntityManager em) {
        CantidadXUEB cantidadXUEB = new CantidadXUEB().cantidadModelo(UPDATED_CANTIDAD_MODELO).ueb(UPDATED_UEB);
        return cantidadXUEB;
    }

    @BeforeEach
    public void initTest() {
        cantidadXUEB = createEntity(em);
    }

    @Test
    @Transactional
    void createCantidadXUEB() throws Exception {
        int databaseSizeBeforeCreate = cantidadXUEBRepository.findAll().size();
        // Create the CantidadXUEB
        restCantidadXUEBMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cantidadXUEB)))
            .andExpect(status().isCreated());

        // Validate the CantidadXUEB in the database
        List<CantidadXUEB> cantidadXUEBList = cantidadXUEBRepository.findAll();
        assertThat(cantidadXUEBList).hasSize(databaseSizeBeforeCreate + 1);
        CantidadXUEB testCantidadXUEB = cantidadXUEBList.get(cantidadXUEBList.size() - 1);
        assertThat(testCantidadXUEB.getCantidadModelo()).isEqualTo(DEFAULT_CANTIDAD_MODELO);
        assertThat(testCantidadXUEB.getUeb()).isEqualTo(DEFAULT_UEB);
    }

    @Test
    @Transactional
    void createCantidadXUEBWithExistingId() throws Exception {
        // Create the CantidadXUEB with an existing ID
        cantidadXUEB.setId(1L);

        int databaseSizeBeforeCreate = cantidadXUEBRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCantidadXUEBMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cantidadXUEB)))
            .andExpect(status().isBadRequest());

        // Validate the CantidadXUEB in the database
        List<CantidadXUEB> cantidadXUEBList = cantidadXUEBRepository.findAll();
        assertThat(cantidadXUEBList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllCantidadXUEBS() throws Exception {
        // Initialize the database
        cantidadXUEBRepository.saveAndFlush(cantidadXUEB);

        // Get all the cantidadXUEBList
        restCantidadXUEBMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cantidadXUEB.getId().intValue())))
            .andExpect(jsonPath("$.[*].cantidadModelo").value(hasItem(DEFAULT_CANTIDAD_MODELO)))
            .andExpect(jsonPath("$.[*].ueb").value(hasItem(DEFAULT_UEB)));
    }

    @Test
    @Transactional
    void getCantidadXUEB() throws Exception {
        // Initialize the database
        cantidadXUEBRepository.saveAndFlush(cantidadXUEB);

        // Get the cantidadXUEB
        restCantidadXUEBMockMvc
            .perform(get(ENTITY_API_URL_ID, cantidadXUEB.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cantidadXUEB.getId().intValue()))
            .andExpect(jsonPath("$.cantidadModelo").value(DEFAULT_CANTIDAD_MODELO))
            .andExpect(jsonPath("$.ueb").value(DEFAULT_UEB));
    }

    @Test
    @Transactional
    void getNonExistingCantidadXUEB() throws Exception {
        // Get the cantidadXUEB
        restCantidadXUEBMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCantidadXUEB() throws Exception {
        // Initialize the database
        cantidadXUEBRepository.saveAndFlush(cantidadXUEB);

        int databaseSizeBeforeUpdate = cantidadXUEBRepository.findAll().size();

        // Update the cantidadXUEB
        CantidadXUEB updatedCantidadXUEB = cantidadXUEBRepository.findById(cantidadXUEB.getId()).get();
        // Disconnect from session so that the updates on updatedCantidadXUEB are not directly saved in db
        em.detach(updatedCantidadXUEB);
        updatedCantidadXUEB.cantidadModelo(UPDATED_CANTIDAD_MODELO).ueb(UPDATED_UEB);

        restCantidadXUEBMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCantidadXUEB.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCantidadXUEB))
            )
            .andExpect(status().isOk());

        // Validate the CantidadXUEB in the database
        List<CantidadXUEB> cantidadXUEBList = cantidadXUEBRepository.findAll();
        assertThat(cantidadXUEBList).hasSize(databaseSizeBeforeUpdate);
        CantidadXUEB testCantidadXUEB = cantidadXUEBList.get(cantidadXUEBList.size() - 1);
        assertThat(testCantidadXUEB.getCantidadModelo()).isEqualTo(UPDATED_CANTIDAD_MODELO);
        assertThat(testCantidadXUEB.getUeb()).isEqualTo(UPDATED_UEB);
    }

    @Test
    @Transactional
    void putNonExistingCantidadXUEB() throws Exception {
        int databaseSizeBeforeUpdate = cantidadXUEBRepository.findAll().size();
        cantidadXUEB.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCantidadXUEBMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cantidadXUEB.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cantidadXUEB))
            )
            .andExpect(status().isBadRequest());

        // Validate the CantidadXUEB in the database
        List<CantidadXUEB> cantidadXUEBList = cantidadXUEBRepository.findAll();
        assertThat(cantidadXUEBList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCantidadXUEB() throws Exception {
        int databaseSizeBeforeUpdate = cantidadXUEBRepository.findAll().size();
        cantidadXUEB.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCantidadXUEBMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cantidadXUEB))
            )
            .andExpect(status().isBadRequest());

        // Validate the CantidadXUEB in the database
        List<CantidadXUEB> cantidadXUEBList = cantidadXUEBRepository.findAll();
        assertThat(cantidadXUEBList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCantidadXUEB() throws Exception {
        int databaseSizeBeforeUpdate = cantidadXUEBRepository.findAll().size();
        cantidadXUEB.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCantidadXUEBMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cantidadXUEB)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CantidadXUEB in the database
        List<CantidadXUEB> cantidadXUEBList = cantidadXUEBRepository.findAll();
        assertThat(cantidadXUEBList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCantidadXUEBWithPatch() throws Exception {
        // Initialize the database
        cantidadXUEBRepository.saveAndFlush(cantidadXUEB);

        int databaseSizeBeforeUpdate = cantidadXUEBRepository.findAll().size();

        // Update the cantidadXUEB using partial update
        CantidadXUEB partialUpdatedCantidadXUEB = new CantidadXUEB();
        partialUpdatedCantidadXUEB.setId(cantidadXUEB.getId());

        partialUpdatedCantidadXUEB.cantidadModelo(UPDATED_CANTIDAD_MODELO).ueb(UPDATED_UEB);

        restCantidadXUEBMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCantidadXUEB.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCantidadXUEB))
            )
            .andExpect(status().isOk());

        // Validate the CantidadXUEB in the database
        List<CantidadXUEB> cantidadXUEBList = cantidadXUEBRepository.findAll();
        assertThat(cantidadXUEBList).hasSize(databaseSizeBeforeUpdate);
        CantidadXUEB testCantidadXUEB = cantidadXUEBList.get(cantidadXUEBList.size() - 1);
        assertThat(testCantidadXUEB.getCantidadModelo()).isEqualTo(UPDATED_CANTIDAD_MODELO);
        assertThat(testCantidadXUEB.getUeb()).isEqualTo(UPDATED_UEB);
    }

    @Test
    @Transactional
    void fullUpdateCantidadXUEBWithPatch() throws Exception {
        // Initialize the database
        cantidadXUEBRepository.saveAndFlush(cantidadXUEB);

        int databaseSizeBeforeUpdate = cantidadXUEBRepository.findAll().size();

        // Update the cantidadXUEB using partial update
        CantidadXUEB partialUpdatedCantidadXUEB = new CantidadXUEB();
        partialUpdatedCantidadXUEB.setId(cantidadXUEB.getId());

        partialUpdatedCantidadXUEB.cantidadModelo(UPDATED_CANTIDAD_MODELO).ueb(UPDATED_UEB);

        restCantidadXUEBMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCantidadXUEB.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCantidadXUEB))
            )
            .andExpect(status().isOk());

        // Validate the CantidadXUEB in the database
        List<CantidadXUEB> cantidadXUEBList = cantidadXUEBRepository.findAll();
        assertThat(cantidadXUEBList).hasSize(databaseSizeBeforeUpdate);
        CantidadXUEB testCantidadXUEB = cantidadXUEBList.get(cantidadXUEBList.size() - 1);
        assertThat(testCantidadXUEB.getCantidadModelo()).isEqualTo(UPDATED_CANTIDAD_MODELO);
        assertThat(testCantidadXUEB.getUeb()).isEqualTo(UPDATED_UEB);
    }

    @Test
    @Transactional
    void patchNonExistingCantidadXUEB() throws Exception {
        int databaseSizeBeforeUpdate = cantidadXUEBRepository.findAll().size();
        cantidadXUEB.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCantidadXUEBMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cantidadXUEB.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cantidadXUEB))
            )
            .andExpect(status().isBadRequest());

        // Validate the CantidadXUEB in the database
        List<CantidadXUEB> cantidadXUEBList = cantidadXUEBRepository.findAll();
        assertThat(cantidadXUEBList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCantidadXUEB() throws Exception {
        int databaseSizeBeforeUpdate = cantidadXUEBRepository.findAll().size();
        cantidadXUEB.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCantidadXUEBMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cantidadXUEB))
            )
            .andExpect(status().isBadRequest());

        // Validate the CantidadXUEB in the database
        List<CantidadXUEB> cantidadXUEBList = cantidadXUEBRepository.findAll();
        assertThat(cantidadXUEBList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCantidadXUEB() throws Exception {
        int databaseSizeBeforeUpdate = cantidadXUEBRepository.findAll().size();
        cantidadXUEB.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCantidadXUEBMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(cantidadXUEB))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CantidadXUEB in the database
        List<CantidadXUEB> cantidadXUEBList = cantidadXUEBRepository.findAll();
        assertThat(cantidadXUEBList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCantidadXUEB() throws Exception {
        // Initialize the database
        cantidadXUEBRepository.saveAndFlush(cantidadXUEB);

        int databaseSizeBeforeDelete = cantidadXUEBRepository.findAll().size();

        // Delete the cantidadXUEB
        restCantidadXUEBMockMvc
            .perform(delete(ENTITY_API_URL_ID, cantidadXUEB.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CantidadXUEB> cantidadXUEBList = cantidadXUEBRepository.findAll();
        assertThat(cantidadXUEBList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
