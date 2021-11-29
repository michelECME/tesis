package com.ecme.com.web.rest;

import com.ecme.com.domain.ENTREGAXTIPO;
import com.ecme.com.repository.ENTREGAXTIPORepository;
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
 * REST controller for managing {@link com.ecme.com.domain.ENTREGAXTIPO}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ENTREGAXTIPOResource {

    private final Logger log = LoggerFactory.getLogger(ENTREGAXTIPOResource.class);

    private static final String ENTITY_NAME = "eNTREGAXTIPO";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ENTREGAXTIPORepository eNTREGAXTIPORepository;

    public ENTREGAXTIPOResource(ENTREGAXTIPORepository eNTREGAXTIPORepository) {
        this.eNTREGAXTIPORepository = eNTREGAXTIPORepository;
    }

    /**
     * {@code POST  /entregaxtipos} : Create a new eNTREGAXTIPO.
     *
     * @param eNTREGAXTIPO the eNTREGAXTIPO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new eNTREGAXTIPO, or with status {@code 400 (Bad Request)} if the eNTREGAXTIPO has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/entregaxtipos")
    public ResponseEntity<ENTREGAXTIPO> createENTREGAXTIPO(@RequestBody ENTREGAXTIPO eNTREGAXTIPO) throws URISyntaxException {
        log.debug("REST request to save ENTREGAXTIPO : {}", eNTREGAXTIPO);
        if (eNTREGAXTIPO.getId() != null) {
            throw new BadRequestAlertException("A new eNTREGAXTIPO cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ENTREGAXTIPO result = eNTREGAXTIPORepository.save(eNTREGAXTIPO);
        return ResponseEntity
            .created(new URI("/api/entregaxtipos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /entregaxtipos/:id} : Updates an existing eNTREGAXTIPO.
     *
     * @param id the id of the eNTREGAXTIPO to save.
     * @param eNTREGAXTIPO the eNTREGAXTIPO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated eNTREGAXTIPO,
     * or with status {@code 400 (Bad Request)} if the eNTREGAXTIPO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the eNTREGAXTIPO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/entregaxtipos/{id}")
    public ResponseEntity<ENTREGAXTIPO> updateENTREGAXTIPO(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ENTREGAXTIPO eNTREGAXTIPO
    ) throws URISyntaxException {
        log.debug("REST request to update ENTREGAXTIPO : {}, {}", id, eNTREGAXTIPO);
        if (eNTREGAXTIPO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, eNTREGAXTIPO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!eNTREGAXTIPORepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ENTREGAXTIPO result = eNTREGAXTIPORepository.save(eNTREGAXTIPO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, eNTREGAXTIPO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /entregaxtipos/:id} : Partial updates given fields of an existing eNTREGAXTIPO, field will ignore if it is null
     *
     * @param id the id of the eNTREGAXTIPO to save.
     * @param eNTREGAXTIPO the eNTREGAXTIPO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated eNTREGAXTIPO,
     * or with status {@code 400 (Bad Request)} if the eNTREGAXTIPO is not valid,
     * or with status {@code 404 (Not Found)} if the eNTREGAXTIPO is not found,
     * or with status {@code 500 (Internal Server Error)} if the eNTREGAXTIPO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/entregaxtipos/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<ENTREGAXTIPO> partialUpdateENTREGAXTIPO(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ENTREGAXTIPO eNTREGAXTIPO
    ) throws URISyntaxException {
        log.debug("REST request to partial update ENTREGAXTIPO partially : {}, {}", id, eNTREGAXTIPO);
        if (eNTREGAXTIPO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, eNTREGAXTIPO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!eNTREGAXTIPORepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ENTREGAXTIPO> result = eNTREGAXTIPORepository
            .findById(eNTREGAXTIPO.getId())
            .map(
                existingENTREGAXTIPO -> {
                    if (eNTREGAXTIPO.getCantidad() != null) {
                        existingENTREGAXTIPO.setCantidad(eNTREGAXTIPO.getCantidad());
                    }
                    if (eNTREGAXTIPO.getTipo() != null) {
                        existingENTREGAXTIPO.setTipo(eNTREGAXTIPO.getTipo());
                    }

                    return existingENTREGAXTIPO;
                }
            )
            .map(eNTREGAXTIPORepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, eNTREGAXTIPO.getId().toString())
        );
    }

    /**
     * {@code GET  /entregaxtipos} : get all the eNTREGAXTIPOS.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of eNTREGAXTIPOS in body.
     */
    @GetMapping("/entregaxtipos")
    public List<ENTREGAXTIPO> getAllENTREGAXTIPOS() {
        log.debug("REST request to get all ENTREGAXTIPOS");
        return eNTREGAXTIPORepository.findAll();
    }

    /**
     * {@code GET  /entregaxtipos/:id} : get the "id" eNTREGAXTIPO.
     *
     * @param id the id of the eNTREGAXTIPO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the eNTREGAXTIPO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/entregaxtipos/{id}")
    public ResponseEntity<ENTREGAXTIPO> getENTREGAXTIPO(@PathVariable Long id) {
        log.debug("REST request to get ENTREGAXTIPO : {}", id);
        Optional<ENTREGAXTIPO> eNTREGAXTIPO = eNTREGAXTIPORepository.findById(id);
        return ResponseUtil.wrapOrNotFound(eNTREGAXTIPO);
    }

    /**
     * {@code DELETE  /entregaxtipos/:id} : delete the "id" eNTREGAXTIPO.
     *
     * @param id the id of the eNTREGAXTIPO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/entregaxtipos/{id}")
    public ResponseEntity<Void> deleteENTREGAXTIPO(@PathVariable Long id) {
        log.debug("REST request to delete ENTREGAXTIPO : {}", id);
        eNTREGAXTIPORepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
