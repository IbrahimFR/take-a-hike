package com.ibrahim.takehike.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.ibrahim.takehike.web.rest.TestUtil;

public class BookingsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Bookings.class);
        Bookings bookings1 = new Bookings();
        bookings1.setId(1L);
        Bookings bookings2 = new Bookings();
        bookings2.setId(bookings1.getId());
        assertThat(bookings1).isEqualTo(bookings2);
        bookings2.setId(2L);
        assertThat(bookings1).isNotEqualTo(bookings2);
        bookings1.setId(null);
        assertThat(bookings1).isNotEqualTo(bookings2);
    }
}
