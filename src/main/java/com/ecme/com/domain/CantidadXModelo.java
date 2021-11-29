package com.ecme.com.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CantidadXModelo.
 */
@Entity
@Table(name = "cantidad_x_modelo")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CantidadXModelo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "cantidad_modelo")
    private Integer cantidadModelo;

    @Column(name = "modelo")
    private String modelo;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CantidadXModelo id(Long id) {
        this.id = id;
        return this;
    }

    public Integer getCantidadModelo() {
        return this.cantidadModelo;
    }

    public CantidadXModelo cantidadModelo(Integer cantidadModelo) {
        this.cantidadModelo = cantidadModelo;
        return this;
    }

    public void setCantidadModelo(Integer cantidadModelo) {
        this.cantidadModelo = cantidadModelo;
    }

    public String getModelo() {
        return this.modelo;
    }

    public CantidadXModelo modelo(String modelo) {
        this.modelo = modelo;
        return this;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CantidadXModelo)) {
            return false;
        }
        return id != null && id.equals(((CantidadXModelo) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CantidadXModelo{" +
            "id=" + getId() +
            ", cantidadModelo=" + getCantidadModelo() +
            ", modelo='" + getModelo() + "'" +
            "}";
    }
}
