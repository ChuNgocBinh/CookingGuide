
/**
 * 
 * @param {HTMLElement} element 
 * @param {Array<BaseComponent>} components
 */
export function appendTo($element, ...components) {
    for(let component of components) {
        let child = component.refresh();
        // console.log(child);
        $element.appendChild(child);
    }
}
