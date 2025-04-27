PromiseState = {
    PENDING: "pending",
    FULFILLED: "fullfilled",
    REJECTED: "rejected"
}

class MyPromise {
    #state = PromiseState.PENDING;
    #successCallbackHandlers = [];
    #failureCallbackHandlers = [];
    #finallyCallbackHandler = undefined;

    #value = undefined;
    #reason = undefined;

    constructor(executor) {
        executor(this.#resolver.bind(this), this.#rejector.bind(this));
    }

    #resolver(value) {
        if (this.#state === PromiseState.FULFILLED) return;
        this.#state = PromiseState.FULFILLED;
        this.#value = value;
        // run all registered callback handlers
        this.#successCallbackHandlers.forEach(cb => cb(this.#value));
        if (this.#finallyCallbackHandler) { 
            this.#finallyCallbackHandler(); 
        }

    }

    #rejector(reason) {
        if (this.#state === PromiseState.REJECTED) return;
        this.#state = PromiseState.REJECTED;
        this.#reason = reason;
        this.#failureCallbackHandlers.forEach(cb => cb(this.#reason));
        if (this.#finallyCallbackHandler) { 
            this.#finallyCallbackHandler(); 
        }

    }

    then(handlerFn) {
        if (this.#state === PromiseState.FULFILLED){
            handlerFn(this.#value);
        }
        else{
            // register the callbacks
            this.#successCallbackHandlers.push(handlerFn);
        }
        return this;
    }
    
    catch(handlerFn) {
        if (this.#state === PromiseState.REJECTED){
            handlerFn(this.#reason);
        }
        else{
            // register the failure callbacks
            this.#failureCallbackHandlers.push(handlerFn);
        }
        return this;
    }

    finally(handlerFn) {
        if (this.#state !== PromiseState.PENDING) return handlerFn()
        this.#finallyCallbackHandler = handlerFn;
    }

}

// Lets test this out
const p1 = new MyPromise((resolve, reject) => {
    // ... do some async op
    setTimeout(resolve, 3000, 1);
    //resolve(1); // resolve with value 1
    //reject('rejected');
}).then((value) => {
    console.log(`Promise resolved`, value)
}).catch((reason) => {
    console.log(`Rejected due to: `, reason);
})
.finally(() => {
    console.log('All Good');
})