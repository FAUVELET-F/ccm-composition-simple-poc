package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Template;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Template}.
 */
public interface TemplateService {
    /**
     * Save a template.
     *
     * @param template the entity to save.
     * @return the persisted entity.
     */
    Template save(Template template);

    /**
     * Partially updates a template.
     *
     * @param template the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Template> partialUpdate(Template template);

    /**
     * Get all the templates.
     *
     * @return the list of entities.
     */
    List<Template> findAll();

    /**
     * Get the "id" template.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Template> findOne(Long id);

    /**
     * Delete the "id" template.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
