package com.ibrahim.takehike.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.ibrahim.takehike.web.rest.TestUtil;

public class UsersTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Users.class);
        Users users1 = new Users();
        users1.setId(1L);
        Users users2 = new Users();
        users2.setId(users1.getId());
        assertThat(users1).isEqualTo(users2);
        users2.setId(2L);
        assertThat(users1).isNotEqualTo(users2);
        users1.setId(null);
        assertThat(users1).isNotEqualTo(users2);
    }
}
