package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.ParametreComposition;
import com.mycompany.myapp.domain.enumeration.ParametreCompositionType;
import com.mycompany.myapp.repository.ParametreCompositionRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link ParametreCompositionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ParametreCompositionResourceIT {

    private static final String DEFAULT_NOM_BALISE_XML = "AAAAAAAAAA";
    private static final String UPDATED_NOM_BALISE_XML = "BBBBBBBBBB";

    private static final String DEFAULT_LIBELLE = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE = "BBBBBBBBBB";

    private static final ParametreCompositionType DEFAULT_TYPE = ParametreCompositionType.STRING;
    private static final ParametreCompositionType UPDATED_TYPE = ParametreCompositionType.BOOLEAN;

    private static final String ENTITY_API_URL = "/api/parametre-compositions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ParametreCompositionRepository parametreCompositionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restParametreCompositionMockMvc;

    private ParametreComposition parametreComposition;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ParametreComposition createEntity(EntityManager em) {
        ParametreComposition parametreComposition = new ParametreComposition()
            .nomBaliseXml(DEFAULT_NOM_BALISE_XML)
            .libelle(DEFAULT_LIBELLE)
            .type(DEFAULT_TYPE);
        return parametreComposition;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ParametreComposition createUpdatedEntity(EntityManager em) {
        ParametreComposition parametreComposition = new ParametreComposition()
            .nomBaliseXml(UPDATED_NOM_BALISE_XML)
            .libelle(UPDATED_LIBELLE)
            .type(UPDATED_TYPE);
        return parametreComposition;
    }

    @BeforeEach
    public void initTest() {
        parametreComposition = createEntity(em);
    }

    @Test
    @Transactional
    void createParametreComposition() throws Exception {
        int databaseSizeBeforeCreate = parametreCompositionRepository.findAll().size();
        // Create the ParametreComposition
        restParametreCompositionMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(parametreComposition))
            )
            .andExpect(status().isCreated());

        // Validate the ParametreComposition in the database
        List<ParametreComposition> parametreCompositionList = parametreCompositionRepository.findAll();
        assertThat(parametreCompositionList).hasSize(databaseSizeBeforeCreate + 1);
        ParametreComposition testParametreComposition = parametreCompositionList.get(parametreCompositionList.size() - 1);
        assertThat(testParametreComposition.getNomBaliseXml()).isEqualTo(DEFAULT_NOM_BALISE_XML);
        assertThat(testParametreComposition.getLibelle()).isEqualTo(DEFAULT_LIBELLE);
        assertThat(testParametreComposition.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    void createParametreCompositionWithExistingId() throws Exception {
        // Create the ParametreComposition with an existing ID
        parametreComposition.setId(1L);

        int databaseSizeBeforeCreate = parametreCompositionRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restParametreCompositionMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(parametreComposition))
            )
            .andExpect(status().isBadRequest());

        // Validate the ParametreComposition in the database
        List<ParametreComposition> parametreCompositionList = parametreCompositionRepository.findAll();
        assertThat(parametreCompositionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllParametreCompositions() throws Exception {
        // Initialize the database
        parametreCompositionRepository.saveAndFlush(parametreComposition);

        // Get all the parametreCompositionList
        restParametreCompositionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(parametreComposition.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomBaliseXml").value(hasItem(DEFAULT_NOM_BALISE_XML)))
            .andExpect(jsonPath("$.[*].libelle").value(hasItem(DEFAULT_LIBELLE)))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }

    @Test
    @Transactional
    void getParametreComposition() throws Exception {
        // Initialize the database
        parametreCompositionRepository.saveAndFlush(parametreComposition);

        // Get the parametreComposition
        restParametreCompositionMockMvc
            .perform(get(ENTITY_API_URL_ID, parametreComposition.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(parametreComposition.getId().intValue()))
            .andExpect(jsonPath("$.nomBaliseXml").value(DEFAULT_NOM_BALISE_XML))
            .andExpect(jsonPath("$.libelle").value(DEFAULT_LIBELLE))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingParametreComposition() throws Exception {
        // Get the parametreComposition
        restParametreCompositionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewParametreComposition() throws Exception {
        // Initialize the database
        parametreCompositionRepository.saveAndFlush(parametreComposition);

        int databaseSizeBeforeUpdate = parametreCompositionRepository.findAll().size();

        // Update the parametreComposition
        ParametreComposition updatedParametreComposition = parametreCompositionRepository.findById(parametreComposition.getId()).get();
        // Disconnect from session so that the updates on updatedParametreComposition are not directly saved in db
        em.detach(updatedParametreComposition);
        updatedParametreComposition.nomBaliseXml(UPDATED_NOM_BALISE_XML).libelle(UPDATED_LIBELLE).type(UPDATED_TYPE);

        restParametreCompositionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedParametreComposition.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedParametreComposition))
            )
            .andExpect(status().isOk());

        // Validate the ParametreComposition in the database
        List<ParametreComposition> parametreCompositionList = parametreCompositionRepository.findAll();
        assertThat(parametreCompositionList).hasSize(databaseSizeBeforeUpdate);
        ParametreComposition testParametreComposition = parametreCompositionList.get(parametreCompositionList.size() - 1);
        assertThat(testParametreComposition.getNomBaliseXml()).isEqualTo(UPDATED_NOM_BALISE_XML);
        assertThat(testParametreComposition.getLibelle()).isEqualTo(UPDATED_LIBELLE);
        assertThat(testParametreComposition.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    void putNonExistingParametreComposition() throws Exception {
        int databaseSizeBeforeUpdate = parametreCompositionRepository.findAll().size();
        parametreComposition.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restParametreCompositionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, parametreComposition.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(parametreComposition))
            )
            .andExpect(status().isBadRequest());

        // Validate the ParametreComposition in the database
        List<ParametreComposition> parametreCompositionList = parametreCompositionRepository.findAll();
        assertThat(parametreCompositionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchParametreComposition() throws Exception {
        int databaseSizeBeforeUpdate = parametreCompositionRepository.findAll().size();
        parametreComposition.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restParametreCompositionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(parametreComposition))
            )
            .andExpect(status().isBadRequest());

        // Validate the ParametreComposition in the database
        List<ParametreComposition> parametreCompositionList = parametreCompositionRepository.findAll();
        assertThat(parametreCompositionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamParametreComposition() throws Exception {
        int databaseSizeBeforeUpdate = parametreCompositionRepository.findAll().size();
        parametreComposition.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restParametreCompositionMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(parametreComposition))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ParametreComposition in the database
        List<ParametreComposition> parametreCompositionList = parametreCompositionRepository.findAll();
        assertThat(parametreCompositionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateParametreCompositionWithPatch() throws Exception {
        // Initialize the database
        parametreCompositionRepository.saveAndFlush(parametreComposition);

        int databaseSizeBeforeUpdate = parametreCompositionRepository.findAll().size();

        // Update the parametreComposition using partial update
        ParametreComposition partialUpdatedParametreComposition = new ParametreComposition();
        partialUpdatedParametreComposition.setId(parametreComposition.getId());

        partialUpdatedParametreComposition.nomBaliseXml(UPDATED_NOM_BALISE_XML).libelle(UPDATED_LIBELLE).type(UPDATED_TYPE);

        restParametreCompositionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedParametreComposition.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedParametreComposition))
            )
            .andExpect(status().isOk());

        // Validate the ParametreComposition in the database
        List<ParametreComposition> parametreCompositionList = parametreCompositionRepository.findAll();
        assertThat(parametreCompositionList).hasSize(databaseSizeBeforeUpdate);
        ParametreComposition testParametreComposition = parametreCompositionList.get(parametreCompositionList.size() - 1);
        assertThat(testParametreComposition.getNomBaliseXml()).isEqualTo(UPDATED_NOM_BALISE_XML);
        assertThat(testParametreComposition.getLibelle()).isEqualTo(UPDATED_LIBELLE);
        assertThat(testParametreComposition.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    void fullUpdateParametreCompositionWithPatch() throws Exception {
        // Initialize the database
        parametreCompositionRepository.saveAndFlush(parametreComposition);

        int databaseSizeBeforeUpdate = parametreCompositionRepository.findAll().size();

        // Update the parametreComposition using partial update
        ParametreComposition partialUpdatedParametreComposition = new ParametreComposition();
        partialUpdatedParametreComposition.setId(parametreComposition.getId());

        partialUpdatedParametreComposition.nomBaliseXml(UPDATED_NOM_BALISE_XML).libelle(UPDATED_LIBELLE).type(UPDATED_TYPE);

        restParametreCompositionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedParametreComposition.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedParametreComposition))
            )
            .andExpect(status().isOk());

        // Validate the ParametreComposition in the database
        List<ParametreComposition> parametreCompositionList = parametreCompositionRepository.findAll();
        assertThat(parametreCompositionList).hasSize(databaseSizeBeforeUpdate);
        ParametreComposition testParametreComposition = parametreCompositionList.get(parametreCompositionList.size() - 1);
        assertThat(testParametreComposition.getNomBaliseXml()).isEqualTo(UPDATED_NOM_BALISE_XML);
        assertThat(testParametreComposition.getLibelle()).isEqualTo(UPDATED_LIBELLE);
        assertThat(testParametreComposition.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    void patchNonExistingParametreComposition() throws Exception {
        int databaseSizeBeforeUpdate = parametreCompositionRepository.findAll().size();
        parametreComposition.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restParametreCompositionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, parametreComposition.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(parametreComposition))
            )
            .andExpect(status().isBadRequest());

        // Validate the ParametreComposition in the database
        List<ParametreComposition> parametreCompositionList = parametreCompositionRepository.findAll();
        assertThat(parametreCompositionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchParametreComposition() throws Exception {
        int databaseSizeBeforeUpdate = parametreCompositionRepository.findAll().size();
        parametreComposition.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restParametreCompositionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(parametreComposition))
            )
            .andExpect(status().isBadRequest());

        // Validate the ParametreComposition in the database
        List<ParametreComposition> parametreCompositionList = parametreCompositionRepository.findAll();
        assertThat(parametreCompositionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamParametreComposition() throws Exception {
        int databaseSizeBeforeUpdate = parametreCompositionRepository.findAll().size();
        parametreComposition.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restParametreCompositionMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(parametreComposition))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ParametreComposition in the database
        List<ParametreComposition> parametreCompositionList = parametreCompositionRepository.findAll();
        assertThat(parametreCompositionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteParametreComposition() throws Exception {
        // Initialize the database
        parametreCompositionRepository.saveAndFlush(parametreComposition);

        int databaseSizeBeforeDelete = parametreCompositionRepository.findAll().size();

        // Delete the parametreComposition
        restParametreCompositionMockMvc
            .perform(delete(ENTITY_API_URL_ID, parametreComposition.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ParametreComposition> parametreCompositionList = parametreCompositionRepository.findAll();
        assertThat(parametreCompositionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
