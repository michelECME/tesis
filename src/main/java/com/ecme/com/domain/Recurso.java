package com.ecme.com.domain;

import com.ecme.com.domain.enumeration.TipoRecurso;
import com.ecme.com.domain.enumeration.UnidadDeMedida;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Recurso.
 */
@Entity
@Table(name = "recurso")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Recurso implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Enumerated(EnumType.STRING)
    @Column(name = "um")
    private UnidadDeMedida um;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo")
    private TipoRecurso tipo;

    @OneToMany(mappedBy = "recurso")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "chofer", "recurso" }, allowSetters = true)
    private Set<Asignacion> asignacions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Recurso id(Long id) {
        this.id = id;
        return this;
    }

    public String getNombre() {
        return this.nombre;
    }

    public Recurso nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public UnidadDeMedida getUm() {
        return this.um;
    }

    public Recurso um(UnidadDeMedida um) {
        this.um = um;
        return this;
    }

    public void setUm(UnidadDeMedida um) {
        this.um = um;
    }

    public TipoRecurso getTipo() {
        return this.tipo;
    }

    public Recurso tipo(TipoRecurso tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(TipoRecurso tipo) {
        this.tipo = tipo;
    }

    public Set<Asignacion> getAsignacions() {
        return this.asignacions;
    }

    public Recurso asignacions(Set<Asignacion> asignacions) {
        this.setAsignacions(asignacions);
        return this;
    }

    public Recurso addAsignacion(Asignacion asignacion) {
        this.asignacions.add(asignacion);
        asignacion.setRecurso(this);
        return this;
    }

    public Recurso removeAsignacion(Asignacion asignacion) {
        this.asignacions.remove(asignacion);
        asignacion.setRecurso(null);
        return this;
    }

    public void setAsignacions(Set<Asignacion> asignacions) {
        if (this.asignacions != null) {
            this.asignacions.forEach(i -> i.setRecurso(null));
        }
        if (asignacions != null) {
            asignacions.forEach(i -> i.setRecurso(this));
        }
        this.asignacions = asignacions;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Recurso)) {
            return false;
        }
        return id != null && id.equals(((Recurso) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Recurso{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", um='" + getUm() + "'" +
            ", tipo='" + getTipo() + "'" +
            "}";
    }
}
