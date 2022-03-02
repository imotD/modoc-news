<template>
  <div class="grey lighten-4">
    <Navbar />
    <v-container class="my-16">
      <article class="white pa-5 mt-10 rounded-lg">
        <p class="text-h6">Lembar Berita</p>
        <v-row>
          <ListItems v-for="i in 5" :key="i" />
        </v-row>
      </article>
    </v-container>
  </div>
</template>

<script>
import ListItems from "../components/ListItems.vue";
import Navbar from "../components/Navbar.vue";
export default {
  name: "Home",
  components: {
    Navbar,
    ListItems,
  },
  data() {
    return {};
  },
};
</script>
