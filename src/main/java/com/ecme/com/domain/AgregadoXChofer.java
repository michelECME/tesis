package com.ecme.com.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A AgregadoXChofer.
 */
@Entity
@Table(name = "agregado_x_chofer")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class AgregadoXChofer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "cantidad_chorfer")
    private Integer cantidadChorfer;

    @Column(name = "chapa")
    private String chapa;

    @Column(name = "nombre")
    private String nombre;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AgregadoXChofer id(Long id) {
        this.id = id;
        return this;
    }

    public Integer getCantidadChorfer() {
        return this.cantidadChorfer;
    }

    public AgregadoXChofer cantidadChorfer(Integer cantidadChorfer) {
        this.cantidadChorfer = cantidadChorfer;
        return this;
    }

    public void setCantidadChorfer(Integer cantidadChorfer) {
        this.cantidadChorfer = cantidadChorfer;
    }

    public String getChapa() {
        return this.chapa;
    }

    public AgregadoXChofer chapa(String chapa) {
        this.chapa = chapa;
        return this;
    }

    public void setChapa(String chapa) {
        this.chapa = chapa;
    }

    public String getNombre() {
        return this.nombre;
    }

    public AgregadoXChofer nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AgregadoXChofer)) {
            return false;
        }
        return id != null && id.equals(((AgregadoXChofer) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AgregadoXChofer{" +
            "id=" + getId() +
            ", cantidadChorfer=" + getCantidadChorfer() +
            ", chapa='" + getChapa() + "'" +
            ", nombre='" + getNombre() + "'" +
            "}";
    }
}
