<template>
  <div class="landing-component">
    <v-row class="main-row">
      <v-col>
        <v-card
          color="var(--v-primary-darken4)"
          class="mx-auto main-card"
          max-width="500px"
          height="400px"
        >
          <v-img src="@/assets/landing-img.svg" height="250px"></v-img>

          <v-card-title class="white--text">
            Erick Alejandro Molina Garcia 20201002723
          </v-card-title>

          <v-card-subtitle class="white--text">
            Inteligencia Artificial 0700 UNAH</v-card-subtitle
          >

          <v-row justify="center">
            <v-col cols="6" md="3" lg="4">
              <v-btn color="var(--v-success-base)" @click="goToChat"
                >Ir al Chat</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "LandingPage",
})
export default class LandingPage extends Vue {
  goToChat() {
    this.$router.push("/chat");
  }
}
</script>

<style scoped>
.landing-component {
  padding: 1rem;
  height: 100% !important;
  background-color: var(--v-primary-lighten2);
}

.main-row {
  height: 100%;
  align-content: center;
}

.main-card {
  border-radius: 12px;
}
</style>
