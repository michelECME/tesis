package com.ecme.com.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CantidadXUEB.
 */
@Entity
@Table(name = "cantidad_xueb")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CantidadXUEB implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "cantidad_modelo")
    private Integer cantidadModelo;

    @Column(name = "ueb")
    private String ueb;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CantidadXUEB id(Long id) {
        this.id = id;
        return this;
    }

    public Integer getCantidadModelo() {
        return this.cantidadModelo;
    }

    public CantidadXUEB cantidadModelo(Integer cantidadModelo) {
        this.cantidadModelo = cantidadModelo;
        return this;
    }

    public void setCantidadModelo(Integer cantidadModelo) {
        this.cantidadModelo = cantidadModelo;
    }

    public String getUeb() {
        return this.ueb;
    }

    public CantidadXUEB ueb(String ueb) {
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
        if (!(o instanceof CantidadXUEB)) {
            return false;
        }
        return id != null && id.equals(((CantidadXUEB) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CantidadXUEB{" +
            "id=" + getId() +
            ", cantidadModelo=" + getCantidadModelo() +
            ", ueb='" + getUeb() + "'" +
            "}";
    }
}
