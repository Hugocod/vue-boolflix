<template>
    <div id="app">
        <main-header @onWrite="updateTextToSearch" />

        <div class="card" v-for="movie in moviesData" :key="movie.title">
            <div>
                <img :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`" alt="" />
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
        </div>

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
            query: "matrix",
            categoryToSearch: "movie",
            starsStatus: [false, false, false, false, false],
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
            this.starsStatus = [false, false, false, false, false];

            let numberOfCheckedStars = Math.round(vote / 2);

            for (let index = 0; index < numberOfCheckedStars; index++) {
                this.starsStatus[index] = true;
            }

            return this.starsStatus; // questo è un array che indica quante stelle sono piene(accese) e quante no
        },
    },

    mounted() {
        this.turnVoteIntoStar(2);
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
.checked {
    color: rgb(255, 255, 0);
}
</style>
