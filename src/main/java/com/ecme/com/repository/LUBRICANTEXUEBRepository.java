package com.ecme.com.repository;

import com.ecme.com.domain.LUBRICANTEXUEB;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the LUBRICANTEXUEB entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LUBRICANTEXUEBRepository extends JpaRepository<LUBRICANTEXUEB, Long> {}
