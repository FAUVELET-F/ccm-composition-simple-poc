package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mycompany.myapp.domain.enumeration.ParametreCompositionType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ParametreComposition.
 */
@Entity
@Table(name = "parametre_composition")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ParametreComposition implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nom_balise_xml")
    private String nomBaliseXml;

    @Column(name = "libelle")
    private String libelle;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private ParametreCompositionType type;

    @OneToMany(mappedBy = "parametreComposition")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "childParams", "template", "parametreComposition" }, allowSetters = true)
    private Set<ParametreComposition> childParams = new HashSet<>();

    @ManyToOne
    private Template template;

    @ManyToOne
    @JsonIgnoreProperties(value = { "childParams", "template", "parametreComposition" }, allowSetters = true)
    private ParametreComposition parametreComposition;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ParametreComposition id(Long id) {
        this.id = id;
        return this;
    }

    public String getNomBaliseXml() {
        return this.nomBaliseXml;
    }

    public ParametreComposition nomBaliseXml(String nomBaliseXml) {
        this.nomBaliseXml = nomBaliseXml;
        return this;
    }

    public void setNomBaliseXml(String nomBaliseXml) {
        this.nomBaliseXml = nomBaliseXml;
    }

    public String getLibelle() {
        return this.libelle;
    }

    public ParametreComposition libelle(String libelle) {
        this.libelle = libelle;
        return this;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public ParametreCompositionType getType() {
        return this.type;
    }

    public ParametreComposition type(ParametreCompositionType type) {
        this.type = type;
        return this;
    }

    public void setType(ParametreCompositionType type) {
        this.type = type;
    }

    public Set<ParametreComposition> getChildParams() {
        return this.childParams;
    }

    public ParametreComposition childParams(Set<ParametreComposition> parametreCompositions) {
        this.setChildParams(parametreCompositions);
        return this;
    }

    public ParametreComposition addChildParams(ParametreComposition parametreComposition) {
        this.childParams.add(parametreComposition);
        parametreComposition.setParametreComposition(this);
        return this;
    }

    public ParametreComposition removeChildParams(ParametreComposition parametreComposition) {
        this.childParams.remove(parametreComposition);
        parametreComposition.setParametreComposition(null);
        return this;
    }

    public void setChildParams(Set<ParametreComposition> parametreCompositions) {
        if (this.childParams != null) {
            this.childParams.forEach(i -> i.setParametreComposition(null));
        }
        if (parametreCompositions != null) {
            parametreCompositions.forEach(i -> i.setParametreComposition(this));
        }
        this.childParams = parametreCompositions;
    }

    public Template getTemplate() {
        return this.template;
    }

    public ParametreComposition template(Template template) {
        this.setTemplate(template);
        return this;
    }

    public void setTemplate(Template template) {
        this.template = template;
    }

    public ParametreComposition getParametreComposition() {
        return this.parametreComposition;
    }

    public ParametreComposition parametreComposition(ParametreComposition parametreComposition) {
        this.setParametreComposition(parametreComposition);
        return this;
    }

    public void setParametreComposition(ParametreComposition parametreComposition) {
        this.parametreComposition = parametreComposition;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ParametreComposition)) {
            return false;
        }
        return id != null && id.equals(((ParametreComposition) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ParametreComposition{" +
            "id=" + getId() +
            ", nomBaliseXml='" + getNomBaliseXml() + "'" +
            ", libelle='" + getLibelle() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
