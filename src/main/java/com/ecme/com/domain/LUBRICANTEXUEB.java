package com.ecme.com.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A LUBRICANTEXUEB.
 */
@Entity
@Table(name = "lubricantexueb")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class LUBRICANTEXUEB implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "cantidad_lubricante_ueb")
    private Integer cantidadLubricanteUEB;

    @Column(name = "ueb")
    private String ueb;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LUBRICANTEXUEB id(Long id) {
        this.id = id;
        return this;
    }

    public Integer getCantidadLubricanteUEB() {
        return this.cantidadLubricanteUEB;
    }

    public LUBRICANTEXUEB cantidadLubricanteUEB(Integer cantidadLubricanteUEB) {
        this.cantidadLubricanteUEB = cantidadLubricanteUEB;
        return this;
    }

    public void setCantidadLubricanteUEB(Integer cantidadLubricanteUEB) {
        this.cantidadLubricanteUEB = cantidadLubricanteUEB;
    }

    public String getUeb() {
        return this.ueb;
    }

    public LUBRICANTEXUEB ueb(String ueb) {
        this.ueb = ueb;
        return this;
    }

    public void setUeb(String ueb) {
        this.ueb = ueb;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LUBRICANTEXUEB)) {
            return false;
        }
        return id != null && id.equals(((LUBRICANTEXUEB) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LUBRICANTEXUEB{" +
            "id=" + getId() +
            ", cantidadLubricanteUEB=" + getCantidadLubricanteUEB() +
            ", ueb='" + getUeb() + "'" +
            "}";
    }
}
