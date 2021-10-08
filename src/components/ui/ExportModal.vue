<template>
<v-dialog
  v-model="show" 
  flat
  max-width="600">
  <v-card class="pa-5">
    <div class="pa-4 code-wrapper">
      <pre>{{ code }}</pre>
    </div>
    <div class="code-header mt-8">
      <!-- <p class="text-body mb-0" style="display: inline-block">
        Download or copy this code 
      </p> -->
      <v-btn :ripple="false" class="btn--copy" @click="copyCode">
        Copy <v-icon>mdi-content-copy</v-icon>
      </v-btn>
      <v-btn :ripple="false" class="btn--copy" @click="downloadCode">
        Download <v-icon>mdi-download</v-icon>
      </v-btn> 
    </div>
  </v-card>
</v-dialog> 
</template>
<script>
export default {
  props: {
    code: String
  },
  emits: {},
  components: {
  },
  data () {
    return {
      show: false
    }
  },
  mounted() {},
  methods: {
    toggle () {
      this.show = !this.show
    },
    downloadCode () {
      this.downloadText(this.code)
    },
    copyCode () {
      this.copyToClipboard(this.code)
    },
    copyToClipboard (textToCopy) {
      // navigator clipboard api needs a secure context (https)
      if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard api method'
        return navigator.clipboard.writeText(textToCopy)
      } else {
        // text area method
        let textArea = document.createElement("textarea")
        textArea.value = textToCopy
        // make the textarea out of viewport
        textArea.style.position = "fixed"
        textArea.style.left = "-999999px"
        textArea.style.top = "-999999px"
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        return new Promise((res, rej) => {
          // here the magic happens
          document.execCommand('copy') ? res() : rej()
          textArea.remove()
        })
      }
    },
    downloadText (text) {
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', 'index.html');
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  },
}
</script>

<style lang="scss" scoped>
.theme--light.v-application code {
  background-color: transparent;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.code-wrapper {
  background-color: #424242;
  color: white;
  border-radius: 12px;
  font-family: 'Courier New', Courier, monospace;
  max-height: 60vh;
  overflow-y: scroll;
}

pre {
    white-space: pre-wrap;       /* Since CSS 2.1 */
    white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
    white-space: -pre-wrap;      /* Opera 4-6 */
    white-space: -o-pre-wrap;    /* Opera 7 */
    word-wrap: break-word;       /* Internet Explorer 5.5+ */
}
</style>