<template>
  <div class="grey lighten-4" style="min-height: 100vh">
    <Navbar />
    <v-container class="my-16">
      <article class="white pa-5 mt-10 rounded-lg">
        <p class="text-h6">Lembar Berita</p>
        <ListItems
          :data="items"
          :loadingPage="loadingPage"
          :loadingBtn="loadingBtn"
          @more="btnMore"
        />
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
    return {
      items: null,
      page: 1,
      offest: 5,
      loadingPage: false,
      loadingBtn: false,
    };
  },
  mounted() {
    this.loadingPage = true;
    this.$axios
      .get("https://apis.modoc.co.id/news/release?limit=5")
      .then((response) => {
        this.items = response.data.news_release;
        this.loadingPage = false;
      })
      .catch((error) => {
        this.loadingPage = false;
        console.log(error);
      });
  },
  methods: {
    btnMore() {
      let numb = this.offest * this.page;
      this.page = this.page += 1;

      this.loadingPage = true;
      this.loadingBtn = true;

      this.$axios
        .get(`https://apis.modoc.co.id/news/release?limit=5&offset=${numb}`)
        .then((response) => {
          let data = response.data.news_release;
          data.forEach((e) => {
            this.items.push(e);
          });
          this.loadingBtn = false;
          this.loadingPage = false;
        })
        .catch((error) => {
          console.log(error);
          this.loadingBtn = false;
          this.loadingPage = false;
        });
    },
  },
};
</script>
