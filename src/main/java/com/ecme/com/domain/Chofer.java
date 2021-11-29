package com.ecme.com.domain;

import com.ecme.com.domain.enumeration.Licencia;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Chofer.
 */
@Entity
@Table(name = "chofer")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Chofer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Enumerated(EnumType.STRING)
    @Column(name = "licencia")
    private Licencia licencia;

    @NotNull
    @Column(name = "no_licencia", nullable = false, unique = true)
    private String no_licencia;

    @OneToMany(mappedBy = "chofer")
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

    public Chofer id(Long id) {
        this.id = id;
        return this;
    }

    public String getNombre() {
        return this.nombre;
    }

    public Chofer nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Licencia getLicencia() {
        return this.licencia;
    }

    public Chofer licencia(Licencia licencia) {
        this.licencia = licencia;
        return this;
    }

    public void setLicencia(Licencia licencia) {
        this.licencia = licencia;
    }

    public String getNo_licencia() {
        return this.no_licencia;
    }

    public Chofer no_licencia(String no_licencia) {
        this.no_licencia = no_licencia;
        return this;
    }

    public void setNo_licencia(String no_licencia) {
        this.no_licencia = no_licencia;
    }

    public Set<Asignacion> getAsignacions() {
        return this.asignacions;
    }

    public Chofer asignacions(Set<Asignacion> asignacions) {
        this.setAsignacions(asignacions);
        return this;
    }

    public Chofer addAsignacion(Asignacion asignacion) {
        this.asignacions.add(asignacion);
        asignacion.setChofer(this);
        return this;
    }

    public Chofer removeAsignacion(Asignacion asignacion) {
        this.asignacions.remove(asignacion);
        asignacion.setChofer(null);
        return this;
    }

    public void setAsignacions(Set<Asignacion> asignacions) {
        if (this.asignacions != null) {
            this.asignacions.forEach(i -> i.setChofer(null));
        }
        if (asignacions != null) {
            asignacions.forEach(i -> i.setChofer(this));
        }
        this.asignacions = asignacions;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Chofer)) {
            return false;
        }
        return id != null && id.equals(((Chofer) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Chofer{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", licencia='" + getLicencia() + "'" +
            ", no_licencia='" + getNo_licencia() + "'" +
            "}";
    }
}
