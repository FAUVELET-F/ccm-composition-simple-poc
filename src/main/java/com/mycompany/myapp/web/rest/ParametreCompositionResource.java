package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.ParametreComposition;
import com.mycompany.myapp.repository.ParametreCompositionRepository;
import com.mycompany.myapp.service.ParametreCompositionService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.ParametreComposition}.
 */
@RestController
@RequestMapping("/api")
public class ParametreCompositionResource {

    private final Logger log = LoggerFactory.getLogger(ParametreCompositionResource.class);

    private static final String ENTITY_NAME = "parametreComposition";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ParametreCompositionService parametreCompositionService;

    private final ParametreCompositionRepository parametreCompositionRepository;

    public ParametreCompositionResource(
        ParametreCompositionService parametreCompositionService,
        ParametreCompositionRepository parametreCompositionRepository
    ) {
        this.parametreCompositionService = parametreCompositionService;
        this.parametreCompositionRepository = parametreCompositionRepository;
    }

    /**
     * {@code POST  /parametre-compositions} : Create a new parametreComposition.
     *
     * @param parametreComposition the parametreComposition to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new parametreComposition, or with status {@code 400 (Bad Request)} if the parametreComposition has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/parametre-compositions")
    public ResponseEntity<ParametreComposition> createParametreComposition(@RequestBody ParametreComposition parametreComposition)
        throws URISyntaxException {
        log.debug("REST request to save ParametreComposition : {}", parametreComposition);
        if (parametreComposition.getId() != null) {
            throw new BadRequestAlertException("A new parametreComposition cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ParametreComposition result = parametreCompositionService.save(parametreComposition);
        return ResponseEntity
            .created(new URI("/api/parametre-compositions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /parametre-compositions/:id} : Updates an existing parametreComposition.
     *
     * @param id the id of the parametreComposition to save.
     * @param parametreComposition the parametreComposition to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated parametreComposition,
     * or with status {@code 400 (Bad Request)} if the parametreComposition is not valid,
     * or with status {@code 500 (Internal Server Error)} if the parametreComposition couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/parametre-compositions/{id}")
    public ResponseEntity<ParametreComposition> updateParametreComposition(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ParametreComposition parametreComposition
    ) throws URISyntaxException {
        log.debug("REST request to update ParametreComposition : {}, {}", id, parametreComposition);
        if (parametreComposition.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, parametreComposition.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!parametreCompositionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ParametreComposition result = parametreCompositionService.save(parametreComposition);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, parametreComposition.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /parametre-compositions/:id} : Partial updates given fields of an existing parametreComposition, field will ignore if it is null
     *
     * @param id the id of the parametreComposition to save.
     * @param parametreComposition the parametreComposition to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated parametreComposition,
     * or with status {@code 400 (Bad Request)} if the parametreComposition is not valid,
     * or with status {@code 404 (Not Found)} if the parametreComposition is not found,
     * or with status {@code 500 (Internal Server Error)} if the parametreComposition couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/parametre-compositions/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<ParametreComposition> partialUpdateParametreComposition(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ParametreComposition parametreComposition
    ) throws URISyntaxException {
        log.debug("REST request to partial update ParametreComposition partially : {}, {}", id, parametreComposition);
        if (parametreComposition.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, parametreComposition.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!parametreCompositionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ParametreComposition> result = parametreCompositionService.partialUpdate(parametreComposition);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, parametreComposition.getId().toString())
        );
    }

    /**
     * {@code GET  /parametre-compositions} : get all the parametreCompositions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of parametreCompositions in body.
     */
    @GetMapping("/parametre-compositions")
    public List<ParametreComposition> getAllParametreCompositions() {
        log.debug("REST request to get all ParametreCompositions");
        return parametreCompositionService.findAll();
    }

    /**
     * {@code GET  /parametre-compositions/:id} : get the "id" parametreComposition.
     *
     * @param id the id of the parametreComposition to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the parametreComposition, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/parametre-compositions/{id}")
    public ResponseEntity<ParametreComposition> getParametreComposition(@PathVariable Long id) {
        log.debug("REST request to get ParametreComposition : {}", id);
        Optional<ParametreComposition> parametreComposition = parametreCompositionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(parametreComposition);
    }

    /**
     * {@code DELETE  /parametre-compositions/:id} : delete the "id" parametreComposition.
     *
     * @param id the id of the parametreComposition to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/parametre-compositions/{id}")
    public ResponseEntity<Void> deleteParametreComposition(@PathVariable Long id) {
        log.debug("REST request to delete ParametreComposition : {}", id);
        parametreCompositionService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
