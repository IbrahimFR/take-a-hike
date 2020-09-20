package com.ibrahim.takehike.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

import com.ibrahim.takehike.domain.enumeration.Status;

/**
 * A Bookings.
 */
@Entity
@Table(name = "bookings")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Bookings implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @ManyToOne
    @JsonIgnoreProperties(value = "bookings", allowSetters = true)
    private Trails trail;

    @ManyToOne
    @JsonIgnoreProperties(value = "bookings", allowSetters = true)
    private Users user;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Status getStatus() {
        return status;
    }

    public Bookings status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Trails getTrail() {
        return trail;
    }

    public Bookings trail(Trails trails) {
        this.trail = trails;
        return this;
    }

    public void setTrail(Trails trails) {
        this.trail = trails;
    }

    public Users getUser() {
        return user;
    }

    public Bookings user(Users users) {
        this.user = users;
        return this;
    }

    public void setUser(Users users) {
        this.user = users;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Bookings)) {
            return false;
        }
        return id != null && id.equals(((Bookings) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Bookings{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
