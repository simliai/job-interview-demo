import slackApp from './SlackBoltSetup';

class SlackBoltAPI {
  static listPublicConversations = async () => {
    try {
      const result = await slackApp.client.conversations.list({
        token: slackApp.SLACK_BOT_TOKEN,
        types: 'public_channel',
        limit: 1000,
      });
      return result;
    } catch (error: any) {
      console.error('Error in SlackBoltAPI.listPublicConversations', error);
    }
  };

  static sendMessage = async (channelId: string, text: string) => {
    try {
      const result = await slackApp.client.chat.postMessage({
        token: slackApp.SLACK_BOT_TOKEN,
        channel: channelId,
        text,
      });
      console.log('SlackBoltAPI.sendMessage result', result);
      return result;
    } catch (error: any) {
      console.log('Error in SlackBoltAPI.sendMessage', error);
    }
  };

}

export default SlackBoltAPI;
