package com.ibrahim.takehike.web.rest;

import com.ibrahim.takehike.TakeAHikeApp;
import com.ibrahim.takehike.domain.Trails;
import com.ibrahim.takehike.repository.TrailsRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TrailsResource} REST controller.
 */
@SpringBootTest(classes = TakeAHikeApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class TrailsResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Instant DEFAULT_START_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_AGE_LIMIT = "AAAAAAAAAA";
    private static final String UPDATED_AGE_LIMIT = "BBBBBBBBBB";

    private static final String DEFAULT_PRICE = "AAAAAAAAAA";
    private static final String UPDATED_PRICE = "BBBBBBBBBB";

    @Autowired
    private TrailsRepository trailsRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTrailsMockMvc;

    private Trails trails;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Trails createEntity(EntityManager em) {
        Trails trails = new Trails()
            .name(DEFAULT_NAME)
            .startTime(DEFAULT_START_TIME)
            .endTime(DEFAULT_END_TIME)
            .ageLimit(DEFAULT_AGE_LIMIT)
            .price(DEFAULT_PRICE);
        return trails;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Trails createUpdatedEntity(EntityManager em) {
        Trails trails = new Trails()
            .name(UPDATED_NAME)
            .startTime(UPDATED_START_TIME)
            .endTime(UPDATED_END_TIME)
            .ageLimit(UPDATED_AGE_LIMIT)
            .price(UPDATED_PRICE);
        return trails;
    }

    @BeforeEach
    public void initTest() {
        trails = createEntity(em);
    }

    @Test
    @Transactional
    public void createTrails() throws Exception {
        int databaseSizeBeforeCreate = trailsRepository.findAll().size();
        // Create the Trails
        restTrailsMockMvc.perform(post("/api/trails")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trails)))
            .andExpect(status().isCreated());

        // Validate the Trails in the database
        List<Trails> trailsList = trailsRepository.findAll();
        assertThat(trailsList).hasSize(databaseSizeBeforeCreate + 1);
        Trails testTrails = trailsList.get(trailsList.size() - 1);
        assertThat(testTrails.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTrails.getStartTime()).isEqualTo(DEFAULT_START_TIME);
        assertThat(testTrails.getEndTime()).isEqualTo(DEFAULT_END_TIME);
        assertThat(testTrails.getAgeLimit()).isEqualTo(DEFAULT_AGE_LIMIT);
        assertThat(testTrails.getPrice()).isEqualTo(DEFAULT_PRICE);
    }

    @Test
    @Transactional
    public void createTrailsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = trailsRepository.findAll().size();

        // Create the Trails with an existing ID
        trails.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTrailsMockMvc.perform(post("/api/trails")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trails)))
            .andExpect(status().isBadRequest());

        // Validate the Trails in the database
        List<Trails> trailsList = trailsRepository.findAll();
        assertThat(trailsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTrails() throws Exception {
        // Initialize the database
        trailsRepository.saveAndFlush(trails);

        // Get all the trailsList
        restTrailsMockMvc.perform(get("/api/trails?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(trails.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].startTime").value(hasItem(DEFAULT_START_TIME.toString())))
            .andExpect(jsonPath("$.[*].endTime").value(hasItem(DEFAULT_END_TIME.toString())))
            .andExpect(jsonPath("$.[*].ageLimit").value(hasItem(DEFAULT_AGE_LIMIT)))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE)));
    }
    
    @Test
    @Transactional
    public void getTrails() throws Exception {
        // Initialize the database
        trailsRepository.saveAndFlush(trails);

        // Get the trails
        restTrailsMockMvc.perform(get("/api/trails/{id}", trails.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(trails.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.startTime").value(DEFAULT_START_TIME.toString()))
            .andExpect(jsonPath("$.endTime").value(DEFAULT_END_TIME.toString()))
            .andExpect(jsonPath("$.ageLimit").value(DEFAULT_AGE_LIMIT))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE));
    }
    @Test
    @Transactional
    public void getNonExistingTrails() throws Exception {
        // Get the trails
        restTrailsMockMvc.perform(get("/api/trails/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTrails() throws Exception {
        // Initialize the database
        trailsRepository.saveAndFlush(trails);

        int databaseSizeBeforeUpdate = trailsRepository.findAll().size();

        // Update the trails
        Trails updatedTrails = trailsRepository.findById(trails.getId()).get();
        // Disconnect from session so that the updates on updatedTrails are not directly saved in db
        em.detach(updatedTrails);
        updatedTrails
            .name(UPDATED_NAME)
            .startTime(UPDATED_START_TIME)
            .endTime(UPDATED_END_TIME)
            .ageLimit(UPDATED_AGE_LIMIT)
            .price(UPDATED_PRICE);

        restTrailsMockMvc.perform(put("/api/trails")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTrails)))
            .andExpect(status().isOk());

        // Validate the Trails in the database
        List<Trails> trailsList = trailsRepository.findAll();
        assertThat(trailsList).hasSize(databaseSizeBeforeUpdate);
        Trails testTrails = trailsList.get(trailsList.size() - 1);
        assertThat(testTrails.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTrails.getStartTime()).isEqualTo(UPDATED_START_TIME);
        assertThat(testTrails.getEndTime()).isEqualTo(UPDATED_END_TIME);
        assertThat(testTrails.getAgeLimit()).isEqualTo(UPDATED_AGE_LIMIT);
        assertThat(testTrails.getPrice()).isEqualTo(UPDATED_PRICE);
    }

    @Test
    @Transactional
    public void updateNonExistingTrails() throws Exception {
        int databaseSizeBeforeUpdate = trailsRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTrailsMockMvc.perform(put("/api/trails")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trails)))
            .andExpect(status().isBadRequest());

        // Validate the Trails in the database
        List<Trails> trailsList = trailsRepository.findAll();
        assertThat(trailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTrails() throws Exception {
        // Initialize the database
        trailsRepository.saveAndFlush(trails);

        int databaseSizeBeforeDelete = trailsRepository.findAll().size();

        // Delete the trails
        restTrailsMockMvc.perform(delete("/api/trails/{id}", trails.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Trails> trailsList = trailsRepository.findAll();
        assertThat(trailsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
