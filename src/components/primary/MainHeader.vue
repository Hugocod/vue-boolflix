<template>
    <header>
        <form>
            <input type="text" v-model="userText" />
            <button type="submit" @click.prevent="$emit('onWrite', userText)">
                Submit
            </button>
        </form>
    </header>
</template>

<script>
export default {
    data() {
        return {
            userText: "",
        };
    },
    name: "MainHeader",
};
</script>

<style></style>
