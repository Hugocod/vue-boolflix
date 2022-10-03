<template>
    <figure>
        <!--   <img :src="`https://image.tmdb.org/t/p/w185${castData}`" alt="" /> -->
        <figcaption>{{ castData[0].name }}</figcaption>
        <h1>ciaooooooooooo</h1>
    </figure>
</template>

<script>
export default {
    name: "CastingCard",
    data() {
        return {
            castData: this.castValues,
        };
    },
    props: {
        castValues: Array,
    },
};
</script>

<style scoped lang="scss">
.container {
    background-color: rgb(186, 92, 92);
}

img {
    height: 70px;
    width: 70px;

    object-fit: cover;
    border-radius: 1rem;
}

figcaption {
    font-size: 0.7rem;
    text-align: center;
    max-width: 70px;
}

figure {
    margin: 0;
    padding: 0.7rem;

    color: white;
}
</style>
