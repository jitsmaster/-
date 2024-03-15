class MinStack {
    //the idea is to have a normal stack, the last value is the latest value
    //and a stack to keep track of the minimum value
    //the last value is always the minimum value
    //min stack only store the min value it comes across during pushing
    private stack: number[] = [];
    private minStack: number[] = [];

    constructor() {
    }

    push(val: number): void {
        //push it to the end of normal stack
        this.stack.push(val);
        //if the minStack is empty, or the value is smaller than the last value in minStack
        //push it to min stack at the end
        //min stack won't hold all values, just the smallest values it comes across
        //during pushing
        if (this.minStack.length === 0 || (val <= (this.getMin() as number))) {
            this.minStack.push(val);
        }
    }

    pop(): void {
        //get the value of the normal stack
        const val = this.stack.pop();
        //if the value is min value, need to remove it from min stack (pop)
        //if comes across a value that is not the min value, won't touch the min stack
        //so if a number in the min stack but not the min value, it will stay there
        //until the min value is popped.
        //even if the value stays at the end of the min stack, it won't affect the result
        if (val === this.getMin()) {
            this.minStack.pop();
        }
    }

    top(): number | undefined {
        //last value in normal stack is always top
        return this.stack[this.stack.length - 1];
    }

    getMin(): number | undefined {
        //last value in min stack is always the smallest
        return this.minStack[this.minStack.length - 1];
    }
}