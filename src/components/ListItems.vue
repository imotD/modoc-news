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
                        <!-- 20 jam yang lalu -->
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
    getFormattedDate(date, prefomattedDate = false, hideYear = false) {
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
      const day = date.getDate();
      const month = MONTH_NAMES[date.getMonth()];
      const year = date.getFullYear();
      const hours = date.getHours();
      let minutes = date.getMinutes();

      if (minutes < 10) {
        // Adding leading zero to minutes
        minutes = `0${minutes}`;
      }

      if (prefomattedDate) {
        // Today at 10:20
        // Yesterday at 10:20
        return `${prefomattedDate} at ${hours}:${minutes}`;
      }

      if (hideYear) {
        // 10. January at 10:20
        return `${day}. ${month} at ${hours}:${minutes}`;
      }

      // 10. January 2017. at 10:20
      return `${day}. ${month} ${year}. at ${hours}:${minutes}`;
    },
    timeAgo(dateParam) {
      if (!dateParam) {
        return null;
      }
      const date =
        typeof dateParam === "object" ? dateParam : new Date(dateParam);

      const DAY_IN_MS = 86400; // 24 * 60 * 60 * 1000
      const today = new Date();
      const yesterday = new Date(today - DAY_IN_MS);
      console.log(today, DAY_IN_MS);
      const seconds = Math.round((today - date) / 1000);
      const minutes = Math.round(seconds / 60);
      const hourse = Math.round(minutes / 3600);
      const isToday = today.toDateString() === date.toDateString();
      const isYesterday = yesterday.toDateString() === date.toDateString();
      const isThisYear = today.getFullYear() === date.getFullYear();
      if (seconds < 5) {
        return "baru";
      } else if (seconds < 90) {
        return `${seconds} detik yang lalu`;
      } else if (minutes < 60) {
        return `${minutes} menit yang lalu`;
      } else if (hourse < 3600) {
        return `${hourse} jam yang lalu`;
      } else if (isToday) {
        return this.getFormattedDate(date, "Today"); // Today at 10:20
      } else if (isYesterday) {
        return this.getFormattedDate(date, "Yesterday"); // Yesterday at 10:20
      } else if (isThisYear) {
        return this.getFormattedDate(date, false, true); // 10. January at 10:20
      }
      return this.getFormattedDate(date); // 10. January 2017. at 10:20
    },
  },
};
</script>
