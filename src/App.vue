<template>
    <div id="app">
        <main-header @onWrite="updateTextToSearch" />

        <div class="card" v-for="(movie, i) in data" :key="i">
            <div>
                <img
                    :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`"
                    alt=""
                />
            </div>
            <div>title :{{ movie.title }}</div>
            <div>
                original title:
                {{ movie.original_title }}
            </div>
            <div>
                language:
                {{ movie.original_language }}
            </div>
            <div>
                vote:
                {{ movie.vote_average }}
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
import MainHeader from "./components/primary/MainHeader.vue";
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
export default {
    name: "App",
    components: { MainHeader },
    data() {
        return {
            apiKey: "4bb110e695fd9ed24938916c07a0dc08", //Key
            data: [],
            textToSearch: "matrix",
        };
    },
    /*     mounted() {
        axios
            .get(
                `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&language=en-US&query=${this.textToSearch}&page=1&include_adult=false`
            )
            .then((result) => {
                console.log(result.data.results);
                this.data = result.data.results;
            })
            .catch((error) => {
                console.log(error);
            });
    }, */
    methods: {
        updateTextToSearch(newTextToSearch) {
            console.log(newTextToSearch);
            this.textToSearch = `${newTextToSearch}`;
            console.log("ciao");

            axios
                .get(
                    `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&language=en-US&query=${this.textToSearch}&page=1&include_adult=false`
                )
                .then((result) => {
                    console.log(result.data.results);
                    this.data = result.data.results;
                })
                .catch((error) => {
                    console.log(error);
                });
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
    margin-top: 60px;
}

.card {
    display: flex;
    width: 100%;

    background-color: rgb(223, 223, 223);
    margin: 1rem 0rem;

    div {
        border: 2px solid black;
        margin: 1rem;
        padding: 1rem;
    }
}
</style>
