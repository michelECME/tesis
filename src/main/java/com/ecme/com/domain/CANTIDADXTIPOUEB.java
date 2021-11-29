package com.ecme.com.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CANTIDADXTIPOUEB.
 */
@Entity
@Table(name = "cantidadxtipoueb")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CANTIDADXTIPOUEB implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "cantidad_tipo_ueb")
    private Integer cantidadTipoUEB;

    @Column(name = "tipo_carro")
    private String tipoCarro;

    @Column(name = "ueb")
    private String ueb;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CANTIDADXTIPOUEB id(Long id) {
        this.id = id;
        return this;
    }

    public Integer getCantidadTipoUEB() {
        return this.cantidadTipoUEB;
    }

    public CANTIDADXTIPOUEB cantidadTipoUEB(Integer cantidadTipoUEB) {
        this.cantidadTipoUEB = cantidadTipoUEB;
        return this;
    }

    public void setCantidadTipoUEB(Integer cantidadTipoUEB) {
        this.cantidadTipoUEB = cantidadTipoUEB;
    }

    public String getTipoCarro() {
        return this.tipoCarro;
    }

    public CANTIDADXTIPOUEB tipoCarro(String tipoCarro) {
        this.tipoCarro = tipoCarro;
        return this;
    }

    public void setTipoCarro(String tipoCarro) {
        this.tipoCarro = tipoCarro;
    }

    public String getUeb() {
        return this.ueb;
    }

    public CANTIDADXTIPOUEB ueb(String ueb) {
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
        if (!(o instanceof CANTIDADXTIPOUEB)) {
            return false;
        }
        return id != null && id.equals(((CANTIDADXTIPOUEB) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CANTIDADXTIPOUEB{" +
            "id=" + getId() +
            ", cantidadTipoUEB=" + getCantidadTipoUEB() +
            ", tipoCarro='" + getTipoCarro() + "'" +
            ", ueb='" + getUeb() + "'" +
            "}";
    }
}
