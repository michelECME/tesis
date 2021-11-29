package com.ecme.com.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A COMBUSTIBLEXUEB.
 */
@Entity
@Table(name = "combustiblexueb")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class COMBUSTIBLEXUEB implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "cantidad_combustible_ueb")
    private Integer cantidadCombustibleUEB;

    @Column(name = "ueb")
    private String ueb;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public COMBUSTIBLEXUEB id(Long id) {
        this.id = id;
        return this;
    }

    public Integer getCantidadCombustibleUEB() {
        return this.cantidadCombustibleUEB;
    }

    public COMBUSTIBLEXUEB cantidadCombustibleUEB(Integer cantidadCombustibleUEB) {
        this.cantidadCombustibleUEB = cantidadCombustibleUEB;
        return this;
    }

    public void setCantidadCombustibleUEB(Integer cantidadCombustibleUEB) {
        this.cantidadCombustibleUEB = cantidadCombustibleUEB;
    }

    public String getUeb() {
        return this.ueb;
    }

    public COMBUSTIBLEXUEB ueb(String ueb) {
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
        if (!(o instanceof COMBUSTIBLEXUEB)) {
            return false;
        }
        return id != null && id.equals(((COMBUSTIBLEXUEB) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "COMBUSTIBLEXUEB{" +
            "id=" + getId() +
            ", cantidadCombustibleUEB=" + getCantidadCombustibleUEB() +
            ", ueb='" + getUeb() + "'" +
            "}";
    }
}
