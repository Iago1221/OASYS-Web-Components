class Container extends Recipient {
    init() {
        super.init();
        this.styleText = false;
        this.isOpen = false;
        this.draggableContainer = false;
    }

    styles() {
        const style = super.styles();
        
        if (this.styleText !== false) {
            style.textContent += this.styleText;
        }

        style.textContent += `
            .blocked {
                pointerEvents: none;
                opacity: 50%;
            }

            .container {
                position: absolute;
                width: 100%;
                height: 100%;
            }

            .draggable {
                margin: 0;
                position: absolute;
                top: 20%;
                cursor: move;
                box-sizing: border-box;
                transform: translate(-50%, -50%);
            }

            .draggable .blocked {
                cursor: pointer;
            }
        `;

        return style;
    }

    html() {
        const container = document.createElement('div');
        container.classList.add('container');
        
        this.components.forEach((component, index) => {
            if (index !== this.components.length - 1) {
                component.classList.add('blocked');
            }

            if (this.draggableContainer && component.isDraggable()) {
                const draggableElement = component.render();
                draggableElement.classList.add('draggable');
                this.makeDraggable(draggableElement, container);
                container.appendChild(draggableElement);
            } else {
                container.appendChild(component.render());
            }
        });

        return container;
    }

    makeDraggable(element, container) {
        let offsetX, offsetY, startX, startY;

        if (element.classList.contains('blocked')) {
            element.classList.remove('draggable');
            return;
        }
        
        element.addEventListener('mousedown', (e) => {
            e.preventDefault();

            startX = e.clientX;
            startY = e.clientY;
            offsetX = e.offsetX;
            offsetY = e.offsetY;

            const onMouseMove = (e) => {
                e.preventDefault();
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;

                let newLeft = element.offsetLeft + dx;
                let newTop = element.offsetTop + dy;
                
                let containerWidth = container.clientWidth - element.clientWidth;
                let containerHeight = container.clientHeight - element.clientHeight;

                console.log(element)
                newLeft = Math.max(0, Math.min(newLeft, containerWidth));
                newTop = Math.max(0, Math.min(newTop, containerHeight));

                element.style.left = newLeft + 'px';
                element.style.top = newTop + 'px';

                startX = e.clientX;
                startY = e.clientY;
            };

            const onMouseUp = () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
    }

    setStyle(style) {
        this.styleText = style;
    }

    addComponent(component) {
        super.addComponent(component);
    }

    setDraggableContainer(draggable = true) {
        this.draggableContainer = draggable;
    }
}

customElements.define('container-component', Container);
