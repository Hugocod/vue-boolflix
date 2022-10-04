<template>
    <header>
        <div class="wrapper">
            <h1><span>Movie</span>finder<sup>by hugo</sup></h1>
            <form>
                <input
                    type="text"
                    v-model="userText"
                    placeholder="search...👀 "
                    @keyup.enter.prevent="clearText"
                    @keydown.enter.prevent="$emit('onWrite', userText)"
                />
            </form>
        </div>
    </header>
</template>

<script>
export default {
    name: "MainHeader",
    data() {
        return {
            userText: "",
        };
    },
    methods: {
        clearText() {
            this.userText = "";
        },
    },
};
</script>

<style scoped lang="scss">
header {
    background: rgba(0, 0, 0, 0.78);

    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(11.4px);
    -webkit-backdrop-filter: blur(11.4px);
    border: 1px solid rgba(0, 0, 0, 1);

    /* position: fixed; */
    top: 0;
    left: 0;
    width: 100%;

    height: 15vh;

    .wrapper {
        width: 90%;
        height: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;

        h1 {
            color: rgb(198, 30, 30);
            font-weight: 400;
            font-family: "Antonio", sans-serif;
            text-transform: uppercase;
            font-size: 3rem;

            span {
                font-weight: 800;
                color: white;
            }

            sup {
                font-size: 0.7rem;
                margin: 0;
                padding: 0;
                font-family: "Avenir", sans-serif;
                vertical-align: bottom;
            }
        }
    }

    input {
        border: none;
        padding: 0.5rem;
        font-size: 1rem;
        border-radius: 2rem;
        outline: 2px solid rgb(198, 30, 30);
        font-weight: 800;
        background: none;
        color: rgb(255, 255, 255);
        padding: 1rem 1.7rem;

        font-size: 1.5rem;
    }
}
</style>
