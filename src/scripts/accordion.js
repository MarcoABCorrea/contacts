const toggleExpanded = (element, show) => {
  let target = element.parentElement.children[1];

  if (target) {
    element.setAttribute("aria-expanded", show);
    target.setAttribute("aria-hidden", !show);
  }
};

export const setupAccordion = (accordionContainer) => {
  const closeAllPanels = () => {
    let openPanels = accordionContainer.querySelectorAll(
      "[aria-expanded=true]"
    );

    for (let i = 0, l = openPanels.length; i < l; i++) {
      toggleExpanded(openPanels[i], false);
    }
  };

  accordionContainer.addEventListener("click", (event) => {
    let target = event.target;

    if (target.closest) {
      target = target.closest('[class*="p-accordion__tab"]');
    } else if (target.msMatchesSelector) {
      // IE friendly `Element.closest` equivalent
      // as in https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
      do {
        if (target.msMatchesSelector('[class*="p-accordion__tab"]')) {
          break;
        }
        target = target.parentElement || target.parentNode;
      } while (target !== null && target.nodeType === 1);
    }

    if (target) {
      let isTargetOpen = target.getAttribute("aria-expanded") === "true";
      closeAllPanels();

      toggleExpanded(target, !isTargetOpen);
    }
  });
};
