package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.Template;
import com.mycompany.myapp.repository.TemplateRepository;
import com.mycompany.myapp.service.TemplateService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Template}.
 */
@Service
@Transactional
public class TemplateServiceImpl implements TemplateService {

    private final Logger log = LoggerFactory.getLogger(TemplateServiceImpl.class);

    private final TemplateRepository templateRepository;

    public TemplateServiceImpl(TemplateRepository templateRepository) {
        this.templateRepository = templateRepository;
    }

    @Override
    public Template save(Template template) {
        log.debug("Request to save Template : {}", template);
        return templateRepository.save(template);
    }

    @Override
    public Optional<Template> partialUpdate(Template template) {
        log.debug("Request to partially update Template : {}", template);

        return templateRepository
            .findById(template.getId())
            .map(
                existingTemplate -> {
                    if (template.getNom() != null) {
                        existingTemplate.setNom(template.getNom());
                    }

                    return existingTemplate;
                }
            )
            .map(templateRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Template> findAll() {
        log.debug("Request to get all Templates");
        return templateRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Template> findOne(Long id) {
        log.debug("Request to get Template : {}", id);
        return templateRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Template : {}", id);
        templateRepository.deleteById(id);
    }
}
