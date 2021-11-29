package com.ecme.com.web.rest;

import com.ecme.com.domain.CantidadXUEB;
import com.ecme.com.repository.CantidadXUEBRepository;
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
 * REST controller for managing {@link com.ecme.com.domain.CantidadXUEB}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CantidadXUEBResource {

    private final Logger log = LoggerFactory.getLogger(CantidadXUEBResource.class);

    private static final String ENTITY_NAME = "cantidadXUEB";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CantidadXUEBRepository cantidadXUEBRepository;

    public CantidadXUEBResource(CantidadXUEBRepository cantidadXUEBRepository) {
        this.cantidadXUEBRepository = cantidadXUEBRepository;
    }

    /**
     * {@code POST  /cantidad-xuebs} : Create a new cantidadXUEB.
     *
     * @param cantidadXUEB the cantidadXUEB to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cantidadXUEB, or with status {@code 400 (Bad Request)} if the cantidadXUEB has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cantidad-xuebs")
    public ResponseEntity<CantidadXUEB> createCantidadXUEB(@RequestBody CantidadXUEB cantidadXUEB) throws URISyntaxException {
        log.debug("REST request to save CantidadXUEB : {}", cantidadXUEB);
        if (cantidadXUEB.getId() != null) {
            throw new BadRequestAlertException("A new cantidadXUEB cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CantidadXUEB result = cantidadXUEBRepository.save(cantidadXUEB);
        return ResponseEntity
            .created(new URI("/api/cantidad-xuebs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cantidad-xuebs/:id} : Updates an existing cantidadXUEB.
     *
     * @param id the id of the cantidadXUEB to save.
     * @param cantidadXUEB the cantidadXUEB to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cantidadXUEB,
     * or with status {@code 400 (Bad Request)} if the cantidadXUEB is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cantidadXUEB couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cantidad-xuebs/{id}")
    public ResponseEntity<CantidadXUEB> updateCantidadXUEB(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CantidadXUEB cantidadXUEB
    ) throws URISyntaxException {
        log.debug("REST request to update CantidadXUEB : {}, {}", id, cantidadXUEB);
        if (cantidadXUEB.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cantidadXUEB.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cantidadXUEBRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CantidadXUEB result = cantidadXUEBRepository.save(cantidadXUEB);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cantidadXUEB.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /cantidad-xuebs/:id} : Partial updates given fields of an existing cantidadXUEB, field will ignore if it is null
     *
     * @param id the id of the cantidadXUEB to save.
     * @param cantidadXUEB the cantidadXUEB to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cantidadXUEB,
     * or with status {@code 400 (Bad Request)} if the cantidadXUEB is not valid,
     * or with status {@code 404 (Not Found)} if the cantidadXUEB is not found,
     * or with status {@code 500 (Internal Server Error)} if the cantidadXUEB couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/cantidad-xuebs/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<CantidadXUEB> partialUpdateCantidadXUEB(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CantidadXUEB cantidadXUEB
    ) throws URISyntaxException {
        log.debug("REST request to partial update CantidadXUEB partially : {}, {}", id, cantidadXUEB);
        if (cantidadXUEB.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cantidadXUEB.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cantidadXUEBRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CantidadXUEB> result = cantidadXUEBRepository
            .findById(cantidadXUEB.getId())
            .map(
                existingCantidadXUEB -> {
                    if (cantidadXUEB.getCantidadModelo() != null) {
                        existingCantidadXUEB.setCantidadModelo(cantidadXUEB.getCantidadModelo());
                    }
                    if (cantidadXUEB.getUeb() != null) {
                        existingCantidadXUEB.setUeb(cantidadXUEB.getUeb());
                    }

                    return existingCantidadXUEB;
                }
            )
            .map(cantidadXUEBRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cantidadXUEB.getId().toString())
        );
    }

    /**
     * {@code GET  /cantidad-xuebs} : get all the cantidadXUEBS.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cantidadXUEBS in body.
     */
    @GetMapping("/cantidad-xuebs")
    public List<CantidadXUEB> getAllCantidadXUEBS() {
        log.debug("REST request to get all CantidadXUEBS");
        return cantidadXUEBRepository.findAll();
    }

    /**
     * {@code GET  /cantidad-xuebs/:id} : get the "id" cantidadXUEB.
     *
     * @param id the id of the cantidadXUEB to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cantidadXUEB, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cantidad-xuebs/{id}")
    public ResponseEntity<CantidadXUEB> getCantidadXUEB(@PathVariable Long id) {
        log.debug("REST request to get CantidadXUEB : {}", id);
        Optional<CantidadXUEB> cantidadXUEB = cantidadXUEBRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cantidadXUEB);
    }

    /**
     * {@code DELETE  /cantidad-xuebs/:id} : delete the "id" cantidadXUEB.
     *
     * @param id the id of the cantidadXUEB to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cantidad-xuebs/{id}")
    public ResponseEntity<Void> deleteCantidadXUEB(@PathVariable Long id) {
        log.debug("REST request to delete CantidadXUEB : {}", id);
        cantidadXUEBRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
