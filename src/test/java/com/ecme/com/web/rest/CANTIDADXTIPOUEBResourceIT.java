package com.ecme.com.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.ecme.com.IntegrationTest;
import com.ecme.com.domain.CANTIDADXTIPOUEB;
import com.ecme.com.repository.CANTIDADXTIPOUEBRepository;
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
 * Integration tests for the {@link CANTIDADXTIPOUEBResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CANTIDADXTIPOUEBResourceIT {

    private static final Integer DEFAULT_CANTIDAD_TIPO_UEB = 1;
    private static final Integer UPDATED_CANTIDAD_TIPO_UEB = 2;

    private static final String DEFAULT_TIPO_CARRO = "AAAAAAAAAA";
    private static final String UPDATED_TIPO_CARRO = "BBBBBBBBBB";

    private static final String DEFAULT_UEB = "AAAAAAAAAA";
    private static final String UPDATED_UEB = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/cantidadxtipouebs";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CANTIDADXTIPOUEBRepository cANTIDADXTIPOUEBRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCANTIDADXTIPOUEBMockMvc;

    private CANTIDADXTIPOUEB cANTIDADXTIPOUEB;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CANTIDADXTIPOUEB createEntity(EntityManager em) {
        CANTIDADXTIPOUEB cANTIDADXTIPOUEB = new CANTIDADXTIPOUEB()
            .cantidadTipoUEB(DEFAULT_CANTIDAD_TIPO_UEB)
            .tipoCarro(DEFAULT_TIPO_CARRO)
            .ueb(DEFAULT_UEB);
        return cANTIDADXTIPOUEB;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CANTIDADXTIPOUEB createUpdatedEntity(EntityManager em) {
        CANTIDADXTIPOUEB cANTIDADXTIPOUEB = new CANTIDADXTIPOUEB()
            .cantidadTipoUEB(UPDATED_CANTIDAD_TIPO_UEB)
            .tipoCarro(UPDATED_TIPO_CARRO)
            .ueb(UPDATED_UEB);
        return cANTIDADXTIPOUEB;
    }

    @BeforeEach
    public void initTest() {
        cANTIDADXTIPOUEB = createEntity(em);
    }

    @Test
    @Transactional
    void createCANTIDADXTIPOUEB() throws Exception {
        int databaseSizeBeforeCreate = cANTIDADXTIPOUEBRepository.findAll().size();
        // Create the CANTIDADXTIPOUEB
        restCANTIDADXTIPOUEBMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cANTIDADXTIPOUEB))
            )
            .andExpect(status().isCreated());

        // Validate the CANTIDADXTIPOUEB in the database
        List<CANTIDADXTIPOUEB> cANTIDADXTIPOUEBList = cANTIDADXTIPOUEBRepository.findAll();
        assertThat(cANTIDADXTIPOUEBList).hasSize(databaseSizeBeforeCreate + 1);
        CANTIDADXTIPOUEB testCANTIDADXTIPOUEB = cANTIDADXTIPOUEBList.get(cANTIDADXTIPOUEBList.size() - 1);
        assertThat(testCANTIDADXTIPOUEB.getCantidadTipoUEB()).isEqualTo(DEFAULT_CANTIDAD_TIPO_UEB);
        assertThat(testCANTIDADXTIPOUEB.getTipoCarro()).isEqualTo(DEFAULT_TIPO_CARRO);
        assertThat(testCANTIDADXTIPOUEB.getUeb()).isEqualTo(DEFAULT_UEB);
    }

    @Test
    @Transactional
    void createCANTIDADXTIPOUEBWithExistingId() throws Exception {
        // Create the CANTIDADXTIPOUEB with an existing ID
        cANTIDADXTIPOUEB.setId(1L);

        int databaseSizeBeforeCreate = cANTIDADXTIPOUEBRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCANTIDADXTIPOUEBMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cANTIDADXTIPOUEB))
            )
            .andExpect(status().isBadRequest());

        // Validate the CANTIDADXTIPOUEB in the database
        List<CANTIDADXTIPOUEB> cANTIDADXTIPOUEBList = cANTIDADXTIPOUEBRepository.findAll();
        assertThat(cANTIDADXTIPOUEBList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllCANTIDADXTIPOUEBS() throws Exception {
        // Initialize the database
        cANTIDADXTIPOUEBRepository.saveAndFlush(cANTIDADXTIPOUEB);

        // Get all the cANTIDADXTIPOUEBList
        restCANTIDADXTIPOUEBMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cANTIDADXTIPOUEB.getId().intValue())))
            .andExpect(jsonPath("$.[*].cantidadTipoUEB").value(hasItem(DEFAULT_CANTIDAD_TIPO_UEB)))
            .andExpect(jsonPath("$.[*].tipoCarro").value(hasItem(DEFAULT_TIPO_CARRO)))
            .andExpect(jsonPath("$.[*].ueb").value(hasItem(DEFAULT_UEB)));
    }

    @Test
    @Transactional
    void getCANTIDADXTIPOUEB() throws Exception {
        // Initialize the database
        cANTIDADXTIPOUEBRepository.saveAndFlush(cANTIDADXTIPOUEB);

        // Get the cANTIDADXTIPOUEB
        restCANTIDADXTIPOUEBMockMvc
            .perform(get(ENTITY_API_URL_ID, cANTIDADXTIPOUEB.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cANTIDADXTIPOUEB.getId().intValue()))
            .andExpect(jsonPath("$.cantidadTipoUEB").value(DEFAULT_CANTIDAD_TIPO_UEB))
            .andExpect(jsonPath("$.tipoCarro").value(DEFAULT_TIPO_CARRO))
            .andExpect(jsonPath("$.ueb").value(DEFAULT_UEB));
    }

    @Test
    @Transactional
    void getNonExistingCANTIDADXTIPOUEB() throws Exception {
        // Get the cANTIDADXTIPOUEB
        restCANTIDADXTIPOUEBMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCANTIDADXTIPOUEB() throws Exception {
        // Initialize the database
        cANTIDADXTIPOUEBRepository.saveAndFlush(cANTIDADXTIPOUEB);

        int databaseSizeBeforeUpdate = cANTIDADXTIPOUEBRepository.findAll().size();

        // Update the cANTIDADXTIPOUEB
        CANTIDADXTIPOUEB updatedCANTIDADXTIPOUEB = cANTIDADXTIPOUEBRepository.findById(cANTIDADXTIPOUEB.getId()).get();
        // Disconnect from session so that the updates on updatedCANTIDADXTIPOUEB are not directly saved in db
        em.detach(updatedCANTIDADXTIPOUEB);
        updatedCANTIDADXTIPOUEB.cantidadTipoUEB(UPDATED_CANTIDAD_TIPO_UEB).tipoCarro(UPDATED_TIPO_CARRO).ueb(UPDATED_UEB);

        restCANTIDADXTIPOUEBMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCANTIDADXTIPOUEB.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCANTIDADXTIPOUEB))
            )
            .andExpect(status().isOk());

        // Validate the CANTIDADXTIPOUEB in the database
        List<CANTIDADXTIPOUEB> cANTIDADXTIPOUEBList = cANTIDADXTIPOUEBRepository.findAll();
        assertThat(cANTIDADXTIPOUEBList).hasSize(databaseSizeBeforeUpdate);
        CANTIDADXTIPOUEB testCANTIDADXTIPOUEB = cANTIDADXTIPOUEBList.get(cANTIDADXTIPOUEBList.size() - 1);
        assertThat(testCANTIDADXTIPOUEB.getCantidadTipoUEB()).isEqualTo(UPDATED_CANTIDAD_TIPO_UEB);
        assertThat(testCANTIDADXTIPOUEB.getTipoCarro()).isEqualTo(UPDATED_TIPO_CARRO);
        assertThat(testCANTIDADXTIPOUEB.getUeb()).isEqualTo(UPDATED_UEB);
    }

    @Test
    @Transactional
    void putNonExistingCANTIDADXTIPOUEB() throws Exception {
        int databaseSizeBeforeUpdate = cANTIDADXTIPOUEBRepository.findAll().size();
        cANTIDADXTIPOUEB.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCANTIDADXTIPOUEBMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cANTIDADXTIPOUEB.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cANTIDADXTIPOUEB))
            )
            .andExpect(status().isBadRequest());

        // Validate the CANTIDADXTIPOUEB in the database
        List<CANTIDADXTIPOUEB> cANTIDADXTIPOUEBList = cANTIDADXTIPOUEBRepository.findAll();
        assertThat(cANTIDADXTIPOUEBList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCANTIDADXTIPOUEB() throws Exception {
        int databaseSizeBeforeUpdate = cANTIDADXTIPOUEBRepository.findAll().size();
        cANTIDADXTIPOUEB.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCANTIDADXTIPOUEBMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cANTIDADXTIPOUEB))
            )
            .andExpect(status().isBadRequest());

        // Validate the CANTIDADXTIPOUEB in the database
        List<CANTIDADXTIPOUEB> cANTIDADXTIPOUEBList = cANTIDADXTIPOUEBRepository.findAll();
        assertThat(cANTIDADXTIPOUEBList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCANTIDADXTIPOUEB() throws Exception {
        int databaseSizeBeforeUpdate = cANTIDADXTIPOUEBRepository.findAll().size();
        cANTIDADXTIPOUEB.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCANTIDADXTIPOUEBMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cANTIDADXTIPOUEB))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CANTIDADXTIPOUEB in the database
        List<CANTIDADXTIPOUEB> cANTIDADXTIPOUEBList = cANTIDADXTIPOUEBRepository.findAll();
        assertThat(cANTIDADXTIPOUEBList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCANTIDADXTIPOUEBWithPatch() throws Exception {
        // Initialize the database
        cANTIDADXTIPOUEBRepository.saveAndFlush(cANTIDADXTIPOUEB);

        int databaseSizeBeforeUpdate = cANTIDADXTIPOUEBRepository.findAll().size();

        // Update the cANTIDADXTIPOUEB using partial update
        CANTIDADXTIPOUEB partialUpdatedCANTIDADXTIPOUEB = new CANTIDADXTIPOUEB();
        partialUpdatedCANTIDADXTIPOUEB.setId(cANTIDADXTIPOUEB.getId());

        partialUpdatedCANTIDADXTIPOUEB.cantidadTipoUEB(UPDATED_CANTIDAD_TIPO_UEB).tipoCarro(UPDATED_TIPO_CARRO).ueb(UPDATED_UEB);

        restCANTIDADXTIPOUEBMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCANTIDADXTIPOUEB.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCANTIDADXTIPOUEB))
            )
            .andExpect(status().isOk());

        // Validate the CANTIDADXTIPOUEB in the database
        List<CANTIDADXTIPOUEB> cANTIDADXTIPOUEBList = cANTIDADXTIPOUEBRepository.findAll();
        assertThat(cANTIDADXTIPOUEBList).hasSize(databaseSizeBeforeUpdate);
        CANTIDADXTIPOUEB testCANTIDADXTIPOUEB = cANTIDADXTIPOUEBList.get(cANTIDADXTIPOUEBList.size() - 1);
        assertThat(testCANTIDADXTIPOUEB.getCantidadTipoUEB()).isEqualTo(UPDATED_CANTIDAD_TIPO_UEB);
        assertThat(testCANTIDADXTIPOUEB.getTipoCarro()).isEqualTo(UPDATED_TIPO_CARRO);
        assertThat(testCANTIDADXTIPOUEB.getUeb()).isEqualTo(UPDATED_UEB);
    }

    @Test
    @Transactional
    void fullUpdateCANTIDADXTIPOUEBWithPatch() throws Exception {
        // Initialize the database
        cANTIDADXTIPOUEBRepository.saveAndFlush(cANTIDADXTIPOUEB);

        int databaseSizeBeforeUpdate = cANTIDADXTIPOUEBRepository.findAll().size();

        // Update the cANTIDADXTIPOUEB using partial update
        CANTIDADXTIPOUEB partialUpdatedCANTIDADXTIPOUEB = new CANTIDADXTIPOUEB();
        partialUpdatedCANTIDADXTIPOUEB.setId(cANTIDADXTIPOUEB.getId());

        partialUpdatedCANTIDADXTIPOUEB.cantidadTipoUEB(UPDATED_CANTIDAD_TIPO_UEB).tipoCarro(UPDATED_TIPO_CARRO).ueb(UPDATED_UEB);

        restCANTIDADXTIPOUEBMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCANTIDADXTIPOUEB.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCANTIDADXTIPOUEB))
            )
            .andExpect(status().isOk());

        // Validate the CANTIDADXTIPOUEB in the database
        List<CANTIDADXTIPOUEB> cANTIDADXTIPOUEBList = cANTIDADXTIPOUEBRepository.findAll();
        assertThat(cANTIDADXTIPOUEBList).hasSize(databaseSizeBeforeUpdate);
        CANTIDADXTIPOUEB testCANTIDADXTIPOUEB = cANTIDADXTIPOUEBList.get(cANTIDADXTIPOUEBList.size() - 1);
        assertThat(testCANTIDADXTIPOUEB.getCantidadTipoUEB()).isEqualTo(UPDATED_CANTIDAD_TIPO_UEB);
        assertThat(testCANTIDADXTIPOUEB.getTipoCarro()).isEqualTo(UPDATED_TIPO_CARRO);
        assertThat(testCANTIDADXTIPOUEB.getUeb()).isEqualTo(UPDATED_UEB);
    }

    @Test
    @Transactional
    void patchNonExistingCANTIDADXTIPOUEB() throws Exception {
        int databaseSizeBeforeUpdate = cANTIDADXTIPOUEBRepository.findAll().size();
        cANTIDADXTIPOUEB.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCANTIDADXTIPOUEBMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cANTIDADXTIPOUEB.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cANTIDADXTIPOUEB))
            )
            .andExpect(status().isBadRequest());

        // Validate the CANTIDADXTIPOUEB in the database
        List<CANTIDADXTIPOUEB> cANTIDADXTIPOUEBList = cANTIDADXTIPOUEBRepository.findAll();
        assertThat(cANTIDADXTIPOUEBList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCANTIDADXTIPOUEB() throws Exception {
        int databaseSizeBeforeUpdate = cANTIDADXTIPOUEBRepository.findAll().size();
        cANTIDADXTIPOUEB.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCANTIDADXTIPOUEBMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cANTIDADXTIPOUEB))
            )
            .andExpect(status().isBadRequest());

        // Validate the CANTIDADXTIPOUEB in the database
        List<CANTIDADXTIPOUEB> cANTIDADXTIPOUEBList = cANTIDADXTIPOUEBRepository.findAll();
        assertThat(cANTIDADXTIPOUEBList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCANTIDADXTIPOUEB() throws Exception {
        int databaseSizeBeforeUpdate = cANTIDADXTIPOUEBRepository.findAll().size();
        cANTIDADXTIPOUEB.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCANTIDADXTIPOUEBMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cANTIDADXTIPOUEB))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CANTIDADXTIPOUEB in the database
        List<CANTIDADXTIPOUEB> cANTIDADXTIPOUEBList = cANTIDADXTIPOUEBRepository.findAll();
        assertThat(cANTIDADXTIPOUEBList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCANTIDADXTIPOUEB() throws Exception {
        // Initialize the database
        cANTIDADXTIPOUEBRepository.saveAndFlush(cANTIDADXTIPOUEB);

        int databaseSizeBeforeDelete = cANTIDADXTIPOUEBRepository.findAll().size();

        // Delete the cANTIDADXTIPOUEB
        restCANTIDADXTIPOUEBMockMvc
            .perform(delete(ENTITY_API_URL_ID, cANTIDADXTIPOUEB.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CANTIDADXTIPOUEB> cANTIDADXTIPOUEBList = cANTIDADXTIPOUEBRepository.findAll();
        assertThat(cANTIDADXTIPOUEBList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
