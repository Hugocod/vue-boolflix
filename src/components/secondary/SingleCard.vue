<template>
    <div class="container" @click="$emit('isClicked', cardId)">
        <img v-if="isAvailable" :src="url" alt="" @error="isAvailable = false" />
        <div v-else class="unavailable">
            <h1>🤯</h1>
            <h2>unavailable image</h2>
        </div>
    </div>
</template>

<script>
export default {
    name: "SingleCard",
    data() {
        return {
            cardId: this.id,
            isAvailable: true,
        };
    },
    props: { url: String, id: Number },
};
</script>

<style scoped lang="scss">
.container {
    padding: 1rem 1rem;

    width: calc(100% / 5 - 2rem);

    @media only screen and (max-width: 1100px) {
        width: calc(100% / 4 - 2rem);
    }
    @media only screen and (max-width: 700px) {
        width: calc(100% / 3 - 2rem);
    }
    @media only screen and (max-width: 500px) {
        width: calc(100% / 2 - 2rem);
    }
    @media only screen and (max-width: 400px) {
        width: 100%;
    }

    img {
        width: 100%;
        border-radius: 0.6rem;

        transition: all ease-in-out 0.2s;

        &:hover {
            transform: scale(1.07);
            outline: 2px solid white;
        }
    }

    .unavailable {
        background-color: rgb(179, 171, 171);
        height: 100%;
        border-radius: 0.6rem;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        h1 {
            font-size: 3rem;
            padding: 0;
            margin: 0;

            color: white;
        }

        h2 {
            font-size: 1rem;
            padding: 0;
            margin: 0;

            color: white;
        }
    }
}
</style>
