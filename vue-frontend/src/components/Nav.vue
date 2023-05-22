<template>
  <div id="nav">
    <div id="logo">
      <router-link :to="redirection">
        <div id="logoContainer">
          <img src="../assets/logos/icon-left-font.svg" alt="logo" />
        </div>
      </router-link>
    </div>
    <div id="routes" v-if="!logged">
      <router-link to="/signup" class="link">Sign up</router-link>
      <router-link to="/login" class="link">Login</router-link>
    </div>
    <div id="options" v-else>
      <router-link to="/team" class="link"
        ><i class="fas fa-users"></i>Users</router-link
      >
      <router-link to="/profile" class="link"
        ><i class="fas fa-user"></i>Profil</router-link
      >
      <router-link to="/" @click="logout" class="link"
        ><i class="fas fa-sign-out-alt"></i>Log out</router-link
      >
    </div>
  </div>
</template>

<script>
import store from "../store/index.js";
import router from "../router";
export default {
  name: "Nav",
  props: {
    redirection: String,
    logged: Boolean,
  },
  methods: {
    logout() {
      store.state.isLogged = false;
      router.push({ path: "login" });
      localStorage.clear();
      console.log("Log out!");
    },
  },
};
</script>

<style scoped>
#nav {
  display: flex;
  align-items: center;
  overflow: hidden;
  height: 100px;
  border-bottom: 1px solid red;
}
#routes,
#options {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
.link {
  text-align: center;
  padding: 1rem;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.75);
}
.link:hover {
  color: black;
  box-sizing: content-box;
}
i {
  margin-right: 2px;
}
@media screen and (max-width: 992px) {
  #nav {
    flex-direction: column;
    height: 100%;
    text-align: center;
  }
  #logo {
    margin-top: 1rem;
  }
  #options,
  #routes {
    justify-content: space-between;
    margin: 1rem;
  }
  .link {
    margin: 0 1rem 0 1rem;
  }
}
</style>
