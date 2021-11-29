package com.ecme.com.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CantidadXMarca.
 */
@Entity
@Table(name = "cantidad_x_marca")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CantidadXMarca implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "cantidad_marca")
    private Integer cantidadMarca;

    @Column(name = "modelo")
    private String modelo;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CantidadXMarca id(Long id) {
        this.id = id;
        return this;
    }

    public Integer getCantidadMarca() {
        return this.cantidadMarca;
    }

    public CantidadXMarca cantidadMarca(Integer cantidadMarca) {
        this.cantidadMarca = cantidadMarca;
        return this;
    }

    public void setCantidadMarca(Integer cantidadMarca) {
        this.cantidadMarca = cantidadMarca;
    }

    public String getModelo() {
        return this.modelo;
    }

    public CantidadXMarca modelo(String modelo) {
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
        if (!(o instanceof CantidadXMarca)) {
            return false;
        }
        return id != null && id.equals(((CantidadXMarca) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CantidadXMarca{" +
            "id=" + getId() +
            ", cantidadMarca=" + getCantidadMarca() +
            ", modelo='" + getModelo() + "'" +
            "}";
    }
}
