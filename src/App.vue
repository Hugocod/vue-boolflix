<template>
    <div id="app">
        <main-header @onWrite="updateTextToSearch" />

        <full-screen-card v-if="cardIsClicked" @closeCard="toggleFullScreenCard" :selectedMovie="singleMovieData"></full-screen-card>
        <full-screen-card v-if="cardIsClicked" @closeCard="toggleFullScreenCard" :selectedMovie="singleSeriesData"></full-screen-card>

        <!-- ///////////////////////////////////////////////////////////////////////////// -->
        <!-- ///////////////////////////////////////////////////////////////////////////// -->

        <div class="cards-container">
            <single-card
                @isClicked="takeID"
                v-for="movie in moviesData"
                :key="movie.id"
                :id="movie.id"
                :url="`https://image.tmdb.org/t/p/w400${movie.poster_path}`"
            ></single-card>
        </div>

        <div class="cards-container">
            <single-card
                @isClicked="takeID"
                v-for="movie in seriesData"
                :key="movie.id"
                :id="movie.id"
                :url="`https://image.tmdb.org/t/p/w400${movie.poster_path}`"
            ></single-card>
        </div>

        <!--     <div class="cards-container">
            <single-card
                @isClicked="toggleFullCard"
                v-for="series in seriesData"
                :key="series.id"
                :id="series.id"
                :url="`https://image.tmdb.org/t/p/w400${series.poster_path}`"
            ></single-card>
        </div> -->

        <!-- ///////////////////////////////////////////////////////////////////////////// -->
        <!-- ///////////////////////////////////////////////////////////////////////////// -->
    </div>
</template>

<script>
import axios from "axios";

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
import MainHeader from "./components/primary/MainHeader.vue";
import SingleCard from "./components/secondary/SingleCard.vue";
import FullScreenCard from "./components/secondary/FullScreenCard.vue";

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
export default {
    name: "App",
    components: { MainHeader, SingleCard, FullScreenCard },
    data() {
        return {
            ///////////////////////////////////////////////////////// API variables
            apiKey: "4bb110e695fd9ed24938916c07a0dc08",
            moviesData: [],
            seriesData: [],
            singleMovieData: [],
            singleSeriesData: [],
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

        takeID(id) {
            /////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////

            this.toggleFullScreenCard(); // fa apparire/scomparire il componente full screen

            this.selectedCardId = id; // mette l'ID del film della card cliccata dall'utente nella Variabile selectedCard
            this.singleMovieData = this.getSelectedMovieInfo(this.moviesData); // valorizza con l'oggetto con tutte le info che corrisponde all'id della carta cliccata
            this.singleSeriesData = this.getSelectedMovieInfo(this.seriesData); // valorizza con l'oggetto con tutte le info che corrisponde all'id della carta cliccata

            console.log(this.selectedCardId);
            /////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////
        },

        toggleFullScreenCard() {
            /////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////

            this.cardIsClicked = !this.cardIsClicked; // fa apparire/scomparire il componente full screen

            /////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////
        },

        getSelectedMovieInfo(arrayContainer) {
            /////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////// funzione per ottenere le info sul film cliccato dall'utente

            let selectedMovie = [];

            arrayContainer.forEach((element) => {
                // filtra i film/serie alla ricerca di quello contenente l'id del film scelto dall'utente
                if (element.id === this.selectedCardId) {
                    selectedMovie.push(element); // se l'id è uguale lo inserisce in selected movie.
                } else {
                    null;
                }
            });

            return selectedMovie;

            /////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////// ----/
        },
    },
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
