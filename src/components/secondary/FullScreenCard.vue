<template>
    <div
        class="card"
        @click="$emit('closeCard')"
        :style="`background-image: url(https://image.tmdb.org/t/p/w1280${singleMovieData[0].backdrop_path})`"
    >
        <div class="description">
            <!--  /////////////////////////////////////////////////////////////////////
             /////////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////// -->
            <h1>{{ singleMovieData[0].title }}</h1>

            <div class="release-rating">
                <div>
                    <h2>release</h2>
                    <h2>{{ singleMovieData[0].release_date }}</h2>
                </div>

                <div>
                    <h2>rating</h2>
                    <div class="stars-container">
                        <div v-for="(star, i) in turnVoteIntoStar(singleMovieData[0].vote_average)" :key="i">
                            <i v-if="star === true" class="fa-solid fa-star"></i>
                            <i v-else class="fa-regular fa-star"></i>
                        </div>
                    </div>
                </div>

                <div>
                    <h2>Language</h2>
                    <lang-flag :iso="singleMovieData[0].original_language" />
                </div>
            </div>

            <div>
                <h2>Overview</h2>
                <p>{{ singleMovieData[0].overview }}</p>
            </div>

            <div class="cast-container">
                <h2>cast</h2>
                <div class="actor">
                    <figure v-for="(n, i) in 6" :key="i">
                        <img :src="`https://image.tmdb.org/t/p/w185${castData[i].profile_path}`" alt="" />
                        <figcaption>{{ castData[i].name }}</figcaption>
                    </figure>
                </div>
            </div>

            <!--  /////////////////////////////////////////////////////////////////////
             /////////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////// -->
        </div>
        <div class="overlay"></div>
    </div>
</template>

<script>
import axios from "axios";
import LangFlag from "vue-lang-code-flags";
export default {
    name: "FullScreenCard",
    data() {
        return {
            singleMovieData: this.selectedMovie, // l'array che contiene l'oggetto con le info del singolo film scelto dall'utente
            starsStatus: [false, false, false, false, false], // determina quali stelle saranno piene e quali no nelle review
            castData: "ciao",
            apiKey: "4bb110e695fd9ed24938916c07a0dc08",
        };
    },
    props: { url: String, selectedMovie: Array },
    components: { LangFlag },

    methods: {
        turnVoteIntoStar(vote) {
            this.starsStatus = [false, false, false, false, false];

            let numberOfCheckedStars = Math.round(vote / 2);

            for (let index = 0; index < numberOfCheckedStars; index++) {
                this.starsStatus[index] = true;
            }

            return this.starsStatus; // questo è un array che indica quante stelle sono piene(accese) e quante no
        },

        getApiDataCast(movieID, apiKey) {
            axios
                .get(`https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${apiKey}&language=en-US`)
                .then((res) => {
                    if (res.status === 200) {
                        this.castData = res.data.cast;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },

    async mounted() {
        this.getApiDataCast(this.singleMovieData[0].id, this.apiKey);
    },
};
</script>

<style scoped lang="scss">
.card {
    min-height: 100vh;
    width: 100%;
    background-color: rgb(0, 0, 0);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: right;
    position: fixed;
    top: 0;

    z-index: 200;
}

.overlay {
    height: 100vh;
    width: 100%;

    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;

    background: rgb(0, 0, 0);
    background: linear-gradient(90deg, rgba(0, 0, 0, 1) 34%, rgba(0, 0, 0, 0.6474964985994398) 58%, rgba(0, 0, 0, 0) 100%);
}

.description {
    z-index: 100;
    width: 70%;
    min-height: 80vh;

    padding: 3rem;

    display: flex;
    justify-content: space-around;
    align-items: flex-start;

    flex-direction: column;
    position: relative;
}

.stars-container {
    display: flex;

    .fa-star {
        color: yellow;
    }
}

h1,
p,
h2 {
    color: white;
    text-align: left;
}

h1 {
    font-size: 4rem;
    font-family: "Antonio", sans-serif;
    font-weight: 800;
    text-transform: uppercase;
}

h2 {
    font-size: 0.7rem;
    text-transform: uppercase;
    color: gray;
}

.actor {
    display: flex;
    flex-wrap: wrap;

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
}

.release-rating {
    display: flex;
    gap: 2rem;
}
</style>