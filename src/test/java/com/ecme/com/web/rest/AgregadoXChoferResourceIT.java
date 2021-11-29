package com.ecme.com.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.ecme.com.IntegrationTest;
import com.ecme.com.domain.AgregadoXChofer;
import com.ecme.com.repository.AgregadoXChoferRepository;
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
 * Integration tests for the {@link AgregadoXChoferResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class AgregadoXChoferResourceIT {

    private static final Integer DEFAULT_CANTIDAD_CHORFER = 1;
    private static final Integer UPDATED_CANTIDAD_CHORFER = 2;

    private static final String DEFAULT_CHAPA = "AAAAAAAAAA";
    private static final String UPDATED_CHAPA = "BBBBBBBBBB";

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/agregado-x-chofers";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private AgregadoXChoferRepository agregadoXChoferRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAgregadoXChoferMockMvc;

    private AgregadoXChofer agregadoXChofer;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AgregadoXChofer createEntity(EntityManager em) {
        AgregadoXChofer agregadoXChofer = new AgregadoXChofer()
            .cantidadChorfer(DEFAULT_CANTIDAD_CHORFER)
            .chapa(DEFAULT_CHAPA)
            .nombre(DEFAULT_NOMBRE);
        return agregadoXChofer;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AgregadoXChofer createUpdatedEntity(EntityManager em) {
        AgregadoXChofer agregadoXChofer = new AgregadoXChofer()
            .cantidadChorfer(UPDATED_CANTIDAD_CHORFER)
            .chapa(UPDATED_CHAPA)
            .nombre(UPDATED_NOMBRE);
        return agregadoXChofer;
    }

    @BeforeEach
    public void initTest() {
        agregadoXChofer = createEntity(em);
    }

    @Test
    @Transactional
    void createAgregadoXChofer() throws Exception {
        int databaseSizeBeforeCreate = agregadoXChoferRepository.findAll().size();
        // Create the AgregadoXChofer
        restAgregadoXChoferMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(agregadoXChofer))
            )
            .andExpect(status().isCreated());

        // Validate the AgregadoXChofer in the database
        List<AgregadoXChofer> agregadoXChoferList = agregadoXChoferRepository.findAll();
        assertThat(agregadoXChoferList).hasSize(databaseSizeBeforeCreate + 1);
        AgregadoXChofer testAgregadoXChofer = agregadoXChoferList.get(agregadoXChoferList.size() - 1);
        assertThat(testAgregadoXChofer.getCantidadChorfer()).isEqualTo(DEFAULT_CANTIDAD_CHORFER);
        assertThat(testAgregadoXChofer.getChapa()).isEqualTo(DEFAULT_CHAPA);
        assertThat(testAgregadoXChofer.getNombre()).isEqualTo(DEFAULT_NOMBRE);
    }

    @Test
    @Transactional
    void createAgregadoXChoferWithExistingId() throws Exception {
        // Create the AgregadoXChofer with an existing ID
        agregadoXChofer.setId(1L);

        int databaseSizeBeforeCreate = agregadoXChoferRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restAgregadoXChoferMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(agregadoXChofer))
            )
            .andExpect(status().isBadRequest());

        // Validate the AgregadoXChofer in the database
        List<AgregadoXChofer> agregadoXChoferList = agregadoXChoferRepository.findAll();
        assertThat(agregadoXChoferList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllAgregadoXChofers() throws Exception {
        // Initialize the database
        agregadoXChoferRepository.saveAndFlush(agregadoXChofer);

        // Get all the agregadoXChoferList
        restAgregadoXChoferMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(agregadoXChofer.getId().intValue())))
            .andExpect(jsonPath("$.[*].cantidadChorfer").value(hasItem(DEFAULT_CANTIDAD_CHORFER)))
            .andExpect(jsonPath("$.[*].chapa").value(hasItem(DEFAULT_CHAPA)))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)));
    }

    @Test
    @Transactional
    void getAgregadoXChofer() throws Exception {
        // Initialize the database
        agregadoXChoferRepository.saveAndFlush(agregadoXChofer);

        // Get the agregadoXChofer
        restAgregadoXChoferMockMvc
            .perform(get(ENTITY_API_URL_ID, agregadoXChofer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(agregadoXChofer.getId().intValue()))
            .andExpect(jsonPath("$.cantidadChorfer").value(DEFAULT_CANTIDAD_CHORFER))
            .andExpect(jsonPath("$.chapa").value(DEFAULT_CHAPA))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE));
    }

    @Test
    @Transactional
    void getNonExistingAgregadoXChofer() throws Exception {
        // Get the agregadoXChofer
        restAgregadoXChoferMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewAgregadoXChofer() throws Exception {
        // Initialize the database
        agregadoXChoferRepository.saveAndFlush(agregadoXChofer);

        int databaseSizeBeforeUpdate = agregadoXChoferRepository.findAll().size();

        // Update the agregadoXChofer
        AgregadoXChofer updatedAgregadoXChofer = agregadoXChoferRepository.findById(agregadoXChofer.getId()).get();
        // Disconnect from session so that the updates on updatedAgregadoXChofer are not directly saved in db
        em.detach(updatedAgregadoXChofer);
        updatedAgregadoXChofer.cantidadChorfer(UPDATED_CANTIDAD_CHORFER).chapa(UPDATED_CHAPA).nombre(UPDATED_NOMBRE);

        restAgregadoXChoferMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedAgregadoXChofer.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedAgregadoXChofer))
            )
            .andExpect(status().isOk());

        // Validate the AgregadoXChofer in the database
        List<AgregadoXChofer> agregadoXChoferList = agregadoXChoferRepository.findAll();
        assertThat(agregadoXChoferList).hasSize(databaseSizeBeforeUpdate);
        AgregadoXChofer testAgregadoXChofer = agregadoXChoferList.get(agregadoXChoferList.size() - 1);
        assertThat(testAgregadoXChofer.getCantidadChorfer()).isEqualTo(UPDATED_CANTIDAD_CHORFER);
        assertThat(testAgregadoXChofer.getChapa()).isEqualTo(UPDATED_CHAPA);
        assertThat(testAgregadoXChofer.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    void putNonExistingAgregadoXChofer() throws Exception {
        int databaseSizeBeforeUpdate = agregadoXChoferRepository.findAll().size();
        agregadoXChofer.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAgregadoXChoferMockMvc
            .perform(
                put(ENTITY_API_URL_ID, agregadoXChofer.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(agregadoXChofer))
            )
            .andExpect(status().isBadRequest());

        // Validate the AgregadoXChofer in the database
        List<AgregadoXChofer> agregadoXChoferList = agregadoXChoferRepository.findAll();
        assertThat(agregadoXChoferList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchAgregadoXChofer() throws Exception {
        int databaseSizeBeforeUpdate = agregadoXChoferRepository.findAll().size();
        agregadoXChofer.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAgregadoXChoferMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(agregadoXChofer))
            )
            .andExpect(status().isBadRequest());

        // Validate the AgregadoXChofer in the database
        List<AgregadoXChofer> agregadoXChoferList = agregadoXChoferRepository.findAll();
        assertThat(agregadoXChoferList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamAgregadoXChofer() throws Exception {
        int databaseSizeBeforeUpdate = agregadoXChoferRepository.findAll().size();
        agregadoXChofer.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAgregadoXChoferMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(agregadoXChofer))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the AgregadoXChofer in the database
        List<AgregadoXChofer> agregadoXChoferList = agregadoXChoferRepository.findAll();
        assertThat(agregadoXChoferList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateAgregadoXChoferWithPatch() throws Exception {
        // Initialize the database
        agregadoXChoferRepository.saveAndFlush(agregadoXChofer);

        int databaseSizeBeforeUpdate = agregadoXChoferRepository.findAll().size();

        // Update the agregadoXChofer using partial update
        AgregadoXChofer partialUpdatedAgregadoXChofer = new AgregadoXChofer();
        partialUpdatedAgregadoXChofer.setId(agregadoXChofer.getId());

        partialUpdatedAgregadoXChofer.nombre(UPDATED_NOMBRE);

        restAgregadoXChoferMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAgregadoXChofer.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAgregadoXChofer))
            )
            .andExpect(status().isOk());

        // Validate the AgregadoXChofer in the database
        List<AgregadoXChofer> agregadoXChoferList = agregadoXChoferRepository.findAll();
        assertThat(agregadoXChoferList).hasSize(databaseSizeBeforeUpdate);
        AgregadoXChofer testAgregadoXChofer = agregadoXChoferList.get(agregadoXChoferList.size() - 1);
        assertThat(testAgregadoXChofer.getCantidadChorfer()).isEqualTo(DEFAULT_CANTIDAD_CHORFER);
        assertThat(testAgregadoXChofer.getChapa()).isEqualTo(DEFAULT_CHAPA);
        assertThat(testAgregadoXChofer.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    void fullUpdateAgregadoXChoferWithPatch() throws Exception {
        // Initialize the database
        agregadoXChoferRepository.saveAndFlush(agregadoXChofer);

        int databaseSizeBeforeUpdate = agregadoXChoferRepository.findAll().size();

        // Update the agregadoXChofer using partial update
        AgregadoXChofer partialUpdatedAgregadoXChofer = new AgregadoXChofer();
        partialUpdatedAgregadoXChofer.setId(agregadoXChofer.getId());

        partialUpdatedAgregadoXChofer.cantidadChorfer(UPDATED_CANTIDAD_CHORFER).chapa(UPDATED_CHAPA).nombre(UPDATED_NOMBRE);

        restAgregadoXChoferMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAgregadoXChofer.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAgregadoXChofer))
            )
            .andExpect(status().isOk());

        // Validate the AgregadoXChofer in the database
        List<AgregadoXChofer> agregadoXChoferList = agregadoXChoferRepository.findAll();
        assertThat(agregadoXChoferList).hasSize(databaseSizeBeforeUpdate);
        AgregadoXChofer testAgregadoXChofer = agregadoXChoferList.get(agregadoXChoferList.size() - 1);
        assertThat(testAgregadoXChofer.getCantidadChorfer()).isEqualTo(UPDATED_CANTIDAD_CHORFER);
        assertThat(testAgregadoXChofer.getChapa()).isEqualTo(UPDATED_CHAPA);
        assertThat(testAgregadoXChofer.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    void patchNonExistingAgregadoXChofer() throws Exception {
        int databaseSizeBeforeUpdate = agregadoXChoferRepository.findAll().size();
        agregadoXChofer.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAgregadoXChoferMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, agregadoXChofer.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(agregadoXChofer))
            )
            .andExpect(status().isBadRequest());

        // Validate the AgregadoXChofer in the database
        List<AgregadoXChofer> agregadoXChoferList = agregadoXChoferRepository.findAll();
        assertThat(agregadoXChoferList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchAgregadoXChofer() throws Exception {
        int databaseSizeBeforeUpdate = agregadoXChoferRepository.findAll().size();
        agregadoXChofer.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAgregadoXChoferMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(agregadoXChofer))
            )
            .andExpect(status().isBadRequest());

        // Validate the AgregadoXChofer in the database
        List<AgregadoXChofer> agregadoXChoferList = agregadoXChoferRepository.findAll();
        assertThat(agregadoXChoferList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamAgregadoXChofer() throws Exception {
        int databaseSizeBeforeUpdate = agregadoXChoferRepository.findAll().size();
        agregadoXChofer.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAgregadoXChoferMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(agregadoXChofer))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the AgregadoXChofer in the database
        List<AgregadoXChofer> agregadoXChoferList = agregadoXChoferRepository.findAll();
        assertThat(agregadoXChoferList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteAgregadoXChofer() throws Exception {
        // Initialize the database
        agregadoXChoferRepository.saveAndFlush(agregadoXChofer);

        int databaseSizeBeforeDelete = agregadoXChoferRepository.findAll().size();

        // Delete the agregadoXChofer
        restAgregadoXChoferMockMvc
            .perform(delete(ENTITY_API_URL_ID, agregadoXChofer.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AgregadoXChofer> agregadoXChoferList = agregadoXChoferRepository.findAll();
        assertThat(agregadoXChoferList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
