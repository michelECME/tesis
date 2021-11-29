package com.ecme.com.web.rest;

import com.ecme.com.domain.CantidadXMarca;
import com.ecme.com.repository.CantidadXMarcaRepository;
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
 * REST controller for managing {@link com.ecme.com.domain.CantidadXMarca}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CantidadXMarcaResource {

    private final Logger log = LoggerFactory.getLogger(CantidadXMarcaResource.class);

    private static final String ENTITY_NAME = "cantidadXMarca";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CantidadXMarcaRepository cantidadXMarcaRepository;

    public CantidadXMarcaResource(CantidadXMarcaRepository cantidadXMarcaRepository) {
        this.cantidadXMarcaRepository = cantidadXMarcaRepository;
    }

    /**
     * {@code POST  /cantidad-x-marcas} : Create a new cantidadXMarca.
     *
     * @param cantidadXMarca the cantidadXMarca to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cantidadXMarca, or with status {@code 400 (Bad Request)} if the cantidadXMarca has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cantidad-x-marcas")
    public ResponseEntity<CantidadXMarca> createCantidadXMarca(@RequestBody CantidadXMarca cantidadXMarca) throws URISyntaxException {
        log.debug("REST request to save CantidadXMarca : {}", cantidadXMarca);
        if (cantidadXMarca.getId() != null) {
            throw new BadRequestAlertException("A new cantidadXMarca cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CantidadXMarca result = cantidadXMarcaRepository.save(cantidadXMarca);
        return ResponseEntity
            .created(new URI("/api/cantidad-x-marcas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cantidad-x-marcas/:id} : Updates an existing cantidadXMarca.
     *
     * @param id the id of the cantidadXMarca to save.
     * @param cantidadXMarca the cantidadXMarca to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cantidadXMarca,
     * or with status {@code 400 (Bad Request)} if the cantidadXMarca is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cantidadXMarca couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cantidad-x-marcas/{id}")
    public ResponseEntity<CantidadXMarca> updateCantidadXMarca(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CantidadXMarca cantidadXMarca
    ) throws URISyntaxException {
        log.debug("REST request to update CantidadXMarca : {}, {}", id, cantidadXMarca);
        if (cantidadXMarca.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cantidadXMarca.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cantidadXMarcaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CantidadXMarca result = cantidadXMarcaRepository.save(cantidadXMarca);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cantidadXMarca.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /cantidad-x-marcas/:id} : Partial updates given fields of an existing cantidadXMarca, field will ignore if it is null
     *
     * @param id the id of the cantidadXMarca to save.
     * @param cantidadXMarca the cantidadXMarca to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cantidadXMarca,
     * or with status {@code 400 (Bad Request)} if the cantidadXMarca is not valid,
     * or with status {@code 404 (Not Found)} if the cantidadXMarca is not found,
     * or with status {@code 500 (Internal Server Error)} if the cantidadXMarca couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/cantidad-x-marcas/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<CantidadXMarca> partialUpdateCantidadXMarca(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CantidadXMarca cantidadXMarca
    ) throws URISyntaxException {
        log.debug("REST request to partial update CantidadXMarca partially : {}, {}", id, cantidadXMarca);
        if (cantidadXMarca.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cantidadXMarca.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cantidadXMarcaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CantidadXMarca> result = cantidadXMarcaRepository
            .findById(cantidadXMarca.getId())
            .map(
                existingCantidadXMarca -> {
                    if (cantidadXMarca.getCantidadMarca() != null) {
                        existingCantidadXMarca.setCantidadMarca(cantidadXMarca.getCantidadMarca());
                    }
                    if (cantidadXMarca.getModelo() != null) {
                        existingCantidadXMarca.setModelo(cantidadXMarca.getModelo());
                    }

                    return existingCantidadXMarca;
                }
            )
            .map(cantidadXMarcaRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cantidadXMarca.getId().toString())
        );
    }

    /**
     * {@code GET  /cantidad-x-marcas} : get all the cantidadXMarcas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cantidadXMarcas in body.
     */
    @GetMapping("/cantidad-x-marcas")
    public List<CantidadXMarca> getAllCantidadXMarcas() {
        log.debug("REST request to get all CantidadXMarcas");
        return cantidadXMarcaRepository.findAll();
    }

    /**
     * {@code GET  /cantidad-x-marcas/:id} : get the "id" cantidadXMarca.
     *
     * @param id the id of the cantidadXMarca to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cantidadXMarca, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cantidad-x-marcas/{id}")
    public ResponseEntity<CantidadXMarca> getCantidadXMarca(@PathVariable Long id) {
        log.debug("REST request to get CantidadXMarca : {}", id);
        Optional<CantidadXMarca> cantidadXMarca = cantidadXMarcaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cantidadXMarca);
    }

    /**
     * {@code DELETE  /cantidad-x-marcas/:id} : delete the "id" cantidadXMarca.
     *
     * @param id the id of the cantidadXMarca to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cantidad-x-marcas/{id}")
    public ResponseEntity<Void> deleteCantidadXMarca(@PathVariable Long id) {
        log.debug("REST request to delete CantidadXMarca : {}", id);
        cantidadXMarcaRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
