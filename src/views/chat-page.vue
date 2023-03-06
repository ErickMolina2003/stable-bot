<template>
  <div class="chatting-component">
    <v-main class="pa-0 ma-0 main-wrap px-5">
      <v-row justify="center" class="py-4">
        <v-col cols="6" md="2" lg="2">
          <h4 class="lightgray--text text--darken-3">Chat bot</h4>
        </v-col>
      </v-row>
      <div v-for="(message, index) in messages" :key="index">
        <v-row
          :class="ownChat(message.speaker) ? 'own-chat' : 'user-chat'"
          :justify="ownChat(message.speaker) ? 'end' : 'start'"
          class="mb-5"
        >
          <v-col
            v-if="!ownChat(message.speaker)"
            cols="2"
            md="1"
            lg="1"
            align-self="start"
            class="pr-5"
          >
            <v-row justify="end">
              <v-img
                class="img-chat rounded-circle"
                :src="getImgUrl(message)"
                max-height="40px"
                max-width="40px"
              ></v-img>
            </v-row>
          </v-col>

          <v-col
            v-if="!ownChat(message.speaker)"
            class="chat-content"
            cols="auto"
            md="auto"
            lg="auto"
          >
            <v-row>
              <v-col cols="12" md="12" lg="12" class="pb-0">
                <h3>{{ message.speakerTitle }}</h3>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12" lg="12">
                <h4 class="white--text">
                  {{ message.message }}
                </h4>
              </v-col>
            </v-row>
          </v-col>

          <v-col
            v-if="ownChat(message.speaker)"
            class="chat-content"
            cols="auto"
            md="auto"
            lg="auto"
          >
            <v-row>
              <v-col cols="12" md="12" lg="12" class="pb-0">
                <h3>{{ message.speakerTitle }}</h3>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12" lg="12">
                <h4 class="white--text">
                  {{ message.message }}
                </h4>
              </v-col>
            </v-row>
          </v-col>

          <v-col
            v-if="ownChat(message.speaker)"
            cols="2"
            md="1"
            lg="1"
            align-self="start"
          >
            <v-img
              class="img-chat rounded-circle"
              :src="getImgUrl(message)"
              max-height="40px"
              max-width="40px"
            ></v-img>
          </v-col>
        </v-row>
      </div>
    </v-main>
    <v-footer color="var(--v-primary-lighten2)" app height="72" inset>
      <v-text-field
        @keyup.enter="sendMessage"
        v-model="input"
        background-color="var(--v-primary-darken3)"
        append-icon="mdi-send"
        dark
        label="Escribe un mensaje"
        dense
        flat
        hide-details
        rounded
        solo
      ></v-text-field>
    </v-footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "ChatPage",
})
export default class ChatPage extends Vue {
  user = "yo";
  input = "";

  messages = [
    {
      speaker: "bot",
      speakerTitle: "Erick Molina",
      message: "Este es un test",
    },
    {
      speaker: "yo",
      speakerTitle: "Stable Molina",
      message: "Este es un test del bot",
    },
  ];

  ownChat(speaker: string) {
    if (this.user == speaker) {
      return true;
    }
    return false;
  }

  getImgUrl(message: any) {
    if (message.speaker === "bot") {
      return require("@/assets/usuarios/erick.svg");
    } else {
      return require("@/assets/usuarios/bot2.svg");
    }
  }

  sendMessage() {
    const newMessage = {
      speaker: "yo",
      speakerTitle: "Erick Molina",
      message: this.input,
    };
    this.messages.push(newMessage);
    this.input = "";
  }
}
</script>

<style scoped>
.chatting-component {
  padding: 1rem;
  height: 100% !important;
  background-color: var(--v-primary-lighten2);
}

.chat-content {
  max-width: 70%;
  border-radius: 20px;
}

.user-chat .chat-content {
  background-color: var(--v-primary-lighten1);
}

.user-chat h3 {
  color: var(--v-success-base);
}

.own-chat .chat-content {
  background-color: var(--v-dark-base);
}

.own-chat h3 {
  color: var(--v-error-base);
}
</style>
