import { initFirebase, signInWithGoogle, getUser, listenForVideos } from '../firebase.js';

window.popupData = () => ({
  user: null,
  sharedWithYou: [],
  youShared: [],

  async init() {
    initFirebase();
    this.user = await getUser();
    if (this.user) {
      listenForVideos(this.user.email, (data) => {
        this.sharedWithYou = data.sharedWithYou;
        this.youShared = data.youShared;
      });
    }
  },

  async signIn() {
    await signInWithGoogle();
    this.user = await getUser();
    if (this.user) this.init();
  },
});
