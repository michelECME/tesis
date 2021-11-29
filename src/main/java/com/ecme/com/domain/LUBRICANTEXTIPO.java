package com.ecme.com.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A LUBRICANTEXTIPO.
 */
@Entity
@Table(name = "lubricantextipo")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class LUBRICANTEXTIPO implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "cantidad_lubricante")
    private Integer cantidadLubricante;

    @Column(name = "lubricante")
    private String lubricante;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LUBRICANTEXTIPO id(Long id) {
        this.id = id;
        return this;
    }

    public Integer getCantidadLubricante() {
        return this.cantidadLubricante;
    }

    public LUBRICANTEXTIPO cantidadLubricante(Integer cantidadLubricante) {
        this.cantidadLubricante = cantidadLubricante;
        return this;
    }

    public void setCantidadLubricante(Integer cantidadLubricante) {
        this.cantidadLubricante = cantidadLubricante;
    }

    public String getLubricante() {
        return this.lubricante;
    }

    public LUBRICANTEXTIPO lubricante(String lubricante) {
        this.lubricante = lubricante;
        return this;
    }

    public void setLubricante(String lubricante) {
        this.lubricante = lubricante;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LUBRICANTEXTIPO)) {
            return false;
        }
        return id != null && id.equals(((LUBRICANTEXTIPO) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LUBRICANTEXTIPO{" +
            "id=" + getId() +
            ", cantidadLubricante=" + getCantidadLubricante() +
            ", lubricante='" + getLubricante() + "'" +
            "}";
    }
}
