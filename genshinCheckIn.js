setTimeout(() => {
  let success = false;
  for (const div of document.querySelector(".components-home-assets-__sign-content_---sign-list---1E-cUZ").children) {
    if (!div.className.includes("---has-signed---")) {
      div.style.backgroundColor = "red";
      success = true;
      div.click();
      setTimeout(() => {
        window.close()
      }, 1200);
      break;
    }
  }
  if (!success) {
    window.close()
  }
}, 2500);
