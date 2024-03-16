import { Deque } from "@datastructures-js/deque";

class SnakeGame {
    private width: number;
    private height: number;

    //snake coords, the coords of the snake's body
    //each number is row * width + col
    private snake: Deque<number> = new Deque();
    private visited: Set<number> = new Set();
    private moves: Map<string, number[]> = new Map();
    private food: number[][];
    private score: number;
    private foodSet: Set<number>;

    constructor(width: number, height: number, food: number[][]) {
        this.width = width;
        this.height = height;
        this.snake.pushBack(0) //first snake cell, coordinate (0, 0) =  0 * width + 0
        this.food = food;
        //also turn food into a set, same coord calculation
        //this will allow very easy lookup of food
        //and we can remove food from the set when eaten
        //this will make the game much faster
        this.foodSet = new Set(food.map(([row, col]) => row * width + col));

        this.score = 0;

        //define the moves, this make it much faster on looking up which direction to go
        this.moves.set('U', [-1, 0]);
        this.moves.set('D', [1, 0]);
        this.moves.set('L', [0, -1]);
        this.moves.set('R', [0, 1]);
    }

    move(direction: string): number {
        const head = this.snake[0];

        //convert the number coords to row and column
        //very simple, just divide by width to get the row, and mod by width to get the column
        const row = Math.floor(head / this.width);
        const col = head % this.width;

        const dir = this.moves.get(direction);
        if (!dir) { //invalid direction
            return -1; //game over
        }

        let newRow = row + dir[0];
        let newCol = col + dir[1];

        if (newRow < 0 || newRow >= this.height || newCol < 0 || newCol >= this.width) {
            return -1; // Game over, out of bounds
        }

        const newHead = [newRow, newCol];

        // Check if the new head collides with the snake body
        const newHeadCoord = newRow * this.width + newCol;

        if (this.visited.has(newHeadCoord)) {
            return -1; // Game over, collided with the snake
        }

        // Check if the new head collides with any food
        if (this.foodSet.has(newHeadCoord)) {
            this.foodSet.delete(newHeadCoord); // Remove the food that was eaten
            this.score++; // Increase the score
        } else {
            //the way snake moves, is push new head, and pop old tail
            const tail = this.snake.popBack(); // Remove the tail
            //remove the tail from the visited set
            this.visited.delete(tail);
        }

        this.snake.pushFront(newHeadCoord); // Add new head to the snake either way
        this.visited.add(newHeadCoord); // Add the new head to the visited set

        return this.score; // Return the current score
    }
}