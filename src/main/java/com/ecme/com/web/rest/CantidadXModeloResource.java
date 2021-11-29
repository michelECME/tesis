package com.ecme.com.web.rest;

import com.ecme.com.domain.CantidadXModelo;
import com.ecme.com.repository.CantidadXModeloRepository;
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
 * REST controller for managing {@link com.ecme.com.domain.CantidadXModelo}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CantidadXModeloResource {

    private final Logger log = LoggerFactory.getLogger(CantidadXModeloResource.class);

    private static final String ENTITY_NAME = "cantidadXModelo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CantidadXModeloRepository cantidadXModeloRepository;

    public CantidadXModeloResource(CantidadXModeloRepository cantidadXModeloRepository) {
        this.cantidadXModeloRepository = cantidadXModeloRepository;
    }

    /**
     * {@code POST  /cantidad-x-modelos} : Create a new cantidadXModelo.
     *
     * @param cantidadXModelo the cantidadXModelo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cantidadXModelo, or with status {@code 400 (Bad Request)} if the cantidadXModelo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cantidad-x-modelos")
    public ResponseEntity<CantidadXModelo> createCantidadXModelo(@RequestBody CantidadXModelo cantidadXModelo) throws URISyntaxException {
        log.debug("REST request to save CantidadXModelo : {}", cantidadXModelo);
        if (cantidadXModelo.getId() != null) {
            throw new BadRequestAlertException("A new cantidadXModelo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CantidadXModelo result = cantidadXModeloRepository.save(cantidadXModelo);
        return ResponseEntity
            .created(new URI("/api/cantidad-x-modelos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cantidad-x-modelos/:id} : Updates an existing cantidadXModelo.
     *
     * @param id the id of the cantidadXModelo to save.
     * @param cantidadXModelo the cantidadXModelo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cantidadXModelo,
     * or with status {@code 400 (Bad Request)} if the cantidadXModelo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cantidadXModelo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cantidad-x-modelos/{id}")
    public ResponseEntity<CantidadXModelo> updateCantidadXModelo(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CantidadXModelo cantidadXModelo
    ) throws URISyntaxException {
        log.debug("REST request to update CantidadXModelo : {}, {}", id, cantidadXModelo);
        if (cantidadXModelo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cantidadXModelo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cantidadXModeloRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CantidadXModelo result = cantidadXModeloRepository.save(cantidadXModelo);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cantidadXModelo.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /cantidad-x-modelos/:id} : Partial updates given fields of an existing cantidadXModelo, field will ignore if it is null
     *
     * @param id the id of the cantidadXModelo to save.
     * @param cantidadXModelo the cantidadXModelo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cantidadXModelo,
     * or with status {@code 400 (Bad Request)} if the cantidadXModelo is not valid,
     * or with status {@code 404 (Not Found)} if the cantidadXModelo is not found,
     * or with status {@code 500 (Internal Server Error)} if the cantidadXModelo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/cantidad-x-modelos/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<CantidadXModelo> partialUpdateCantidadXModelo(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CantidadXModelo cantidadXModelo
    ) throws URISyntaxException {
        log.debug("REST request to partial update CantidadXModelo partially : {}, {}", id, cantidadXModelo);
        if (cantidadXModelo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cantidadXModelo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cantidadXModeloRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CantidadXModelo> result = cantidadXModeloRepository
            .findById(cantidadXModelo.getId())
            .map(
                existingCantidadXModelo -> {
                    if (cantidadXModelo.getCantidadModelo() != null) {
                        existingCantidadXModelo.setCantidadModelo(cantidadXModelo.getCantidadModelo());
                    }
                    if (cantidadXModelo.getModelo() != null) {
                        existingCantidadXModelo.setModelo(cantidadXModelo.getModelo());
                    }

                    return existingCantidadXModelo;
                }
            )
            .map(cantidadXModeloRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cantidadXModelo.getId().toString())
        );
    }

    /**
     * {@code GET  /cantidad-x-modelos} : get all the cantidadXModelos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cantidadXModelos in body.
     */
    @GetMapping("/cantidad-x-modelos")
    public List<CantidadXModelo> getAllCantidadXModelos() {
        log.debug("REST request to get all CantidadXModelos");
        return cantidadXModeloRepository.findAll();
    }

    /**
     * {@code GET  /cantidad-x-modelos/:id} : get the "id" cantidadXModelo.
     *
     * @param id the id of the cantidadXModelo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cantidadXModelo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cantidad-x-modelos/{id}")
    public ResponseEntity<CantidadXModelo> getCantidadXModelo(@PathVariable Long id) {
        log.debug("REST request to get CantidadXModelo : {}", id);
        Optional<CantidadXModelo> cantidadXModelo = cantidadXModeloRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cantidadXModelo);
    }

    /**
     * {@code DELETE  /cantidad-x-modelos/:id} : delete the "id" cantidadXModelo.
     *
     * @param id the id of the cantidadXModelo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cantidad-x-modelos/{id}")
    public ResponseEntity<Void> deleteCantidadXModelo(@PathVariable Long id) {
        log.debug("REST request to delete CantidadXModelo : {}", id);
        cantidadXModeloRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
