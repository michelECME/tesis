package com.ecme.com.web.rest;

import com.ecme.com.domain.CANTIDADXTIPO;
import com.ecme.com.repository.CANTIDADXTIPORepository;
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
 * REST controller for managing {@link com.ecme.com.domain.CANTIDADXTIPO}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CANTIDADXTIPOResource {

    private final Logger log = LoggerFactory.getLogger(CANTIDADXTIPOResource.class);

    private static final String ENTITY_NAME = "cANTIDADXTIPO";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CANTIDADXTIPORepository cANTIDADXTIPORepository;

    public CANTIDADXTIPOResource(CANTIDADXTIPORepository cANTIDADXTIPORepository) {
        this.cANTIDADXTIPORepository = cANTIDADXTIPORepository;
    }

    /**
     * {@code POST  /cantidadxtipos} : Create a new cANTIDADXTIPO.
     *
     * @param cANTIDADXTIPO the cANTIDADXTIPO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cANTIDADXTIPO, or with status {@code 400 (Bad Request)} if the cANTIDADXTIPO has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cantidadxtipos")
    public ResponseEntity<CANTIDADXTIPO> createCANTIDADXTIPO(@RequestBody CANTIDADXTIPO cANTIDADXTIPO) throws URISyntaxException {
        log.debug("REST request to save CANTIDADXTIPO : {}", cANTIDADXTIPO);
        if (cANTIDADXTIPO.getId() != null) {
            throw new BadRequestAlertException("A new cANTIDADXTIPO cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CANTIDADXTIPO result = cANTIDADXTIPORepository.save(cANTIDADXTIPO);
        return ResponseEntity
            .created(new URI("/api/cantidadxtipos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cantidadxtipos/:id} : Updates an existing cANTIDADXTIPO.
     *
     * @param id the id of the cANTIDADXTIPO to save.
     * @param cANTIDADXTIPO the cANTIDADXTIPO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cANTIDADXTIPO,
     * or with status {@code 400 (Bad Request)} if the cANTIDADXTIPO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cANTIDADXTIPO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cantidadxtipos/{id}")
    public ResponseEntity<CANTIDADXTIPO> updateCANTIDADXTIPO(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CANTIDADXTIPO cANTIDADXTIPO
    ) throws URISyntaxException {
        log.debug("REST request to update CANTIDADXTIPO : {}, {}", id, cANTIDADXTIPO);
        if (cANTIDADXTIPO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cANTIDADXTIPO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cANTIDADXTIPORepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CANTIDADXTIPO result = cANTIDADXTIPORepository.save(cANTIDADXTIPO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cANTIDADXTIPO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /cantidadxtipos/:id} : Partial updates given fields of an existing cANTIDADXTIPO, field will ignore if it is null
     *
     * @param id the id of the cANTIDADXTIPO to save.
     * @param cANTIDADXTIPO the cANTIDADXTIPO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cANTIDADXTIPO,
     * or with status {@code 400 (Bad Request)} if the cANTIDADXTIPO is not valid,
     * or with status {@code 404 (Not Found)} if the cANTIDADXTIPO is not found,
     * or with status {@code 500 (Internal Server Error)} if the cANTIDADXTIPO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/cantidadxtipos/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<CANTIDADXTIPO> partialUpdateCANTIDADXTIPO(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CANTIDADXTIPO cANTIDADXTIPO
    ) throws URISyntaxException {
        log.debug("REST request to partial update CANTIDADXTIPO partially : {}, {}", id, cANTIDADXTIPO);
        if (cANTIDADXTIPO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cANTIDADXTIPO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cANTIDADXTIPORepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CANTIDADXTIPO> result = cANTIDADXTIPORepository
            .findById(cANTIDADXTIPO.getId())
            .map(
                existingCANTIDADXTIPO -> {
                    if (cANTIDADXTIPO.getCantidadTipo() != null) {
                        existingCANTIDADXTIPO.setCantidadTipo(cANTIDADXTIPO.getCantidadTipo());
                    }
                    if (cANTIDADXTIPO.getTipo() != null) {
                        existingCANTIDADXTIPO.setTipo(cANTIDADXTIPO.getTipo());
                    }

                    return existingCANTIDADXTIPO;
                }
            )
            .map(cANTIDADXTIPORepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cANTIDADXTIPO.getId().toString())
        );
    }

    /**
     * {@code GET  /cantidadxtipos} : get all the cANTIDADXTIPOS.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cANTIDADXTIPOS in body.
     */
    @GetMapping("/cantidadxtipos")
    public List<CANTIDADXTIPO> getAllCANTIDADXTIPOS() {
        log.debug("REST request to get all CANTIDADXTIPOS");
        return cANTIDADXTIPORepository.findAll();
    }

    /**
     * {@code GET  /cantidadxtipos/:id} : get the "id" cANTIDADXTIPO.
     *
     * @param id the id of the cANTIDADXTIPO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cANTIDADXTIPO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cantidadxtipos/{id}")
    public ResponseEntity<CANTIDADXTIPO> getCANTIDADXTIPO(@PathVariable Long id) {
        log.debug("REST request to get CANTIDADXTIPO : {}", id);
        Optional<CANTIDADXTIPO> cANTIDADXTIPO = cANTIDADXTIPORepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cANTIDADXTIPO);
    }

    /**
     * {@code DELETE  /cantidadxtipos/:id} : delete the "id" cANTIDADXTIPO.
     *
     * @param id the id of the cANTIDADXTIPO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cantidadxtipos/{id}")
    public ResponseEntity<Void> deleteCANTIDADXTIPO(@PathVariable Long id) {
        log.debug("REST request to delete CANTIDADXTIPO : {}", id);
        cANTIDADXTIPORepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
