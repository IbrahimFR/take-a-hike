package com.ibrahim.takehike.repository;

import com.ibrahim.takehike.domain.Trails;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Trails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TrailsRepository extends JpaRepository<Trails, Long> {
}
