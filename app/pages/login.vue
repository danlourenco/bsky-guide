<template>
    <div>Log In</div>
    <form @submit.prevent="login">
        <input type="text" v-model="username" placeholder="Username" />
        <input type="password" v-model="password" placeholder="Password" />
        <button type="submit">Log In</button>
    </form>
</template>