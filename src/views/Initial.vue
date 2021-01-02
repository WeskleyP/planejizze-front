<template>
    <hooper
        :vertical="true"
        style="height: 100%"
        :itemsToShow="1"
        :centerMode="true"
        class="pa-0 ma-0 hp"
    >
        <slide class="pa-0 ma-0">
            <v-img
                src="../assets/primeiroSvg.png"
                alt="Primeiro svg"
                class="imgcss"
                height="100%"
                width="100%"
            />
        </slide>
        <slide class="pa-0 ma-0">
            slide 2
        </slide>
        <slide class="pa-0 ma-0">
            slide 3
        </slide>
        <slide class="pa-0 ma-0">
            slide 4
        </slide>
    </hooper>
</template>
<script>
import { Hooper, Slide } from "hooper";

export default {
    components: {
        Hooper,
        Slide
    }
};
</script>
<style scoped>
.imgcss {
    transform: scaleY(-1);
}
div > ul {
    padding-left: 0px;
}
</style>
