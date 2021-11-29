package com.ecme.com.domain;

import com.ecme.com.domain.enumeration.Estado;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Motor.
 */
@Entity
@Table(name = "motor")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Motor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "codigo", unique = true)
    private String codigo;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado")
    private Estado estado;

    @Column(name = "marca")
    private String marca;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Motor id(Long id) {
        this.id = id;
        return this;
    }

    public String getCodigo() {
        return this.codigo;
    }

    public Motor codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Estado getEstado() {
        return this.estado;
    }

    public Motor estado(Estado estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }

    public String getMarca() {
        return this.marca;
    }

    public Motor marca(String marca) {
        this.marca = marca;
        return this;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Motor)) {
            return false;
        }
        return id != null && id.equals(((Motor) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Motor{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", estado='" + getEstado() + "'" +
            ", marca='" + getMarca() + "'" +
            "}";
    }
}
