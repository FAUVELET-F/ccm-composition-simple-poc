package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ParametreComposition;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ParametreComposition entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ParametreCompositionRepository extends JpaRepository<ParametreComposition, Long> {}
