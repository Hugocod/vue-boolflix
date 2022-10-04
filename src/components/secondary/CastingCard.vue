<template>
    <div class="container">
        <figure v-for="(n, i) in 5" :key="n">
            <img
                v-if="isAvailable"
                @error="isAvailable = false"
                :src="`https://image.tmdb.org/t/p/w185${castData[i].profile_path}`"
                :alt="castData[i].name"
            />
            <img
                v-else
                src="https://marvel-b1-cdn.bc0a.com/f00000000225238/cdn.shopify.com/s/files/1/0051/3798/9747/products/no-image-large_0ba9d40b-847a-44f4-8c89-f9a3ff41573b.jpg?v=1657123815&width=1024"
            />
            <figcaption>{{ castData[n].name }}</figcaption>
        </figure>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "CastingCard",
    data() {
        return {
            apiKey: "4bb110e695fd9ed24938916c07a0dc08",
            castData: [],
            isAvailable: true,
        };
    },
    props: {
        id: Number,
    },

    created() {
        axios
            .get(`https://api.themoviedb.org/3/movie/${this.id}/credits?api_key=${this.apiKey}&language=en-US`)
            .then((res) => {
                if (res.status === 200) {
                    this.castData.push(...res.data.cast);
                    console.log(this.castData);
                } else {
                    console.log(null);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    },
};
</script>

<style scoped lang="scss">
.container {
    display: flex;
    flex-wrap: wrap;
}

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
</style>
