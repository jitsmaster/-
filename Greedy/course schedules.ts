import { MaxPriorityQueue } from "@datastructures-js/priority-queue";


function scheduleCourse(courses: number[][]): number {
    //since it's greedy approach, we will sort on the basis of end date first
    //we have to start from beginning, so start on the first start date
    courses.sort((a, b) => a[1] - b[1]);

    //accumulative time
    let time = 0;

    //use max heap to store the duration of the courses
    //since the max heap will have the smallest duration at the top
    const maxHeap = new MaxPriorityQueue<number>();

    for (const course of courses) {
        const [duration, end] = course;

        //if the time + duration of the course is less than or equal to the end date of the course
        //then we can take this course
        if (time + duration <= end) {
            maxHeap.enqueue(duration);
            time += duration;
        } else if (maxHeap.size() > 0 && (maxHeap.front() as number) > duration) {
            //if the time + duration of the course is greater than the end date of the course
            //then we have to check if we can take this course by comparing it with the longest course we have taken
            time += duration - (maxHeap.dequeue() as number);
            maxHeap.enqueue(duration);
            
        }
    }

    return maxHeap.size();
};