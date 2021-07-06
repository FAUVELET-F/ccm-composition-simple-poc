package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.ParametreComposition;
import com.mycompany.myapp.repository.ParametreCompositionRepository;
import com.mycompany.myapp.service.ParametreCompositionService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link ParametreComposition}.
 */
@Service
@Transactional
public class ParametreCompositionServiceImpl implements ParametreCompositionService {

    private final Logger log = LoggerFactory.getLogger(ParametreCompositionServiceImpl.class);

    private final ParametreCompositionRepository parametreCompositionRepository;

    public ParametreCompositionServiceImpl(ParametreCompositionRepository parametreCompositionRepository) {
        this.parametreCompositionRepository = parametreCompositionRepository;
    }

    @Override
    public ParametreComposition save(ParametreComposition parametreComposition) {
        log.debug("Request to save ParametreComposition : {}", parametreComposition);
        return parametreCompositionRepository.save(parametreComposition);
    }

    @Override
    public Optional<ParametreComposition> partialUpdate(ParametreComposition parametreComposition) {
        log.debug("Request to partially update ParametreComposition : {}", parametreComposition);

        return parametreCompositionRepository
            .findById(parametreComposition.getId())
            .map(
                existingParametreComposition -> {
                    if (parametreComposition.getNomBaliseXml() != null) {
                        existingParametreComposition.setNomBaliseXml(parametreComposition.getNomBaliseXml());
                    }
                    if (parametreComposition.getLibelle() != null) {
                        existingParametreComposition.setLibelle(parametreComposition.getLibelle());
                    }
                    if (parametreComposition.getType() != null) {
                        existingParametreComposition.setType(parametreComposition.getType());
                    }

                    return existingParametreComposition;
                }
            )
            .map(parametreCompositionRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ParametreComposition> findAll() {
        log.debug("Request to get all ParametreCompositions");
        return parametreCompositionRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ParametreComposition> findOne(Long id) {
        log.debug("Request to get ParametreComposition : {}", id);
        return parametreCompositionRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete ParametreComposition : {}", id);
        parametreCompositionRepository.deleteById(id);
    }
}
