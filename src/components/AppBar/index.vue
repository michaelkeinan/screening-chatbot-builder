<template>
  <header
    class="app-bar" >
    <div
      class="logo">
      <img
        v-tooltip="getTooltipObject($t('tooltips.appHeaderIconTooltip'))"
        src="../../assets/paradox_Web-Logo.png"
        alt="logo"
      >
    </div>
    <div class="tiny-vertical-spacer" />
    <div
      class="app-header-title" >
      {{ $t('titles.appHeaderTitle') }}
    </div>
  </header>
</template>

<script>
import { getVTooltipObject } from '../../common/helper.js'

export default {
  name: 'AppBar',

  methods: {
        getTooltipObject: function (content) {
            return getVTooltipObject(content)
        },
    }
}
</script>

<style scoped>
.app-bar {
  z-index: 15;
  width: 100%;
  height: 6vh;
  display: flex;
  box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.3);
  background-color: #9a9a9a;
}
.logo {
  width: 12%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo > img {
  height: 70%;
  object-fit: contain;
}
.tiny-vertical-spacer {
  width: 0.05%;
  background-color: var(--color-gray);
}
.app-header-title {
  display: flex;
  padding-left: 2em;
  align-items: center;
  font-family: Mulish;
  font-size: 4rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: var(--color-black-text);
}
</style>
