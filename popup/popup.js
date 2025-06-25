import {
  initFirebase,
  signInWithGoogle,
  getUser,
  listenForVideos,
  auth,
  getRedirectResult,
} from "../firebase.js";

document.addEventListener("DOMContentLoaded", async () => {
  initFirebase();

  // Handle redirect sign-in result if applicable
  try {
    const result = await getRedirectResult(auth);
    if (result && result.user) {
      renderUser(result.user);
      setupVideoListeners(result.user.email);
    }
  } catch (err) {
    console.error("Error with redirect result:", err);
  }

  const user = await getUser();
  if (user) {
    renderUser(user);
    setupVideoListeners(user.email);
  }

  document.getElementById("signInButton").addEventListener("click", async () => {
    await signInWithGoogle();
    const signedInUser = await getUser();
    if (signedInUser) {
      renderUser(signedInUser);
      setupVideoListeners(signedInUser.email);
    }
  });
});

function renderUser(user) {
  document.getElementById("userSection").style.display = "block";
  document.getElementById("userEmail").textContent = user.email;
}

function setupVideoListeners(email) {
  listenForVideos(email, (data) => {
    const sharedWithYouList = document.getElementById("sharedWithYouList");
    const youSharedList = document.getElementById("youSharedList");

    sharedWithYouList.innerHTML = "";
    data.sharedWithYou.forEach((video) => {
      const li = document.createElement("li");
      li.textContent = video.title;
      sharedWithYouList.appendChild(li);
    });

    youSharedList.innerHTML = "";
    data.youShared.forEach((video) => {
      const li = document.createElement("li");
      li.textContent = video.title;
      youSharedList.appendChild(li);
    });
  });
}
