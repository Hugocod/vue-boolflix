<template>
    <div
        class="card"
        @click="$emit('closeCard')"
        :style="`background-image: url(https://image.tmdb.org/t/p/w1280${singleMovieData[0].backdrop_path})`"
    >
        <div class="description">
            <!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
            <h1 v-if="isThisAMovie">{{ singleMovieData[0].title }}</h1>
            <h1 v-else>{{ singleMovieData[0].name }}</h1>

            <div class="release-rating">
                <div>
                    <h2>release</h2>
                    <h2 v-if="isThisAMovie">{{ singleMovieData[0].release_date }}</h2>
                    <h2 v-else>{{ singleMovieData[0].first_air_date }}</h2>
                </div>

                <div>
                    <h2>rating</h2>
                    <div class="stars-container">
                        <stars-rating :vote="singleMovieData[0].vote_average" />
                    </div>
                </div>

                <div>
                    <h2>Language</h2>
                    <!-- pacchetto icone bandiere compatibile con ISO 639-1 (lo stesso standard usato da TMDB)  -->
                    <lang-flag :iso="singleMovieData[0].original_language" />
                </div>
            </div>

            <div>
                <h2>Overview</h2>
                <p>{{ singleMovieData[0].overview }}</p>
            </div>

            <!--  <casting-card :castValues="castData"></casting-card> -->
            <casting-card :castValues="castData"></casting-card>
            <!-- <casting-card :castValues="['dio', 'dio']"></casting-card> -->

            <!--        <div class="cast-container">
                <h2>cast</h2>
                <div class="actor">
                    <figure>
                        <img :src="`https://image.tmdb.org/t/p/w185${getApiDataCast(this.singleMovieData[0].id, this.apiKey).profile_path}`" alt="" />

                        <figcaption>{{ getApiDataCast(this.singleMovieData[0].id, this.apiKey) }}</figcaption>
                    </figure>
                </div>
            </div>  -->

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
import CastingCard from "./CastingCard.vue";
import StarsRating from "./StarsRating.vue";

export default {
    name: "FullScreenCard",

    data() {
        return {
            singleMovieData: this.selectedMovie, // l'array che contiene l'oggetto con le info del singolo film scelto dall'utente
            apiKey: "4bb110e695fd9ed24938916c07a0dc08",
            castData: [],
            isThisAMovie: this.isMovie, // una props passata dal componente padre che specifica se l'oggetto contiente una serie o un film. é necessaria per gestire le diverse chiavi tra film e serie nella api di TMDB
        };
    },

    props: { url: String, selectedMovie: Array, isMovie: Boolean },

    components: { LangFlag, CastingCard, StarsRating },

    methods: {
        getApiDataCast(movieID, apiKey) {
            axios
                .get(`https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${apiKey}&language=en-US`)
                .then((res) => {
                    if (res.status === 200) {
                        /*  let castData = []; */
                        this.castData.push(...res.data.cast);
                        console.log(this.castData);
                        /* return castData; */
                        return this.castData;
                    } else {
                        console.log(null);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        getTheCast() {
            let x = this.getApiDataCast(this.singleMovieData[0].id, this.apiKey);
            return x;
        },
    },
    setup() {
        this.getTheCast();
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

.release-rating {
    display: flex;
    gap: 2rem;
}
</style>
