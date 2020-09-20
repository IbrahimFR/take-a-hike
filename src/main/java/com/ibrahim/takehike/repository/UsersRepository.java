package com.ibrahim.takehike.repository;

import com.ibrahim.takehike.domain.Users;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Users entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {
}
