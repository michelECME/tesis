package com.ecme.com.web.rest;

import com.ecme.com.domain.LUBRICANTEXUEB;
import com.ecme.com.repository.LUBRICANTEXUEBRepository;
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
 * REST controller for managing {@link com.ecme.com.domain.LUBRICANTEXUEB}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class LUBRICANTEXUEBResource {

    private final Logger log = LoggerFactory.getLogger(LUBRICANTEXUEBResource.class);

    private static final String ENTITY_NAME = "lUBRICANTEXUEB";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LUBRICANTEXUEBRepository lUBRICANTEXUEBRepository;

    public LUBRICANTEXUEBResource(LUBRICANTEXUEBRepository lUBRICANTEXUEBRepository) {
        this.lUBRICANTEXUEBRepository = lUBRICANTEXUEBRepository;
    }

    /**
     * {@code POST  /lubricantexuebs} : Create a new lUBRICANTEXUEB.
     *
     * @param lUBRICANTEXUEB the lUBRICANTEXUEB to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new lUBRICANTEXUEB, or with status {@code 400 (Bad Request)} if the lUBRICANTEXUEB has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/lubricantexuebs")
    public ResponseEntity<LUBRICANTEXUEB> createLUBRICANTEXUEB(@RequestBody LUBRICANTEXUEB lUBRICANTEXUEB) throws URISyntaxException {
        log.debug("REST request to save LUBRICANTEXUEB : {}", lUBRICANTEXUEB);
        if (lUBRICANTEXUEB.getId() != null) {
            throw new BadRequestAlertException("A new lUBRICANTEXUEB cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LUBRICANTEXUEB result = lUBRICANTEXUEBRepository.save(lUBRICANTEXUEB);
        return ResponseEntity
            .created(new URI("/api/lubricantexuebs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /lubricantexuebs/:id} : Updates an existing lUBRICANTEXUEB.
     *
     * @param id the id of the lUBRICANTEXUEB to save.
     * @param lUBRICANTEXUEB the lUBRICANTEXUEB to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated lUBRICANTEXUEB,
     * or with status {@code 400 (Bad Request)} if the lUBRICANTEXUEB is not valid,
     * or with status {@code 500 (Internal Server Error)} if the lUBRICANTEXUEB couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/lubricantexuebs/{id}")
    public ResponseEntity<LUBRICANTEXUEB> updateLUBRICANTEXUEB(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody LUBRICANTEXUEB lUBRICANTEXUEB
    ) throws URISyntaxException {
        log.debug("REST request to update LUBRICANTEXUEB : {}, {}", id, lUBRICANTEXUEB);
        if (lUBRICANTEXUEB.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, lUBRICANTEXUEB.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!lUBRICANTEXUEBRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        LUBRICANTEXUEB result = lUBRICANTEXUEBRepository.save(lUBRICANTEXUEB);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, lUBRICANTEXUEB.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /lubricantexuebs/:id} : Partial updates given fields of an existing lUBRICANTEXUEB, field will ignore if it is null
     *
     * @param id the id of the lUBRICANTEXUEB to save.
     * @param lUBRICANTEXUEB the lUBRICANTEXUEB to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated lUBRICANTEXUEB,
     * or with status {@code 400 (Bad Request)} if the lUBRICANTEXUEB is not valid,
     * or with status {@code 404 (Not Found)} if the lUBRICANTEXUEB is not found,
     * or with status {@code 500 (Internal Server Error)} if the lUBRICANTEXUEB couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/lubricantexuebs/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<LUBRICANTEXUEB> partialUpdateLUBRICANTEXUEB(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody LUBRICANTEXUEB lUBRICANTEXUEB
    ) throws URISyntaxException {
        log.debug("REST request to partial update LUBRICANTEXUEB partially : {}, {}", id, lUBRICANTEXUEB);
        if (lUBRICANTEXUEB.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, lUBRICANTEXUEB.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!lUBRICANTEXUEBRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<LUBRICANTEXUEB> result = lUBRICANTEXUEBRepository
            .findById(lUBRICANTEXUEB.getId())
            .map(
                existingLUBRICANTEXUEB -> {
                    if (lUBRICANTEXUEB.getCantidadLubricanteUEB() != null) {
                        existingLUBRICANTEXUEB.setCantidadLubricanteUEB(lUBRICANTEXUEB.getCantidadLubricanteUEB());
                    }
                    if (lUBRICANTEXUEB.getUeb() != null) {
                        existingLUBRICANTEXUEB.setUeb(lUBRICANTEXUEB.getUeb());
                    }

                    return existingLUBRICANTEXUEB;
                }
            )
            .map(lUBRICANTEXUEBRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, lUBRICANTEXUEB.getId().toString())
        );
    }

    /**
     * {@code GET  /lubricantexuebs} : get all the lUBRICANTEXUEBS.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of lUBRICANTEXUEBS in body.
     */
    @GetMapping("/lubricantexuebs")
    public List<LUBRICANTEXUEB> getAllLUBRICANTEXUEBS() {
        log.debug("REST request to get all LUBRICANTEXUEBS");
        return lUBRICANTEXUEBRepository.findAll();
    }

    /**
     * {@code GET  /lubricantexuebs/:id} : get the "id" lUBRICANTEXUEB.
     *
     * @param id the id of the lUBRICANTEXUEB to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the lUBRICANTEXUEB, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/lubricantexuebs/{id}")
    public ResponseEntity<LUBRICANTEXUEB> getLUBRICANTEXUEB(@PathVariable Long id) {
        log.debug("REST request to get LUBRICANTEXUEB : {}", id);
        Optional<LUBRICANTEXUEB> lUBRICANTEXUEB = lUBRICANTEXUEBRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(lUBRICANTEXUEB);
    }

    /**
     * {@code DELETE  /lubricantexuebs/:id} : delete the "id" lUBRICANTEXUEB.
     *
     * @param id the id of the lUBRICANTEXUEB to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/lubricantexuebs/{id}")
    public ResponseEntity<Void> deleteLUBRICANTEXUEB(@PathVariable Long id) {
        log.debug("REST request to delete LUBRICANTEXUEB : {}", id);
        lUBRICANTEXUEBRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
