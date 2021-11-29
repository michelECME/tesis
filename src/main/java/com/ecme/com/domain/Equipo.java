package com.ecme.com.domain;

import com.ecme.com.domain.enumeration.Clase;
import com.ecme.com.domain.enumeration.Estado;
import com.ecme.com.domain.enumeration.UEB;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Equipo.
 */
@Entity
@Table(name = "equipo")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Equipo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "chapilla", unique = true)
    private String chapilla;

    @Enumerated(EnumType.STRING)
    @Column(name = "clase")
    private Clase clase;

    @Column(name = "modelo")
    private String modelo;

    @Column(name = "codigo", unique = true)
    private String codigo;

    @Column(name = "chapa", unique = true)
    private String chapa;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado")
    private Estado estado;

    @Column(name = "anno")
    private Integer anno;

    @Enumerated(EnumType.STRING)
    @Column(name = "ueb")
    private UEB ueb;

    @Column(name = "marca")
    private String marca;

    @OneToOne
    @JoinColumn(unique = true)
    private Motor motor;

    @JsonIgnoreProperties(value = { "asignacions" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Chofer chofer;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Equipo id(Long id) {
        this.id = id;
        return this;
    }

    public String getChapilla() {
        return this.chapilla;
    }

    public Equipo chapilla(String chapilla) {
        this.chapilla = chapilla;
        return this;
    }

    public void setChapilla(String chapilla) {
        this.chapilla = chapilla;
    }

    public Clase getClase() {
        return this.clase;
    }

    public Equipo clase(Clase clase) {
        this.clase = clase;
        return this;
    }

    public void setClase(Clase clase) {
        this.clase = clase;
    }

    public String getModelo() {
        return this.modelo;
    }

    public Equipo modelo(String modelo) {
        this.modelo = modelo;
        return this;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getCodigo() {
        return this.codigo;
    }

    public Equipo codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getChapa() {
        return this.chapa;
    }

    public Equipo chapa(String chapa) {
        this.chapa = chapa;
        return this;
    }

    public void setChapa(String chapa) {
        this.chapa = chapa;
    }

    public Estado getEstado() {
        return this.estado;
    }

    public Equipo estado(Estado estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }

    public Integer getAnno() {
        return this.anno;
    }

    public Equipo anno(Integer anno) {
        this.anno = anno;
        return this;
    }

    public void setAnno(Integer anno) {
        this.anno = anno;
    }

    public UEB getUeb() {
        return this.ueb;
    }

    public Equipo ueb(UEB ueb) {
        this.ueb = ueb;
        return this;
    }

    public void setUeb(UEB ueb) {
        this.ueb = ueb;
    }

    public String getMarca() {
        return this.marca;
    }

    public Equipo marca(String marca) {
        this.marca = marca;
        return this;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public Motor getMotor() {
        return this.motor;
    }

    public Equipo motor(Motor motor) {
        this.setMotor(motor);
        return this;
    }

    public void setMotor(Motor motor) {
        this.motor = motor;
    }

    public Chofer getChofer() {
        return this.chofer;
    }

    public Equipo chofer(Chofer chofer) {
        this.setChofer(chofer);
        return this;
    }

    public void setChofer(Chofer chofer) {
        this.chofer = chofer;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Equipo)) {
            return false;
        }
        return id != null && id.equals(((Equipo) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Equipo{" +
            "id=" + getId() +
            ", chapilla='" + getChapilla() + "'" +
            ", clase='" + getClase() + "'" +
            ", modelo='" + getModelo() + "'" +
            ", codigo='" + getCodigo() + "'" +
            ", chapa='" + getChapa() + "'" +
            ", estado='" + getEstado() + "'" +
            ", anno=" + getAnno() +
            ", ueb='" + getUeb() + "'" +
            ", marca='" + getMarca() + "'" +
            "}";
    }
}
