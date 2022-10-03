<template>
    <div id="app">
        <main-header @onWrite="updateTextToSearch" />

        <full-screen-card v-if="cardIsClicked" @closeCard="toggleFullCard" :selectedMovie="singleMovieData"></full-screen-card>

        <!-- ///////////////////////////////////////////////////////////////////////////// -->
        <!-- ///////////////////////////////////////////////////////////////////////////// -->

        <div class="cards-container">
            <single-card
                @isClicked="toggleFullCard"
                v-for="movie in moviesData"
                :key="movie.id"
                :id="movie.id"
                :url="`https://image.tmdb.org/t/p/w400${movie.poster_path}`"
            ></single-card>
        </div>

        <div class="cards-container">
            <single-card
                @isClicked="toggleFullCard"
                v-for="series in seriesData"
                :key="series.id"
                :id="series.id"
                :url="`https://image.tmdb.org/t/p/w400${series.poster_path}`"
            ></single-card>
        </div>

        <!-- ///////////////////////////////////////////////////////////////////////////// -->
        <!-- ///////////////////////////////////////////////////////////////////////////// -->

        <!--  <div class="card" v-for="movie in moviesData" :key="movie.title">
            <div>
                <single-card :url="`https://image.tmdb.org/t/p/w200${movie.backdrop_path}`"></single-card>
            </div>
            <div>title :{{ movie.title }}</div>
            <div>
                original title:
                {{ movie.original_title }}
            </div>
            <div>
                <lang-flag :iso="movie.original_language" />
                language:

                {{ movie.original_language }}
            </div>
            <div>
                vote:
                {{ movie.vote_average }}

                <div v-for="(star, i) in turnVoteIntoStar(movie.vote_average)" :key="i">
                    <i v-if="star === true" class="fa-solid fa-star">{{ star }}</i>
                    <i v-else class="fa-regular fa-star">{{ star }}</i>
                </div>
            </div>
        </div>

        <div class="card red" v-for="movie in seriesData" :key="movie.name">
            <div>
                <img :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`" alt="" />
            </div>
            <div>title :{{ movie.name }}</div>
            <div>
                original title:
                {{ movie.original_name }}
            </div>
            <div>
                <lang-flag :iso="movie.original_language" />
                language:

                {{ movie.original_language }}
            </div>
            <div>
                vote:
                {{ movie.vote_average }}

                <div v-for="(star, i) in turnVoteIntoStar(movie.vote_average)" :key="i">
                    <i v-if="star === true" class="fa-solid fa-star">{{ star }}</i>
                    <i v-else class="fa-regular fa-star">{{ star }}</i>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
import axios from "axios";
/* import LangFlag from "vue-lang-code-flags"; */
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
import MainHeader from "./components/primary/MainHeader.vue";
import SingleCard from "./components/secondary/SingleCard.vue";
import FullScreenCard from "./components/secondary/FullScreenCard.vue";

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
export default {
    name: "App",
    components: { MainHeader, /* LangFlag */ SingleCard, FullScreenCard },
    data() {
        return {
            ///////////////////////////////////////////////////////// API variables
            apiKey: "4bb110e695fd9ed24938916c07a0dc08",
            moviesData: [],
            seriesData: [],
            singleMovieData: [],
            query: "",
            categoryToSearch: "movie",
            ///////////////////////////////////////////////////////// API variables ----- /

            cardIsClicked: false, // serve a togglare la visualizzazione della card estesa con tutte le info

            selectedCardId: "", // identifica la card su cui ha cliccato l'utente, serve a mostrargli le informazioni corrette
        };
    },
    methods: {
        updateTextToSearch(newTextToSearch) {
            console.log(newTextToSearch);
            this.query = `${newTextToSearch}`;
            console.log("ciao");
            /* reset */
            this.moviesData = [];
            this.seriesData = [];
            this.getApiData("tv", this.apiKey, this.query, this.seriesData);
            this.getApiData("movie", this.apiKey, this.query, this.moviesData);
        },
        getApiData(categoryToSearch, apiKey, query, dataContainer) {
            axios
                .get(
                    `https://api.themoviedb.org/3/search/${categoryToSearch}?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`
                )
                .then((res) => {
                    if (res.status === 200) {
                        dataContainer.push(...res.data.results);
                        console.log(dataContainer);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        toggleFullCard(id) {
            this.cardIsClicked = !this.cardIsClicked;
            console.log(id);

            this.selectedCardId = id; // punta alla card cliccata

            this.singleMovieData = this.getSelectedMovieInfo();
        },

        getSelectedMovieInfo() {
            /////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////// funzione per ottenere le info sul film cliccato dall'utente
            let selectedMovie = [];

            this.moviesData.forEach((element) => {
                if (element.id === this.selectedCardId) {
                    selectedMovie.push(element);
                } else {
                    null;
                }
            });

            return selectedMovie;
            /////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////// ----/
        },
    },

    mounted() {},
};
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

    width: 100%;
    margin: 0 auto;
}

body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    position: relative;
    background-color: black;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
    margin: 0;
    padding: 0;
}

.cards-container {
    display: flex;
    flex-wrap: wrap;
    padding-top: 15vh;
    background-color: black;

    width: 92%;
    margin: 0 auto;
}
</style>
