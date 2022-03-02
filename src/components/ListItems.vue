<template>
  <div>
    <v-col cols="12" class="mb-10">
      <v-card flat>
        <v-row>
          <v-col cols="5">
            <v-img
              class="rounded-xl ma-auto"
              src="https://kotak.modoc.co.id/news/headline_20220224101807.jpg"
              lazy-src="https://picsum.photos/id/11/100/60"
              height="200"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-col>
          <v-col>
            <v-list two-line>
              <v-list-item>
                <div class="pr-3">
                  <v-badge
                    offset-y="18"
                    bordered
                    color="light-blue lighten-1"
                    icon="mdi-check-bold"
                    overlap
                  >
                    <v-avatar size="40">
                      <v-img
                        src="https://kotak.modoc.co.id/images/profile/60b6e88193477.png"
                      ></v-img>
                    </v-avatar>
                  </v-badge>
                </div>

                <v-list-item-content>
                  <v-list-item-title class="text-caption">
                    Modoc News Official
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-caption text-secondary">
                    20 jam yang lalu
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas
                temporibus dolorem, corrupti dolor fugiat delectus consectetur
                quod suscipit tenetur illo?
              </p>
            </v-list>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </div>
</template>

<script>
export default {
  name: "ListItems",
};
</script>

<style lang="sass" scoped>
</style>