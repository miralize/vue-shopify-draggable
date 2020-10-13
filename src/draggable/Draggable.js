import { Draggable } from '@shopify/draggable';
import draggableMixin from '../draggable-mixin';

export default {
  name: 'VueDraggable',
  mixins: [draggableMixin],
  data() {
    this.containers = [];
    return {};
  },
  methods: {
    createInstance() {
      if (this.draggableInstance) {
        this.containers = this.draggableInstance.containers;
        this.draggableInstance.destroy();
      }

      this.draggableInstance = new Draggable(this.containers, this.options);
    },
  },
  render(createElement) {
    return createElement(this.tag, this.$slots.default);
  },
};
