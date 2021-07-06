package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Template.
 */
@Entity
@Table(name = "template")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Template implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nom")
    private String nom;

    @ManyToOne
    @JsonIgnoreProperties(value = { "childParams", "parametreComposition" }, allowSetters = true)
    private ParametreComposition template;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Template id(Long id) {
        this.id = id;
        return this;
    }

    public String getNom() {
        return this.nom;
    }

    public Template nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public ParametreComposition getTemplate() {
        return this.template;
    }

    public Template template(ParametreComposition parametreComposition) {
        this.setTemplate(parametreComposition);
        return this;
    }

    public void setTemplate(ParametreComposition parametreComposition) {
        this.template = parametreComposition;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Template)) {
            return false;
        }
        return id != null && id.equals(((Template) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Template{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            "}";
    }
}
