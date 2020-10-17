const events = [
  // draggable events
  'draggable:initialize',
  'draggable:destroy',
  'drag:start',
  'drag:move',
  'drag:over',
  'drag:over:container',
  'drag:out',
  'drag:out:container',
  'drag:stop',
  'drag:stopped',
  'drag:pressure',
  // plugin events
  'mirror:create',
  'mirror:created',
  'mirror:attached',
  'mirror:move',
  'mirror:destroy',
  'collidable:in',
  'collidable:out',
  'snap:in',
  'snap:out',
];

export default {
  provide() {
    return {
      draggable: this,
    };
  },
  data() {
    this.containers = [];
    this.draggableInstance = null;
    return {};
  },
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    options: {
      type: Object,
      default() {
        return {};
      },
    },
    pluginEvents: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  watch: {
    options() {
      this.createInstanceBindEvents();
    },
    pluginEvents() {
      // TODO: optimize
      this.createInstanceBindEvents();
    },
  },
  methods: {
    createInstance() {},
    createInstanceBindEvents() {
      this.createInstance();
      events.forEach((eventName) => {
        this.draggableInstance.on(eventName, (event) => {
          this.$emit(eventName, event);
        });
      });
      this.pluginEvents.forEach((eventName) => {
        this.draggableInstance.on(eventName, (event) => {
          this.$emit(eventName, event);
        });
      });
    },
  },
  created() {
    this.createInstanceBindEvents();
  },
  destroyed() {
    this.draggableInstance.destroy();
    this.draggableInstance = null;
  },
};
