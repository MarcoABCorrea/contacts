/**
  Toggles the necessary aria- attributes' values on the accordion panels
  and handles to show or hide them.
  @param {HTMLElement} element The tab that acts as the handles.
  @param {Boolean} show Whether to show or hide the accordion panel.
*/
const toggleExpanded = (element, show) => {
  let target = element.parentElement.children[1];

  if (target) {
    element.setAttribute("aria-expanded", show);
    target.setAttribute("aria-hidden", !show);
  }
};

/**
  Attaches event listeners for the accordion open and close click events.
  @param {HTMLElement} accordionContainer The accordion container element.
*/
export const setupAccordion = (accordionContainer) => {
  // Finds any open panels within the container and closes them.
  const closeAllPanels = () => {
    let openPanels = accordionContainer.querySelectorAll(
      "[aria-expanded=true]"
    );

    for (let i = 0, l = openPanels.length; i < l; i++) {
      toggleExpanded(openPanels[i], false);
    }
  };

  // Set up an event listener on the container so that panels can be added
  // and removed and events do not need to be managed separately.
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

      // Toggle visibility of the target panel.
      toggleExpanded(target, !isTargetOpen);
    }
  });
};
