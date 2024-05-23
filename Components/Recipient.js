class Recipient extends Component {

    init() {
        super.init();
        this.components = [];
    }

    html() {}

    addComponent(component) {
        this.components.push(component);
        this.render();
    }
}

customElements.define('recipient-component', Recipient);