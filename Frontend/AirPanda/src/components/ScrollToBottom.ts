const ScrollToBottom = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
  return null;
};

export default ScrollToBottom;
