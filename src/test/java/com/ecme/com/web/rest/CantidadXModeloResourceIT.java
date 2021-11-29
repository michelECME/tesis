package com.ecme.com.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.ecme.com.IntegrationTest;
import com.ecme.com.domain.CantidadXModelo;
import com.ecme.com.repository.CantidadXModeloRepository;
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
 * Integration tests for the {@link CantidadXModeloResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CantidadXModeloResourceIT {

    private static final Integer DEFAULT_CANTIDAD_MODELO = 1;
    private static final Integer UPDATED_CANTIDAD_MODELO = 2;

    private static final String DEFAULT_MODELO = "AAAAAAAAAA";
    private static final String UPDATED_MODELO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/cantidad-x-modelos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CantidadXModeloRepository cantidadXModeloRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCantidadXModeloMockMvc;

    private CantidadXModelo cantidadXModelo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CantidadXModelo createEntity(EntityManager em) {
        CantidadXModelo cantidadXModelo = new CantidadXModelo().cantidadModelo(DEFAULT_CANTIDAD_MODELO).modelo(DEFAULT_MODELO);
        return cantidadXModelo;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CantidadXModelo createUpdatedEntity(EntityManager em) {
        CantidadXModelo cantidadXModelo = new CantidadXModelo().cantidadModelo(UPDATED_CANTIDAD_MODELO).modelo(UPDATED_MODELO);
        return cantidadXModelo;
    }

    @BeforeEach
    public void initTest() {
        cantidadXModelo = createEntity(em);
    }

    @Test
    @Transactional
    void createCantidadXModelo() throws Exception {
        int databaseSizeBeforeCreate = cantidadXModeloRepository.findAll().size();
        // Create the CantidadXModelo
        restCantidadXModeloMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cantidadXModelo))
            )
            .andExpect(status().isCreated());

        // Validate the CantidadXModelo in the database
        List<CantidadXModelo> cantidadXModeloList = cantidadXModeloRepository.findAll();
        assertThat(cantidadXModeloList).hasSize(databaseSizeBeforeCreate + 1);
        CantidadXModelo testCantidadXModelo = cantidadXModeloList.get(cantidadXModeloList.size() - 1);
        assertThat(testCantidadXModelo.getCantidadModelo()).isEqualTo(DEFAULT_CANTIDAD_MODELO);
        assertThat(testCantidadXModelo.getModelo()).isEqualTo(DEFAULT_MODELO);
    }

    @Test
    @Transactional
    void createCantidadXModeloWithExistingId() throws Exception {
        // Create the CantidadXModelo with an existing ID
        cantidadXModelo.setId(1L);

        int databaseSizeBeforeCreate = cantidadXModeloRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCantidadXModeloMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cantidadXModelo))
            )
            .andExpect(status().isBadRequest());

        // Validate the CantidadXModelo in the database
        List<CantidadXModelo> cantidadXModeloList = cantidadXModeloRepository.findAll();
        assertThat(cantidadXModeloList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllCantidadXModelos() throws Exception {
        // Initialize the database
        cantidadXModeloRepository.saveAndFlush(cantidadXModelo);

        // Get all the cantidadXModeloList
        restCantidadXModeloMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cantidadXModelo.getId().intValue())))
            .andExpect(jsonPath("$.[*].cantidadModelo").value(hasItem(DEFAULT_CANTIDAD_MODELO)))
            .andExpect(jsonPath("$.[*].modelo").value(hasItem(DEFAULT_MODELO)));
    }

    @Test
    @Transactional
    void getCantidadXModelo() throws Exception {
        // Initialize the database
        cantidadXModeloRepository.saveAndFlush(cantidadXModelo);

        // Get the cantidadXModelo
        restCantidadXModeloMockMvc
            .perform(get(ENTITY_API_URL_ID, cantidadXModelo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cantidadXModelo.getId().intValue()))
            .andExpect(jsonPath("$.cantidadModelo").value(DEFAULT_CANTIDAD_MODELO))
            .andExpect(jsonPath("$.modelo").value(DEFAULT_MODELO));
    }

    @Test
    @Transactional
    void getNonExistingCantidadXModelo() throws Exception {
        // Get the cantidadXModelo
        restCantidadXModeloMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCantidadXModelo() throws Exception {
        // Initialize the database
        cantidadXModeloRepository.saveAndFlush(cantidadXModelo);

        int databaseSizeBeforeUpdate = cantidadXModeloRepository.findAll().size();

        // Update the cantidadXModelo
        CantidadXModelo updatedCantidadXModelo = cantidadXModeloRepository.findById(cantidadXModelo.getId()).get();
        // Disconnect from session so that the updates on updatedCantidadXModelo are not directly saved in db
        em.detach(updatedCantidadXModelo);
        updatedCantidadXModelo.cantidadModelo(UPDATED_CANTIDAD_MODELO).modelo(UPDATED_MODELO);

        restCantidadXModeloMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCantidadXModelo.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCantidadXModelo))
            )
            .andExpect(status().isOk());

        // Validate the CantidadXModelo in the database
        List<CantidadXModelo> cantidadXModeloList = cantidadXModeloRepository.findAll();
        assertThat(cantidadXModeloList).hasSize(databaseSizeBeforeUpdate);
        CantidadXModelo testCantidadXModelo = cantidadXModeloList.get(cantidadXModeloList.size() - 1);
        assertThat(testCantidadXModelo.getCantidadModelo()).isEqualTo(UPDATED_CANTIDAD_MODELO);
        assertThat(testCantidadXModelo.getModelo()).isEqualTo(UPDATED_MODELO);
    }

    @Test
    @Transactional
    void putNonExistingCantidadXModelo() throws Exception {
        int databaseSizeBeforeUpdate = cantidadXModeloRepository.findAll().size();
        cantidadXModelo.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCantidadXModeloMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cantidadXModelo.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cantidadXModelo))
            )
            .andExpect(status().isBadRequest());

        // Validate the CantidadXModelo in the database
        List<CantidadXModelo> cantidadXModeloList = cantidadXModeloRepository.findAll();
        assertThat(cantidadXModeloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCantidadXModelo() throws Exception {
        int databaseSizeBeforeUpdate = cantidadXModeloRepository.findAll().size();
        cantidadXModelo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCantidadXModeloMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cantidadXModelo))
            )
            .andExpect(status().isBadRequest());

        // Validate the CantidadXModelo in the database
        List<CantidadXModelo> cantidadXModeloList = cantidadXModeloRepository.findAll();
        assertThat(cantidadXModeloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCantidadXModelo() throws Exception {
        int databaseSizeBeforeUpdate = cantidadXModeloRepository.findAll().size();
        cantidadXModelo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCantidadXModeloMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cantidadXModelo))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CantidadXModelo in the database
        List<CantidadXModelo> cantidadXModeloList = cantidadXModeloRepository.findAll();
        assertThat(cantidadXModeloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCantidadXModeloWithPatch() throws Exception {
        // Initialize the database
        cantidadXModeloRepository.saveAndFlush(cantidadXModelo);

        int databaseSizeBeforeUpdate = cantidadXModeloRepository.findAll().size();

        // Update the cantidadXModelo using partial update
        CantidadXModelo partialUpdatedCantidadXModelo = new CantidadXModelo();
        partialUpdatedCantidadXModelo.setId(cantidadXModelo.getId());

        restCantidadXModeloMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCantidadXModelo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCantidadXModelo))
            )
            .andExpect(status().isOk());

        // Validate the CantidadXModelo in the database
        List<CantidadXModelo> cantidadXModeloList = cantidadXModeloRepository.findAll();
        assertThat(cantidadXModeloList).hasSize(databaseSizeBeforeUpdate);
        CantidadXModelo testCantidadXModelo = cantidadXModeloList.get(cantidadXModeloList.size() - 1);
        assertThat(testCantidadXModelo.getCantidadModelo()).isEqualTo(DEFAULT_CANTIDAD_MODELO);
        assertThat(testCantidadXModelo.getModelo()).isEqualTo(DEFAULT_MODELO);
    }

    @Test
    @Transactional
    void fullUpdateCantidadXModeloWithPatch() throws Exception {
        // Initialize the database
        cantidadXModeloRepository.saveAndFlush(cantidadXModelo);

        int databaseSizeBeforeUpdate = cantidadXModeloRepository.findAll().size();

        // Update the cantidadXModelo using partial update
        CantidadXModelo partialUpdatedCantidadXModelo = new CantidadXModelo();
        partialUpdatedCantidadXModelo.setId(cantidadXModelo.getId());

        partialUpdatedCantidadXModelo.cantidadModelo(UPDATED_CANTIDAD_MODELO).modelo(UPDATED_MODELO);

        restCantidadXModeloMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCantidadXModelo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCantidadXModelo))
            )
            .andExpect(status().isOk());

        // Validate the CantidadXModelo in the database
        List<CantidadXModelo> cantidadXModeloList = cantidadXModeloRepository.findAll();
        assertThat(cantidadXModeloList).hasSize(databaseSizeBeforeUpdate);
        CantidadXModelo testCantidadXModelo = cantidadXModeloList.get(cantidadXModeloList.size() - 1);
        assertThat(testCantidadXModelo.getCantidadModelo()).isEqualTo(UPDATED_CANTIDAD_MODELO);
        assertThat(testCantidadXModelo.getModelo()).isEqualTo(UPDATED_MODELO);
    }

    @Test
    @Transactional
    void patchNonExistingCantidadXModelo() throws Exception {
        int databaseSizeBeforeUpdate = cantidadXModeloRepository.findAll().size();
        cantidadXModelo.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCantidadXModeloMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cantidadXModelo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cantidadXModelo))
            )
            .andExpect(status().isBadRequest());

        // Validate the CantidadXModelo in the database
        List<CantidadXModelo> cantidadXModeloList = cantidadXModeloRepository.findAll();
        assertThat(cantidadXModeloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCantidadXModelo() throws Exception {
        int databaseSizeBeforeUpdate = cantidadXModeloRepository.findAll().size();
        cantidadXModelo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCantidadXModeloMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cantidadXModelo))
            )
            .andExpect(status().isBadRequest());

        // Validate the CantidadXModelo in the database
        List<CantidadXModelo> cantidadXModeloList = cantidadXModeloRepository.findAll();
        assertThat(cantidadXModeloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCantidadXModelo() throws Exception {
        int databaseSizeBeforeUpdate = cantidadXModeloRepository.findAll().size();
        cantidadXModelo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCantidadXModeloMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cantidadXModelo))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CantidadXModelo in the database
        List<CantidadXModelo> cantidadXModeloList = cantidadXModeloRepository.findAll();
        assertThat(cantidadXModeloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCantidadXModelo() throws Exception {
        // Initialize the database
        cantidadXModeloRepository.saveAndFlush(cantidadXModelo);

        int databaseSizeBeforeDelete = cantidadXModeloRepository.findAll().size();

        // Delete the cantidadXModelo
        restCantidadXModeloMockMvc
            .perform(delete(ENTITY_API_URL_ID, cantidadXModelo.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CantidadXModelo> cantidadXModeloList = cantidadXModeloRepository.findAll();
        assertThat(cantidadXModeloList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
