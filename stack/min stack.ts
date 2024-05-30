/**
 * Design a stack class that supports the push, pop, top, and getMin operations.
 * 
 * MinStack() initializes the stack object.
 * void push(int val) pushes the element val onto the stack.
 * void pop() removes the element on the top of the stack.
 * int top() gets the top element of the stack.
 * int getMin() retrieves the minimum element in the stack.
 * Each function should run in O(1) time.
 */
class MinStack {
	_stack: number[] = [];
	_minStack: number[] = [];
	constructor() { }

	/**
	 * @param {number} val
	 * @return {void}
	 */
	push(val: number) {
		this._stack.push(val);

		//min stack just record the state from the push for minVal
		//so when popped, both stack gets popped, revealing the previous min val
		//min stack will have repeated min values, since that is the value we want to retrieve for that state
		const minVal = Math.min(val,
			this._minStack.length > 0 ? this._minStack[this._minStack.length - 1] : val);
		this._minStack.push(minVal);
	}

	/**
	 * @return {void}
	 */
	pop() {
		this._stack.pop();
		this._minStack.pop();
	}

	/**
	 * @return {number}
	 */
	top() {
		return this._stack[this._stack.length - 1];
	}

	/**
	 * @return {number}
	 */
	getMin() {
		return this._minStack[this._minStack.length - 1];
	}
}
