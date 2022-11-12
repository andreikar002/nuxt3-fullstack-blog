<template>
  <div class="py-2 px-5">
    <button @click="$router.back()" class="border rounded-lg px-3 py-1">
      Back
    </button>
    <template v-if="publication.text">
      <div class="flex flex-col items-center w-full">
        <div
          class="border shadow-md shadow-white w-[500px] rounded-xl px-3 py-7 flex flex-col gap-3"
        >
          <p>
            Title:
            <span v-if="publication.title"
              ><i>{{ publication.title }}</i></span
            >
          </p>
          <p>
            Text:
            <span v-if="publication.text">{{ publication.text }}</span>
          </p>
          <p>
            Author:
            <span v-if="publication.author"
              ><b>{{ publication.author.nickname }}</b></span
            >
          </p>
          <p>
            Date:
            <span v-if="publication.createdAt"
              ><i>{{ normalizedDate }}</i></span
            >
          </p>
        </div>
        <div class="flex flex-row items-center gap-5 mt-3">
          <button
            @click="deletePublication"
            class="border rounded-lg px-3 py-1 w-[140px] shadow-sm shadow-black active:shadow-none text-lg"
            v-if="isMyPublication"
          >
            Delete
          </button>
          <button
            @click="isShowEdit = true"
            class="border rounded-lg px-3 py-1 w-[140px] shadow-sm shadow-black active:shadow-none text-lg"
            v-if="isMyPublication"
          >
            Edit
          </button>
        </div>
        <UIModal
          title="Edit publication"
          :isShow="isShowEdit"
          @close-modal="isShowEdit = false"
        >
          <template v-slot:content>
            <div class="flex flex-col items-start gap-5 w-full">
              <input
                v-model="form.title"
                placeholder="title"
                class="border rounded-lg px-3 py-2 w-full"
              />
              <textarea
                v-model="form.text"
                placeholder="content"
                class="border rounded-lg px-3 py-2 w-full h-32"
              />
              <button
                @click="savePublication"
                class="border rounded-lg px-3 py-2 bg-gray-500 text-gray-100 w-full"
              >
                Save
              </button>
            </div>
          </template>
        </UIModal>
      </div>
      <div class="flex flex-col items-center w-full mt-10">
        <div class="border shadow-md shadow-white rounded-xl">
          <div
            class="w-[500px] pt-3 gap-3 flex flex-col items-center"
            v-if="isAuthorized()"
          >
            <textarea
              v-model="commentForm.text"
              placeholder="Write your comment here:"
              class="border rounded-lg px-3 py-2 w-[450px]"
            />
            <button
              @click="sendComment"
              class="border rounded-lg px-3 py-2 bg-gray-500 text-gray-100 w-[450px]"
            >
              Send
            </button>
            <hr class="w-full bg-gray-200 h-0.5" />
          </div>
          <div class="w-[500px] pt-3 gap-3 flex flex-col items-center pb-2">
            <h1>Comments:</h1>
            <div v-if="!comments.length">
              <p class="text-gray-700 text-[17px] font-semibold" align="center">
                <i
                  >There are not any comments yet.<br /><span
                    v-if="isAuthorized()"
                    >Your comment will be the first.</span
                  ></i
                >
              </p>
            </div>
            <div v-else class="w-full">
              <Comment
                v-for="comment in comments"
                :key="comment.id"
                :comment="comment"
              />
            </div>
          </div>
        </div></div></template
    ><template v-else>
      <p class="text-xl font-bold mt-10" align="center">
        404<br />There are not such publication.
      </p>
    </template>
  </div>
</template>

<script>
import moment from "moment";
import {
  getPublicationById,
  deletePublication,
  editPublication,
} from "~~/composables/usePublication";

export default {
  data() {
    return {
      publication: {},
      isShowEdit: false,
      form: {
        text: "",
        title: "",
      },
      commentForm: {
        publicationId: this.$route.params.id,
        text: "",
      },
      comments: [],
    };
  },
  async mounted() {
    await this.getPublication();
    await this.getComments();
  },
  methods: {
    async getPublication() {
      this.publication = await getPublicationById(this.$route.params.id);
      this.form.text = this.publication.text;
      this.form.title = this.publication.title;
    },
    async getComments() {
      this.comments = await getCommentsByPublication(this.$route.params.id);
    },
    async deletePublication() {
      const data = await deletePublication(this.$route.params.id);
      if (data) this.$router.push({ path: "/publications" });
    },
    async savePublication() {
      const data = await editPublication(this.$route.params.id, this.form);
      if (data) {
        await this.getPublication();
        this.isShowEdit = false;
      }
    },
    async sendComment() {
      const data = await createComment(this.commentForm);
      await this.getComments();
      this.commentForm.text = "";
    },
  },
  computed: {
    normalizedDate() {
      return moment(this.publication.createdAt).format("DD.MM.YYYY");
    },
    isMyPublication() {
      return (
        useState("user")?.value?.id == this.publication?.author?.id || false
      );
    },
  },
};
definePageMeta({
  middleware: ["check-auth"],
});
</script>
