import App from "./App";

if (module.hot) {
  module.hot.accept((error) => {
    if (error) {
      console.log("热替换出问题了！！！");
    }
  });
}
