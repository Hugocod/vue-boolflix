<template>
    <header>
        <form>
            <input type="text" v-model="userText" />
            <button type="submit" @click.prevent="$emit('onWrite', userText)">Submit</button>
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

<style scoped lang="scss">
header {
    background-color: rgb(189, 16, 16);
    padding: 2rem;
}
</style>
