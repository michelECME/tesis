package com.ecme.com.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.ecme.com.IntegrationTest;
import com.ecme.com.domain.ENTREGAXTIPO;
import com.ecme.com.repository.ENTREGAXTIPORepository;
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
 * Integration tests for the {@link ENTREGAXTIPOResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ENTREGAXTIPOResourceIT {

    private static final Integer DEFAULT_CANTIDAD = 1;
    private static final Integer UPDATED_CANTIDAD = 2;

    private static final String DEFAULT_TIPO = "AAAAAAAAAA";
    private static final String UPDATED_TIPO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/entregaxtipos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ENTREGAXTIPORepository eNTREGAXTIPORepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restENTREGAXTIPOMockMvc;

    private ENTREGAXTIPO eNTREGAXTIPO;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ENTREGAXTIPO createEntity(EntityManager em) {
        ENTREGAXTIPO eNTREGAXTIPO = new ENTREGAXTIPO().cantidad(DEFAULT_CANTIDAD).tipo(DEFAULT_TIPO);
        return eNTREGAXTIPO;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ENTREGAXTIPO createUpdatedEntity(EntityManager em) {
        ENTREGAXTIPO eNTREGAXTIPO = new ENTREGAXTIPO().cantidad(UPDATED_CANTIDAD).tipo(UPDATED_TIPO);
        return eNTREGAXTIPO;
    }

    @BeforeEach
    public void initTest() {
        eNTREGAXTIPO = createEntity(em);
    }

    @Test
    @Transactional
    void createENTREGAXTIPO() throws Exception {
        int databaseSizeBeforeCreate = eNTREGAXTIPORepository.findAll().size();
        // Create the ENTREGAXTIPO
        restENTREGAXTIPOMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(eNTREGAXTIPO)))
            .andExpect(status().isCreated());

        // Validate the ENTREGAXTIPO in the database
        List<ENTREGAXTIPO> eNTREGAXTIPOList = eNTREGAXTIPORepository.findAll();
        assertThat(eNTREGAXTIPOList).hasSize(databaseSizeBeforeCreate + 1);
        ENTREGAXTIPO testENTREGAXTIPO = eNTREGAXTIPOList.get(eNTREGAXTIPOList.size() - 1);
        assertThat(testENTREGAXTIPO.getCantidad()).isEqualTo(DEFAULT_CANTIDAD);
        assertThat(testENTREGAXTIPO.getTipo()).isEqualTo(DEFAULT_TIPO);
    }

    @Test
    @Transactional
    void createENTREGAXTIPOWithExistingId() throws Exception {
        // Create the ENTREGAXTIPO with an existing ID
        eNTREGAXTIPO.setId(1L);

        int databaseSizeBeforeCreate = eNTREGAXTIPORepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restENTREGAXTIPOMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(eNTREGAXTIPO)))
            .andExpect(status().isBadRequest());

        // Validate the ENTREGAXTIPO in the database
        List<ENTREGAXTIPO> eNTREGAXTIPOList = eNTREGAXTIPORepository.findAll();
        assertThat(eNTREGAXTIPOList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllENTREGAXTIPOS() throws Exception {
        // Initialize the database
        eNTREGAXTIPORepository.saveAndFlush(eNTREGAXTIPO);

        // Get all the eNTREGAXTIPOList
        restENTREGAXTIPOMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(eNTREGAXTIPO.getId().intValue())))
            .andExpect(jsonPath("$.[*].cantidad").value(hasItem(DEFAULT_CANTIDAD)))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO)));
    }

    @Test
    @Transactional
    void getENTREGAXTIPO() throws Exception {
        // Initialize the database
        eNTREGAXTIPORepository.saveAndFlush(eNTREGAXTIPO);

        // Get the eNTREGAXTIPO
        restENTREGAXTIPOMockMvc
            .perform(get(ENTITY_API_URL_ID, eNTREGAXTIPO.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(eNTREGAXTIPO.getId().intValue()))
            .andExpect(jsonPath("$.cantidad").value(DEFAULT_CANTIDAD))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO));
    }

    @Test
    @Transactional
    void getNonExistingENTREGAXTIPO() throws Exception {
        // Get the eNTREGAXTIPO
        restENTREGAXTIPOMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewENTREGAXTIPO() throws Exception {
        // Initialize the database
        eNTREGAXTIPORepository.saveAndFlush(eNTREGAXTIPO);

        int databaseSizeBeforeUpdate = eNTREGAXTIPORepository.findAll().size();

        // Update the eNTREGAXTIPO
        ENTREGAXTIPO updatedENTREGAXTIPO = eNTREGAXTIPORepository.findById(eNTREGAXTIPO.getId()).get();
        // Disconnect from session so that the updates on updatedENTREGAXTIPO are not directly saved in db
        em.detach(updatedENTREGAXTIPO);
        updatedENTREGAXTIPO.cantidad(UPDATED_CANTIDAD).tipo(UPDATED_TIPO);

        restENTREGAXTIPOMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedENTREGAXTIPO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedENTREGAXTIPO))
            )
            .andExpect(status().isOk());

        // Validate the ENTREGAXTIPO in the database
        List<ENTREGAXTIPO> eNTREGAXTIPOList = eNTREGAXTIPORepository.findAll();
        assertThat(eNTREGAXTIPOList).hasSize(databaseSizeBeforeUpdate);
        ENTREGAXTIPO testENTREGAXTIPO = eNTREGAXTIPOList.get(eNTREGAXTIPOList.size() - 1);
        assertThat(testENTREGAXTIPO.getCantidad()).isEqualTo(UPDATED_CANTIDAD);
        assertThat(testENTREGAXTIPO.getTipo()).isEqualTo(UPDATED_TIPO);
    }

    @Test
    @Transactional
    void putNonExistingENTREGAXTIPO() throws Exception {
        int databaseSizeBeforeUpdate = eNTREGAXTIPORepository.findAll().size();
        eNTREGAXTIPO.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restENTREGAXTIPOMockMvc
            .perform(
                put(ENTITY_API_URL_ID, eNTREGAXTIPO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(eNTREGAXTIPO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ENTREGAXTIPO in the database
        List<ENTREGAXTIPO> eNTREGAXTIPOList = eNTREGAXTIPORepository.findAll();
        assertThat(eNTREGAXTIPOList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchENTREGAXTIPO() throws Exception {
        int databaseSizeBeforeUpdate = eNTREGAXTIPORepository.findAll().size();
        eNTREGAXTIPO.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restENTREGAXTIPOMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(eNTREGAXTIPO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ENTREGAXTIPO in the database
        List<ENTREGAXTIPO> eNTREGAXTIPOList = eNTREGAXTIPORepository.findAll();
        assertThat(eNTREGAXTIPOList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamENTREGAXTIPO() throws Exception {
        int databaseSizeBeforeUpdate = eNTREGAXTIPORepository.findAll().size();
        eNTREGAXTIPO.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restENTREGAXTIPOMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(eNTREGAXTIPO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ENTREGAXTIPO in the database
        List<ENTREGAXTIPO> eNTREGAXTIPOList = eNTREGAXTIPORepository.findAll();
        assertThat(eNTREGAXTIPOList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateENTREGAXTIPOWithPatch() throws Exception {
        // Initialize the database
        eNTREGAXTIPORepository.saveAndFlush(eNTREGAXTIPO);

        int databaseSizeBeforeUpdate = eNTREGAXTIPORepository.findAll().size();

        // Update the eNTREGAXTIPO using partial update
        ENTREGAXTIPO partialUpdatedENTREGAXTIPO = new ENTREGAXTIPO();
        partialUpdatedENTREGAXTIPO.setId(eNTREGAXTIPO.getId());

        restENTREGAXTIPOMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedENTREGAXTIPO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedENTREGAXTIPO))
            )
            .andExpect(status().isOk());

        // Validate the ENTREGAXTIPO in the database
        List<ENTREGAXTIPO> eNTREGAXTIPOList = eNTREGAXTIPORepository.findAll();
        assertThat(eNTREGAXTIPOList).hasSize(databaseSizeBeforeUpdate);
        ENTREGAXTIPO testENTREGAXTIPO = eNTREGAXTIPOList.get(eNTREGAXTIPOList.size() - 1);
        assertThat(testENTREGAXTIPO.getCantidad()).isEqualTo(DEFAULT_CANTIDAD);
        assertThat(testENTREGAXTIPO.getTipo()).isEqualTo(DEFAULT_TIPO);
    }

    @Test
    @Transactional
    void fullUpdateENTREGAXTIPOWithPatch() throws Exception {
        // Initialize the database
        eNTREGAXTIPORepository.saveAndFlush(eNTREGAXTIPO);

        int databaseSizeBeforeUpdate = eNTREGAXTIPORepository.findAll().size();

        // Update the eNTREGAXTIPO using partial update
        ENTREGAXTIPO partialUpdatedENTREGAXTIPO = new ENTREGAXTIPO();
        partialUpdatedENTREGAXTIPO.setId(eNTREGAXTIPO.getId());

        partialUpdatedENTREGAXTIPO.cantidad(UPDATED_CANTIDAD).tipo(UPDATED_TIPO);

        restENTREGAXTIPOMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedENTREGAXTIPO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedENTREGAXTIPO))
            )
            .andExpect(status().isOk());

        // Validate the ENTREGAXTIPO in the database
        List<ENTREGAXTIPO> eNTREGAXTIPOList = eNTREGAXTIPORepository.findAll();
        assertThat(eNTREGAXTIPOList).hasSize(databaseSizeBeforeUpdate);
        ENTREGAXTIPO testENTREGAXTIPO = eNTREGAXTIPOList.get(eNTREGAXTIPOList.size() - 1);
        assertThat(testENTREGAXTIPO.getCantidad()).isEqualTo(UPDATED_CANTIDAD);
        assertThat(testENTREGAXTIPO.getTipo()).isEqualTo(UPDATED_TIPO);
    }

    @Test
    @Transactional
    void patchNonExistingENTREGAXTIPO() throws Exception {
        int databaseSizeBeforeUpdate = eNTREGAXTIPORepository.findAll().size();
        eNTREGAXTIPO.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restENTREGAXTIPOMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, eNTREGAXTIPO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(eNTREGAXTIPO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ENTREGAXTIPO in the database
        List<ENTREGAXTIPO> eNTREGAXTIPOList = eNTREGAXTIPORepository.findAll();
        assertThat(eNTREGAXTIPOList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchENTREGAXTIPO() throws Exception {
        int databaseSizeBeforeUpdate = eNTREGAXTIPORepository.findAll().size();
        eNTREGAXTIPO.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restENTREGAXTIPOMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(eNTREGAXTIPO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ENTREGAXTIPO in the database
        List<ENTREGAXTIPO> eNTREGAXTIPOList = eNTREGAXTIPORepository.findAll();
        assertThat(eNTREGAXTIPOList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamENTREGAXTIPO() throws Exception {
        int databaseSizeBeforeUpdate = eNTREGAXTIPORepository.findAll().size();
        eNTREGAXTIPO.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restENTREGAXTIPOMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(eNTREGAXTIPO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ENTREGAXTIPO in the database
        List<ENTREGAXTIPO> eNTREGAXTIPOList = eNTREGAXTIPORepository.findAll();
        assertThat(eNTREGAXTIPOList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteENTREGAXTIPO() throws Exception {
        // Initialize the database
        eNTREGAXTIPORepository.saveAndFlush(eNTREGAXTIPO);

        int databaseSizeBeforeDelete = eNTREGAXTIPORepository.findAll().size();

        // Delete the eNTREGAXTIPO
        restENTREGAXTIPOMockMvc
            .perform(delete(ENTITY_API_URL_ID, eNTREGAXTIPO.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ENTREGAXTIPO> eNTREGAXTIPOList = eNTREGAXTIPORepository.findAll();
        assertThat(eNTREGAXTIPOList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
