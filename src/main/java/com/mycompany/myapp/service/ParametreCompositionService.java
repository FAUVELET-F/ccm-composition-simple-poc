package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.ParametreComposition;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link ParametreComposition}.
 */
public interface ParametreCompositionService {
    /**
     * Save a parametreComposition.
     *
     * @param parametreComposition the entity to save.
     * @return the persisted entity.
     */
    ParametreComposition save(ParametreComposition parametreComposition);

    /**
     * Partially updates a parametreComposition.
     *
     * @param parametreComposition the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ParametreComposition> partialUpdate(ParametreComposition parametreComposition);

    /**
     * Get all the parametreCompositions.
     *
     * @return the list of entities.
     */
    List<ParametreComposition> findAll();

    /**
     * Get the "id" parametreComposition.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ParametreComposition> findOne(Long id);

    /**
     * Delete the "id" parametreComposition.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
