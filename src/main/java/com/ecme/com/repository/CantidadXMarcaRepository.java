package com.ecme.com.repository;

import com.ecme.com.domain.CantidadXMarca;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the CantidadXMarca entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CantidadXMarcaRepository extends JpaRepository<CantidadXMarca, Long> {}
