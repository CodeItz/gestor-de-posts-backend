import Post from "../models/Post";
import SubClient from "../models/SubClients";

import { createSchedule } from "./Schedule";
import { dateToScheduleDate } from "../utils/Schedule";
import { decrypt } from "../utils/Encrypt";

import IPost from "../models/IPost";
import moment from "moment";

import InstagramController from "../controllers/Midias/Instagram";

const PostScheduleController = {
  async start() {
    try {
      const now = moment();
      const posts = await Post.find({
        dateScheduled: { $gte: now },
        status: "open",
      });

      posts.map((post: IPost) => {
        this.createSchedulePost(post);
      });
    } catch (error) {
      return console.error({ error });
    }
  },

  async createSchedulePost(post: IPost) {
    const date = moment(post.dateSchedule);
    const hourSchedule = post.hourScheduled;

    const [hour, minute] = hourSchedule.split(":");

    date.hour(Number(hour));
    date.minute(Number(minute));

    const dateSchedule = dateToScheduleDate(date);
    const subClient = await SubClient.findById(post.subClientId);

    const cron = createSchedule(dateSchedule, () =>
      this.doPost(post, subClient)
    );
  },

  async doPost(post: IPost, subClient: any) {
    const auth = subClient.redes[0];
    auth.password = decrypt(auth.password);

    await InstagramController.doPost(post, auth);
  },
};

export default PostScheduleController;
