<template>
    <div class="container">
        <div v-for="(star, i) in turnVoteIntoStar(vote)" :key="i">
            <i v-if="star === true" class="fa-solid fa-star"></i>
            <i v-else class="fa-regular fa-star"></i>
        </div>
    </div>
</template>

<script>
export default {
    name: "StarsRating",

    data() {
        return {
            starsStatus: [false, false, false, false, false], // determina quali stelle saranno piene e quali no nelle review
        };
    },

    props: { vote: Number },

    methods: {
        turnVoteIntoStar(vote) {
            /////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////

            this.starsStatus = [false, false, false, false, false];

            let numberOfCheckedStars = Math.round(vote / 2);

            for (let index = 0; index < numberOfCheckedStars; index++) {
                this.starsStatus[index] = true;
            }

            return this.starsStatus; // questo è un array che indica quante stelle sono piene(accese) e quante no

            /////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////
        },
    },
};
</script>

<style scoped lang="scss">
.container {
    display: flex;

    .fa-star {
        color: yellow;
    }
}
</style>
