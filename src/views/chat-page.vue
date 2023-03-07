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
            cols="3"
            md="1"
            lg="1"
            align-self="start"
            class="pr-5"
          >
            <v-row justify="end">
              <v-img
                class="img-chat rounded-circle"
                :src="getImgUrl(message)"
                max-height="80px"
                max-width="80px"
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
                <h2>{{ message.speakerTitle }}</h2>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12" lg="12">
                <h3 class="white--text">
                  {{ message.message }}
                </h3>
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
                <h2>{{ message.speakerTitle }}</h2>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12" lg="12">
                <h3 class="white--text">
                  {{ message.message }}
                </h3>
              </v-col>
            </v-row>
          </v-col>

          <v-col
            v-if="ownChat(message.speaker)"
            cols="3"
            md="1"
            lg="1"
            align-self="start"
          >
            <v-img
              class="img-chat rounded-circle"
              :src="getImgUrl(message)"
              max-height="80px"
              max-width="80px"
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
        dark
        label="Escribe un mensaje"
        dense
        flat
        hide-details
        rounded
        solo
      ></v-text-field>
      <v-btn icon dark @click="sendMessage"><v-icon>mdi-send</v-icon></v-btn>
    </v-footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import axios from "axios";

@Component({
  name: "ChatPage",
})
export default class ChatPage extends Vue {
  user = "yo";
  input = "";

  access = "";

  messages = [
    {
      speaker: "bot",
      speakerTitle: "Stable Erick Bot",
      message:
        "¡Hola! ¡Mi nombre es Stable Erick!\nSoy una Inteligencia Artificial creada por Erick Molina y estoy para servirte en lo que pueda :)",
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

  beforeMount() {
    axios
      .get(
        "https://stable-erick-bot-default-rtdb.firebaseio.com/access/-NPtsnxcNpTiPtUpNohA.json",
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((response) => {
        this.access = response.data.access;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  sendMessage() {
    const newMessage = {
      speaker: "yo",
      speakerTitle: "Erick Molina",
      message: this.input,
    };
    this.messages.push(newMessage);

    const CHAT_ENDPOINT = "https://api.openai.com/v1/chat/completions";

    axios
      .post(
        CHAT_ENDPOINT,
        {
          model: "gpt-3.5-turbo-0301",
          messages: [
            {
              role: "user",
              content: `${this.input}`,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.access}`,
          },
        }
      )
      .then((response) => {
        const newMessage = {
          speaker: "bot",
          speakerTitle: "Stable Erick Bot",
          message: response.data.choices[0].message.content,
        };
        this.messages.push(newMessage);
      })
      .catch((error) => {
        const newMessage = {
          speaker: "bot",
          speakerTitle: "Stable Erick Bot",
          message: "Se han agotado las requests del dia.",
        };
        this.messages.push(newMessage);
        console.error(error);
      });
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

.user-chat h2 {
  color: var(--v-success-base);
}

.own-chat .chat-content {
  background-color: var(--v-dark-base);
}

.own-chat h2 {
  color: var(--v-error-base);
}
</style>
