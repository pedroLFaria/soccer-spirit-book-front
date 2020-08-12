<template>
  <div>
    <b-table
      striped
      hover
      :items="items"
      :fields="fields"
      :filter="criteria"
      :filter-function="charactersFilter"
    >
      <template v-slot:cell(icon)="data">
        <div v-on:click="openModal(data.item.name)">
          <b-img-lazy
            v-bind:src="iconsUrls.get(data.item.name) || ''"
            v-bind:name="data.item.name"
            v-bind:key="reloadIcons"
            fluid
            class="char-icons"
          />
        </div>
      </template>
    </b-table>
    <b-modal v-model="modalShow" id="my-Modal" name="my-modal" size="xl">
      <CharacterView v-bind:characterProp="modalCharacter" />
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CharacterTableItems from "../common/CharacterTableItem";
import Character from "../common/Character";
import CharacterView from "../views/Character.vue";
import firebase from "firebase";
import "firebase/storage";

export default Vue.extend({
  name: "CharacterTable",
  components: {
    CharacterView,
  },
  data() {
    return {
      criteria: this.filters,
      fields: [
        {
          key: "icon",
          label: "Icon",
        },
        {
          key: "name",
          sortable: true,
        },
        {
          key: "rarity",
          sortable: true,
        },
        {
          key: "role",
          sortable: true,
        },
        {
          key: "element",
          sortable: true,
        },
        {
          key: "aceSkill",
        },
      ],
      characters: [] as Character[],
      items: [] as CharacterTableItems[],
      modalShow: false,
      modalCharacter: {} as Character,
      iconsUrls: new Map(),
      reloadIcons: false,
    };
  },
  methods: {
    charactersFilter(
      character: CharacterTableItems,
      filterProp: { elements: string[]; roles: string[]; raritys: string[] }
    ) {
      return (
        (!filterProp.elements.length ||
          filterProp.elements.find(element => character.element == element)) &&
        (!filterProp.roles.length ||
          filterProp.roles.find(role => character.role == role)) &&
        (!filterProp.raritys.length ||
          filterProp.raritys.find(rarity => character.rarity == rarity))
      );
    },
    getImagUrl(picName: string) {
      let requireImage;
      try {
        requireImage = require("../assets/icons/" + picName + ".png");
      } catch {
        requireImage = "https://http.cat/404";
      }
      return requireImage;
    },
    getAsyncImage(picName: string) {
      firebase
        .storage()
        .refFromURL(
          `gs://soccer-spirit-book-1a4fc.appspot.com/icons/${picName}.png`
        )
        .getDownloadURL()
        .then((url) => {
          this.iconsUrls.set(picName, url);
        })
        .catch((e) => {
          this.iconsUrls.set(picName, "https://http.cat/404");
          console.error(e);
        })
        .then(() => (this.reloadIcons = !this.reloadIcons));
    },
    openModal(characterName: string) {
      const character = this.characters.find(
        (character) => character.name == characterName
      );
      if (character) {
        this.modalCharacter = character;
        this.modalShow = !this.modalShow;
      }
    },
  },
  beforeMount() {
    fetch("/characters.json")
      .then((response) => response.json())
      .then((data) => data as Character[])
      .then((characters) => {
        this.characters = characters;
        this.items = characters.map((character) => {
          this.getAsyncImage(character.name);
          return {
            name: character.name,
            role: character.role,
            rarity: character.rarity,
            element: character.element,
            aceSkill: character.ace.skill,
          };
        });
      });
  },
  props: ["filters"],
});
</script>

<style>
.char-icons {
  max-width: 80px;
}
</style>