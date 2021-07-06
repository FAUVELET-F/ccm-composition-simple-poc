package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ParametreCompositionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ParametreComposition.class);
        ParametreComposition parametreComposition1 = new ParametreComposition();
        parametreComposition1.setId(1L);
        ParametreComposition parametreComposition2 = new ParametreComposition();
        parametreComposition2.setId(parametreComposition1.getId());
        assertThat(parametreComposition1).isEqualTo(parametreComposition2);
        parametreComposition2.setId(2L);
        assertThat(parametreComposition1).isNotEqualTo(parametreComposition2);
        parametreComposition1.setId(null);
        assertThat(parametreComposition1).isNotEqualTo(parametreComposition2);
    }
}
