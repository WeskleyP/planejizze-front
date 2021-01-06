<template>
    <v-snackbar
        v-model="attributes.open"
        :color="attributes.color"
        vertical
        right
        :timeout="2500"
        top
    >
        <h2>{{ attributes.title }}</h2>
        <hr class="mt-2 mb-2" />
        <span>{{ attributes.text }}</span>
    </v-snackbar>
</template>

<script>
export default {
    props: ["attributes"]
};
</script>
