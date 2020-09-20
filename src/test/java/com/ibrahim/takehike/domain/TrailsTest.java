package com.ibrahim.takehike.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.ibrahim.takehike.web.rest.TestUtil;

public class TrailsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Trails.class);
        Trails trails1 = new Trails();
        trails1.setId(1L);
        Trails trails2 = new Trails();
        trails2.setId(trails1.getId());
        assertThat(trails1).isEqualTo(trails2);
        trails2.setId(2L);
        assertThat(trails1).isNotEqualTo(trails2);
        trails1.setId(null);
        assertThat(trails1).isNotEqualTo(trails2);
    }
}
