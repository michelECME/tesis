package com.ecme.com.web.rest;

import com.ecme.com.domain.Asignacion;
import com.ecme.com.repository.AsignacionRepository;
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
 * REST controller for managing {@link com.ecme.com.domain.Asignacion}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AsignacionResource {

    private final Logger log = LoggerFactory.getLogger(AsignacionResource.class);

    private static final String ENTITY_NAME = "asignacion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AsignacionRepository asignacionRepository;

    public AsignacionResource(AsignacionRepository asignacionRepository) {
        this.asignacionRepository = asignacionRepository;
    }

    /**
     * {@code POST  /asignacions} : Create a new asignacion.
     *
     * @param asignacion the asignacion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new asignacion, or with status {@code 400 (Bad Request)} if the asignacion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/asignacions")
    public ResponseEntity<Asignacion> createAsignacion(@RequestBody Asignacion asignacion) throws URISyntaxException {
        log.debug("REST request to save Asignacion : {}", asignacion);
        if (asignacion.getId() != null) {
            throw new BadRequestAlertException("A new asignacion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Asignacion result = asignacionRepository.save(asignacion);
        return ResponseEntity
            .created(new URI("/api/asignacions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /asignacions/:id} : Updates an existing asignacion.
     *
     * @param id the id of the asignacion to save.
     * @param asignacion the asignacion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated asignacion,
     * or with status {@code 400 (Bad Request)} if the asignacion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the asignacion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/asignacions/{id}")
    public ResponseEntity<Asignacion> updateAsignacion(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Asignacion asignacion
    ) throws URISyntaxException {
        log.debug("REST request to update Asignacion : {}, {}", id, asignacion);
        if (asignacion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, asignacion.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!asignacionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Asignacion result = asignacionRepository.save(asignacion);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, asignacion.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /asignacions/:id} : Partial updates given fields of an existing asignacion, field will ignore if it is null
     *
     * @param id the id of the asignacion to save.
     * @param asignacion the asignacion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated asignacion,
     * or with status {@code 400 (Bad Request)} if the asignacion is not valid,
     * or with status {@code 404 (Not Found)} if the asignacion is not found,
     * or with status {@code 500 (Internal Server Error)} if the asignacion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/asignacions/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Asignacion> partialUpdateAsignacion(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Asignacion asignacion
    ) throws URISyntaxException {
        log.debug("REST request to partial update Asignacion partially : {}, {}", id, asignacion);
        if (asignacion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, asignacion.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!asignacionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Asignacion> result = asignacionRepository
            .findById(asignacion.getId())
            .map(
                existingAsignacion -> {
                    if (asignacion.getFecha() != null) {
                        existingAsignacion.setFecha(asignacion.getFecha());
                    }
                    if (asignacion.getCantidad() != null) {
                        existingAsignacion.setCantidad(asignacion.getCantidad());
                    }

                    return existingAsignacion;
                }
            )
            .map(asignacionRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, asignacion.getId().toString())
        );
    }

    /**
     * {@code GET  /asignacions} : get all the asignacions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of asignacions in body.
     */
    @GetMapping("/asignacions")
    public List<Asignacion> getAllAsignacions() {
        log.debug("REST request to get all Asignacions");
        return asignacionRepository.findAll();
    }

    /**
     * {@code GET  /asignacions/:id} : get the "id" asignacion.
     *
     * @param id the id of the asignacion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the asignacion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/asignacions/{id}")
    public ResponseEntity<Asignacion> getAsignacion(@PathVariable Long id) {
        log.debug("REST request to get Asignacion : {}", id);
        Optional<Asignacion> asignacion = asignacionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(asignacion);
    }

    /**
     * {@code DELETE  /asignacions/:id} : delete the "id" asignacion.
     *
     * @param id the id of the asignacion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/asignacions/{id}")
    public ResponseEntity<Void> deleteAsignacion(@PathVariable Long id) {
        log.debug("REST request to delete Asignacion : {}", id);
        asignacionRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
