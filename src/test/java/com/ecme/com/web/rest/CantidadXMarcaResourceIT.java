package com.ecme.com.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.ecme.com.IntegrationTest;
import com.ecme.com.domain.CantidadXMarca;
import com.ecme.com.repository.CantidadXMarcaRepository;
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
 * Integration tests for the {@link CantidadXMarcaResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CantidadXMarcaResourceIT {

    private static final Integer DEFAULT_CANTIDAD_MARCA = 1;
    private static final Integer UPDATED_CANTIDAD_MARCA = 2;

    private static final String DEFAULT_MODELO = "AAAAAAAAAA";
    private static final String UPDATED_MODELO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/cantidad-x-marcas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CantidadXMarcaRepository cantidadXMarcaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCantidadXMarcaMockMvc;

    private CantidadXMarca cantidadXMarca;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CantidadXMarca createEntity(EntityManager em) {
        CantidadXMarca cantidadXMarca = new CantidadXMarca().cantidadMarca(DEFAULT_CANTIDAD_MARCA).modelo(DEFAULT_MODELO);
        return cantidadXMarca;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CantidadXMarca createUpdatedEntity(EntityManager em) {
        CantidadXMarca cantidadXMarca = new CantidadXMarca().cantidadMarca(UPDATED_CANTIDAD_MARCA).modelo(UPDATED_MODELO);
        return cantidadXMarca;
    }

    @BeforeEach
    public void initTest() {
        cantidadXMarca = createEntity(em);
    }

    @Test
    @Transactional
    void createCantidadXMarca() throws Exception {
        int databaseSizeBeforeCreate = cantidadXMarcaRepository.findAll().size();
        // Create the CantidadXMarca
        restCantidadXMarcaMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cantidadXMarca))
            )
            .andExpect(status().isCreated());

        // Validate the CantidadXMarca in the database
        List<CantidadXMarca> cantidadXMarcaList = cantidadXMarcaRepository.findAll();
        assertThat(cantidadXMarcaList).hasSize(databaseSizeBeforeCreate + 1);
        CantidadXMarca testCantidadXMarca = cantidadXMarcaList.get(cantidadXMarcaList.size() - 1);
        assertThat(testCantidadXMarca.getCantidadMarca()).isEqualTo(DEFAULT_CANTIDAD_MARCA);
        assertThat(testCantidadXMarca.getModelo()).isEqualTo(DEFAULT_MODELO);
    }

    @Test
    @Transactional
    void createCantidadXMarcaWithExistingId() throws Exception {
        // Create the CantidadXMarca with an existing ID
        cantidadXMarca.setId(1L);

        int databaseSizeBeforeCreate = cantidadXMarcaRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCantidadXMarcaMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cantidadXMarca))
            )
            .andExpect(status().isBadRequest());

        // Validate the CantidadXMarca in the database
        List<CantidadXMarca> cantidadXMarcaList = cantidadXMarcaRepository.findAll();
        assertThat(cantidadXMarcaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllCantidadXMarcas() throws Exception {
        // Initialize the database
        cantidadXMarcaRepository.saveAndFlush(cantidadXMarca);

        // Get all the cantidadXMarcaList
        restCantidadXMarcaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cantidadXMarca.getId().intValue())))
            .andExpect(jsonPath("$.[*].cantidadMarca").value(hasItem(DEFAULT_CANTIDAD_MARCA)))
            .andExpect(jsonPath("$.[*].modelo").value(hasItem(DEFAULT_MODELO)));
    }

    @Test
    @Transactional
    void getCantidadXMarca() throws Exception {
        // Initialize the database
        cantidadXMarcaRepository.saveAndFlush(cantidadXMarca);

        // Get the cantidadXMarca
        restCantidadXMarcaMockMvc
            .perform(get(ENTITY_API_URL_ID, cantidadXMarca.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cantidadXMarca.getId().intValue()))
            .andExpect(jsonPath("$.cantidadMarca").value(DEFAULT_CANTIDAD_MARCA))
            .andExpect(jsonPath("$.modelo").value(DEFAULT_MODELO));
    }

    @Test
    @Transactional
    void getNonExistingCantidadXMarca() throws Exception {
        // Get the cantidadXMarca
        restCantidadXMarcaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCantidadXMarca() throws Exception {
        // Initialize the database
        cantidadXMarcaRepository.saveAndFlush(cantidadXMarca);

        int databaseSizeBeforeUpdate = cantidadXMarcaRepository.findAll().size();

        // Update the cantidadXMarca
        CantidadXMarca updatedCantidadXMarca = cantidadXMarcaRepository.findById(cantidadXMarca.getId()).get();
        // Disconnect from session so that the updates on updatedCantidadXMarca are not directly saved in db
        em.detach(updatedCantidadXMarca);
        updatedCantidadXMarca.cantidadMarca(UPDATED_CANTIDAD_MARCA).modelo(UPDATED_MODELO);

        restCantidadXMarcaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCantidadXMarca.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCantidadXMarca))
            )
            .andExpect(status().isOk());

        // Validate the CantidadXMarca in the database
        List<CantidadXMarca> cantidadXMarcaList = cantidadXMarcaRepository.findAll();
        assertThat(cantidadXMarcaList).hasSize(databaseSizeBeforeUpdate);
        CantidadXMarca testCantidadXMarca = cantidadXMarcaList.get(cantidadXMarcaList.size() - 1);
        assertThat(testCantidadXMarca.getCantidadMarca()).isEqualTo(UPDATED_CANTIDAD_MARCA);
        assertThat(testCantidadXMarca.getModelo()).isEqualTo(UPDATED_MODELO);
    }

    @Test
    @Transactional
    void putNonExistingCantidadXMarca() throws Exception {
        int databaseSizeBeforeUpdate = cantidadXMarcaRepository.findAll().size();
        cantidadXMarca.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCantidadXMarcaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cantidadXMarca.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cantidadXMarca))
            )
            .andExpect(status().isBadRequest());

        // Validate the CantidadXMarca in the database
        List<CantidadXMarca> cantidadXMarcaList = cantidadXMarcaRepository.findAll();
        assertThat(cantidadXMarcaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCantidadXMarca() throws Exception {
        int databaseSizeBeforeUpdate = cantidadXMarcaRepository.findAll().size();
        cantidadXMarca.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCantidadXMarcaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cantidadXMarca))
            )
            .andExpect(status().isBadRequest());

        // Validate the CantidadXMarca in the database
        List<CantidadXMarca> cantidadXMarcaList = cantidadXMarcaRepository.findAll();
        assertThat(cantidadXMarcaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCantidadXMarca() throws Exception {
        int databaseSizeBeforeUpdate = cantidadXMarcaRepository.findAll().size();
        cantidadXMarca.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCantidadXMarcaMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cantidadXMarca)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CantidadXMarca in the database
        List<CantidadXMarca> cantidadXMarcaList = cantidadXMarcaRepository.findAll();
        assertThat(cantidadXMarcaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCantidadXMarcaWithPatch() throws Exception {
        // Initialize the database
        cantidadXMarcaRepository.saveAndFlush(cantidadXMarca);

        int databaseSizeBeforeUpdate = cantidadXMarcaRepository.findAll().size();

        // Update the cantidadXMarca using partial update
        CantidadXMarca partialUpdatedCantidadXMarca = new CantidadXMarca();
        partialUpdatedCantidadXMarca.setId(cantidadXMarca.getId());

        partialUpdatedCantidadXMarca.cantidadMarca(UPDATED_CANTIDAD_MARCA).modelo(UPDATED_MODELO);

        restCantidadXMarcaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCantidadXMarca.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCantidadXMarca))
            )
            .andExpect(status().isOk());

        // Validate the CantidadXMarca in the database
        List<CantidadXMarca> cantidadXMarcaList = cantidadXMarcaRepository.findAll();
        assertThat(cantidadXMarcaList).hasSize(databaseSizeBeforeUpdate);
        CantidadXMarca testCantidadXMarca = cantidadXMarcaList.get(cantidadXMarcaList.size() - 1);
        assertThat(testCantidadXMarca.getCantidadMarca()).isEqualTo(UPDATED_CANTIDAD_MARCA);
        assertThat(testCantidadXMarca.getModelo()).isEqualTo(UPDATED_MODELO);
    }

    @Test
    @Transactional
    void fullUpdateCantidadXMarcaWithPatch() throws Exception {
        // Initialize the database
        cantidadXMarcaRepository.saveAndFlush(cantidadXMarca);

        int databaseSizeBeforeUpdate = cantidadXMarcaRepository.findAll().size();

        // Update the cantidadXMarca using partial update
        CantidadXMarca partialUpdatedCantidadXMarca = new CantidadXMarca();
        partialUpdatedCantidadXMarca.setId(cantidadXMarca.getId());

        partialUpdatedCantidadXMarca.cantidadMarca(UPDATED_CANTIDAD_MARCA).modelo(UPDATED_MODELO);

        restCantidadXMarcaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCantidadXMarca.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCantidadXMarca))
            )
            .andExpect(status().isOk());

        // Validate the CantidadXMarca in the database
        List<CantidadXMarca> cantidadXMarcaList = cantidadXMarcaRepository.findAll();
        assertThat(cantidadXMarcaList).hasSize(databaseSizeBeforeUpdate);
        CantidadXMarca testCantidadXMarca = cantidadXMarcaList.get(cantidadXMarcaList.size() - 1);
        assertThat(testCantidadXMarca.getCantidadMarca()).isEqualTo(UPDATED_CANTIDAD_MARCA);
        assertThat(testCantidadXMarca.getModelo()).isEqualTo(UPDATED_MODELO);
    }

    @Test
    @Transactional
    void patchNonExistingCantidadXMarca() throws Exception {
        int databaseSizeBeforeUpdate = cantidadXMarcaRepository.findAll().size();
        cantidadXMarca.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCantidadXMarcaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cantidadXMarca.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cantidadXMarca))
            )
            .andExpect(status().isBadRequest());

        // Validate the CantidadXMarca in the database
        List<CantidadXMarca> cantidadXMarcaList = cantidadXMarcaRepository.findAll();
        assertThat(cantidadXMarcaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCantidadXMarca() throws Exception {
        int databaseSizeBeforeUpdate = cantidadXMarcaRepository.findAll().size();
        cantidadXMarca.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCantidadXMarcaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cantidadXMarca))
            )
            .andExpect(status().isBadRequest());

        // Validate the CantidadXMarca in the database
        List<CantidadXMarca> cantidadXMarcaList = cantidadXMarcaRepository.findAll();
        assertThat(cantidadXMarcaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCantidadXMarca() throws Exception {
        int databaseSizeBeforeUpdate = cantidadXMarcaRepository.findAll().size();
        cantidadXMarca.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCantidadXMarcaMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(cantidadXMarca))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CantidadXMarca in the database
        List<CantidadXMarca> cantidadXMarcaList = cantidadXMarcaRepository.findAll();
        assertThat(cantidadXMarcaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCantidadXMarca() throws Exception {
        // Initialize the database
        cantidadXMarcaRepository.saveAndFlush(cantidadXMarca);

        int databaseSizeBeforeDelete = cantidadXMarcaRepository.findAll().size();

        // Delete the cantidadXMarca
        restCantidadXMarcaMockMvc
            .perform(delete(ENTITY_API_URL_ID, cantidadXMarca.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CantidadXMarca> cantidadXMarcaList = cantidadXMarcaRepository.findAll();
        assertThat(cantidadXMarcaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
