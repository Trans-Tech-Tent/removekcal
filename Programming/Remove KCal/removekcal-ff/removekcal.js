function getAllTextNodes() {
  var walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  var node;
  var textNodes = [];

  while (node = walker.nextNode()) {
    textNodes.push(node);
  }
  return textNodes;
}

function replaceNodes() {
  getAllTextNodes().forEach((node) => {
    const { nodeValue } = node;
    const newValue = nodeValue.replace(/[0-9]+[\s]*(kcal)/gi, 'x');

    if (newValue !== nodeValue) {
      node.nodeValue = newValue;
    }
  });
}

// run on page load
document.addEventListener('DOMContentLoaded', replaceNodes);

// use a MutationObserver to watch for DOM changes
let observerConfig = {
  subtree: true,
  childList: true,
  characterData: true
};

const observer = new MutationObserver(replaceNodes);
observer.observe(document.body, observerConfig);
