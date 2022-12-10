class EventBus {
    constructor(eventTarget) {
        this.eventTarget = eventTarget;
    }

    on(type, listener) {
        this.eventTarget.addEventListener(type, listener);
    }

    once(type, listener) {
        this.eventTarget.addEventListener(type, listener, { once: true });
    }

    off(type, listener) {
        this.eventTarget.removeEventListener(type, listener);
    }

    emit(type, detail) {
        this.eventTarget.dispatchEvent(new CustomEvent(type, { detail }));
    }
}

export const eventBus = new EventBus(window.document);
