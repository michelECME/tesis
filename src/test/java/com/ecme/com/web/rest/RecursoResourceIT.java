package com.ecme.com.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.ecme.com.IntegrationTest;
import com.ecme.com.domain.Recurso;
import com.ecme.com.domain.enumeration.TipoRecurso;
import com.ecme.com.domain.enumeration.UnidadDeMedida;
import com.ecme.com.repository.RecursoRepository;
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
 * Integration tests for the {@link RecursoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class RecursoResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final UnidadDeMedida DEFAULT_UM = UnidadDeMedida.LITRO;
    private static final UnidadDeMedida UPDATED_UM = UnidadDeMedida.METRO;

    private static final TipoRecurso DEFAULT_TIPO = TipoRecurso.PARTE;
    private static final TipoRecurso UPDATED_TIPO = TipoRecurso.PIEZA;

    private static final String ENTITY_API_URL = "/api/recursos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private RecursoRepository recursoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRecursoMockMvc;

    private Recurso recurso;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Recurso createEntity(EntityManager em) {
        Recurso recurso = new Recurso().nombre(DEFAULT_NOMBRE).um(DEFAULT_UM).tipo(DEFAULT_TIPO);
        return recurso;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Recurso createUpdatedEntity(EntityManager em) {
        Recurso recurso = new Recurso().nombre(UPDATED_NOMBRE).um(UPDATED_UM).tipo(UPDATED_TIPO);
        return recurso;
    }

    @BeforeEach
    public void initTest() {
        recurso = createEntity(em);
    }

    @Test
    @Transactional
    void createRecurso() throws Exception {
        int databaseSizeBeforeCreate = recursoRepository.findAll().size();
        // Create the Recurso
        restRecursoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(recurso)))
            .andExpect(status().isCreated());

        // Validate the Recurso in the database
        List<Recurso> recursoList = recursoRepository.findAll();
        assertThat(recursoList).hasSize(databaseSizeBeforeCreate + 1);
        Recurso testRecurso = recursoList.get(recursoList.size() - 1);
        assertThat(testRecurso.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testRecurso.getUm()).isEqualTo(DEFAULT_UM);
        assertThat(testRecurso.getTipo()).isEqualTo(DEFAULT_TIPO);
    }

    @Test
    @Transactional
    void createRecursoWithExistingId() throws Exception {
        // Create the Recurso with an existing ID
        recurso.setId(1L);

        int databaseSizeBeforeCreate = recursoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restRecursoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(recurso)))
            .andExpect(status().isBadRequest());

        // Validate the Recurso in the database
        List<Recurso> recursoList = recursoRepository.findAll();
        assertThat(recursoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllRecursos() throws Exception {
        // Initialize the database
        recursoRepository.saveAndFlush(recurso);

        // Get all the recursoList
        restRecursoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(recurso.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].um").value(hasItem(DEFAULT_UM.toString())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO.toString())));
    }

    @Test
    @Transactional
    void getRecurso() throws Exception {
        // Initialize the database
        recursoRepository.saveAndFlush(recurso);

        // Get the recurso
        restRecursoMockMvc
            .perform(get(ENTITY_API_URL_ID, recurso.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(recurso.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.um").value(DEFAULT_UM.toString()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO.toString()));
    }

    @Test
    @Transactional
    void getNonExistingRecurso() throws Exception {
        // Get the recurso
        restRecursoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewRecurso() throws Exception {
        // Initialize the database
        recursoRepository.saveAndFlush(recurso);

        int databaseSizeBeforeUpdate = recursoRepository.findAll().size();

        // Update the recurso
        Recurso updatedRecurso = recursoRepository.findById(recurso.getId()).get();
        // Disconnect from session so that the updates on updatedRecurso are not directly saved in db
        em.detach(updatedRecurso);
        updatedRecurso.nombre(UPDATED_NOMBRE).um(UPDATED_UM).tipo(UPDATED_TIPO);

        restRecursoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedRecurso.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedRecurso))
            )
            .andExpect(status().isOk());

        // Validate the Recurso in the database
        List<Recurso> recursoList = recursoRepository.findAll();
        assertThat(recursoList).hasSize(databaseSizeBeforeUpdate);
        Recurso testRecurso = recursoList.get(recursoList.size() - 1);
        assertThat(testRecurso.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testRecurso.getUm()).isEqualTo(UPDATED_UM);
        assertThat(testRecurso.getTipo()).isEqualTo(UPDATED_TIPO);
    }

    @Test
    @Transactional
    void putNonExistingRecurso() throws Exception {
        int databaseSizeBeforeUpdate = recursoRepository.findAll().size();
        recurso.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRecursoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, recurso.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(recurso))
            )
            .andExpect(status().isBadRequest());

        // Validate the Recurso in the database
        List<Recurso> recursoList = recursoRepository.findAll();
        assertThat(recursoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchRecurso() throws Exception {
        int databaseSizeBeforeUpdate = recursoRepository.findAll().size();
        recurso.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRecursoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(recurso))
            )
            .andExpect(status().isBadRequest());

        // Validate the Recurso in the database
        List<Recurso> recursoList = recursoRepository.findAll();
        assertThat(recursoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamRecurso() throws Exception {
        int databaseSizeBeforeUpdate = recursoRepository.findAll().size();
        recurso.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRecursoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(recurso)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Recurso in the database
        List<Recurso> recursoList = recursoRepository.findAll();
        assertThat(recursoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateRecursoWithPatch() throws Exception {
        // Initialize the database
        recursoRepository.saveAndFlush(recurso);

        int databaseSizeBeforeUpdate = recursoRepository.findAll().size();

        // Update the recurso using partial update
        Recurso partialUpdatedRecurso = new Recurso();
        partialUpdatedRecurso.setId(recurso.getId());

        partialUpdatedRecurso.nombre(UPDATED_NOMBRE).tipo(UPDATED_TIPO);

        restRecursoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRecurso.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedRecurso))
            )
            .andExpect(status().isOk());

        // Validate the Recurso in the database
        List<Recurso> recursoList = recursoRepository.findAll();
        assertThat(recursoList).hasSize(databaseSizeBeforeUpdate);
        Recurso testRecurso = recursoList.get(recursoList.size() - 1);
        assertThat(testRecurso.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testRecurso.getUm()).isEqualTo(DEFAULT_UM);
        assertThat(testRecurso.getTipo()).isEqualTo(UPDATED_TIPO);
    }

    @Test
    @Transactional
    void fullUpdateRecursoWithPatch() throws Exception {
        // Initialize the database
        recursoRepository.saveAndFlush(recurso);

        int databaseSizeBeforeUpdate = recursoRepository.findAll().size();

        // Update the recurso using partial update
        Recurso partialUpdatedRecurso = new Recurso();
        partialUpdatedRecurso.setId(recurso.getId());

        partialUpdatedRecurso.nombre(UPDATED_NOMBRE).um(UPDATED_UM).tipo(UPDATED_TIPO);

        restRecursoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRecurso.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedRecurso))
            )
            .andExpect(status().isOk());

        // Validate the Recurso in the database
        List<Recurso> recursoList = recursoRepository.findAll();
        assertThat(recursoList).hasSize(databaseSizeBeforeUpdate);
        Recurso testRecurso = recursoList.get(recursoList.size() - 1);
        assertThat(testRecurso.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testRecurso.getUm()).isEqualTo(UPDATED_UM);
        assertThat(testRecurso.getTipo()).isEqualTo(UPDATED_TIPO);
    }

    @Test
    @Transactional
    void patchNonExistingRecurso() throws Exception {
        int databaseSizeBeforeUpdate = recursoRepository.findAll().size();
        recurso.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRecursoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, recurso.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(recurso))
            )
            .andExpect(status().isBadRequest());

        // Validate the Recurso in the database
        List<Recurso> recursoList = recursoRepository.findAll();
        assertThat(recursoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchRecurso() throws Exception {
        int databaseSizeBeforeUpdate = recursoRepository.findAll().size();
        recurso.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRecursoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(recurso))
            )
            .andExpect(status().isBadRequest());

        // Validate the Recurso in the database
        List<Recurso> recursoList = recursoRepository.findAll();
        assertThat(recursoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamRecurso() throws Exception {
        int databaseSizeBeforeUpdate = recursoRepository.findAll().size();
        recurso.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRecursoMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(recurso)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Recurso in the database
        List<Recurso> recursoList = recursoRepository.findAll();
        assertThat(recursoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteRecurso() throws Exception {
        // Initialize the database
        recursoRepository.saveAndFlush(recurso);

        int databaseSizeBeforeDelete = recursoRepository.findAll().size();

        // Delete the recurso
        restRecursoMockMvc
            .perform(delete(ENTITY_API_URL_ID, recurso.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Recurso> recursoList = recursoRepository.findAll();
        assertThat(recursoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
