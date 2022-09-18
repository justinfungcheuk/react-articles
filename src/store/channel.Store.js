import { makeAutoObservable } from "mobx";
import { http } from "@/utils";

class ChannelStore {
  channelList = [];
  constructor() {
    makeAutoObservable(this);
  }
  // article 和 publish 都需要用到該函數loadChannelList - 應該在哪裏調用該函數呢？
  loadChannelList = async () => {
    const res = await http.get("/channels");
    this.channelList = res.data.channels;
  };
}

export default ChannelStore;
