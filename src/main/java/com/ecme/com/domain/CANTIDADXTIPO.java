package com.ecme.com.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CANTIDADXTIPO.
 */
@Entity
@Table(name = "cantidadxtipo")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CANTIDADXTIPO implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "cantidad_tipo")
    private Integer cantidadTipo;

    @Column(name = "tipo")
    private String tipo;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CANTIDADXTIPO id(Long id) {
        this.id = id;
        return this;
    }

    public Integer getCantidadTipo() {
        return this.cantidadTipo;
    }

    public CANTIDADXTIPO cantidadTipo(Integer cantidadTipo) {
        this.cantidadTipo = cantidadTipo;
        return this;
    }

    public void setCantidadTipo(Integer cantidadTipo) {
        this.cantidadTipo = cantidadTipo;
    }

    public String getTipo() {
        return this.tipo;
    }

    public CANTIDADXTIPO tipo(String tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CANTIDADXTIPO)) {
            return false;
        }
        return id != null && id.equals(((CANTIDADXTIPO) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CANTIDADXTIPO{" +
            "id=" + getId() +
            ", cantidadTipo=" + getCantidadTipo() +
            ", tipo='" + getTipo() + "'" +
            "}";
    }
}
