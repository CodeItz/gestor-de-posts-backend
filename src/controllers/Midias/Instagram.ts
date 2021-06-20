import Instagram from "instagram-web-api";
import IPost from "../../models/Post/IPost";

interface Auth {
  user: String;
  password: String;
}

const InstagramController = {
  async doPost(post: IPost, auth: Auth) {
    const client = new Instagram({
      username: auth.user,
      password: auth.password,
    });

    await client.login()

    await client.uploadPhoto({
      photo: post.photoURL,
      caption: post.description,
      post: "story",
    });
  },
};

export default InstagramController;
