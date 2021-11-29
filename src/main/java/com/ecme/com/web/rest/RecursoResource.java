package com.ecme.com.web.rest;

import com.ecme.com.domain.Recurso;
import com.ecme.com.repository.RecursoRepository;
import com.ecme.com.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.ecme.com.domain.Recurso}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RecursoResource {

    private final Logger log = LoggerFactory.getLogger(RecursoResource.class);

    private static final String ENTITY_NAME = "recurso";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RecursoRepository recursoRepository;

    public RecursoResource(RecursoRepository recursoRepository) {
        this.recursoRepository = recursoRepository;
    }

    /**
     * {@code POST  /recursos} : Create a new recurso.
     *
     * @param recurso the recurso to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new recurso, or with status {@code 400 (Bad Request)} if the recurso has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/recursos")
    public ResponseEntity<Recurso> createRecurso(@RequestBody Recurso recurso) throws URISyntaxException {
        log.debug("REST request to save Recurso : {}", recurso);
        if (recurso.getId() != null) {
            throw new BadRequestAlertException("A new recurso cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Recurso result = recursoRepository.save(recurso);
        return ResponseEntity
            .created(new URI("/api/recursos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /recursos/:id} : Updates an existing recurso.
     *
     * @param id the id of the recurso to save.
     * @param recurso the recurso to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated recurso,
     * or with status {@code 400 (Bad Request)} if the recurso is not valid,
     * or with status {@code 500 (Internal Server Error)} if the recurso couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/recursos/{id}")
    public ResponseEntity<Recurso> updateRecurso(@PathVariable(value = "id", required = false) final Long id, @RequestBody Recurso recurso)
        throws URISyntaxException {
        log.debug("REST request to update Recurso : {}, {}", id, recurso);
        if (recurso.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, recurso.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!recursoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Recurso result = recursoRepository.save(recurso);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, recurso.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /recursos/:id} : Partial updates given fields of an existing recurso, field will ignore if it is null
     *
     * @param id the id of the recurso to save.
     * @param recurso the recurso to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated recurso,
     * or with status {@code 400 (Bad Request)} if the recurso is not valid,
     * or with status {@code 404 (Not Found)} if the recurso is not found,
     * or with status {@code 500 (Internal Server Error)} if the recurso couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/recursos/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Recurso> partialUpdateRecurso(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Recurso recurso
    ) throws URISyntaxException {
        log.debug("REST request to partial update Recurso partially : {}, {}", id, recurso);
        if (recurso.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, recurso.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!recursoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Recurso> result = recursoRepository
            .findById(recurso.getId())
            .map(
                existingRecurso -> {
                    if (recurso.getNombre() != null) {
                        existingRecurso.setNombre(recurso.getNombre());
                    }
                    if (recurso.getUm() != null) {
                        existingRecurso.setUm(recurso.getUm());
                    }
                    if (recurso.getTipo() != null) {
                        existingRecurso.setTipo(recurso.getTipo());
                    }

                    return existingRecurso;
                }
            )
            .map(recursoRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, recurso.getId().toString())
        );
    }

    /**
     * {@code GET  /recursos} : get all the recursos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of recursos in body.
     */
    @GetMapping("/recursos")
    public List<Recurso> getAllRecursos() {
        log.debug("REST request to get all Recursos");
        return recursoRepository.findAll();
    }

    /**
     * {@code GET  /recursos/:id} : get the "id" recurso.
     *
     * @param id the id of the recurso to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the recurso, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/recursos/{id}")
    public ResponseEntity<Recurso> getRecurso(@PathVariable Long id) {
        log.debug("REST request to get Recurso : {}", id);
        Optional<Recurso> recurso = recursoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(recurso);
    }

    /**
     * {@code DELETE  /recursos/:id} : delete the "id" recurso.
     *
     * @param id the id of the recurso to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/recursos/{id}")
    public ResponseEntity<Void> deleteRecurso(@PathVariable Long id) {
        log.debug("REST request to delete Recurso : {}", id);
        recursoRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
