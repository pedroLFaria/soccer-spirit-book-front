<template>
  <b-container fluid>
    <b-row>
      <b-col cols="4">
        <b-img fluid thumbnail blank-color="red" :src="artUrl" />
      </b-col>
      <b-col>
        <b-row>
          <p>{{this.character.ace.skill}}</p>
        </b-row>
        <div>
          <b-row class="skills">
            <h5>{{this.character.skills.active.name}}</h5>
            <div>{{getActiveSkillText()}}</div>
          </b-row>
          <b-row class="skills">
            <h5>{{this.character.skills.passive[0].name}}</h5>
            <div>{{getPassive(0)}}</div>
          </b-row>
          <b-row class="skills">
            <h5>{{this.character.skills.passive[1].name}}</h5>
            <div>{{getPassive(1)}}</div>
          </b-row>
          <b-row class="skills">
            <h5>{{this.character.skills.passive[2].name}}</h5>
            <div>{{getPassive(2)}}</div>
          </b-row>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from "vue";
import Character from "../common/Character";
import firebase from "firebase";
import "firebase/storage";

export default Vue.extend({
  data() {
    return {
      character: {} as Character,
      artUrl: ""
    };
  },
  methods: {
    getActiveSkillText() {
      const activeSkill = this.character.skills.active;
      return `[${activeSkill.type} spirit] ${activeSkill.text} (Cost: ${
        activeSkill.spiritCost / 100
      } spirit, Cooldown: ${activeSkill.cooldown} minutes)`;
    },
    getPassive(n: number) {
      const passiveSkill = this.character.skills.passive[n];
      return passiveSkill.text;
    },
    getAsyncImage() {
      firebase
        .storage()
        .refFromURL(
          `gs://soccer-spirit-book-1a4fc.appspot.com/art/${this.character.name}.png`
        )
        .getDownloadURL()
        .then((url) => {
          this.artUrl = url;
        })
        .catch((e) => {
          this.artUrl = "https://http.cat/404";
          console.error(e);
        });
    },
  },
  props: {
    characterProp: { type: Object as () => Character },
  },
  beforeMount: function () {
    this.character = this.characterProp;
    this.getAsyncImage()
  },
});
</script>

<style>
.skills {
  margin: 1px;
  border-bottom: solid 1px grey;
}
.skills div {
  padding: 1%;
}
</style>