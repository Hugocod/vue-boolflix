<template>
    <div id="app">
        <main-header @onWrite="updateTextToSearch" />

<<<<<<< HEAD
        <font-awesome-icon icon="fa-solid fa-star" />
        <font-awesome-icon icon="fa-solid fa-star" />
        <font-awesome-icon icon="fa-solid fa-star" />
        <font-awesome-icon icon="fa-solid fa-star" />
        <font-awesome-icon icon="fa-solid fa-star" />
        <font-awesome-icon icon="fa-solid fa-star" />
        <font-awesome-icon :icon="['fab', 'twitter']" class="icon alt" />

=======
>>>>>>> 2c6f126c82e5e1e5db66d2658f55cb6f99bec3bc
        <div class="card" v-for="movie in moviesData" :key="movie.title">
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
                <lang-flag :iso="movie.original_language" />
                language:

                {{ movie.original_language }}
            </div>
            <div>
                vote:
                {{ movie.vote_average }}
                {{ turnVoteIntoStar(movie.vote_average) }}
            </div>
        </div>

        <div class="card red" v-for="movie in seriesData" :key="movie.name">
            <div>
                <img
                    :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`"
                    alt=""
                />
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
                {{ turnVoteIntoStar(movie.vote_average) }}
            </div>
        </div>

<<<<<<< HEAD
=======
        <div class="card red" v-for="movie in seriesData" :key="movie.name">
            <div>
                <img
                    :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`"
                    alt=""
                />
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
            </div>
        </div>

>>>>>>> 2c6f126c82e5e1e5db66d2658f55cb6f99bec3bc
        <!--   <div class="card" v-for="(movie, i) in seriesData" :key="i">
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
                <lang-flag :iso="movie.original_language" />
                language:

                {{ movie.original_language }}
            </div>
            <div>
                vote:
                {{ movie.vote_average }}
            </div>
        </div> -->
    </div>
</template>

<script>
import axios from "axios";
import LangFlag from "vue-lang-code-flags";
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
import MainHeader from "./components/primary/MainHeader.vue";
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
export default {
    name: "App",
    components: { MainHeader, LangFlag },
    data() {
        return {
            apiKey: "4bb110e695fd9ed24938916c07a0dc08", //Key
            moviesData: [],
            seriesData: [],
<<<<<<< HEAD
            query: "",
=======
            query: "matrix",
            categoryToSearch: "movie",
>>>>>>> 2c6f126c82e5e1e5db66d2658f55cb6f99bec3bc
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
                .then((result) => {
                    console.log(result.data.results);
                    dataContainer.push(...result.data.results);
                    console.log(dataContainer);
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        turnVoteIntoStar(vote) {
            let numberOfStars = Math.round(vote / 2);
            return numberOfStars;
        },
    },

    computed: {
        /*     turnVoteIntoStar(vote) {
            let numberOfStars = Math.round(vote / 5);
            return numberOfStars;
        }, */
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

.red {
    background-color: red;
}
<<<<<<< HEAD

.fa-star {
    font-size: 2rem;
}
=======
>>>>>>> 2c6f126c82e5e1e5db66d2658f55cb6f99bec3bc
</style>
