import HttpService from "../../services/http-service";

class ChatService extends HttpService {
  userLists = async () => {
    try {
      const res = await this.getRequest('/auth/user-by-type', {auth: true})
      return res;
    } catch(exception) {
      throw exception;
    }
  }

  getChatDetail = async(senderId) => {
    try {
      const res = await this.getRequest('/chat/my-chat/'+senderId, {auth: true})
      return res;
    } catch(exception) {
      throw exception
    }
  }

  sendChatMessage = async(chatBody) => {
    try {
      const res = await this.postRequest('/chat/create', chatBody, {auth:true})
      return res;
    } catch(exception) {
      throw exception
    }
  }
}

const chatSvc = new ChatService();
export default chatSvc;