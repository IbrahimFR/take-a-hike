package com.ibrahim.takehike.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Trails.
 */
@Entity
@Table(name = "trails")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Trails implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "start_time")
    private Instant startTime;

    @Column(name = "end_time")
    private Instant endTime;

    @Column(name = "age_limit")
    private String ageLimit;

    @Column(name = "price")
    private String price;

    @OneToMany(mappedBy = "trail")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Bookings> bookings = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Trails name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Instant getStartTime() {
        return startTime;
    }

    public Trails startTime(Instant startTime) {
        this.startTime = startTime;
        return this;
    }

    public void setStartTime(Instant startTime) {
        this.startTime = startTime;
    }

    public Instant getEndTime() {
        return endTime;
    }

    public Trails endTime(Instant endTime) {
        this.endTime = endTime;
        return this;
    }

    public void setEndTime(Instant endTime) {
        this.endTime = endTime;
    }

    public String getAgeLimit() {
        return ageLimit;
    }

    public Trails ageLimit(String ageLimit) {
        this.ageLimit = ageLimit;
        return this;
    }

    public void setAgeLimit(String ageLimit) {
        this.ageLimit = ageLimit;
    }

    public String getPrice() {
        return price;
    }

    public Trails price(String price) {
        this.price = price;
        return this;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public Set<Bookings> getBookings() {
        return bookings;
    }

    public Trails bookings(Set<Bookings> bookings) {
        this.bookings = bookings;
        return this;
    }

    public Trails addBookings(Bookings bookings) {
        this.bookings.add(bookings);
        bookings.setTrail(this);
        return this;
    }

    public Trails removeBookings(Bookings bookings) {
        this.bookings.remove(bookings);
        bookings.setTrail(null);
        return this;
    }

    public void setBookings(Set<Bookings> bookings) {
        this.bookings = bookings;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Trails)) {
            return false;
        }
        return id != null && id.equals(((Trails) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Trails{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", startTime='" + getStartTime() + "'" +
            ", endTime='" + getEndTime() + "'" +
            ", ageLimit='" + getAgeLimit() + "'" +
            ", price='" + getPrice() + "'" +
            "}";
    }
}
