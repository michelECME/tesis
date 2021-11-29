package com.ecme.com.web.rest;

import com.ecme.com.domain.COMBUSTIBLEXUEB;
import com.ecme.com.repository.COMBUSTIBLEXUEBRepository;
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
 * REST controller for managing {@link com.ecme.com.domain.COMBUSTIBLEXUEB}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class COMBUSTIBLEXUEBResource {

    private final Logger log = LoggerFactory.getLogger(COMBUSTIBLEXUEBResource.class);

    private static final String ENTITY_NAME = "cOMBUSTIBLEXUEB";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final COMBUSTIBLEXUEBRepository cOMBUSTIBLEXUEBRepository;

    public COMBUSTIBLEXUEBResource(COMBUSTIBLEXUEBRepository cOMBUSTIBLEXUEBRepository) {
        this.cOMBUSTIBLEXUEBRepository = cOMBUSTIBLEXUEBRepository;
    }

    /**
     * {@code POST  /combustiblexuebs} : Create a new cOMBUSTIBLEXUEB.
     *
     * @param cOMBUSTIBLEXUEB the cOMBUSTIBLEXUEB to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cOMBUSTIBLEXUEB, or with status {@code 400 (Bad Request)} if the cOMBUSTIBLEXUEB has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/combustiblexuebs")
    public ResponseEntity<COMBUSTIBLEXUEB> createCOMBUSTIBLEXUEB(@RequestBody COMBUSTIBLEXUEB cOMBUSTIBLEXUEB) throws URISyntaxException {
        log.debug("REST request to save COMBUSTIBLEXUEB : {}", cOMBUSTIBLEXUEB);
        if (cOMBUSTIBLEXUEB.getId() != null) {
            throw new BadRequestAlertException("A new cOMBUSTIBLEXUEB cannot already have an ID", ENTITY_NAME, "idexists");
        }
        COMBUSTIBLEXUEB result = cOMBUSTIBLEXUEBRepository.save(cOMBUSTIBLEXUEB);
        return ResponseEntity
            .created(new URI("/api/combustiblexuebs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /combustiblexuebs/:id} : Updates an existing cOMBUSTIBLEXUEB.
     *
     * @param id the id of the cOMBUSTIBLEXUEB to save.
     * @param cOMBUSTIBLEXUEB the cOMBUSTIBLEXUEB to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cOMBUSTIBLEXUEB,
     * or with status {@code 400 (Bad Request)} if the cOMBUSTIBLEXUEB is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cOMBUSTIBLEXUEB couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/combustiblexuebs/{id}")
    public ResponseEntity<COMBUSTIBLEXUEB> updateCOMBUSTIBLEXUEB(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody COMBUSTIBLEXUEB cOMBUSTIBLEXUEB
    ) throws URISyntaxException {
        log.debug("REST request to update COMBUSTIBLEXUEB : {}, {}", id, cOMBUSTIBLEXUEB);
        if (cOMBUSTIBLEXUEB.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cOMBUSTIBLEXUEB.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cOMBUSTIBLEXUEBRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        COMBUSTIBLEXUEB result = cOMBUSTIBLEXUEBRepository.save(cOMBUSTIBLEXUEB);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cOMBUSTIBLEXUEB.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /combustiblexuebs/:id} : Partial updates given fields of an existing cOMBUSTIBLEXUEB, field will ignore if it is null
     *
     * @param id the id of the cOMBUSTIBLEXUEB to save.
     * @param cOMBUSTIBLEXUEB the cOMBUSTIBLEXUEB to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cOMBUSTIBLEXUEB,
     * or with status {@code 400 (Bad Request)} if the cOMBUSTIBLEXUEB is not valid,
     * or with status {@code 404 (Not Found)} if the cOMBUSTIBLEXUEB is not found,
     * or with status {@code 500 (Internal Server Error)} if the cOMBUSTIBLEXUEB couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/combustiblexuebs/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<COMBUSTIBLEXUEB> partialUpdateCOMBUSTIBLEXUEB(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody COMBUSTIBLEXUEB cOMBUSTIBLEXUEB
    ) throws URISyntaxException {
        log.debug("REST request to partial update COMBUSTIBLEXUEB partially : {}, {}", id, cOMBUSTIBLEXUEB);
        if (cOMBUSTIBLEXUEB.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cOMBUSTIBLEXUEB.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cOMBUSTIBLEXUEBRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<COMBUSTIBLEXUEB> result = cOMBUSTIBLEXUEBRepository
            .findById(cOMBUSTIBLEXUEB.getId())
            .map(
                existingCOMBUSTIBLEXUEB -> {
                    if (cOMBUSTIBLEXUEB.getCantidadCombustibleUEB() != null) {
                        existingCOMBUSTIBLEXUEB.setCantidadCombustibleUEB(cOMBUSTIBLEXUEB.getCantidadCombustibleUEB());
                    }
                    if (cOMBUSTIBLEXUEB.getUeb() != null) {
                        existingCOMBUSTIBLEXUEB.setUeb(cOMBUSTIBLEXUEB.getUeb());
                    }

                    return existingCOMBUSTIBLEXUEB;
                }
            )
            .map(cOMBUSTIBLEXUEBRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cOMBUSTIBLEXUEB.getId().toString())
        );
    }

    /**
     * {@code GET  /combustiblexuebs} : get all the cOMBUSTIBLEXUEBS.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cOMBUSTIBLEXUEBS in body.
     */
    @GetMapping("/combustiblexuebs")
    public List<COMBUSTIBLEXUEB> getAllCOMBUSTIBLEXUEBS() {
        log.debug("REST request to get all COMBUSTIBLEXUEBS");
        return cOMBUSTIBLEXUEBRepository.findAll();
    }

    /**
     * {@code GET  /combustiblexuebs/:id} : get the "id" cOMBUSTIBLEXUEB.
     *
     * @param id the id of the cOMBUSTIBLEXUEB to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cOMBUSTIBLEXUEB, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/combustiblexuebs/{id}")
    public ResponseEntity<COMBUSTIBLEXUEB> getCOMBUSTIBLEXUEB(@PathVariable Long id) {
        log.debug("REST request to get COMBUSTIBLEXUEB : {}", id);
        Optional<COMBUSTIBLEXUEB> cOMBUSTIBLEXUEB = cOMBUSTIBLEXUEBRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cOMBUSTIBLEXUEB);
    }

    /**
     * {@code DELETE  /combustiblexuebs/:id} : delete the "id" cOMBUSTIBLEXUEB.
     *
     * @param id the id of the cOMBUSTIBLEXUEB to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/combustiblexuebs/{id}")
    public ResponseEntity<Void> deleteCOMBUSTIBLEXUEB(@PathVariable Long id) {
        log.debug("REST request to delete COMBUSTIBLEXUEB : {}", id);
        cOMBUSTIBLEXUEBRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
