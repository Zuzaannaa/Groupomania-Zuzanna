<template>
  <div id="modifyPost">
    <form @submit.prevent="modifyPost">
      <div id="btns">
        <label for="file">Chose a new picture</label>
        <input
          type="file"
          ref="file"
          name="file"
          class="upload"
          id="file"
          @change="updateFile"
        />
      </div>
      <div id="fileContainer">
        <img
          id="preview"
          :src="'http://localhost:3000/images/' + post.file"
          :alt="post.file"
          v-if="preview"
        />
        <p v-else>No image to display!</p>
      </div>
      <div id="text">
        <label for="textarea">Edit your message.</label>
        <textarea name="textarea" v-model="post.text"></textarea>
      </div>
      <div id="modify">
        <input type="submit" value="Submit" class="btn" />
      </div>
      <p>{{ errMsg }}</p>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";
export default {
  name: "ModifyPost",
  beforeCreate() {
    const parsedUrl = new URL(window.location.href);
    const postId = parsedUrl.pathname.split("/modify-post/")[1];
    fetch(`http://localhost:3000/api/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data.file ? (this.preview = true) : (this.preview = false);
        this.post = { ...data };
      })
      .catch((error) => {
        error;
      });
  },
  data() {
    return {
      post: {},
      newFile: "",
      preview: null,
      errMsg: null,
    };
  },
  methods: {
    updateFile(event) {
      this.newFile = this.$refs.file.files[0];
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          document.getElementById("preview").src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
        this.preview = true;
      }
    },
    async modifyPost() {
      if (!this.post.text) {
        this.errMsg = "The field cannot be empty!";
        return;
      }
      let formData = new FormData();
      formData.append("text", this.post.text);
      if (this.newFile) {
        formData.append("file", this.newFile);
      }
      if (confirm("Post will be saved. Proceed?")) {
        axios
          .put(`http://localhost:3000/api/posts/${this.post.id}`, formData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            console.log(res.data);
            router.push({ path: "/home" });
          })
          .catch((error) => console.log(error));
      }
    },
  },
};
</script>

<style scoped>
#modifyPost {
  max-width: 60%;
  box-shadow: 2px 2px 8px 5px rgb(0 0 0 / 10%);
  margin: auto;
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 4px;
}
form {
  display: flex;
  flex-direction: column;
}
#fileContainer {
  overflow: hidden;
  margin: 1rem 0 1rem 0;
}
img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
#btns {
  display: flex;
  flex-direction: column;
}
#file {
  cursor: pointer;
}
#text {
  display: flex;
  flex-direction: column;
}
label {
  margin: 1rem;
  padding: 0.5rem 0;
  text-align: center;
  border-radius: 8px;
  box-shadow: 2px 2px 8px 5px rgb(0 0 0 / 10%);
}
textarea {
  padding: 16px;
}
#modify {
  text-align: right;
}
.btn {
  background-color: #1c68e6;
  border-style: none;
  outline: none;
  width: 20%;
  border-radius: 8px;
  height: 40px;
  color: white;
  margin: 1rem 0 1rem 0;
}
@media screen and (max-width: 992px) {
  #modifyPost {
    max-width: 90%;
  }
}
</style>
