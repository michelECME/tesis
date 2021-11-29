package com.ecme.com.web.rest;

import com.ecme.com.domain.CANTIDADXTIPOUEB;
import com.ecme.com.repository.CANTIDADXTIPOUEBRepository;
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
 * REST controller for managing {@link com.ecme.com.domain.CANTIDADXTIPOUEB}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CANTIDADXTIPOUEBResource {

    private final Logger log = LoggerFactory.getLogger(CANTIDADXTIPOUEBResource.class);

    private static final String ENTITY_NAME = "cANTIDADXTIPOUEB";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CANTIDADXTIPOUEBRepository cANTIDADXTIPOUEBRepository;

    public CANTIDADXTIPOUEBResource(CANTIDADXTIPOUEBRepository cANTIDADXTIPOUEBRepository) {
        this.cANTIDADXTIPOUEBRepository = cANTIDADXTIPOUEBRepository;
    }

    /**
     * {@code POST  /cantidadxtipouebs} : Create a new cANTIDADXTIPOUEB.
     *
     * @param cANTIDADXTIPOUEB the cANTIDADXTIPOUEB to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cANTIDADXTIPOUEB, or with status {@code 400 (Bad Request)} if the cANTIDADXTIPOUEB has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cantidadxtipouebs")
    public ResponseEntity<CANTIDADXTIPOUEB> createCANTIDADXTIPOUEB(@RequestBody CANTIDADXTIPOUEB cANTIDADXTIPOUEB)
        throws URISyntaxException {
        log.debug("REST request to save CANTIDADXTIPOUEB : {}", cANTIDADXTIPOUEB);
        if (cANTIDADXTIPOUEB.getId() != null) {
            throw new BadRequestAlertException("A new cANTIDADXTIPOUEB cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CANTIDADXTIPOUEB result = cANTIDADXTIPOUEBRepository.save(cANTIDADXTIPOUEB);
        return ResponseEntity
            .created(new URI("/api/cantidadxtipouebs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cantidadxtipouebs/:id} : Updates an existing cANTIDADXTIPOUEB.
     *
     * @param id the id of the cANTIDADXTIPOUEB to save.
     * @param cANTIDADXTIPOUEB the cANTIDADXTIPOUEB to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cANTIDADXTIPOUEB,
     * or with status {@code 400 (Bad Request)} if the cANTIDADXTIPOUEB is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cANTIDADXTIPOUEB couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cantidadxtipouebs/{id}")
    public ResponseEntity<CANTIDADXTIPOUEB> updateCANTIDADXTIPOUEB(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CANTIDADXTIPOUEB cANTIDADXTIPOUEB
    ) throws URISyntaxException {
        log.debug("REST request to update CANTIDADXTIPOUEB : {}, {}", id, cANTIDADXTIPOUEB);
        if (cANTIDADXTIPOUEB.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cANTIDADXTIPOUEB.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cANTIDADXTIPOUEBRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CANTIDADXTIPOUEB result = cANTIDADXTIPOUEBRepository.save(cANTIDADXTIPOUEB);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cANTIDADXTIPOUEB.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /cantidadxtipouebs/:id} : Partial updates given fields of an existing cANTIDADXTIPOUEB, field will ignore if it is null
     *
     * @param id the id of the cANTIDADXTIPOUEB to save.
     * @param cANTIDADXTIPOUEB the cANTIDADXTIPOUEB to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cANTIDADXTIPOUEB,
     * or with status {@code 400 (Bad Request)} if the cANTIDADXTIPOUEB is not valid,
     * or with status {@code 404 (Not Found)} if the cANTIDADXTIPOUEB is not found,
     * or with status {@code 500 (Internal Server Error)} if the cANTIDADXTIPOUEB couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/cantidadxtipouebs/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<CANTIDADXTIPOUEB> partialUpdateCANTIDADXTIPOUEB(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CANTIDADXTIPOUEB cANTIDADXTIPOUEB
    ) throws URISyntaxException {
        log.debug("REST request to partial update CANTIDADXTIPOUEB partially : {}, {}", id, cANTIDADXTIPOUEB);
        if (cANTIDADXTIPOUEB.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cANTIDADXTIPOUEB.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cANTIDADXTIPOUEBRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CANTIDADXTIPOUEB> result = cANTIDADXTIPOUEBRepository
            .findById(cANTIDADXTIPOUEB.getId())
            .map(
                existingCANTIDADXTIPOUEB -> {
                    if (cANTIDADXTIPOUEB.getCantidadTipoUEB() != null) {
                        existingCANTIDADXTIPOUEB.setCantidadTipoUEB(cANTIDADXTIPOUEB.getCantidadTipoUEB());
                    }
                    if (cANTIDADXTIPOUEB.getTipoCarro() != null) {
                        existingCANTIDADXTIPOUEB.setTipoCarro(cANTIDADXTIPOUEB.getTipoCarro());
                    }
                    if (cANTIDADXTIPOUEB.getUeb() != null) {
                        existingCANTIDADXTIPOUEB.setUeb(cANTIDADXTIPOUEB.getUeb());
                    }

                    return existingCANTIDADXTIPOUEB;
                }
            )
            .map(cANTIDADXTIPOUEBRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cANTIDADXTIPOUEB.getId().toString())
        );
    }

    /**
     * {@code GET  /cantidadxtipouebs} : get all the cANTIDADXTIPOUEBS.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cANTIDADXTIPOUEBS in body.
     */
    @GetMapping("/cantidadxtipouebs")
    public List<CANTIDADXTIPOUEB> getAllCANTIDADXTIPOUEBS() {
        log.debug("REST request to get all CANTIDADXTIPOUEBS");
        return cANTIDADXTIPOUEBRepository.findAll();
    }

    /**
     * {@code GET  /cantidadxtipouebs/:id} : get the "id" cANTIDADXTIPOUEB.
     *
     * @param id the id of the cANTIDADXTIPOUEB to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cANTIDADXTIPOUEB, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cantidadxtipouebs/{id}")
    public ResponseEntity<CANTIDADXTIPOUEB> getCANTIDADXTIPOUEB(@PathVariable Long id) {
        log.debug("REST request to get CANTIDADXTIPOUEB : {}", id);
        Optional<CANTIDADXTIPOUEB> cANTIDADXTIPOUEB = cANTIDADXTIPOUEBRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cANTIDADXTIPOUEB);
    }

    /**
     * {@code DELETE  /cantidadxtipouebs/:id} : delete the "id" cANTIDADXTIPOUEB.
     *
     * @param id the id of the cANTIDADXTIPOUEB to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cantidadxtipouebs/{id}")
    public ResponseEntity<Void> deleteCANTIDADXTIPOUEB(@PathVariable Long id) {
        log.debug("REST request to delete CANTIDADXTIPOUEB : {}", id);
        cANTIDADXTIPOUEBRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
