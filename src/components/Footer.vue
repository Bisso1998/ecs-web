<template>
    <div>
        <div class="top-footer">
            Test<br>
            Test
        </div>
        <footer>
            <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                  <v-flex xs12 class="copyright">
                      <p>
                          © {{ new Date().getFullYear() }} Nasadiya Tech. Pvt. Ltd. | 
                          <a href="/privacy-policy">{{ $t("footer_privacy_policy") }}</a> |
                          <a href="/terms-of-service">{{ $t("footer_terms_of_service") }}</a>
                      </p>
                  </v-flex>
              </v-layout>
          </v-container>
        </footer>
    </div>
</template>

<script>

export default {
    
}
</script>

<style lang="scss" scoped>
    .top-footer {
        background: #212121;
    }
    footer {
        background: #191919;
        color: #fff;
    }
</style>
