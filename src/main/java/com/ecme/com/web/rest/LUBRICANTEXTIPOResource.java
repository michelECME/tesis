package com.ecme.com.web.rest;

import com.ecme.com.domain.LUBRICANTEXTIPO;
import com.ecme.com.repository.LUBRICANTEXTIPORepository;
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
 * REST controller for managing {@link com.ecme.com.domain.LUBRICANTEXTIPO}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class LUBRICANTEXTIPOResource {

    private final Logger log = LoggerFactory.getLogger(LUBRICANTEXTIPOResource.class);

    private static final String ENTITY_NAME = "lUBRICANTEXTIPO";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LUBRICANTEXTIPORepository lUBRICANTEXTIPORepository;

    public LUBRICANTEXTIPOResource(LUBRICANTEXTIPORepository lUBRICANTEXTIPORepository) {
        this.lUBRICANTEXTIPORepository = lUBRICANTEXTIPORepository;
    }

    /**
     * {@code POST  /lubricantextipos} : Create a new lUBRICANTEXTIPO.
     *
     * @param lUBRICANTEXTIPO the lUBRICANTEXTIPO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new lUBRICANTEXTIPO, or with status {@code 400 (Bad Request)} if the lUBRICANTEXTIPO has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/lubricantextipos")
    public ResponseEntity<LUBRICANTEXTIPO> createLUBRICANTEXTIPO(@RequestBody LUBRICANTEXTIPO lUBRICANTEXTIPO) throws URISyntaxException {
        log.debug("REST request to save LUBRICANTEXTIPO : {}", lUBRICANTEXTIPO);
        if (lUBRICANTEXTIPO.getId() != null) {
            throw new BadRequestAlertException("A new lUBRICANTEXTIPO cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LUBRICANTEXTIPO result = lUBRICANTEXTIPORepository.save(lUBRICANTEXTIPO);
        return ResponseEntity
            .created(new URI("/api/lubricantextipos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /lubricantextipos/:id} : Updates an existing lUBRICANTEXTIPO.
     *
     * @param id the id of the lUBRICANTEXTIPO to save.
     * @param lUBRICANTEXTIPO the lUBRICANTEXTIPO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated lUBRICANTEXTIPO,
     * or with status {@code 400 (Bad Request)} if the lUBRICANTEXTIPO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the lUBRICANTEXTIPO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/lubricantextipos/{id}")
    public ResponseEntity<LUBRICANTEXTIPO> updateLUBRICANTEXTIPO(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody LUBRICANTEXTIPO lUBRICANTEXTIPO
    ) throws URISyntaxException {
        log.debug("REST request to update LUBRICANTEXTIPO : {}, {}", id, lUBRICANTEXTIPO);
        if (lUBRICANTEXTIPO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, lUBRICANTEXTIPO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!lUBRICANTEXTIPORepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        LUBRICANTEXTIPO result = lUBRICANTEXTIPORepository.save(lUBRICANTEXTIPO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, lUBRICANTEXTIPO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /lubricantextipos/:id} : Partial updates given fields of an existing lUBRICANTEXTIPO, field will ignore if it is null
     *
     * @param id the id of the lUBRICANTEXTIPO to save.
     * @param lUBRICANTEXTIPO the lUBRICANTEXTIPO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated lUBRICANTEXTIPO,
     * or with status {@code 400 (Bad Request)} if the lUBRICANTEXTIPO is not valid,
     * or with status {@code 404 (Not Found)} if the lUBRICANTEXTIPO is not found,
     * or with status {@code 500 (Internal Server Error)} if the lUBRICANTEXTIPO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/lubricantextipos/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<LUBRICANTEXTIPO> partialUpdateLUBRICANTEXTIPO(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody LUBRICANTEXTIPO lUBRICANTEXTIPO
    ) throws URISyntaxException {
        log.debug("REST request to partial update LUBRICANTEXTIPO partially : {}, {}", id, lUBRICANTEXTIPO);
        if (lUBRICANTEXTIPO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, lUBRICANTEXTIPO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!lUBRICANTEXTIPORepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<LUBRICANTEXTIPO> result = lUBRICANTEXTIPORepository
            .findById(lUBRICANTEXTIPO.getId())
            .map(
                existingLUBRICANTEXTIPO -> {
                    if (lUBRICANTEXTIPO.getCantidadLubricante() != null) {
                        existingLUBRICANTEXTIPO.setCantidadLubricante(lUBRICANTEXTIPO.getCantidadLubricante());
                    }
                    if (lUBRICANTEXTIPO.getLubricante() != null) {
                        existingLUBRICANTEXTIPO.setLubricante(lUBRICANTEXTIPO.getLubricante());
                    }

                    return existingLUBRICANTEXTIPO;
                }
            )
            .map(lUBRICANTEXTIPORepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, lUBRICANTEXTIPO.getId().toString())
        );
    }

    /**
     * {@code GET  /lubricantextipos} : get all the lUBRICANTEXTIPOS.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of lUBRICANTEXTIPOS in body.
     */
    @GetMapping("/lubricantextipos")
    public List<LUBRICANTEXTIPO> getAllLUBRICANTEXTIPOS() {
        log.debug("REST request to get all LUBRICANTEXTIPOS");
        return lUBRICANTEXTIPORepository.findAll();
    }

    /**
     * {@code GET  /lubricantextipos/:id} : get the "id" lUBRICANTEXTIPO.
     *
     * @param id the id of the lUBRICANTEXTIPO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the lUBRICANTEXTIPO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/lubricantextipos/{id}")
    public ResponseEntity<LUBRICANTEXTIPO> getLUBRICANTEXTIPO(@PathVariable Long id) {
        log.debug("REST request to get LUBRICANTEXTIPO : {}", id);
        Optional<LUBRICANTEXTIPO> lUBRICANTEXTIPO = lUBRICANTEXTIPORepository.findById(id);
        return ResponseUtil.wrapOrNotFound(lUBRICANTEXTIPO);
    }

    /**
     * {@code DELETE  /lubricantextipos/:id} : delete the "id" lUBRICANTEXTIPO.
     *
     * @param id the id of the lUBRICANTEXTIPO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/lubricantextipos/{id}")
    public ResponseEntity<Void> deleteLUBRICANTEXTIPO(@PathVariable Long id) {
        log.debug("REST request to delete LUBRICANTEXTIPO : {}", id);
        lUBRICANTEXTIPORepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
