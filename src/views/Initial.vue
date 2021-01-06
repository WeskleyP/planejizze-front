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
                src="../assets/primeiro.svg"
                alt="Primeiro svg"
                class="imgcss"
            />
            <v-img
                src="../assets/oval.svg"
                alt="Primeiro svg"
                class="imgcss2"
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
    transform: scaleY(1);
    position: absolute;
    width: 1099.83px;
    height: auto;
    left: 0px;
    top: 0px;
}
.imgcss2 {
    transform: scaleY(1);
    position: absolute;
    width: 467.05px;
    height: 708.7px;
    left: 600px;
    top: 625.93px;
}
ul {
    padding-left: 0px;
}
</style>
