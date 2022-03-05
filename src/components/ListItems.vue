<template>
  <div>
    <v-row v-if="data">
      <v-col cols="12" class="mb-10" v-for="(item, i) in data" :key="i.news_id">
        <v-card flat :to="`/blog/${item.news_id}/${item.slug}`">
          <v-row>
            <v-col cols="12" sm="5">
              <v-img
                class="rounded-xl ma-auto"
                :src="item.img_banner"
                :lazy-src="item.img_banner"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-col>
            <v-col cols="12" sm="7">
              <v-skeleton-loader
                :loading="loadingPage"
                type="list-item-avatar-two-line, paragraph"
              >
                <v-list two-line>
                  <v-list-item>
                    <div class="pr-3">
                      <!-- add badge -->
                      <v-badge
                        v-if="item.is_mechanic"
                        offset-y="18"
                        bordered
                        color="light-blue lighten-1"
                        overlap
                        avatar
                      >
                        <template v-slot:badge>
                          <v-avatar>
                            <v-icon x-small color="white"
                              >mdi-check-bold</v-icon
                            >
                          </v-avatar>
                        </template>

                        <v-avatar size="40">
                          <v-img :src="item.img_profile"></v-img>
                        </v-avatar>
                      </v-badge>
                      <!-- non badge -->
                      <v-avatar v-else color="light-blue lighten-1" size="40">
                        <template v-if="item.img_profile !== null">
                          <v-img :src="item.img_profile"></v-img>
                        </template>
                        <v-icon v-else dark> mdi-account </v-icon>
                      </v-avatar>
                    </div>

                    <v-list-item-content two-line>
                      <v-list-item-title class="text-caption">
                        {{ item.first_name }} {{ item.last_name }}
                      </v-list-item-title>
                      <v-list-item-subtitle class="text-caption text-secondary">
                        {{ timeAgo(item.created_at) }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <p>
                    {{ item.title }}
                  </p>
                </v-list>
              </v-skeleton-loader>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" class="text-center">
        <v-btn :loading="loadingBtn" rounded outlined text raised @click="more">
          Lihat Lainnya
          <v-icon>mdi-arrow-right-thin</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <p v-else>Memuat data...</p>
  </div>
</template>

<script>
export default {
  name: "ListItems",
  props: {
    data: Array,
    loadingPage: Boolean,
    loadingBtn: Boolean,
  },
  data() {
    return {};
  },
  methods: {
    more() {
      this.$emit("more");
    },
    timeAgo(dateParam) {
      if (!dateParam) {
        return null;
      }

      const today = new Date();
      const date = new Date(dateParam);

      const waktu1 = today.getTime();
      const waktu2 = date.getTime();

      const mili = waktu1 - waktu2;
      const second = mili / 1000;
      const minutes = Math.floor(second / 60);
      const hourse = Math.floor(minutes / 60);
      const day = Math.floor(hourse / 24);
      const week = Math.floor(day / 7);
      const month = Math.floor(week / 4);
      const years = Math.floor(month / 12);

      const MONTH_NAMES = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const getDay = date.getDate();
      const getMonth = MONTH_NAMES[date.getMonth()];
      const getYear = date.getFullYear();
      const getDate = `${getDay} ${getMonth} ${getYear}`;

      if (second < 5) {
        return "baru";
      } else if (minutes < 60) {
        return `${minutes} menit yang lalu`;
      } else if (hourse < 24) {
        return `${hourse} jam yang lalu`;
      } else if (day < 7) {
        return `${day} hari yang lalu`;
      } else if (week < 4) {
        return `${week} minggu yang lalu`;
      } else if (month < 12) {
        return `${month} bulan yang lalu`;
      } else if (years < 3) {
        return `${years} tahun yang lalu`;
      }
      return getDate;
    },
  },
};
</script>
