<template>
    <div @click="$emit('isClicked', cardId)">
        <img :src="url" alt="" />
    </div>
</template>

<script>
export default {
    name: "SingleCard",
    data() {
        return {
            cardId: this.id,
        };
    },
    props: { url: String, id: Number },
};
</script>

<style scoped lang="scss">
div {
    padding: 1rem 1rem;
    background-color: black;

    width: calc(100% / 5 - 2rem);

    img {
        width: 100%;
        border-radius: 0.6rem;

        transition: all ease-in-out 0.2s;

        &:hover {
            transform: scale(1.07);
        }
    }
}
</style>
