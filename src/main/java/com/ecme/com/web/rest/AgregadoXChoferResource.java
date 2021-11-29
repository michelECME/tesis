package com.ecme.com.web.rest;

import com.ecme.com.domain.AgregadoXChofer;
import com.ecme.com.repository.AgregadoXChoferRepository;
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
 * REST controller for managing {@link com.ecme.com.domain.AgregadoXChofer}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AgregadoXChoferResource {

    private final Logger log = LoggerFactory.getLogger(AgregadoXChoferResource.class);

    private static final String ENTITY_NAME = "agregadoXChofer";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AgregadoXChoferRepository agregadoXChoferRepository;

    public AgregadoXChoferResource(AgregadoXChoferRepository agregadoXChoferRepository) {
        this.agregadoXChoferRepository = agregadoXChoferRepository;
    }

    /**
     * {@code POST  /agregado-x-chofers} : Create a new agregadoXChofer.
     *
     * @param agregadoXChofer the agregadoXChofer to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new agregadoXChofer, or with status {@code 400 (Bad Request)} if the agregadoXChofer has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/agregado-x-chofers")
    public ResponseEntity<AgregadoXChofer> createAgregadoXChofer(@RequestBody AgregadoXChofer agregadoXChofer) throws URISyntaxException {
        log.debug("REST request to save AgregadoXChofer : {}", agregadoXChofer);
        if (agregadoXChofer.getId() != null) {
            throw new BadRequestAlertException("A new agregadoXChofer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AgregadoXChofer result = agregadoXChoferRepository.save(agregadoXChofer);
        return ResponseEntity
            .created(new URI("/api/agregado-x-chofers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /agregado-x-chofers/:id} : Updates an existing agregadoXChofer.
     *
     * @param id the id of the agregadoXChofer to save.
     * @param agregadoXChofer the agregadoXChofer to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated agregadoXChofer,
     * or with status {@code 400 (Bad Request)} if the agregadoXChofer is not valid,
     * or with status {@code 500 (Internal Server Error)} if the agregadoXChofer couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/agregado-x-chofers/{id}")
    public ResponseEntity<AgregadoXChofer> updateAgregadoXChofer(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody AgregadoXChofer agregadoXChofer
    ) throws URISyntaxException {
        log.debug("REST request to update AgregadoXChofer : {}, {}", id, agregadoXChofer);
        if (agregadoXChofer.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, agregadoXChofer.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!agregadoXChoferRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        AgregadoXChofer result = agregadoXChoferRepository.save(agregadoXChofer);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, agregadoXChofer.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /agregado-x-chofers/:id} : Partial updates given fields of an existing agregadoXChofer, field will ignore if it is null
     *
     * @param id the id of the agregadoXChofer to save.
     * @param agregadoXChofer the agregadoXChofer to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated agregadoXChofer,
     * or with status {@code 400 (Bad Request)} if the agregadoXChofer is not valid,
     * or with status {@code 404 (Not Found)} if the agregadoXChofer is not found,
     * or with status {@code 500 (Internal Server Error)} if the agregadoXChofer couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/agregado-x-chofers/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<AgregadoXChofer> partialUpdateAgregadoXChofer(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody AgregadoXChofer agregadoXChofer
    ) throws URISyntaxException {
        log.debug("REST request to partial update AgregadoXChofer partially : {}, {}", id, agregadoXChofer);
        if (agregadoXChofer.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, agregadoXChofer.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!agregadoXChoferRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<AgregadoXChofer> result = agregadoXChoferRepository
            .findById(agregadoXChofer.getId())
            .map(
                existingAgregadoXChofer -> {
                    if (agregadoXChofer.getCantidadChorfer() != null) {
                        existingAgregadoXChofer.setCantidadChorfer(agregadoXChofer.getCantidadChorfer());
                    }
                    if (agregadoXChofer.getChapa() != null) {
                        existingAgregadoXChofer.setChapa(agregadoXChofer.getChapa());
                    }
                    if (agregadoXChofer.getNombre() != null) {
                        existingAgregadoXChofer.setNombre(agregadoXChofer.getNombre());
                    }

                    return existingAgregadoXChofer;
                }
            )
            .map(agregadoXChoferRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, agregadoXChofer.getId().toString())
        );
    }

    /**
     * {@code GET  /agregado-x-chofers} : get all the agregadoXChofers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of agregadoXChofers in body.
     */
    @GetMapping("/agregado-x-chofers")
    public List<AgregadoXChofer> getAllAgregadoXChofers() {
        log.debug("REST request to get all AgregadoXChofers");
        return agregadoXChoferRepository.findAll();
    }

    /**
     * {@code GET  /agregado-x-chofers/:id} : get the "id" agregadoXChofer.
     *
     * @param id the id of the agregadoXChofer to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the agregadoXChofer, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/agregado-x-chofers/{id}")
    public ResponseEntity<AgregadoXChofer> getAgregadoXChofer(@PathVariable Long id) {
        log.debug("REST request to get AgregadoXChofer : {}", id);
        Optional<AgregadoXChofer> agregadoXChofer = agregadoXChoferRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(agregadoXChofer);
    }

    /**
     * {@code DELETE  /agregado-x-chofers/:id} : delete the "id" agregadoXChofer.
     *
     * @param id the id of the agregadoXChofer to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/agregado-x-chofers/{id}")
    public ResponseEntity<Void> deleteAgregadoXChofer(@PathVariable Long id) {
        log.debug("REST request to delete AgregadoXChofer : {}", id);
        agregadoXChoferRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
