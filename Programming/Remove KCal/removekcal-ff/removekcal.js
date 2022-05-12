function getAllTextNodes() {
    var walker = document.createTreeWalker(
        document.body, 
        NodeFilter.SHOW_TEXT, 
        null, 
        false
    );

    var node;
    var textNodes = [];

    while(node = walker.nextNode()) {
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
document.onload = replaceNodes();
for (let i = 0; i < 9; i++){
  setTimeout(() => {document = replaceNodes(); }, 333);   // Required for sites that load weird
                                                          // Hopefully will not be needed with a more robust solution

}