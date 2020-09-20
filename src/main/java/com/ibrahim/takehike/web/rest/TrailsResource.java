package com.ibrahim.takehike.web.rest;

import com.ibrahim.takehike.domain.Trails;
import com.ibrahim.takehike.repository.TrailsRepository;
import com.ibrahim.takehike.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.ibrahim.takehike.domain.Trails}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TrailsResource {

    private final Logger log = LoggerFactory.getLogger(TrailsResource.class);

    private static final String ENTITY_NAME = "trails";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TrailsRepository trailsRepository;

    public TrailsResource(TrailsRepository trailsRepository) {
        this.trailsRepository = trailsRepository;
    }

    /**
     * {@code POST  /trails} : Create a new trails.
     *
     * @param trails the trails to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new trails, or with status {@code 400 (Bad Request)} if the trails has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/trails")
    public ResponseEntity<Trails> createTrails(@RequestBody Trails trails) throws URISyntaxException {
        log.debug("REST request to save Trails : {}", trails);
        if (trails.getId() != null) {
            throw new BadRequestAlertException("A new trails cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Trails result = trailsRepository.save(trails);
        return ResponseEntity.created(new URI("/api/trails/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /trails} : Updates an existing trails.
     *
     * @param trails the trails to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated trails,
     * or with status {@code 400 (Bad Request)} if the trails is not valid,
     * or with status {@code 500 (Internal Server Error)} if the trails couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/trails")
    public ResponseEntity<Trails> updateTrails(@RequestBody Trails trails) throws URISyntaxException {
        log.debug("REST request to update Trails : {}", trails);
        if (trails.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Trails result = trailsRepository.save(trails);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, trails.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /trails} : get all the trails.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of trails in body.
     */
    @GetMapping("/trails")
    public List<Trails> getAllTrails() {
        log.debug("REST request to get all Trails");
        return trailsRepository.findAll();
    }

    /**
     * {@code GET  /trails/:id} : get the "id" trails.
     *
     * @param id the id of the trails to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the trails, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/trails/{id}")
    public ResponseEntity<Trails> getTrails(@PathVariable Long id) {
        log.debug("REST request to get Trails : {}", id);
        Optional<Trails> trails = trailsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(trails);
    }

    /**
     * {@code DELETE  /trails/:id} : delete the "id" trails.
     *
     * @param id the id of the trails to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/trails/{id}")
    public ResponseEntity<Void> deleteTrails(@PathVariable Long id) {
        log.debug("REST request to delete Trails : {}", id);
        trailsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
